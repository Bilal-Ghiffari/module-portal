import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import withRouter from '../../Common/withRouter';
import { useMemo } from 'react';
import { findPermission } from '@/helpers/services/checkAccess';
const listMenu = [
  {
    url: '/user-management/dashboard',
    menu_code: '01',
    title: 'Dashboard',
    r_modules_code: '42'
  },
  {
    url: '/user-management/tabel-user',
    menu_code: '02',
    title: 'Data Pengguna',
    r_modules_code: '42'
  },
  {
    url: '/user-management/tabel-log',
    menu_code: '03',
    title: 'Data Log',
    r_modules_code: '42'
  },
  {
    url: '/user-management/roles/list',
    menu_code: '04',
    title: 'Role Management',
    r_modules_code: '42'
  },
  {
    url: '/user-management/pengumuman',
    menu_code: '05',
    title: 'Pengumuman Management',
    r_modules_code: '42'
  }
];

const UserManagementMenuVertical = (props) => {
  const listMenuPermission = useMemo(
    () =>
      listMenu.filter((item) =>
        findPermission({
          moduleCode: item.r_modules_code,
          menuCode: item.menu_code,
          action: 'permission'
        })
      ),
    []
  );

  return (
    <ul className="metismenu list-unstyled" id="side-menu">
      <li className="menu-title">{props.t('USER MANAGEMENT')} </li>
      {listMenuPermission.map((item) => (
        <li>
          <Link to={item.url}>
            <span>{props.t(item.title)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

UserManagementMenuVertical.propTypes = {
  t: PropTypes.any
};

export default withRouter(withTranslation()(UserManagementMenuVertical));
