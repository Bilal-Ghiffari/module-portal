import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const ParpolMenuVertical = (props) => {
  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("PARTAI POLITIK")} </li>
        <li>
          <Link to="/parpol">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard User")}</span>
          </Link>
        </li>
        <li>
          <Link to="/parpol/admin">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t("Dashboard Admin")}</span>
          </Link>
        </li>
        <li>
          <Link to="/parpol/pendaftaran">
            <span>{props.t("Pendaftaran")}</span>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

ParpolMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(ParpolMenuVertical));
