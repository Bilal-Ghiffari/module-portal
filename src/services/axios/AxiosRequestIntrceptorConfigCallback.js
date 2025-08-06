import appConfig from '@/configs/app.config';
import {
  TOKEN_TYPE,
  REQUEST_HEADER_AUTH_KEY,
  TOKEN_NAME_IN_STORAGE,
} from '@/constants/api.constant';

const AxiosRequestIntrceptorConfigCallback = (config) => {
  const storage = appConfig.accessTokenPersistStrategy;

  // Check what storage strategy to use
  let userData = null;

  // Fetch user data from localStorage or sessionStorage
  if (storage === 'localStorage') {
    userData = JSON.parse(localStorage.getItem(TOKEN_NAME_IN_STORAGE));
  } else if (storage === 'sessionStorage') {
    userData = JSON.parse(sessionStorage.getItem(TOKEN_NAME_IN_STORAGE));
  }

  // userData = { token: import.meta.env.VITE_APP_TOKEN_KEY }; // hardcode dulu akses layanan portal local 3000

  // If userData is retrieved and contains the token, set it in headers
  if (userData && userData.token) {
    config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${userData.token}`;
  }

  return config; // Return the modified config
};

export default AxiosRequestIntrceptorConfigCallback;
