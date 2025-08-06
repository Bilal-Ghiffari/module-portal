import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Row, Col, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
// Import menuDropdown
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

import { useDispatch } from 'react-redux';
import { changeLayout } from '../../store/actions';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

//i18n
import { withTranslation } from 'react-i18next';
import logoDarkCustom from '../../assets/logo/logo.png';

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from '../../store/actions';

import { modules_constant } from '../../constants/menu_modules';
import { layoutTypes } from '../../constants/layout';

const Header = (props) => {
  const [socialDrp, setsocialDrp] = useState(false);
  const dispatch = useDispatch();

  const temp = JSON.parse(localStorage.getItem('userSession'));
  const roles = temp?.user_detail?.roles;

  const tempModules =
    roles?.[0]?.module == null
      ? []
      : roles.map((item) => {
          //Sekarang Pengecekan spesifik untuk modul Kusuka
          let tlink = '';
          if (item.module_code == 11) {
            switch (item.role_code) {
              case '01.01':
                tlink = '/kusuka/dashboard-puorang';
                break;
              case '01.02':
                tlink = '/kusuka/dashboard-pubadan-usaha';
                break;
              case '02.01':
                tlink = '/kusuka/dashboard-pporang';
                break;
              case '02.02':
                tlink = '/kusuka/dashboard-ppkelompok';
                break;
              case '03':
              case '04':
              case '04.01':
              case '04.02':
              case '04.03':
              case '04.04':
              case '04.05':
                tlink = '/kusuka/dashboard-enumerator';
                break;

              case '05.01':
              case '05.02':
              case '05.03':
              case '05.04':
              case '05.05':
              case '06.01':
              case '06.02':
              case '06.03':
              case '06.04':
              case '06.05':
              case '32.03':
              case '32.01':
              case '32.02':
              case '32.04':
              case '09':
                tlink = '/kusuka/dashboard-opd';
                break;

              // Gatau Role nya gajelas wkkwk
              case '08.01':
              case '08.02':
              case '08.03':
              case '08.04':
                tlink = '/kusuka/dashboard-ude';
                break;

              case '10':
              case '11':
              case '36':
              case '40': //Admin
                tlink = '/kusuka/dashboard-super-admin';
                break;

              default:
                break;
            }
          }
          const found = modules_constant.find(
            (constItem) => constItem.id == item.module_code
          );
          if (found) {
            return {
              ...item,
              ...found,
              link: tlink || found?.link || '',
              module: found ? found?.module : null,
            };
          }
          return;
        }) || [];
  // const modules = [...tempModules].filter(Boolean);
  const modules = [
    {
      module: 'Modul 1',
      module_code: '23',
      role: 'Super Admin',
      role_code: '11',
      id: 23,
      text: 'Modul 1',
      link: '/user-management/tabel-user',
      iconClass: 'bx bx-briefcase-alt',
      color: '#FFA55D',
      keterangan:
        'Digunakan sebagai User Interface untuk pengaturan dan pengelolaan hak akses penggunaan. Dilengkapi dengan sistem Single Sign-On (SSO) dan kemampuan otentikasi melalui email.',
    },
    {
      module: 'Modul 2',
      module_code: '23',
      role: 'Super Admin',
      role_code: '11',
      id: 23,
      text: 'Modul 2',
      link: '/user-management/tabel-user',
      iconClass: 'bx bx-command',
      color: '#FF6363',
      keterangan:
        'Digunakan sebagai User Interface untuk pengaturan dan pengelolaan hak akses penggunaan. Dilengkapi dengan sistem Single Sign-On (SSO) dan kemampuan otentikasi melalui email.',
    },
    {
      module: 'Modul 3',
      module_code: '23',
      role: 'Super Admin',
      role_code: '11',
      id: 23,
      text: 'Modul 3',
      link: '/user-management/tabel-user',
      iconClass: 'bx bx-user',
      color: '#ff80be',
      keterangan:
        'Digunakan sebagai User Interface untuk pengaturan dan pengelolaan hak akses penggunaan. Dilengkapi dengan sistem Single Sign-On (SSO) dan kemampuan otentikasi melalui email.',
    },
  ];

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle('sidebar-enable');
    } else {
      body.classList.toggle('vertical-collpsed');
      body.classList.toggle('sidebar-enable');
    }
  }

  const selectLayoutState = (state) => state.Layout;
  const LayoutProperties = createSelector(selectLayoutState, (layout) => ({
    breadcrumb: layout.breadcrumb,
  }));

  const { breadcrumb } = useSelector(LayoutProperties);

  const handleClicked = (data) => {
    if (data.newTab) {
      return window.open(data.link, '_blank');
    }
    switch (data.module_code) {
      case '15': //pengawasan
      case '18': //Media Analytic
      case '21': //Big Data
      case '22': //perizinan
        dispatch(changeLayout(layoutTypes.HORIZONTAL));
        break;

      default:
        dispatch(changeLayout(layoutTypes.VERTICAL));
        localStorage.setItem('moduleNow', data.module_code);
        break;
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoDarkCustom} alt="" height="22" />
                  {/* <span className="mb-0 fw-bolder d-none d-lg-block font-size-11">DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM</span> */}
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoDarkCustom} alt="" height="22" />
                </span>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t('Search') + '...'}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </div>
          <div className="d-flex">
            <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <i className="bx bx-customize" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="px-lg-2">
                  {modules.length ? (
                    <Row>
                      {modules.map((item, idx) => (
                        <Col key={idx} xs={12} md={3} lg={4}>
                          <Link
                            className="dropdown-icon-item"
                            to={item.newTab ? '#' : item.link}
                            onClick={() => handleClicked(item)}
                          >
                            <i
                              className={`bx ${item.iconClass} bx-md`}
                              style={{ color: item.color }}
                            ></i>
                            <span>{item.module}</span>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Row className="no-gutters">
                      <h3 className="text-secondary text-opacity-50">
                        Anda Tidak Punya Akses ke Module Apapun
                      </h3>
                    </Row>
                  )}
                </div>
              </DropdownMenu>
            </Dropdown>

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon "
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            <NotificationDropdown />
            <ProfileMenu />

            {/* <div
                  onClick={() => {
                    props.showRightSidebarAction(!props.showRightSidebar);
                  }}
                  className="dropdown d-inline-block"
                >
                  <button
                    type="button"
                    className="btn header-item noti-icon right-bar-toggle "
                  >
                    <i className="bx bx-cog bx-spin" />
                  </button>
                </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
