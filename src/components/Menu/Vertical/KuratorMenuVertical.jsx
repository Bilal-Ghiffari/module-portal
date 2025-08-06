import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const KuratorMenuVertical = (props) => {
  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("KURATOR NEGARA")} </li>
        <li>
          <Link to="/kurator">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard User")}</span>
          </Link>
        </li>
        <li>
          <Link to="/kurator/admin">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard Admin")}</span>
          </Link>
        </li>
        <li>
          <Link to="/kurator/pendaftaran">
            <span>{props.t("Pendaftaran")}</span>
          </Link>
        </li>
        <li>
          <Link to="/kurator/perpanjangan">
            <span>{props.t("Perpanjangan")}</span>
          </Link>
        </li>
        <li>
          <Link to="/kurator/transaksi">
            <span>{props.t("Daftar Transaksi")}</span>
          </Link>
        </li>
        <li>
          <Link to="/kurator/laporan-kurator">
            <span>{props.t("Daftar Laporan Kurator")}</span>
          </Link>
        </li>
        <li>
          <Link to="/kurator/laporan-pengurus">
            <span>{props.t("Daftar Laporan Pengurus")}</span>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

KuratorMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(KuratorMenuVertical));
