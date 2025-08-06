import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import logoDarkCustom from "../../assets/logo/LOGO AHU 1.png";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <div
            className="w-100 d-flex justify-content-center align-items-center cursor-pointer"
            onClick={() => (window.location.href = "/")}
            style={{ height: "70px" }}
          >
            <img src={logoDarkCustom} alt="" height="44" width={110} />
            {/* <span className="mb-0 fw-bolder font-size-11 hide-title-logo text-white">
              DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM
            </span> */}
          </div>
          {/* <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoDarkCustom} alt="" height="22" />
              <span className="mb-0 fw-bolder d-none d-lg-block font-size-11">DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM</span>
            </span>
            <span className="logo-lg">
              <img src={logoDarkCustom} alt="" height="17" />
              <span className="mb-0 fw-bolder d-none d-lg-block font-size-11">DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM</span>
            </span>
          </Link> */}

          {/* <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoDarkCustom} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDarkCustom} alt="" height="19" />
            </span>
          </Link> */}
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
