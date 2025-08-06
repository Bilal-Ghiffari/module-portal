import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const KewarganegaraanMenuVertical = (props) => {
  const menu = props.roles?.menu || [];
  // console.log(props.roles.menu);

  // const menuStructure = menu
  //   .filter((item) => item.level === 1)
  //   .map((parent) => ({
  //     ...parent,
  //     children: menu.filter(
  //       (child) =>
  //         child.level === 2 && child.menu_code.includes(parent.menu_code)
  //     ),
  //   }));
  const menuStructure = [
    {
      menu_code: "25",
      title: "Dashboard User",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/dashboard",
    },
    {
      menu_code: "25",
      title: "Dashboard Admin",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/dashboard/admin",
    },
    {
      menu_code: "37",
      title: "Pernyataan WNI",
      level: 1,
      permission: 1,
      url: "/kewarganegaraan/pernyataan-wni",
      children: [
        {
          menu_code: "37.01",
          title: "Tetap WNI",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/pernyataan-wni/tetap-wni",
        },
        {
          menu_code: "37.02",
          title: "Pemulihan WNI",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/pernyataan-wni/pemulihan-wni",
        },
        {
          menu_code: "37.03",
          title: "Anak dengan WN Ganda",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/pernyataan-wni/anak-kewarganegaraan-ganda",
        },
        {
          menu_code: "37.04",
          title: "Naturalisasi Anak Angkat",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/pernyataan-wni/naturalisasi-anak-angkat",
        },
      ],
    },
    {
      menu_code: "38",
      title: "Kehilangan WNI",
      level: 1,
      permission: 1,
      url: "/kewarganegaraan/kehilangan-wni",
      children: [
        {
          menu_code: "38.01",
          title: "Kemauan Sendiri",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/kehilangan-wni/kemauan-sendiri",
        },
        {
          menu_code: "38.02",
          title: "Memiliki WNA",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/kehilangan-wni/memiliki-kewarganegaraan-asing",
        },
        {
          menu_code: "38.03",
          title: "Belum Memiliki WNA",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/kehilangan-wni/belum-memiliki-kewarganegaraan-asing",
        },
        {
          menu_code: "38.04",
          title: "Mengikuti Istri/Suami",
          level: 2,
          permission: 1,
          url: "/kewarganegaraan/kehilangan-wni/mengikuti-pasangan",
        },
      ],
    },
    {
      menu_code: "32.02",
      title: "Daftar Verifikasi",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/daftar-verifikasi",
    },
    {
      menu_code: "07",
      title: "Daftar Permohonan",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/daftar-permohonan",
    },
    {
      menu_code: "19",
      title: "Daftar No SK",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/daftar-sk-terbit",
    },
    {
      menu_code: "20.01",
      title: "Paraf",
      level: 1,
      permission: 1,
      children: [],
      url: "/kewarganegaraan/daftar-paraf",
    },
    {
      menu_code: "20.01",
      title: "Permohonan Manual",
      level: 1,
      permission: 1,
      url: "/kewarganegaraan/permohonan-manual",
      children: [
        {
          menu_code: "20.02",
          title: "Pengajuan",
          level: 1,
          permission: 1,
          children: [],
          url: "/kewarganegaraan/permohonan-manual/pengajuan",
        },
        {
          menu_code: "20.02",
          title: "Migrasi Data",
          level: 1,
          permission: 1,
          children: [],
          url: "/kewarganegaraan/permohonan-manual/migrasi-data",
        },
      ],
    },
  ];

  // console.log(menuStructure);
  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("Kewarganegaraan")} </li>
        {menuStructure.map((item, idx) => (
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

KewarganegaraanMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(KewarganegaraanMenuVertical));
