// AxiosResponseIntrpectorErrorCallback.js
import { useDispatch } from 'react-redux';
import { logoutUserSuccess } from '@/store/auth/login/actions';
import Cookies from 'js-cookie';

const unauthorizedCode = [401, 419, 440];

const AxiosResponseIntraptorErrorCallback = (error) => {
  const { response } = error;
  const dispatch = useDispatch();

  if (response && unauthorizedCode.includes(response.status)) {
    // Check for token in local storage
    const resUser = localStorage.getItem('userSession');

    if (resUser) {
      const userData = JSON.parse(resUser);
      const token = userData.token;

      if (!token) {
        // console.log('Session is invalid. Logging out...');
        // Clear the stored user information
        localStorage.removeItem('userSession');
        Cookies.remove('userSession');
        dispatch(logoutUserSuccess({})); // Dispatch logout action to clear state
        // Optionally, you may want to redirect to login or show a notification
      }
    } else {
      // console.log('No user session found. Logging out...');
      // If no user is found, simply log out
      localStorage.removeItem('userSession');
      Cookies.remove('userSession');
      dispatch(logoutUserSuccess({})); // Dispatch logout action
    }
  }

  return Promise.reject(error); // Propagate error further down
};

export default AxiosResponseIntraptorErrorCallback;

// import { useSessionUser, useToken } from '@/store/auth/login';

// const unauthorizedCode = [401, 419, 440];

// const AxiosResponseIntrceptorErrorCallback = (error) => {
//   const { response } = error;
//   const { setToken } = useToken();

//   if (response && unauthorizedCode.includes(response.status)) {
//     setToken('');
//     useSessionUser.getState().setUser({});
//     useSessionUser.getState().setSessionSignedIn(false);
//   }
// };

// export default AxiosResponseIntrceptorErrorCallback;
