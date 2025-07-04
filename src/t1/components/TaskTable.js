import React from 'react';
import '../App.css';

// 任务表

function TaskTable({ tasks = [], type = 'todo' }) {
  // 用type来显示columns的不同
  let columns = [];
  if (type === 'todo' || type === 'toread') {
    columns = [
      { key: 'name', label: '任务名称' },
      { key: 'taskId', label: '任务ID' },
      { key: 'dataId', label: '关联流程数据ID' },
      { key: 'receiveTime', label: '接收时间' },
    ];
  } else if (type === 'done' || type === 'read') {
    columns = [
      { key: 'name', label: '任务名称' },
      { key: 'taskId', label: '任务ID' },
      { key: 'dataId', label: '关联流程数据ID' },
      { key: 'handleTime', label: '办理时间' },
    ];
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f6fa' }}>
            {columns.map(col => (
              <th key={col.key} style={{ padding: '10px 12px', borderBottom: '1px solid #e5e7eb', textAlign: 'left', fontWeight: 500, color: '#2563eb' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', color: '#888', padding: '32px 0' }}>
                暂无数据
              </td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <tr key={task.taskId || idx} style={{ borderBottom: '1px solid #f3f6fa' }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '10px 12px', color: '#333' }}>
                    {task[col.key] || '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
