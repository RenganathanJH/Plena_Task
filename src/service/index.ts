import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: "https://dummyjson.com/",
});

// Set the authorization token

// Create an instance of CancelToken
const cancelTokenSource = axios.CancelToken.source();

// Function to make a CRUD API call with authorized header
export async function serviceCall(method = '', url = '', data = {}) {  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const config = {
      headers,
      cancelToken: cancelTokenSource.token,
    };

    let response;

    switch (method.toLowerCase()) {
      case 'get':
        response = await api.get(url, config);
        break;
      case 'post':
        response = await api.post(url, data, config);
        break;
      case 'put':
        response = await api.put(url, data, config);
        break;
      case 'delete':
        response = await api.delete(url, config);
        break;
      case 'patch':
        response = await api.patch(url, data, config);
        break;
      default:
        throw new Error('Invalid method');
    }

    return response.data;
  } catch (error) {     
    throw error;
  }
}