import { getUserDetail } from './getStorage';
const def_status = import.meta.env.VITE_APP_PRODUCTION;

// tujuannya supaya di production juga tetep bisa cek sebagai development
export const checkStatusProductionServ = () => {
  // kalo bukan production di return
  const user = getUserDetail();
  if (user.username == 'opdtestingsumenep') return false;
  return def_status;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('userSession'))?.user_detail || {};
};

export const getFirstRole = () => {
  const user =
    JSON.parse(localStorage.getItem('userSession'))?.user_detail || {};
  const role = user.roles?.[0]?.role;
  return role || '';
};
