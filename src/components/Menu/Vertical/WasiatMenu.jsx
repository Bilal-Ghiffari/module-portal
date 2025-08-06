import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Common/withRouter";
import { useMemo } from "react";
import { findPermission } from "@/helpers/services/checkAccess";
const listMenu = [
  {
    url: "/wasiat/dashboard",
    title: "Dashboard",
  },
  {
    url: "/wasiat/dalam-negeri",
    title: "Pelaporan Wasiat Dalam Negeri",
  },
  {
    url: "/wasiat/luar-negeri",
    title: "Pelaporan Wasiat Luar Negeri",
  },
  {
    url: "/wasiat/nihil",
    title: "Pelaporan Wasiat Nihil",
  },
  {
    url: "/wasiat/riwayat",
    title: "Riwayat Pelaporan",
  },
];

const listMenu2 = [
  {
    url: "/wasiat/individu/dashboard",
    title: "Dashboard",
  },
  {
    url: "/wasiat/individu/permohonan",
    title: "Permohonan Surat Keterangan Wasiat",
  },
];

const WasiatMenuVertical = (props) => {
  return (
    <ul className="metismenu list-unstyled" id="side-menu">
      <li className="menu-title">{props.t("Wasiat Notaris")} </li>
      {listMenu.map((item, index) => (
        <li key={`lm-${index}`}>
          <Link to={item.url}>
            <span>{props.t(item.title)}</span>
          </Link>
        </li>
      ))}
      <li className="menu-title">{props.t("Wasiat Individu")} </li>
      {listMenu2.map((item, index) => (
        <li key={`lm2-${index}`}>
          <Link to={item.url}>
            <span>{props.t(item.title)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

WasiatMenuVertical.propTypes = {
  t: PropTypes.any,
};

export default withRouter(withTranslation()(WasiatMenuVertical));
