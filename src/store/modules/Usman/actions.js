import * as types from "./actionTypes";

export const getDropdownRoles = (payload) => {
  return {
    type: types.GET_DROPDOWN_LIST_ROLE,
    payload: payload,
  };
};
export const getDropdownRolesSuccess = (payload) => {
  return {
    type: types.GET_DROPDOWN_LIST_ROLE_SUCCESS,
    payload: payload,
  };
};

export const getDropdownModules = (payload) => {
  return {
    type: types.GET_DROPDOWN_LIST_MODULES,
    payload: payload,
  };
};
export const getDropdownModulesSuccess = (payload) => {
  return {
    type: types.GET_DROPDOWN_LIST_MODULES_SUCCESS,
    payload: payload,
  };
};

export const getListPengguna = (payload) => {
  return {
    type: types.GET_LIST_PENGGUNA,
    payload: payload,
  };
};
export const getListPenggunaSuccess = (payload) => {
  return {
    type: types.GET_LIST_PENGGUNA_SUCCESS,
    payload: payload,
  };
};

export const getDetailPengguna = (payload) => {
  return {
    type: types.GET_DETAIL_PENGGUNA,
    payload: payload,
  };
};
export const getDetailPenggunaSuccess = (payload) => {
  return {
    type: types.GET_DETAIL_PENGGUNA_SUCCESS,
    payload: payload,
  };
};

export const getListDataLog = (payload) => {
  return {
    type: types.GET_DATA_LOG,
    payload: payload,
  };
};
export const getListDataLogSuccess = (payload) => {
  return {
    type: types.GET_DATA_LOG_SUCCESS,
    payload: payload,
  };
};

export const getActiveUser = (payload) => {
  return {
    type: types.GET_ACTIVE_USER,
    payload: payload,
  };
};
export const getActiveUserSuccess = (payload) => {
  return {
    type: types.GET_ACTIVE_USER_SUCCESS,
    payload: payload,
  };
};

export const apiUsmanError = (payload) => {
  return {
    type: types.API_ERROR_USMAN,
    payload: payload,
  };
};
