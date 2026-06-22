// //const BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = 'https://devfolio-ai-backend.onrender.com/api';

// async function request(endpoint, options = {}) {
//   const token = localStorage.getItem('token');
  
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const config = {
//     ...options,
//     headers,
//   };

//   if (config.body && typeof config.body === 'object') {
//     config.body = JSON.stringify(config.body);
//   }

//   const response = await fetch(`${BASE_URL}${endpoint}`, config);

//   let data;
//   try {
//     data = await response.json();
//   } catch (err) {
//     data = { success: false, message: 'Invalid response from server' };
//   }

//   if (!response.ok) {
//     if (response.status === 401) {
//       localStorage.removeItem('token');
//     }
//     const errorMsg = data.message || `Request failed with status ${response.status}`;
//     const error = new Error(errorMsg);
//     error.status = response.status;
//     error.data = data;
//     throw error;
//   }

//   return data;
// }

// export const api = {
//   get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
//   post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
//   put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
//   delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
// };
// ─── USE THIS ───
const BASE_URL = 'https://devfolio-ai-backend.onrender.com/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = { success: false, message: 'Invalid response from server' };
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};