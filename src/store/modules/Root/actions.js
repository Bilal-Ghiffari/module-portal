import {
  ROOT_API_ERROR,
  ROOT_GET_MENU,
  ROOT_GET_MENU_SUCCESS,
} from './actionTypes';

// Home
export const getRootMenu = (params) => {
  const payload = params || {};
  return {
    type: ROOT_GET_MENU,
    payload: payload,
  };
};

export const getRootMenuSuccess = (response) => {
  return {
    type: ROOT_GET_MENU_SUCCESS,
    payload: response,
  };
};

export const errorRoot = (error) => {
  return {
    type: ROOT_API_ERROR,
    payload: error,
  };
};
