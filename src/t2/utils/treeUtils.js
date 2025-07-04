// treeUtils.js
// Utility functions for tree data manipulation

/**
 * Recursively traverse a tree and apply a callback to each node.
 * @param {Array} tree - Array of root nodes
 * @param {Function} callback - Function(node, parent)
 * @param {Object|null} parent - Parent node (for recursion)
 */
export function traverseTree(tree, callback, parent = null) {
  if (!Array.isArray(tree)) return;
  tree.forEach((node) => {
    callback(node, parent);
    if (node.children && node.children.length > 0) {
      traverseTree(node.children, callback, node);
    }
  });
}

/**
 * Find a node by id in the tree.
 * @param {Array} tree - Array of root nodes
 * @param {string} id - Node id to find
 * @returns {Object|null} - The found node or null
 */
export function findNodeById(tree, id) {
  let result = null;
  traverseTree(tree, (node) => {
    if (node.id === id) result = node;
  });
  return result;
}

/**
 * Map a tree to a new tree with a transform function.
 * @param {Array} tree - Array of root nodes
 * @param {Function} transform - Function(node) => newNode
 * @returns {Array} - New tree
 */
export function mapTree(tree, transform) {
  return tree.map((node) => {
    const newNode = transform({ ...node });
    if (node.children && node.children.length > 0) {
      newNode.children = mapTree(node.children, transform);
    }
    return newNode;
  });
}

// Helper: recursively filter tree nodes by a predicate
function filterTree(tree, predicate) {
  return tree
    .map((node) => {
      let children = node.children ? filterTree(node.children, predicate) : [];
      // If this node matches, keep all its children (unfiltered)
      if (predicate(node)) {
        return { ...node, children: node.children || [] };
      }
      // Otherwise, only keep if any children match
      if (children.length > 0) {
        return { ...node, children };
      }
      return null;
    })
    .filter(Boolean);
}

export { filterTree };
