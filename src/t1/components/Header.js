import React from 'react';
import '../App.css';

// 顶部栏组件，显示当前页面标题和两个操作按钮,连到modal上面

function Header({ title, onStartProcess, onDelegateSettings }) {
  return (
    <header className="header">
      <div className="header-title">{title}</div>
      <div className="header-actions">
        <button className="primary" onClick={onStartProcess}>
          发起流程
        </button>
        <button className="secondary" onClick={onDelegateSettings}>
          委托设置
        </button>
      </div>
    </header>
  );
}

export default Header;
