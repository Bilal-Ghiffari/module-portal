import {
  ROOT_API_ERROR,
  ROOT_GET_MENU_SUCCESS,
} from './actionTypes';

const initialState = {
  error: '',
  root_menu_list: [],
  
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOT_GET_MENU_SUCCESS:      
      state = {
        ...state,
        root_menu_list: action.payload,
      };
      break;
   
    case ROOT_API_ERROR:
      console.log(action.payload);
      
      if (action.payload?.status == 401) {
        return (window.location.href = '/logout');
      }
      state = { ...state, error: action.payload };
      break;
    default:
      state = state;
      break;
  }
  return state;
};

export default RootReducer;
