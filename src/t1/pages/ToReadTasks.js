// 待阅任务页面，包含筛选条和任务表格，展示待阅任务列表。
import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

// 示例数据，可替换为接口获取
const mockTasks = [
  { appId: 'A001', groupId: 'G001', flowId: 'F001', name: '公告阅读', taskId: 'T101', dataId: 'D101', receiveTime: '2025-07-01' },
  { appId: 'A001', groupId: 'G002', flowId: 'F004', name: '政策学习', taskId: 'T102', dataId: 'D102', receiveTime: '2025-06-30' },
  { appId: 'A002', groupId: 'G101', flowId: 'F102', name: '财务阅读', taskId: 'T103', dataId: 'D103', receiveTime: '2025-06-29' },
  { appId: 'A002', groupId: 'G102', flowId: 'F103', name: '采购阅读', taskId: 'T104', dataId: 'D104', receiveTime: '2025-06-28' },
];

function ToReadTasks() {
  const [filters, setFilters] = useState({});

  // 过滤逻辑
  const filteredTasks = React.useMemo(() => {
    return mockTasks.filter(task => {
      if (filters.appId && task.appId !== filters.appId) return false;
      if (filters.groupId && task.groupId !== filters.groupId) return false;
      if (filters.flowId && task.flowId !== filters.flowId) return false;
      if (filters.startDate && task.receiveTime < filters.startDate) return false;
      if (filters.endDate && task.receiveTime > filters.endDate) return false;
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
        filters={filters}
        onFilter={handleFilter}
        onDateChange={handleDateChange}
      />
      <TaskTable tasks={filteredTasks} type="toread" />
    </div>
  );
}

export default ToReadTasks;
