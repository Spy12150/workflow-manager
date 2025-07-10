// 连后端的时候需要改这个文档

/**
 * Fetch tree data from backend for task2.
 * @param {string} view - 'department' | 'system' | 'person'
 * @param {object} filters - filter object
 * @returns {Promise<Array>} - Promise resolving to tree data
 */
const fetchTreeData = async (view, filters) => {

  const url = 'YOUR_TASK2_API_URL';
  // 这里之后换掉

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      view,
      ...filters
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export default {
  fetchTreeData,
};
