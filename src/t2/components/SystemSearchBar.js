import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SystemSearchBar({ filters, onSearch, onReset, onViewChange, view }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleResetClick = (e) => {
    e.preventDefault();
    const resetFilters = { systemName: '', projectName: '', person: '' };
    setLocalFilters(resetFilters);
    onReset();
  };

  return (
    <form className="search-bar" onSubmit={handleSearchClick}>
      <div className="view-switch">
        <label>
          <input type="radio" value="department" checked={view === 'department'} onChange={e => onViewChange(e.target.value)} /> 部门视图
        </label>
        <label>
          <input type="radio" value="system" checked={view === 'system'} onChange={e => onViewChange(e.target.value)} /> 系统视图
        </label>
        <label>
          <input type="radio" value="person" checked={view === 'person'} onChange={e => onViewChange(e.target.value)} /> 负责人视图
        </label>
      </div>
      <div className="filters">
        <input type="text" name="systemName" placeholder="系统名称" value={localFilters.systemName} onChange={handleInputChange} />
        <input type="text" name="projectName" placeholder="项目名称" value={localFilters.projectName} onChange={handleInputChange} />
        <input type="text" name="person" placeholder="负责人" value={localFilters.person} onChange={handleInputChange} />
      </div>
      <div className="button-row">
        <button type="submit">查询</button>
        <button type="button" onClick={handleResetClick} style={{ marginLeft: 0 }}>重置</button>
        <PrintButton view={view} filters={localFilters} />
      </div>
    </form>
  );
}

function PrintButton({ view, filters }) {
  // Open print page in a new tab with filters as query params
  const handleClick = () => {
    const params = new URLSearchParams(filters).toString();
    window.open(`/task2/print/${view}?${params}`, '_blank');
  };
  return (
    <button type="button" onClick={handleClick} style={{ marginLeft: 0 }}>打印树结构</button>
  );
}

export default SystemSearchBar;
