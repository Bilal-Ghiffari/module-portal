export const findPermission = ({ moduleCode, isModule, menuCode, action }) => {
  const resUser = JSON.parse(localStorage.getItem('userSession') || '{}');
  const roles = Array.isArray(resUser?.user_detail?.roles)
    ? resUser.user_detail.roles
    : [];

  const findModule = roles.find((o) => o.module_code == moduleCode);

  if (isModule) return !!findModule?.menu?.length; // true jika ada menu

  const findMenu = findModule?.menu?.find((o) => o.menu_code == menuCode);
  return findMenu?.[action] == 1;
};
