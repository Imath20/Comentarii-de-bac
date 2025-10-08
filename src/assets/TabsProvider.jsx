import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { titleFromPath } from './routeTitles';

const TabsContext = createContext(null);

const DEFAULT_TAB = {
  id: 'tab-1',
  title: 'Acasa',
  path: '/',
  history: ['/'],
  scrollY: 0,
};

export function TabsProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabs, setTabs] = useState(() => {
    const stored = localStorage.getItem('tabs.state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.tabs) && parsed.tabs.length > 0 && parsed.activeId) return parsed;
      } catch {}
    }
    return { tabs: [DEFAULT_TAB], activeId: DEFAULT_TAB.id, revealed: false };
  });

  const activeIndex = tabs.tabs.findIndex(t => t.id === tabs.activeId);
  const activeTab = activeIndex >= 0 ? tabs.tabs[activeIndex] : tabs.tabs[0];

  useEffect(() => {
    localStorage.setItem('tabs.state', JSON.stringify(tabs));
  }, [tabs]);

  // Keep active tab path and title in sync with router location
  useEffect(() => {
    if (!activeTab) return;
    const newPath = location.pathname + location.search + location.hash;
    const newTitle = titleFromPath(location.pathname);
    if (activeTab.path !== newPath) {
      setTabs(s => ({
        ...s,
        tabs: s.tabs.map(t => t.id === s.activeId ? {
          ...t,
          path: newPath,
          title: newTitle,
          history: t.history && t.history[t.history.length - 1] === newPath
            ? t.history
            : [...(t.history || []), newPath].slice(-50),
        } : t)
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, location.hash]);

  const ensureTitle = useCallback((path) => titleFromPath(path), []);

  const openNewTab = useCallback((path = '/') => {
    const id = `tab-${Date.now()}`;
    const title = ensureTitle(path);
    setTabs(s => ({
      ...s,
      tabs: [...s.tabs, { id, title, path, history: [path], scrollY: 0 }],
      activeId: id,
      revealed: true,
    }));
    navigate(path);
  }, [ensureTitle, navigate]);

  const closeTab = useCallback((id) => {
    setTabs(s => {
      const idx = s.tabs.findIndex(t => t.id === id);
      if (idx === -1) return s;
      const newTabs = s.tabs.filter(t => t.id !== id);
      // If closing the last remaining tab, navigate home and reset to DEFAULT_TAB
      if (newTabs.length === 0) {
        try { navigate('/'); } catch {}
        setTimeout(() => { try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch {} }, 0);
        return { ...s, tabs: [DEFAULT_TAB], activeId: DEFAULT_TAB.id };
      }
      let newActiveId = s.activeId;
      if (id === s.activeId) {
        const next = newTabs[idx] || newTabs[idx - 1] || newTabs[0];
        newActiveId = next ? next.id : undefined;
        if (next) navigate(next.path);
      }
      return { ...s, tabs: newTabs.length ? newTabs : [DEFAULT_TAB], activeId: newActiveId || DEFAULT_TAB.id };
    });
  }, [navigate]);

  const activateTab = useCallback((id) => {
    setTabs(s => {
      const current = s.tabs.find(t => t.id === s.activeId);
      const next = s.tabs.find(t => t.id === id);
      if (!next) return s;
      // Save current scroll position on the tab we're leaving
      const updatedTabs = s.tabs.map(t => t.id === s.activeId ? { ...t, scrollY: window.scrollY } : t);
      // Navigate to next tab's path
      if (s.activeId !== id) navigate(next.path);
      // Restore scroll after navigation
      setTimeout(() => {
        window.scrollTo({ top: next.scrollY || 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      }, 0);
      return { ...s, tabs: updatedTabs, activeId: id };
    });
  }, [navigate]);

  const setTabTitle = useCallback((id, title) => {
    setTabs(s => ({ ...s, tabs: s.tabs.map(t => t.id === id ? { ...t, title } : t) }));
  }, []);

  const reorderTabs = useCallback((dragId, targetId, position = 'before') => {
    setTabs(s => {
      const tabsArr = [...s.tabs];
      const fromIndex = tabsArr.findIndex(t => t.id === dragId);
      const targetIndex = tabsArr.findIndex(t => t.id === targetId);
      if (fromIndex === -1 || targetIndex === -1 || fromIndex === targetIndex) return s;
      const [moved] = tabsArr.splice(fromIndex, 1);
      let insertIndex = targetIndex;
      if (position === 'after') {
        insertIndex = targetIndex >= fromIndex ? targetIndex : targetIndex + 1;
      }
      tabsArr.splice(insertIndex, 0, moved);
      return { ...s, tabs: tabsArr };
    });
  }, []);

  // Reveal logic: show when user pulls to very top and drags further up
  const lastScrollYRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const atTop = y <= 0;
      // If user arrived at very top and tries to scroll further up, reveal
      if (atTop && lastScrollYRef.current === 0) {
        // noop, wait for wheel/touch to indicate pull
      }
      lastScrollYRef.current = y;
    };
    const isAnyModalOpen = () => {
      return !!document.querySelector('.subiecte-modal-overlay, .scriitor-chat-overlay, .modal, .popup, [role="dialog"], [aria-modal="true"]');
    };
    const onWheel = (e) => {
      if (isAnyModalOpen()) return;
      if (window.scrollY <= 0 && e.deltaY < 0) {
        setTabs(s => ({ ...s, revealed: true }));
      }
    };
    let touchStartY = null;
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length) touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (isAnyModalOpen()) return;
      if (window.scrollY <= 0 && touchStartY != null) {
        const dy = e.touches[0].clientY - touchStartY;
        if (dy > 24) setTabs(s => ({ ...s, revealed: true }));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const hideTabs = useCallback(() => setTabs(s => ({ ...s, revealed: false })), []);

  // Auto-hide tabs after 5 seconds of inactivity
  const autoHideTimerRef = useRef(null);
  const resetAutoHideTimer = useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
    if (tabs.revealed) {
      autoHideTimerRef.current = setTimeout(() => {
        setTabs(s => ({ ...s, revealed: false }));
      }, 3000);
    }
  }, [tabs.revealed]);

  const cancelAutoHide = useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
  }, []);

  // When revealed, push the whole page (including navbar) down by the tabs bar height
  useEffect(() => {
    const body = document.body;
    const isAnyModalOpen = () => {
      return !!document.querySelector('.subiecte-modal-overlay, .modal, .popup, [role="dialog"], [aria-modal="true"]');
    };

    if (tabs.revealed && !isAnyModalOpen()) {
      body.classList.add('tabs-revealed');
      // Keep this in sync with the actual visual height of the tabs bar
      if (!getComputedStyle(body).getPropertyValue('--tabs-bar-height')) {
        body.style.setProperty('--tabs-bar-height', '46px');
      }
      resetAutoHideTimer();
    } else {
      body.classList.remove('tabs-revealed');
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    }
    return () => {
      body.classList.remove('tabs-revealed');
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, [tabs.revealed, resetAutoHideTimer]);

  // React immediately to modal open/close to prevent background layout shifts
  useEffect(() => {
    const body = document.body;
    const isAnyModalOpen = () => {
      return !!document.querySelector('.subiecte-modal-overlay, .scriitor-chat-overlay, .modal, .popup, [role="dialog"], [aria-modal="true"]');
    };
    const syncBodyClass = () => {
      if (isAnyModalOpen()) {
        body.classList.remove('tabs-revealed');
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current);
        }
        // Ensure tabs state is hidden so the bar is not visible under overlay
        setTabs(s => (s.revealed ? { ...s, revealed: false } : s));
      } else if (tabs.revealed) {
        body.classList.add('tabs-revealed');
      }
    };
    const observer = new MutationObserver(syncBodyClass);
    observer.observe(document.documentElement, { subtree: true, childList: true, attributes: false });
    // Initial sync
    syncBodyClass();
    return () => observer.disconnect();
  }, [tabs.revealed]);

  // Hotkeys: Ctrl+M new tab, Ctrl+Q close current, Ctrl+~ toggle, Ctrl+Shift+1-9 switch, Ctrl+Left/Right navigate
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!e.ctrlKey) return;
      
      if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        openNewTab('/');
      }
      if (e.key.toLowerCase() === 'q') {
        e.preventDefault();
        if (tabs.activeId) closeTab(tabs.activeId);
      }
      if (e.key === '~' || e.key === '`') {
        e.preventDefault();
        setTabs(s => ({ ...s, revealed: !s.revealed }));
      }
      
      // Ctrl+Shift+Number keys 1-9 to switch to specific tab positions
      const num = parseInt(e.key);
      if (e.shiftKey && num >= 1 && num <= 9) {
        e.preventDefault();
        const tabIndex = num - 1;
        if (tabIndex < tabs.tabs.length) {
          activateTab(tabs.tabs[tabIndex].id);
        }
      }
      
      // Arrow keys for tab navigation
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIndex = tabs.tabs.findIndex(t => t.id === tabs.activeId);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.tabs.length - 1;
        if (tabs.tabs[prevIndex]) {
          activateTab(tabs.tabs[prevIndex].id);
        }
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = tabs.tabs.findIndex(t => t.id === tabs.activeId);
        const nextIndex = currentIndex < tabs.tabs.length - 1 ? currentIndex + 1 : 0;
        if (tabs.tabs[nextIndex]) {
          activateTab(tabs.tabs[nextIndex].id);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openNewTab, closeTab, tabs.activeId, tabs.tabs, activateTab]);

  const value = useMemo(() => ({
    tabs: tabs.tabs,
    activeId: tabs.activeId,
    revealed: tabs.revealed,
    setRevealed: (v) => setTabs(s => ({ ...s, revealed: v })),
    openNewTab,
    closeTab,
    activateTab,
    setTabTitle,
    reorderTabs,
    hideTabs,
    resetAutoHideTimer,
    cancelAutoHide,
  }), [tabs, openNewTab, closeTab, activateTab, setTabTitle, reorderTabs, hideTabs, resetAutoHideTimer, cancelAutoHide]);

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used within TabsProvider');
  return ctx;
}


