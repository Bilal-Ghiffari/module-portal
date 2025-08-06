import AxiosBase from './axios/AxiosBase';

const ApiService = {
  fetchDataWithAxios(param) {
    // Directly return the promise from AxiosBase
    return AxiosBase(param)
      .then((response) => response.data) // Return only the data from the response
      .catch((error) => {
        // Optionally handle the error here if needed
        console.error('API call error:', error);
        throw error; // Rethrow the error to be handled in caller
      });
  },
};

export default ApiService;
