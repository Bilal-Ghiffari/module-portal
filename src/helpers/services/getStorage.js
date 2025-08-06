export const getUserDetail = () => {
  return JSON.parse(localStorage.getItem('userSession'))?.user_detail || '';
};
