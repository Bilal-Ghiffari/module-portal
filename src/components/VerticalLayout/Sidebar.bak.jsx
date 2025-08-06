import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

import logoDarkCustom from "../../assets/logo/logo.png";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              {/* <img src={logo} alt="" height="22" /> */}
              <img src={logoDarkCustom} alt="" height="35" />
            </span>
            <span className="logo-lg">
                <img src={logoDarkCustom} alt="" height="50" />
              {/* <div className="d-flex align-items-center gap-2">
                <img src={logoDarkCustom} alt="" height="50" />
                <span className="lh-1 fs-6 text-black">KEMENTERIAN KELAUTAN DAN PERIKANAN REPUBLIK INDONESIA</span>
              </div> */}
              {/* <img src={logoDark} alt="" height="17" /> */}
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              {/* <img src={logoLightSvg} alt="" height="22" /> */}
              <img src={logoDarkCustom} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDarkCustom} alt="" height="19" />
              {/* <img src={logoDarkCustom} alt="" height="19" /> */}
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
