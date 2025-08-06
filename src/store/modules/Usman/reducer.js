import {
  API_ERROR_USMAN,
  GET_ACTIVE_USER_SUCCESS,
  GET_DATA_LOG_SUCCESS,
  GET_DETAIL_PENGGUNA_SUCCESS,
  GET_DROPDOWN_LIST_MODULES_SUCCESS,
  GET_DROPDOWN_LIST_ROLE_SUCCESS,
  GET_LIST_PENGGUNA_SUCCESS,
} from "./actionTypes";

const initialState = {
  error: "",

  list_dropdown_roles: [],
  list_dropdown_modules: [],
  list_Pengguna: [],
  list_data_log: [],
  detail_pengguna: [],
  active_user: [],
};

const Usman = (state = initialState, action) => {
  switch (action.type) {
    

    case GET_DROPDOWN_LIST_ROLE_SUCCESS:
      state = {
        ...state,
        list_dropdown_roles: action.payload,
      };
      break;

   

    case GET_ACTIVE_USER_SUCCESS:
      state = {
        ...state,
        active_user: action.payload,
      };
      break;

    case GET_DATA_LOG_SUCCESS:
      state = {
        ...state,
        list_data_log: action.payload,
      };
      break;

    case GET_DROPDOWN_LIST_MODULES_SUCCESS:
      state = {
        ...state,
        list_dropdown_modules: action.payload,
      };
      break;

    case GET_LIST_PENGGUNA_SUCCESS:
      state = {
        ...state,
        list_Pengguna: action.payload,
      };
      break;

    case GET_DETAIL_PENGGUNA_SUCCESS:
      state = {
        ...state,
        detail_pengguna: action.payload,
      };
      break;

    case API_ERROR_USMAN:
      if (action.payload?.status == 401) {
        return (window.location.href = "/logout");
      }
      state = { ...state, error: action.payload };
      break;

    default:
      state = state;
      break;
  }
  return state;
};

export default Usman;
