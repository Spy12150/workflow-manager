// 已办任务页面，包含筛选条和任务表格，展示已办任务列表。
import React, { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

// 示例数据，可替换为接口获取
const mockTasks = [
  // A001 -> G001 -> F001/F002
  { appId: 'A001', groupId: 'G001', flowId: 'F001', name: '请假审批', taskId: 'T301', dataId: 'D401', handleTime: '2025-06-25' },
  { appId: 'A001', groupId: 'G001', flowId: 'F002', name: '合同审批', taskId: 'T302', dataId: 'D402', handleTime: '2025-06-24' },
  { appId: 'A001', groupId: 'G001', flowId: 'F001', name: '加班申请', taskId: 'T309', dataId: 'D409', handleTime: '2025-06-17' },
  { appId: 'A001', groupId: 'G001', flowId: 'F002', name: '调休申请', taskId: 'T310', dataId: 'D410', handleTime: '2025-06-16' },
  // A001 -> G002 -> F003/F004
  { appId: 'A001', groupId: 'G002', flowId: 'F003', name: '报销审批', taskId: 'T303', dataId: 'D403', handleTime: '2025-06-23' },
  { appId: 'A001', groupId: 'G002', flowId: 'F004', name: '采购审批', taskId: 'T304', dataId: 'D404', handleTime: '2025-06-22' },
  { appId: 'A001', groupId: 'G002', flowId: 'F003', name: '借款申请', taskId: 'T311', dataId: 'D411', handleTime: '2025-06-15' },
  { appId: 'A001', groupId: 'G002', flowId: 'F004', name: '资产报废', taskId: 'T312', dataId: 'D412', handleTime: '2025-06-14' },
  { appId: 'A001', groupId: 'G002', flowId: 'F003', name: '部门调整', taskId: 'T319', dataId: 'D419', handleTime: '2025-06-07' },
  { appId: 'A001', groupId: 'G002', flowId: 'F004', name: '系统权限', taskId: 'T320', dataId: 'D420', handleTime: '2025-06-06' },
  // A002 -> G101 -> F101/F102
  { appId: 'A002', groupId: 'G101', flowId: 'F101', name: '出差审批', taskId: 'T305', dataId: 'D405', handleTime: '2025-06-21' },
  { appId: 'A002', groupId: 'G101', flowId: 'F102', name: '用章审批', taskId: 'T306', dataId: 'D406', handleTime: '2025-06-20' },
  { appId: 'A002', groupId: 'G101', flowId: 'F101', name: '员工入职', taskId: 'T313', dataId: 'D413', handleTime: '2025-06-13' },
  { appId: 'A002', groupId: 'G101', flowId: 'F102', name: '员工离职', taskId: 'T314', dataId: 'D414', handleTime: '2025-06-12' },
  // A002 -> G102 -> F103/F104
  { appId: 'A002', groupId: 'G102', flowId: 'F103', name: '物品领用', taskId: 'T307', dataId: 'D407', handleTime: '2025-06-19' },
  { appId: 'A002', groupId: 'G102', flowId: 'F104', name: '会议申请', taskId: 'T308', dataId: 'D408', handleTime: '2025-06-18' },
  { appId: 'A002', groupId: 'G102', flowId: 'F103', name: '信息变更', taskId: 'T315', dataId: 'D415', handleTime: '2025-06-11' },
  { appId: 'A002', groupId: 'G102', flowId: 'F104', name: '考勤异常', taskId: 'T316', dataId: 'D416', handleTime: '2025-06-10' },
  // More for variety
  { appId: 'A001', groupId: 'G001', flowId: 'F001', name: '工资调整', taskId: 'T317', dataId: 'D417', handleTime: '2025-06-09' },
  { appId: 'A001', groupId: 'G001', flowId: 'F002', name: '岗位调动', taskId: 'T318', dataId: 'D418', handleTime: '2025-06-08' },
];

// // 后端获取数据示例（解开注释后可用）
// import { useEffect } from 'react';
// function fetchTasksFromBackend(filters) {
//   const params = new URLSearchParams(filters).toString();
//   return fetch(`/api/completedTasks?${params}`)
//     .then(res => res.json());
// }

function CompletedTasks() {
  const [filters, setFilters] = useState({});
  // const [tasks, setTasks] = useState([]); // 用于后端数据

  // // 后端获取数据逻辑 (for use later when api is connected)
  // useEffect(() => {
  //   fetchTasksFromBackend(filters).then(data => setTasks(data));
  // }, [filters]);

  // 过滤逻辑
  const filteredTasks = useMemo(() => {
    return mockTasks.filter(task => {
      if (filters.appId && task.appId !== filters.appId) return false;
      if (filters.groupId && task.groupId !== filters.groupId) return false;
      if (filters.flowId && task.flowId !== filters.flowId) return false;
      // 日期过滤
      if (filters.startDate && task.handleTime < filters.startDate) return false;
      if (filters.endDate && task.handleTime > filters.endDate) return false;
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
      <TaskTable tasks={filteredTasks} type="done" />
    </div>
    
  );
}

export default CompletedTasks;
