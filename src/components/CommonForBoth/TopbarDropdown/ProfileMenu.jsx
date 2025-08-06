import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';
//i18n
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withRouter from '../../Common/withRouter';

// users
import { changeLayout } from '@/store/actions';
import { layoutTypes } from '@/constants/layout';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';

import userImg from '../../../assets/icons/Layanan/user.png';

const StyledDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  color: #343a40;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  i {
    font-size: 20px;
    margin-right: 10px;
    color: #2a3042;
  }
`;

const StyledDivider = styled.div`
  height: 1px;
  background-color: #dee2e6;
  margin: 10px 0;
`;

const DropdownMenuStyled = styled(DropdownMenu)`
  background-color: white;
  border: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  width: 250px; // Increased width for better spacing
`;

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setusername] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userSession')) {
      if (import.meta.env.VITE_APP_DEFAULTAUTH === 'firebase') {
        const obj = JSON.parse(localStorage.getItem('userSession'));
        setusername(obj.email);
      } else if (
        import.meta.env.VITE_APP_DEFAULTAUTH === 'fake' ||
        import.meta.env.VITE_APP_DEFAULTAUTH === 'jwt'
      ) {
        const obj = JSON.parse(localStorage.getItem('userSession'));
        setusername(obj.user_detail);
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item no-arrow"
          id="page-header-user-dropdown"
          tag="button"
        >
          <div className="d-flex align-items-center">
            <Box
              sx={{
                width: 39,
                height: 39,
                bgcolor: '#D1D1D1',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={userImg} alt="user-image" />
            </Box>
            <div className="ps-1 ps-md-2">
              <p
                className="text-capitalize m-0 p-0 fw-semibold text-start"
                style={{ lineHeight: '1.2' }}
              >
                {username?.fullname} <br />
                <span className="fw-normal font-size-11">
                  {username?.roles?.[0]?.role || ' - '}
                </span>
              </p>
            </div>
          </div>
        </DropdownToggle>
        <DropdownMenuStyled className="dropdown-menu-end">
          {username?.id ? (
            <React.Fragment>
              {/* <StyledUserDropdownItem>
                {username?.avatar ? (
                  <Avatar src={username?.avatar} alt="User Avatar" />
                ) : (
                  <i className="bx bx-user-circle" />
                )}
                <div>
                  <p className="text-capitalize m-0 p-0" style={{ lineHeight: '1' }}>
                    {username?.fullname}
                  </p>
                  {username?.eselon_1_text && (
                    <p
                      className="m-0 p-0"
                      style={{ fontSize: '12px', color: '#6c757d', lineHeight: '1' }}>
                      {username?.eselon_1_text}
                    </p>
                  )}
                </div>
              </StyledUserDropdownItem> */}

              <StyledDropdownItem
                onClick={() => navigate(`/auth-profile/${username.id}`)}
              >
                <i className="bx bx-user" />
                {props.t('Profile')}
              </StyledDropdownItem>

              <StyledDivider />

              <StyledDropdownItem
                onClick={() => {
                  // dispatch(changeLayout(layoutTypes.VERTICAL));
                  // navigate('/')
                }}
              >
                <i className="bx bx-wallet" />
                {props.t('My Wallet')}
              </StyledDropdownItem>
              <StyledDivider />
              <StyledDropdownItem
                onClick={() => {
                  dispatch(changeLayout(layoutTypes.VERTICAL));
                  navigate('/');
                }}
              >
                <i className="bx bxs-dashboard" />
                {props.t('Menu Utama')}
              </StyledDropdownItem>

              <StyledDivider />

              {/* <StyledDropdownItem onClick={() => navigate('/auth/ubah-pwd')}>
                <i className="bx bx-key" />
                {props.t('Ubah Kata Sandi')}
              </StyledDropdownItem>

              <StyledDivider /> */}

              <StyledDropdownItem
                onClick={() => navigate('/logout')}
                className="text-danger"
              >
                <i className="bx bx-power-off text-danger" />
                <span className="text-danger">{props.t('Logout')}</span>
              </StyledDropdownItem>
            </React.Fragment>
          ) : (
            <StyledDropdownItem onClick={() => navigate('/login')}>
              <i className="bx bx-lock-open-alt" />
              {props.t('Login')}
            </StyledDropdownItem>
          )}
        </DropdownMenuStyled>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

export default withRouter(connect()(withTranslation()(ProfileMenu)));
