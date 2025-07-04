import React, { useState, useEffect } from 'react';

/**
 * TreeNode component renders a single node in the tree, with expand/collapse and custom styles for progress nodes.
 * @param {object} props
 *   node: { id, name, children, ...progressProps }
 *   level: number (tree depth, for indentation)
 *   expandAll: boolean (expand all nodes by default)
 */
function TreeNode({ node, level = 0, expandAll = false, printMode = false }) {
  const [expanded, setExpanded] = useState(expandAll);
  const hasChildren = node.children && node.children.length > 0;

  // Expand/collapse all when expandAll changes
  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  // Handle expand/collapse
  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  // Style for progress/status nodes
  const progressStyle = node.styleContent
    ? {
        background: node.styleContent.backgroundColor || undefined,
        color: node.styleContent.fontColor || undefined,
        textDecoration: node.styleContent.strikethrough ? 'line-through' : undefined,
        display: 'inline-block',
        padding: '0px', // remove padding so container size doesn't change
        borderRadius: '0px',
        boxShadow: node.styleContent.backgroundColor ? `0 0 0 5px ${node.styleContent.backgroundColor}` : undefined, // visual background extension
      }
    : {};

  return (
    <div>
      <div
        className="tree-node-label"
        style={{ marginLeft: level * 25 }}
        onClick={hasChildren ? handleToggle : undefined}
      >
        {hasChildren && (
          <span style={{ cursor: 'pointer', marginRight: 4 }} className={typeof window !== 'undefined' && window.location && window.location.href.includes('print') ? 'tree-print-icon' : ''}>
            {printMode ? '-' : (expanded ? '▼' : '▶')}
          </span>
        )}
        {node.styleContent ? (
          <span style={progressStyle}>
            {node.name}
            {node.status && <span style={{ marginLeft: 8 }}>{'状态: ' + node.status}</span>}
          </span>
        ) : (
          <span>{node.name}</span>
        )}
        {node.person && <span style={{ marginLeft: 8, color: '#888' }}>负责人: {node.person}</span>}
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} expandAll={expandAll} printMode={printMode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
