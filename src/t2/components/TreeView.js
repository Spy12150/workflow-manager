import React, { useEffect, useState } from 'react';
import TreeNode from './TreeNode';

/**
 * TreeView component renders the root of the tree structure.
 * @param {object} props
 *   data: array of root nodes
 */
function TreeView({ data, printMode }) {
  // Provide a prop to TreeNode to expand all by default
  const [expandAll, setExpandAll] = useState(true);

  useEffect(() => {
    setExpandAll(true); // Always expand all on mount or data change
  }, [data]);

  if (!data || data.length === 0) {
    return <div style={{ color: '#888', padding: '1em' }}>暂无数据</div>;
  }
  return (
    <div className="tree-view">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} expandAll={expandAll} printMode={printMode} />
      ))}
    </div>
  );
}

export default TreeView;
