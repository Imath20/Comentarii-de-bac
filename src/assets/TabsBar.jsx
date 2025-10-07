import React from 'react';
import { useTabs } from './TabsProvider';

export default function TabsBar() {
  const { tabs, activeId, revealed, setRevealed, openNewTab, closeTab, activateTab, resetAutoHideTimer } = useTabs();

  return (
    <div className={`tabs-bar tabs-overlay ${revealed ? 'tabs-visible' : ''}`}>
      <div className="tabs-bar-inner">
        <div className="tabs-header">
          <span className="tabs-title">File</span>
          <button className="tabs-hide" onClick={() => setRevealed(false)} aria-label="Ascunde filele">▲</button>
        </div>
        <div className="tabs-list" role="tablist" onClick={resetAutoHideTimer}>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`tab-item${tab.id === activeId ? ' active' : ''}`}
              role="tab"
              aria-selected={tab.id === activeId}
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


