import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const PerseroanTerbatasMenuVertical = (props) => {
  const menu = props.roles?.menu || [];

  const subMenu = {
    pengaturan_perseroan: [
      {
        link: "/perseroan/perorangan/pengaturan-perseroan/daftar-kbli",
        label: "Daftar KBLI",
      },
      {
        link: "/perseroan/perorangan/pengaturan-perseroan/daftar-blacklist-nama-pp",
        label: "Daftar Blacklist Nama PP",
      },
      {
        link: "/perseroan/perorangan/pengaturan-perseroan/daftar-blacklist-kata-pp",
        label: "Daftar Blacklist Kata PP",
      },
    ],
    transaksi_perseroan: [
      {
        link: "/perseroan/perorangan/transaksi-perseroan/daftar-transaksi-pp",
        label: "Daftar Transaksi PP",
      },
      {
        link: "/perseroan/perorangan/transaksi-perseroan/daftar-user-pp",
        label: "Daftar User PP",
      },
      {
        link: "/perseroan/perorangan/transaksi-perseroan/daftar-laporan-keuangan",
        label: "Daftar Laporan Keuangan",
      },
      {
        link: "/perseroan/perorangan/transaksi-perseroan/daftar-status-pp",
        label: "Daftar Status PP",
      },
    ],
  };

  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("PERSEROAN TERBATAS")} </li>
        <li>
          <Link to="/perseroan/terbatas">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard User")}</span>
          </Link>
        </li>
        <li>
          <Link to="/perseroan/terbatas/admin">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard Admin")}</span>
          </Link>
        </li>
        <li>
          <Link to="/perseroan/terbatas/pendaftaran">
            {/* <i className="mdi mdi-file-plus" /> */}
            <span>{props.t("Pendirian")}</span>
          </Link>
        </li>
        <li>
          <Link to="/perseroan/terbatas/perubahan-data">
            {/* <i className="mdi mdi-pencil" />  */}
            <span>{props.t("Perubahan Data")}</span>
          </Link>
        </li>
        <li>
          <Link to="/perseroan/terbatas/pembubaran">
            <span>{props.t("Pembubaran")}</span>
          </Link>
        </li>
        <li>
          <Link to="/perseroan/terbatas/perbaikan-data">
            {/* <i className="mdi mdi-wrench" /> */}
            <span>{props.t("Perbaikan Data")}</span>
          </Link>
        </li>
        {/* <li>
          <Link
            to="/produksi/sample/sampling/perikanan-budidaya"
            className="has-arrow"
          >
            <span>{props.t("Pengaturan Perseroan")}</span>
          </Link>
          <ul>
            {subMenu.pengaturan_perseroan.map((menu, idx) => (
              <li key={idx}>
                <Link
                  to={menu.link}
                  className={`${menu.link === "#" && "text-danger pe-none"}`}
                >
                  {props.t(menu.label)}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Link
            to="/produksi/sample/sampling/perikanan-budidaya"
            className="has-arrow"
          >
            <span>{props.t("Transaksi Perseroan")}</span>
          </Link>
          <ul>
            {subMenu.transaksi_perseroan.map((menu, idx) => (
              <li key={idx}>
                <Link
                  to={menu.link}
                  className={`${menu.link === "#" && "text-danger pe-none"}`}
                >
                  {props.t(menu.label)}
                </Link>
              </li>
            ))}
          </ul>
        </li> */}
      </ul>
    </React.Fragment>
  );
};

PerseroanTerbatasMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(PerseroanTerbatasMenuVertical));
