import { getMarina, postFormData } from './api_helper';
import * as url from './url_helper';
import { buildQueryString } from './backend_helper';

// PENGUMUMAN
export const apiGetListTeks = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_LIST_TEKS}?${queryString}`);
};

export const apiDeleteTeks = (body) => {
  return postFormData(url.DELETE_TEKS, body);
};

export const apiUpdateTeks = (body) => {
  return postFormData(url.UPDATE_TEKS, body);
};

export const apiGetRunningTeks = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_RUNNING_TEKS}?${queryString}`);
};

// USMAN
export const apiGetDropdownRole = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_DROPDOWN_LIST_ROLE}?${queryString}`);
};

export const apiGetDropdownModules = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_DROPDOWN_LIST_MODULES}?${queryString}`);
};
export const apiGetDropdownMenuList = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_DROPDOWN_MENU_LIST}?${queryString}`);
};

export const apiGetListPengguna = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_LIST_PENGGUNA}?${queryString}`);
};

export const apiGetDetailPengguna = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_DETAIL_PENGGUNA}?${queryString}`);
};
export const apiPostUpdatePengguna = (body) => {
  return postFormData(url.POST_UPDATE_USMAN, body);
};

export const apiGetListDataLog = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_DATA_LOG}?${queryString}`);
};

export const apiGetActiveUser = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_ACTIVE_USER}?${queryString}`);
};

export const apiGetRoleDetail = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_ROLE_DETAIL}?${queryString}`);
};

export const apiGetIncrement = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_INCREMENT}?${queryString}`);
};

export const apiPostUsmanEditPermission = (body) => {
  return postFormData(url.POST_EDIT_PERMISSION, body);
};
export const apiPostUsmanEditRole = (body) => {
  return postFormData(url.POST_EDIT_ROLE, body);
};
export const apiPostUsmanNewRole = (body) => {
  return postFormData(url.POST_NEW_ROLE, body);
};
export const apiPostUsmanDeleteRole = (body) => {
  return postFormData(url.POST_DELETE_ROLE, body);
};
export const apiPostUsmanDeletePermission = (body) => {
  return postFormData(url.POST_DELETE_PERMISSION, body);
};
export const apiPostUsmanNewPermission = (body) => {
  return postFormData(url.POST_NEW_PERMISSION, body);
};
export const apiPostReqResetPwd = (body) => {
  return postFormData(url.POST_REQ_RESET_PWD, body);
};
export const apiPostResetPwdToken = (body) => {
  return postFormData(url.POST_SET_RESET_PWD_TOKEN, body);
};

export const apiGetUsmanDetailNIP = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarina(`${url.GET_USMAN_DETAIL_NIP}?${queryString}`);
};
