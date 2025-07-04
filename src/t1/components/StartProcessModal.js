import React, { useState } from 'react';
import '../App.css';

//发流程的弹窗
// props: onClose, onStart (发起流程), processList (可发起流程列表)
function StartProcessModal({ onClose, onStart, processList = [] }) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected && onStart) {
      onStart(selected);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: 16 }}>
          可发起的流程
        </div>
        <div style={{ marginBottom: 24, color: '#666', maxHeight: 200, overflowY: 'auto' }}>
          {processList.length === 0 ? (
            <div>暂无可发起流程</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {processList.map((item, idx) => (
                <li key={item.id || idx} style={{ marginBottom: 8 }}>
                  <label style={{ cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="process"
                      value={item.id}
                      checked={selected === item.id}
                      onChange={() => setSelected(item.id)}
                      style={{ marginRight: 8 }}
                    />
                    {item.appName} - {item.groupName} - {item.processName}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="secondary" onClick={onClose}>
            关闭
          </button>
          <button
            className="primary"
            onClick={handleSubmit}
            disabled={!selected}
            style={{ opacity: selected ? 1 : 0.5 }}
          >
            发起
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartProcessModal;