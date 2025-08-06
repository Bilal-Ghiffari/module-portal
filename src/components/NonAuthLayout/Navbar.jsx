import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";
import classname from "classnames";
import { toggleLeftmenu } from "../../store/actions";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import logoDarkCustom from "../../assets/logo/logo.png";

const Navbar = (props) => {
  const [dashboard, setdashboard] = useState(false);
  const [masuk, setMasuk] = useState(false);
  const [standarData, setui] = useState(false);
  const [metaData, setapp] = useState(false);
  const [publikasi, setcomponent] = useState(false);
  const [gis, setGis] = useState(false);
  const [tntSatuData, setextra] = useState(false);
  const [layanan, setLayanan] = useState(false);

  useEffect(() => {
    if (props.showNavbar) {
      var matchingMenuItem = null;
      var ul = document.getElementById("navigation");
      var items = ul.getElementsByTagName("a");
      removeActivation(items);
      for (var i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    }
  });

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav mt-0 bg-primary">
        <div className="container-fluid d-block d-lg-flex justify-content-between px-3 mw-100 ">
          <div className="d-flex justify-content-between">
            <a
              className="navbar-brand d-flex align-items-center column-gap-2"
              href="/"
            >
              <img
                src={logoDarkCustom}
                alt=""
                width="60"
                // height="24"
                className="d-inline-block align-text-top"
              />
              <p className="mb-0 fw-bolder text-white">
                KEMENTERIAN KELAUTAN DAN PERIKANAN <br />
                REPUBLIK INDONESIA
              </p>
            </a>
            {props.showNavbar && (
              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
                data-toggle="collapse"
                onClick={() => {
                  props.toggleLeftmenu(!props.leftMenu);
                }}
                data-target="#topnav-menu-content"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
            )}
          </div>

          {props.showNavbar && (
            <nav
              className="navbar navbar-light navbar-expand-lg topnav-menu pe-lg-5"
              id="navigation"
            >
              <Collapse
                isOpen={props.leftMenu}
                className="navbar-collapse"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link px-2  arrow-none text-white"
                      onClick={(e) => {
                        // e.preventDefault();
                        setdashboard(!dashboard);
                      }}
                      to="/"
                    >
                      {/* <i className="bx bx-home-circle me-2"></i> */}
                      {props.t("Beranda")} {props.menuOpen}
                      {/* <div className="arrow-down"></div> */}
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/portal/standar-data"
                      onClick={(e) => {
                        e.preventDefault();
                        setui(!standarData);
                      }}
                      className="nav-link dropdown-toggle arrow-none text-white"
                    >
                      {props.t("Standar Data")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: standarData,
                      })}
                    >
                      <Link
                        to="/portal/standar-data/definisi-klasifikasi"
                        className="dropdown-item"
                      >
                        {props.t("Definisi Dan Klasifikasi")}
                      </Link>
                      <Link
                        to="/portal/standar-data/kuisioner-satu-data"
                        className="dropdown-item"
                      >
                        {props.t("Kuisioner Satu Data")}
                      </Link>
                      <Link
                        to="/portal/standar-data/pedoman-prosedur"
                        className="dropdown-item"
                      >
                        {props.t("Pedoman dan Prosedur")}
                      </Link>
                      <Link
                        to="/portal/standar-data/data-induk"
                        className="dropdown-item"
                      >
                        {props.t("Data Induk")}
                      </Link>
                      <Link
                        to="/portal/standar-data/definisi-data"
                        className="dropdown-item"
                      >
                        {props.t("Standar Definisi Data")}
                      </Link>
                      <Link
                        to="/portal/standar-data/operasional-prosedur"
                        className="dropdown-item"
                      >
                        {props.t("Standar Operasional Prosedur dan Pedoman")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/portal/meta-data"
                      onClick={(e) => {
                        e.preventDefault();
                        setapp(!metaData);
                      }}
                      className="nav-link z arrow-none text-white"
                    >
                      {props.t("Metadata")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", { show: metaData })}
                    >
                      <Link
                        to="/portal/meta-data/statistik"
                        className="dropdown-item"
                      >
                        {props.t("Metadata Statistik")}
                      </Link>
                      <Link
                        to="/portal/meta-data/spasial"
                        className="dropdown-item"
                      >
                        {props.t("Metadata Spasial")}
                      </Link>
                      <Link
                        to="/portal/meta-data/file-manager"
                        className="dropdown-item"
                      >
                        {props.t("File Manager")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/portal/publikasi"
                      className="nav-link  arrow-none text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setcomponent(!publikasi);
                      }}
                    >
                      {props.t("Publikasi")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: publikasi,
                      })}
                    >
                      <Link
                        to="/portal/publikasi/rilis"
                        className="dropdown-item"
                      >
                        {props.t("Rilis")}
                      </Link>
                      <Link
                        to="/portal/publikasi/kpda"
                        className="dropdown-item"
                      >
                        {props.t("KPDA")}
                      </Link>
                      
                      <Link
                        to="/portal/publikasi/statistik"
                        className="dropdown-item"
                      >
                        {props.t("Data dan Statistik")}
                      </Link>
                      
                      <Link
                        to="/portal/publikasi/sebaran"
                        className="dropdown-item"
                      >
                        {props.t("Peta Sebaran")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/portal/gis"
                      className="nav-link  arrow-none text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setGis(!gis);
                      }}
                    >
                      {props.t("GIS")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: gis,
                      })}
                    >
                      <Link
                        to="/portal/gis/perikanan-tangkap"
                        className="dropdown-item"
                      >
                        {props.t("Perikanan Tangkap")}
                      </Link>
                      <Link
                        to="/portal/gis/perikanan-budidaya"
                        className="dropdown-item"
                      >
                        {props.t("Perikanan Budi Daya")}
                      </Link>
                      <Link to="/portal/gis/prl" className="dropdown-item">
                        {props.t("Pengelolaan Kelautan dan Ruang Laut")}
                      </Link>
                      <Link
                        to="/portal/gis/penguatan-saing"
                        className="dropdown-item"
                      >
                        {props.t("Penguatan Daya Saing Produk KP")}
                      </Link>
                      <Link
                        to="/portal/gis/pengawasan-sumber-daya"
                        className="dropdown-item"
                      >
                        {props.t("Pengawasan Sumber Daya KP")}
                      </Link>
                      <Link
                        to="/portal/gis/penyuluhan-pengembangan"
                        className="dropdown-item"
                      >
                        {props.t("Penyuluhan dan Pengembangan SDM KP")}
                      </Link>
                      <Link to="/portal/gis/kusuka" className="dropdown-item">
                        {props.t("KUSUKA")}
                      </Link>
                      <Link
                        to="/portal/gis/bantuan-pemerintah"
                        className="dropdown-item"
                      >
                        {props.t("Bantuan Pemerintah")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link  arrow-none text-white"
                      to="/portal/tentang-satu-data"
                      onClick={(e) => {
                        e.preventDefault();
                        setextra(!tntSatuData);
                      }}
                    >
                      {props.t("Tentang Satu Data")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: tntSatuData,
                      })}
                    >
                      <Link
                        to="/portal/tentang-satu-data/sejarah"
                        className="dropdown-item"
                      >
                        {props.t("Sejarah")}
                      </Link>
                      <Link
                        to="/portal/tentang-satu-data/regulasi"
                        className="dropdown-item"
                      >
                        {props.t("Regulasi")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link  arrow-none text-white"
                      to="/portal/layanan"
                      onClick={(e) => {
                        e.preventDefault();
                        setLayanan(!layanan);
                      }}
                    >
                      {props.t("Layanan")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", { show: layanan })}
                    >
                      <Link
                        to="/portal/layanan/web-api"
                        className="dropdown-item"
                      >
                        {props.t("Web API")}
                      </Link>
                      <Link to="/portal/layanan/chat" className="dropdown-item">
                        {props.t("Chat")}
                      </Link>
                      <Link
                        to="/portal/layanan/helpdesk"
                        className="dropdown-item"
                      >
                        {props.t("Help Desk Satu Data")}
                      </Link>
                      <Link to="/portal/layanan/faq" className="dropdown-item">
                        {props.t("FAQ")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item d-flex justify-content-center align-items-center mx-1">
                    <Link
                      className="nav-link px-4 py-2 arrow-none text-primary rounded-3 bg-white"
                      onClick={(e) => {
                        // e.preventDefault();
                        setMasuk(!masuk);
                      }}
                      to="/login"
                    >
                      {/* <i className="bx bx-home-circle me-2"></i> */}
                      {props.t("Masuk")} {props.menuOpen}
                      {/* <div className="arrow-down"></div> */}
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </nav>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  showNavbar: PropTypes.bool,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {
    toggleLeftmenu,
  })(withTranslation()(Navbar))
);
