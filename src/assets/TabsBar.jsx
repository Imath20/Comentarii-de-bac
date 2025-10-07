import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTabs } from './TabsProvider';

export default function TabsBar() {
  const { tabs, activeId, revealed, setRevealed, openNewTab, closeTab, activateTab, resetAutoHideTimer, cancelAutoHide, reorderTabs } = useTabs();
  const dragIdRef = useRef(null);

  return (
    <div className={`tabs-bar tabs-overlay ${revealed ? 'tabs-visible' : ''}`}>
      <div className="tabs-bar-inner">
        <div className="tabs-header">
          <span className="tabs-title">File</span>
          <button className="tabs-hide" onClick={() => setRevealed(false)} aria-label="Ascunde filele">
            <ChevronDown size={20} />
          </button>
        </div>
        <div
          className="tabs-list"
          role="tablist"
          onClick={resetAutoHideTimer}
          onMouseEnter={cancelAutoHide}
          onMouseLeave={resetAutoHideTimer}
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
                resetAutoHideTimer();
                const el = document.querySelector(`[data-tab-id="${tab.id}"]`);
                if (el) el.classList.remove('dragging');
              }}
              onClick={(e) => {
                e.stopPropagation();
                activateTab(tab.id);
                resetAutoHideTimer();
              }}
              title={`${tab.path} (Ctrl+Shift+${index + 1})`}
            >
              <span className="tab-number">{index + 1}</span>
              <span className="tab-title">{tab.title}</span>
              <button className="tab-close" aria-label="Închide fila" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); resetAutoHideTimer(); }}>✕</button>
            </div>
          ))}
          <button className="tab-new" onClick={(e) => { e.stopPropagation(); openNewTab('/'); resetAutoHideTimer(); }} aria-label="Fila nouă (Ctrl+M)">＋</button>
        </div>
      </div>
    </div>
  );
}


