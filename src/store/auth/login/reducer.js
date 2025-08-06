import { ToastifyService } from '@/components/Toastify/toastifyService';
import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR, ALREADY_LOGIN } from './actionTypes';

const toastifyService = new ToastifyService();

const initialState = {
  error: '',
  loading: false,
  login_success: null
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        login_success: true
      };
      break;
    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      toastifyService.close();
      state = { ...state };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false, login_success: false };
      break;
    case ALREADY_LOGIN:
      state = { ...state, login_success: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
