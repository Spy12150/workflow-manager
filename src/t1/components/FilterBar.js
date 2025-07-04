import React from 'react';
import '../App.css';

// 筛选条，全部用输入框，输入即触发过滤
function FilterBar({ filters, onFilter, onDateChange }) {
  // Tree-structured dropdown data
  const appOptions = [
    { value: '', label: '选择App' },
    { value: 'A001', label: 'A001' },
    { value: 'A002', label: 'A002' },
  ];
  const groupOptionsMap = {
    'A001': [
      { value: '', label: '选择流程组' },
      { value: 'G001', label: 'G001' },
      { value: 'G002', label: 'G002' },
    ],
    'A002': [
      { value: '', label: '选择流程组' },
      { value: 'G101', label: 'G101' },
      { value: 'G102', label: 'G102' },
    ],
  };
  const flowOptionsMap = {
    'G001': [
      { value: '', label: '选择流程' },
      { value: 'F001', label: 'F001' },
      { value: 'F002', label: 'F002' },
    ],
    'G002': [
      { value: '', label: '选择流程' },
      { value: 'F003', label: 'F003' },
      { value: 'F004', label: 'F004' },
    ],
    'G101': [
      { value: '', label: '选择流程' },
      { value: 'F101', label: 'F001' },
      { value: 'F102', label: 'F002' },
    ],
    'G102': [
      { value: '', label: '选择流程' },
      { value: 'F103', label: 'F101' },
      { value: 'F104', label: 'F102' },
    ],
  };

  // Local state for filter values
  const [localFilters, setLocalFilters] = React.useState(filters || {});

  // Update local state on input
  const handleInput = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    // Reset dependent dropdowns
    if (key === 'appId') setLocalFilters(prev => ({ ...prev, groupId: '', flowId: '' }));
    if (key === 'groupId') setLocalFilters(prev => ({ ...prev, flowId: '' }));
  };

  // Search button click
  const handleSearch = () => {
    onFilter(localFilters);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      {/* App Dropdown */}
      <select
        value={localFilters.appId || ''}
        onChange={e => handleInput('appId', e.target.value)}
        style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db', minWidth: 120 }}
      >
        {appOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {/* Group Dropdown (show only if appId is selected) */}
      {localFilters.appId && (
        <select
          value={localFilters.groupId || ''}
          onChange={e => handleInput('groupId', e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db', minWidth: 120 }}
        >
          {(groupOptionsMap[localFilters.appId] || [{ value: '', label: '选择流程组' }]).map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
      {/* Flow Dropdown (show only if groupId is selected) */}
      {localFilters.groupId && (
        <select
          value={localFilters.flowId || ''}
          onChange={e => handleInput('flowId', e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db', minWidth: 120 }}
        >
          {(flowOptionsMap[localFilters.groupId] || [{ value: '', label: '选择流程' }]).map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
      {/* Date inputs */}
      <input
        type="date"
        value={localFilters.startDate || ''}
        onChange={e => handleInput('startDate', e.target.value)}
        style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db' }}
      />
      <span style={{ color: '#888' }}>至</span>
      <input
        type="date"
        value={localFilters.endDate || ''}
        onChange={e => handleInput('endDate', e.target.value)}
        style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db' }}
      />
      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          marginLeft: 16,
          padding: '8px 20px',
          borderRadius: 6,
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          background: '#409eff',
          color: '#fff',
          fontWeight: 500,
        }}
      >
        搜索
      </button>
    </div>
  );
}

export default FilterBar;
