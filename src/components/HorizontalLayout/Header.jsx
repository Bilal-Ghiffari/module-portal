import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from '../../store/actions';
// reactstrap
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  NavItem,
} from 'reactstrap';

import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

import { useDispatch } from 'react-redux';
import { changeLayout } from '../../store/actions';

import logoDarkCustom from '../../assets/logo/AHULINK-Logo.png';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

//i18n
import { withTranslation } from 'react-i18next';

import { modules_constant } from '../../constants/menu_modules';
import { layoutTypes } from '../../constants/layout';
import classnames from 'classnames';
import MenuDI from '../CommonForBoth/TopbarDropdown/MenuDataInsight';
import { listMenuDI, listMenuPortals } from './constants';
import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';

const Header = (props) => {
  const [socialDrp, setsocialDrp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temp = JSON.parse(localStorage.getItem('userSession'));
  const roles = temp?.user_detail?.roles;

  const tempModules =
    roles?.[0]?.module == null
      ? []
      : roles.map((item) => {
          const found = modules_constant.find(
            (constItem) => constItem.id == item.module_code
          );
          if (found) {
            return {
              ...item,
              ...found,
              link: found?.link || '',
              module: found ? found?.module : null,
            };
          }
          return;
        }) || [];

  const modules = [...tempModules].filter(Boolean);

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
        // dispatch(changeLayout(layoutTypes.HORIZONTAL));
        break;

      default:
        dispatch(changeLayout(layoutTypes.VERTICAL));
        localStorage.setItem('moduleNow', data.module_code);
        break;
    }
  };

  const listMenuUsed = useMemo(() => {
    if (props.pathName.startsWith('/datainsight')) {
      return listMenuDI;
    } else if (props.pathName.startsWith('/portals')) {
      return listMenuPortals;
    } else {
      return null;
    }
  }, []);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header py-2">
          <div className="d-flex ps-4">
            <a
              className="navbar-brand d-flex align-items-center column-gap-2"
              href="/"
            >
              <img
                src={logoDarkCustom}
                alt=""
                height={45}
                className="d-inline-block align-text-top"
              />
              {/* <p className="mb-0 fw-bolder d-none d-lg-block">
                DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM 
                
              </p> */}
            </a>
          </div>
          {listMenuUsed ? (
            <Nav tabs className="nav-tabs-custom nav-justified">
              {listMenuUsed.map((o, idx) => {
                const isActive = o.menu.some((p) =>
                  props.pathName.startsWith(p.href)
                );
                return (
                  <NavItem key={idx} className="align-content-end pb-2">
                    <NavLink
                      className={
                        classnames({ active: isActive }) + 'cursor-pointer px-1'
                      }
                    >
                      <MenuDI dataMenu={o} isActive={isActive} />
                    </NavLink>
                  </NavItem>
                );
              })}
              <NavItem className="align-content-end pb-2">
                <div
                  className="rounded-circle header-profile-user cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  <FaHome size={25} className="text-secondary" />
                </div>
              </NavItem>
              <ProfileMenu />
            </Nav>
          ) : (
            <div className="d-flex">
              {/* <Dropdown
                className="d-none d-lg-inline-block ms-1"
                isOpen={socialDrp}
                toggle={() => {
                  setsocialDrp(!socialDrp);
                }}
              >
                <DropdownToggle className="btn header-item noti-icon " caret tag="button">
                  <i className="bx bx-customize" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                  <div className="px-lg-2">
                    {modules.length ? (
                      <Row>
                        {modules.map((item, idx) => (
                          <Col key={idx} xs={12} md={4}>
                            <Link className="dropdown-icon-item" to={item.newTab ? '#' : item.link} onClick={() => handleClicked(item)}>
                              <i className={`bx ${item.iconClass} bx-md`} style={{ color: item.color }}></i>
                              <span>{item.module}</span>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Row className="no-gutters">
                        <h3 className="text-secondary text-opacity-50">Anda Tidak Punya Akses ke Module Apapun</h3>
                      </Row>
                    )}
                  </div>
                </DropdownMenu>
              </Dropdown> */}

              {/* <div className="dropdown d-none d-lg-inline-block ms-1">
                <button
                  type="button"
                  className="btn header-item noti-icon "
                  onClick={() => {
                    toggleFullscreen();
                  }}
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen" />
                </button>
              </div> */}
              <NotificationDropdown />
              <ProfileMenu />
              {/* <div className="dropdown d-inline-block">
              <button
                onClick={() => {
                  props.showRightSidebarAction(!props.showRightSidebar);
                }}
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div> */}
            </div>
          )}
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  pathName: PropTypes.string,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header));
