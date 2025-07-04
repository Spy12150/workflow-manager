import React from 'react';
import '../App.css';

// 流程跟踪表

//这个和tasktable在没有数据的时候会显示“暂无数据”


function ProcessTracking({ processes = [] }) {
  const columns = [
    { key: 'group', label: '流程组' },
    { key: 'name', label: '流程名称' },
    { key: 'definitionId', label: '流程定义ID' },
    { key: 'dataId', label: '数据ID' },
    { key: 'dataName', label: '数据名称' },
    { key: 'appId', label: '归属AppID' },
    { key: 'appName', label: '归属App名称' },
    { key: 'currentHandler', label: '当前办理人' },
  ];

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
          {processes.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', color: '#888', padding: '32px 0' }}>
                暂无数据
              </td>
            </tr>
          ) : (
            processes.map((item, idx) => (
              <tr key={item.dataId || idx} style={{ borderBottom: '1px solid #f3f6fa' }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '10px 12px', color: '#333' }}>
                    {item[col.key] || '-'}
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

export default ProcessTracking;
