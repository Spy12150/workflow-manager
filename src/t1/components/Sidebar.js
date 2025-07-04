import React, { useState } from 'react';
import '../App.css';

//左侧的组件，显示左边的菜单，用来切换到不同的pages

const menuItems = [
  { key: 'todo', label: '待办任务', icon: '/Icons/icon1w.webp' },
  { key: 'done', label: '已办任务', icon: '/Icons/icon2w.webp' },
  { key: 'toread', label: '待阅任务', icon: '/Icons/icon3w.webp' },
  { key: 'read', label: '已阅任务', icon: '/Icons/icon4w.webp' },
  { key: 'tracking', label: '流程跟踪', icon: '/Icons/icon5w.webp' },
];

function Sidebar({ selected, onSelect, onWidthChange }) {
  const [collapsed, setCollapsed] = useState(false);

  // Notify parent of sidebar width
  React.useEffect(() => {
    if (onWidthChange) {
      onWidthChange(collapsed ? 56 : 220);
    }
  }, [collapsed, onWidthChange]);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <aside
        className="sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: collapsed ? 56 : 220,
          minWidth: collapsed ? 56 : 220,
          transition: 'width 0.2s',
          overflow: 'hidden',
          zIndex: 100,
        }}
      >
        <div className="sidebar-title" style={{ display: collapsed ? 'none' : undefined, transition: 'display 0.2s' }}>流程中心</div>
        <nav className="sidebar-menu" style={{ flex: 1 }}>
          {menuItems.map((item, idx) => (
            <button
              key={item.key}
              className={selected === item.key ? 'active' : ''}
              onClick={() => onSelect(item.key)}
              style={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: collapsed ? 0 : 24,
                paddingRight: collapsed ? 0 : 24,
                transition: 'padding 0.2s',
                gap: collapsed ? 0 : 12,
              }}
            >
              <img
                src={process.env.PUBLIC_URL + item.icon}
                alt={item.label}
                style={{ width: 24, height: 24, marginRight: collapsed ? 0 : 8, transition: 'margin 0.2s' }}
              />
              <span
                style={{
                  display: collapsed ? 'none' : 'inline',
                  transition: 'display 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        {/* Company Logo at bottom of sidebar, hidden when collapsed */}
        {!collapsed && (
          <div style={{ textAlign: 'center', padding: '24px 0', transition: 'opacity 0.2s' }}>
            <img src={process.env.PUBLIC_URL + '/companylogo1.webp'} alt="Company Logo" style={{ width: 120, height: 'auto', display: 'inline-block' }} />
          </div>
        )}
      </aside>
      {/* 折叠/展开按钮，放在sidebar外部，始终在sidebar右侧 */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          position: 'fixed',
          top: '50%',
          left: (collapsed ? 56 : 220) - 16, // 16px is half the button width to center it on the edge
          transform: 'translateY(-50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: 'none',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          zIndex: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: collapsed ? 'left 0.2s' : 'none', // Animate only when collapsing
        }}
        title={collapsed ? '展开菜单' : '折叠菜单'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
          {collapsed ? (
            // ▶
            <polygon points="5,3 12,8 5,13" fill="#409eff" />
          ) : (
            // ◀
            <polygon points="11,3 4,8 11,13" fill="#409eff" />
          )}
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;
