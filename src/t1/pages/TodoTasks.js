import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

//待办任务页面，筛选条和任务表格，展示待办任务列表

// 示例数据，改完之后用api来获取（从后端)
const mockTasks = [
  { appId: 'A001', groupId: 'G001', flowId: 'F001', name: '审批请假', taskId: 'T001', dataId: 'D001', receiveTime: '2025-07-03' },
  { appId: 'A001', groupId: 'G002', flowId: 'F003', name: '合同签署', taskId: 'T002', dataId: 'D002', receiveTime: '2025-07-02' },
  { appId: 'A002', groupId: 'G101', flowId: 'F101', name: '财务审批', taskId: 'T003', dataId: 'D003', receiveTime: '2025-07-01' },
  { appId: 'A002', groupId: 'G102', flowId: 'F104', name: '采购审批', taskId: 'T004', dataId: 'D004', receiveTime: '2025-06-30' },
];

function TodoTasks() {
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
      <TaskTable tasks={filteredTasks} type="todo" />
    </div>
  );
}

export default TodoTasks;
