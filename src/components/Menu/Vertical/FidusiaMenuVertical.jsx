import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import withRouter from '../../Common/withRouter';

const FidusiaMenuVertical = (props) => {
  const menu = props.roles?.menu || [];

  return (
    <React.Fragment>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t('FIDUSIA')} </li>
        <li>
          <Link to="/fidusia">
            {/* <i className="mdi mdi-view-dashboard" /> */}
            <span>{props.t('Dashboard')}</span>
          </Link>
        </li>
        <li>
          <Link to="/fidusia/pendaftaran">
            {/* <i className="mdi mdi-file-plus" /> */}
            <span>{props.t('Pendaftaran')}</span>
          </Link>
        </li>
        <li>
          <Link to="/fidusia/perbaikan">
            {/* <i className="mdi mdi-pencil" />  */}
            <span>{props.t('Perbaikan')}</span>
          </Link>
        </li>
        <li>
          <Link to="/fidusia/perubahan">
            <span>{props.t('Perubahan')}</span>
          </Link>
        </li>
        <li>
          <Link to="/fidusia/penghapusan">
            {/* <i className="mdi mdi-wrench" /> */}
            <span>{props.t('Penghapusan')}</span>
          </Link>
        </li>
        <li>
          <Link to="/fidusia/daftar-fidusia">
            {/* <i className="mdi mdi-wrench" /> */}
            <span>{props.t('Daftar Fidusia')}</span>
          </Link>
        </li>
        <li>
          <Link to="/fidusia/daftar-transaksi">
            {/* <i className="mdi mdi-wrench" /> */}
            <span>{props.t('Daftar Transaksi')}</span>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

FidusiaMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(FidusiaMenuVertical));
