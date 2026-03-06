import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import { useTabs } from './TabsProvider';
import { RECAP_BY_PART } from '../data/recapSheets';

export default function TabsBar() {
  const { tabs, activeId, revealed, setRevealed, openNewTab, closeTab, activateTab, resetAutoHideTimer, cancelAutoHide, reorderTabs, handleUserInteraction } = useTabs();
  const dragIdRef = useRef(null);
  const [recapOpen, setRecapOpen] = useState(false);

  useEffect(() => {
    if (!revealed) setRecapOpen(false);
  }, [revealed]);

  const openRecap = (slug) => {
    openNewTab(`/recap/${slug}`);
    setRecapOpen(false);
    handleUserInteraction();
  };

  return (
    <div className={`tabs-bar tabs-overlay ${revealed ? 'tabs-visible' : ''}`}>
      <div className="tabs-bar-inner">
        <div className="tabs-header">
          <span className="tabs-title">File</span>
          <div className="tabs-recap-dropdown">
            <button
              type="button"
              className={`tabs-recap-trigger ${recapOpen ? 'open' : ''}`}
              onClick={(e) => { e.stopPropagation(); setRecapOpen((o) => !o); handleUserInteraction(); }}
              aria-expanded={recapOpen}
              aria-haspopup="true"
            >
              <Zap size={16} />
              <span>Recap rapid</span>
              <ChevronDown size={14} className="tabs-recap-chevron" />
            </button>
            {recapOpen && (
              <div className="tabs-recap-menu" role="menu">
                <button type="button" className="tabs-recap-menu-item tabs-recap-menu-main" onClick={(e) => { e.stopPropagation(); openNewTab('/recap'); setRecapOpen(false); handleUserInteraction(); }}>
                   Toate (pagina Recap)
                </button>
                {RECAP_BY_PART.map(({ part, items }) => (
                  <div key={part} className="tabs-recap-group">
                    <span className="tabs-recap-group-title">{part}</span>
                    {items.map(({ titlu, slug }) => (
                      <button key={slug} type="button" className="tabs-recap-menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); openRecap(slug); }}>
                        {titlu}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="tabs-hide" onClick={() => { setRecapOpen(false); setRevealed(false); }} aria-label="Ascunde filele">
            <ChevronDown size={20} />
          </button>
        </div>
        <div
          className="tabs-list"
          role="tablist"
          onClick={handleUserInteraction}
          onMouseEnter={cancelAutoHide}
          onMouseLeave={handleUserInteraction}
        >
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`tab-item${tab.id === activeId ? ' active' : ''}`}
              role="tab"
              aria-selected={tab.id === activeId}
              data-tab-id={tab.id}
              draggable
              onDragStart={(e) => {
                dragIdRef.current = tab.id;
                e.dataTransfer.effectAllowed = 'move';
                try { e.dataTransfer.setData('text/plain', tab.id); } catch {}
                cancelAutoHide();
                e.currentTarget.classList.add('dragging');
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
              }}
              onDrop={(e) => {
                e.preventDefault();
                const dragId = dragIdRef.current || (function(){ try { return e.dataTransfer.getData('text/plain'); } catch { return null; } })();
                if (!dragId || dragId === tab.id) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const position = (e.clientX - rect.left) > rect.width / 2 ? 'after' : 'before';
                reorderTabs(dragId, tab.id, position);
              }}
              onDragEnd={() => {
                dragIdRef.current = null;
                handleUserInteraction();
                const el = document.querySelector(`[data-tab-id="${tab.id}"]`);
                if (el) el.classList.remove('dragging');
              }}
              onClick={(e) => {
                e.stopPropagation();
                activateTab(tab.id);
                handleUserInteraction();
              }}
              // title={`${tab.path} (Ctrl+Shift+${index + 1})`}
            >
              <span className="tab-number">{index + 1}</span>
              <span className="tab-title">{tab.title}</span>
              <button className="tab-close" aria-label="Închide fila" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); handleUserInteraction(); }}>✕</button>
            </div>
          ))}
          <button className="tab-new" onClick={(e) => { e.stopPropagation(); openNewTab('/'); handleUserInteraction(); }} aria-label="Fila nouă (Ctrl+M)">＋</button>
        </div>
      </div>
    </div>
  );
}


