import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const PewarganegaraanMenuVertical = (props) => {
  const menu = props.roles?.menu || [];
  // console.log(props.roles.menu);

  // const userMenu = menu
  //   .filter((item) => item.level === 1)
  //   .map((parent) => ({
  //     ...parent,
  //     children: menu.filter(
  //       (child) =>
  //         child.level === 2 && child.menu_code.includes(parent.menu_code)
  //     ),
  //   }));
  const userMenu = [
    {
      menu_code: "01",
      title: "Dashboard User",
      level: 1,
      permission: 1,
      children: [],
      url: "/pewarganegaraan/dashboard",
    },
    {
      menu_code: "01",
      title: "Dashboard Admin",
      level: 1,
      permission: 1,
      children: [],
      url: "/pewarganegaraan/dashboard/admin",
    },
    {
      menu_code: "02",
      title: "Pendaftaran",
      level: 1,
      permission: 1,
      children: [],
      url: "/pewarganegaraan/pendaftaran",
    },
    {
      menu_code: "03",
      title: "Verifikasi",
      level: 1,
      permission: 1,
      url: "/pewarganegaraan/admin/verifikasi",
      children: [],
    },
    {
      menu_code: "04",
      title: "List Permohonan",
      level: 1,
      permission: 1,
      children: [
        {
          menu_code: "04.01",
          title: "List Permohonan",
          level: 1,
          permission: 1,
          url: "/pewarganegaraan/admin/list-permohonan",
        },
        {
          menu_code: "04.02",
          title: "Migrasi Data",
          level: 1,
          permission: 1,
          url: "/pewarganegaraan/admin/migrasi-data",
        },
      ],
    },
    {
      menu_code: "05",
      title: "Daftar SK Terbit",
      level: 1,
      permission: 1,
      url: "/pewarganegaraan/admin/daftar-sk-terbit",
      children: [],
    },
    {
      menu_code: "06",
      title: "Paraf",
      level: 1,
      permission: 1,
      url: "/pewarganegaraan/admin/daftar-paraf",
      children: [],
    },
    {
      menu_code: "07",
      title: "Manajemen Kanwil",
      level: 1,
      permission: 1,
      url: "/pewarganegaraan/admin/manajemen-kanwil",
      children: [],
    },
  ];

  const adminMenu = [
    {
      menu_code: "25",
      title: "Dashboard",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/dashboard",
    },
  ];

  // console.log(userMenu);
  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("Pewarganegaraan")} </li>
        {userMenu.map((item, idx) => (
          <li key={idx}>
            {item.children.length > 0 ? (
              <React.Fragment>
                <Link to="#" className="has-arrow">
                  <span>{props.t(item.title)}</span>
                </Link>
                <ul className="sub-menu">
                  {item.children.map((child, cidx) => (
                    <li key={cidx}>
                      <Link to={child.url}>{props.t(child.title)}</Link>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <Link to={item.url}>
                <span>{props.t(item.title)}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

PewarganegaraanMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(PewarganegaraanMenuVertical));
