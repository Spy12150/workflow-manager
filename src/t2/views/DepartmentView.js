import React from 'react';
import TreeView from '../components/TreeView';

/**
 * DepartmentView renders the department-based tree structure.
 * @param {object} props
 *   data: array of department root nodes
 */
function DepartmentView({ data, printMode }) {
  if (printMode) {
    return <TreeView data={data} printMode={true} />;
  }
  return (
    <div className="department-view">
      <TreeView data={data} printMode={printMode} />
    </div>
  );
}

export default DepartmentView;
