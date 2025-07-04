import React from 'react';
import TreeView from '../components/TreeView';

/**
 * SystemView renders the system-based tree structure.
 * @param {object} props
 *   data: array of system root nodes
 */
function SystemView({ data, printMode }) {
  if (printMode) {
    return <TreeView data={data} printMode={true} />;
  }
  return (
    <div className="system-view">
      <TreeView data={data} printMode={printMode} />
    </div>
  );
}

export default SystemView;
