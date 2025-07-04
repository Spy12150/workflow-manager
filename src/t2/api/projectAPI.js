// 连后端的时候需要改这个文档

/**
 * Simulate fetching tree data from backend.
 * @param {string} view - 'department' | 'system' | 'person'
 * @param {object} filters - filter object
 * @returns {Promise<Array>} - Promise resolving to tree data
 */
const fetchTreeData = async (view, filters) => {
  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return mock data structure
  return [
    {
      id: '1',
      name: '示例节点',
      children: [
        {
          id: '1-1',
          name: '子节点',
          children: [],
        },
      ],
    },
  ];
};

export default {
  fetchTreeData,
};
