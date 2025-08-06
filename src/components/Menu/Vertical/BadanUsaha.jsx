import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";

const BadanUsahaMenuVertical = (props) => {
  const menu = props.roles?.menu || [];
  const menuStructure = [
    {
      title: "Dashboard",
      url: "/badan-usaha",
    },
    {
      title: "Persekutuan Komanditer (CV)",
      children: [
        // {
        //   title: "Daftar Transaksi",
        //   url: "/badan-usaha/persekutuan-komanditer/daftar-transaksi",
        // },
        {
          title: "Pengajuan Nama",
          url: "/badan-usaha/persekutuan-komanditer/pengajuan-nama",
        },
        {
          title: "Pendaftaran",
          url: "/badan-usaha/persekutuan-komanditer/pendaftaran",
        },
        // {
        //   title: "Perbaikan",
        //   url: "/badan-usaha/persekutuan-komanditer/perbaikan",
        // },
        // {
        //   title: "Pembubaran",
        //   url: "/badan-usaha/persekutuan-komanditer/pembubaran",
        // },
      ],
    },
  ];

  // console.log(menuStructure);
  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("badan-usaha")}</li>
        {menuStructure.map((item, idx) => (
          <li key={idx}>
            {item.children?.length > 0 ? (
              <React.Fragment>
                <Link to="#" className="d-flex align-items-start has-arrow">
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

BadanUsahaMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(BadanUsahaMenuVertical));
