import React, { useState } from 'react';
import '../App.css';

//这个是委托设置的弹窗
// props: onClose, onSave (保存委托设置), initialDelegate (初始委托人)
function DelegateSettingsModal({ onClose, onSave, initialDelegate = '' }) {
  const [delegate, setDelegate] = useState(initialDelegate);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave({ delegate, startDate, endDate });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: 16 }}>
          委托设置
        </div>
        <div style={{ marginBottom: 24, color: '#666' }}>
          <div style={{ marginBottom: 12 }}>
            <label>
              委托人：
              <input
                type="text"
                value={delegate}
                onChange={e => setDelegate(e.target.value)}
                placeholder="请输入委托人姓名"
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              开始日期：
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db' }}
              />
            </label>
          </div>
          <div>
            <label>
              结束日期：
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db' }}
              />
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="secondary" onClick={onClose}>
            关闭
          </button>
          <button className="primary" onClick={handleSave} disabled={!delegate || !startDate || !endDate} style={{ opacity: delegate && startDate && endDate ? 1 : 0.5 }}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default DelegateSettingsModal;
