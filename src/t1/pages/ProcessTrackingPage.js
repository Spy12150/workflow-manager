// 流程跟踪页面，包含筛选条和流程跟踪表格，展示自己发起的流程。
import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ProcessTracking from '../components/ProcessTracking';

// sample data REPLACE LATER WITH ACTUAL API CALLS
const mockProcesses = [
  {
    group: '人事流程',
    name: '入职审批',
    definitionId: 'F001',
    dataId: 'D301',
    dataName: '张三入职',
    appId: 'A001',
    appName: '人事系统',
    currentHandler: '李经理',
  },
  {
    group: '财务流程',
    name: '报销审批',
    definitionId: 'F002',
    dataId: 'D302',
    dataName: '差旅报销',
    appId: 'A002',
    appName: '财务系统',
    currentHandler: '王主管',
  },
];

function ProcessTrackingPage() {
  const [filters, setFilters] = useState({});
  const [processes, setProcesses] = useState(mockProcesses);

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
      <ProcessTracking processes={processes} />
    </div>
  );
}

export default ProcessTrackingPage;
