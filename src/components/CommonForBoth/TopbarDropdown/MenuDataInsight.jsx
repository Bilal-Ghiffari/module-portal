import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuDI = ({ dataMenu, isActive }) => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn p-0 no-arrow d-inline-flex align-items-center" id="page-header-user-dropdown" tag="button">
          <i className={`${dataMenu.icon} fs-3 fs-md-4 pb-0` + (isActive ? ' text-primary' : ' text-secondary')} />
          <span className={'ms-2 me-1 text-nowrap d-none d-xxl-block ' + (isActive && 'text-primary')}>{dataMenu.title}</span>
          <i className="mdi mdi-chevron-down" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-center">
          {dataMenu.menu.map((o, idx) => (
            <React.Fragment key={idx}>
              <DropdownItem className={pathname.startsWith(o.href) ? 'text-primary' : ''} onClick={() => (o.newTab ? window.open(o.href, '_blank') : o.href ? navigate(o.href) : {})}>
                {o.label}
              </DropdownItem>
              {dataMenu?.menu.length - 1 != idx && <div className="" />}
            </React.Fragment>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};
export default MenuDI;
