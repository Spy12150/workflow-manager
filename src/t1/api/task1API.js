
/**
 * Fetch data from backend for task1.
 * @param {object} params 
 * @returns {Promise<Array>} 
 */

const fetchTask1Data = async (params) => {
  const url = 'YOUR_TASK1_API_URL'; //这里换掉

  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export default {
  fetchTask1Data,
};