import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const ApostileMenuVertical = (props) => {
  const subMenu = {
    daftar_permohonan: [
      {
        link: "/apostille/permohonan-apostille",
        label: "Permohonan Apostille",
      },
      {
        link: "/apostille/permohonan-legalisasi",
        label: "Permohonan Legalisasi",
      },
    ],
  };
  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("APOSTILLE")} </li>
        <li>
          <Link to="/apostille">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard User")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/admin">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard Admin")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/pendaftaran">
            <span>{props.t("Pendaftaran")}</span>
          </Link>
        </li>
        {/* <li>
          <Link to="#" className="has-arrow">
            <span>{props.t("Daftar Permohonan")}</span>
          </Link>
          <ul>
            {subMenu.daftar_permohonan.map((menu, idx) => (
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
        <li>
          <Link to="/apostille/permohonan">
            <span>{props.t("Daftar Permohonan")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/verifikasi">
            <span>{props.t("Daftar Verifikasi")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/sertifikat">
            <span>{props.t("Daftar Sertifikat")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/cetak-sticker">
            <span>{props.t("Daftar Cetak Sticker")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/cetak-sertifikat">
            <span>{props.t("Daftar Cetak Sertifikat")}</span>
          </Link>
        </li>
        <li>
          <Link to="/apostille/petugas-permohonan">
            <span>{props.t("Penugasan Permohonan")}</span>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

ApostileMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(ApostileMenuVertical));
