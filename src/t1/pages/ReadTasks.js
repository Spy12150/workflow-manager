// 已阅任务页面，包含筛选条和任务表格，展示已阅任务列表。
import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

// 示例数据，可替换为接口获取
const mockTasks = [
  { appId: 'A001', groupId: 'G001', flowId: 'F001', name: '公告已阅', taskId: 'T201', dataId: 'D201', handleTime: '2025-06-28' },
  { appId: 'A001', groupId: 'G001', flowId: 'F002', name: '政策已阅', taskId: 'T202', dataId: 'D202', handleTime: '2025-06-27' },
  { appId: 'A002', groupId: 'G101', flowId: 'F101', name: '财务已阅', taskId: 'T203', dataId: 'D203', handleTime: '2025-06-26' },
  { appId: 'A002', groupId: 'G102', flowId: 'F104', name: '采购已阅', taskId: 'T204', dataId: 'D204', handleTime: '2025-06-25' },
];

function ReadTasks() {
  const [filters, setFilters] = useState({});

  // 过滤逻辑
  const filteredTasks = React.useMemo(() => {
    return mockTasks.filter(task => {
      if (filters.appId && task.appId !== filters.appId) return false;
      if (filters.groupId && task.groupId !== filters.groupId) return false;
      if (filters.flowId && task.flowId !== filters.flowId) return false;
      if (filters.startDate && task.handleTime < filters.startDate) return false;
      if (filters.endDate && task.handleTime > filters.endDate) return false;
      return true;
    });
  }, [filters]);

  // 这里可以根据 filters 查询数据
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };
  const handleDateChange = (key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
  };

  return (
    <div>
      <FilterBar
        appOptions={[]}
        groupOptions={[]}
        flowOptions={[]}
        filters={filters}
        onFilter={handleFilter}
        onDateChange={handleDateChange}
      />
      <TaskTable tasks={filteredTasks} type="read" />
    </div>
  );
}

export default ReadTasks;
