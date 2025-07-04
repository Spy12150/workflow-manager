import React, { useState } from 'react';
import './t1/App.css';
import Sidebar from './t1/components/Sidebar';
import Header from './t1/components/Header';
import StartProcessModal from './t1/components/StartProcessModal';
import DelegateSettingsModal from './t1/components/DelegateSettingsModal';
import TodoTasks from './t1/pages/TodoTasks';
import CompletedTasks from './t1/pages/CompletedTasks';
import ToReadTasks from './t1/pages/ToReadTasks';
import ReadTasks from './t1/pages/ReadTasks';
import ProcessTrackingPage from './t1/pages/ProcessTrackingPage';

const menuItems = [
  { key: 'todo', label: '待办任务' },
  { key: 'done', label: '已办任务' },
  { key: 'toread', label: '待阅任务' },
  { key: 'read', label: '已阅任务' },
  { key: 'tracking', label: '流程跟踪' },
];

function App() {
  const [selected, setSelected] = useState('todo');
  const [showStartModal, setShowStartModal] = useState(false);
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220); // default expanded

  // 渲染主内容区
  let Content = null;
  if (selected === 'todo') Content = <TodoTasks />;
  else if (selected === 'done') Content = <CompletedTasks />;
  else if (selected === 'toread') Content = <ToReadTasks />;
  else if (selected === 'read') Content = <ReadTasks />;
  else if (selected === 'tracking') Content = <ProcessTrackingPage />;

  // Determine if sidebar is collapsed for transition
  const isCollapsed = sidebarWidth === 56;

  return (
    <div style={{ display: 'flex', minheight: '100vh', background: '#f3f6fa', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar selected={selected} onSelect={setSelected} onWidthChange={setSidebarWidth} />
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          marginLeft: sidebarWidth, // Prevent content from being covered by sidebar
          transition: isCollapsed ? 'margin-left 0.2s' : 'none', // Only animate when collapsing
          overflowY: 'auto', // Only show vertical scrollbar when needed
        }}
      >
        <Header
          title={menuItems.find(i => i.key === selected)?.label}
          onStartProcess={() => setShowStartModal(true)}
          onDelegateSettings={() => setShowDelegateModal(true)}
        />
        <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
          <div className="card">
            {Content}
          </div>
        </main>
      </div>
      {/* Start Process Modal */}
      {showStartModal && <StartProcessModal onClose={() => setShowStartModal(false)} />}
      {/* Delegate Settings Modal */}
      {showDelegateModal && <DelegateSettingsModal onClose={() => setShowDelegateModal(false)} />}
    </div>
  );
}

export default App;
