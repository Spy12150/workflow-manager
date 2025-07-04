import React from 'react';
import TreeView from '../components/TreeView';

/**
 * PersonView renders the person-in-charge-based tree structure.
 * @param {object} props
 *   data: array of person root nodes
 */
function PersonView({ data, printMode }) {
  if (printMode) {
    return <TreeView data={data} printMode={true} />;
  }
  return (
    <div className="person-view">
      <TreeView data={data} printMode={printMode} />
    </div>
  );
}

export default PersonView;
