import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import withRouter from '../../components/Common/withRouter';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  InputGroup,
  Button,
} from 'reactstrap';

// actions
import { alreadyLogin, getRootMenu, loginUser } from '../../store/actions';

import ahulinkLogo from '../../assets/logo/AHULINK-Logo.png';
import topShape from '../../assets/icons/top-shape.png';
import bottomShape from '../../assets/icons/bottom-shape.png';

import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import { errorMsg } from '@/helpers/Notification/toastNotification';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { Label } from 'reactstrap';

const urlRegisterLandingPage = import.meta.env
  .VITE_APP_BASEURL_REGISTER_LANDING_PAGE;
const urlSsoServer = import.meta.env.VITE_APP_BASEURL_SSO_SERVER;
const baseUrlFE = import.meta.env.VITE_APP_BASEURL_FE;

const toastifyService = new ToastifyService();
const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirectUrl = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);

  //meta title
  document.title = 'Login | AHU RI';

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: '',
      password: '',
      verification: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username/NIK Wajib diisi'),
      password: Yup.string().required('Password Wajib diisi'),
      verification: Yup.string().required('Kode Verifikasi Tidak Sesuai'),
    }),
    onSubmit: (values) => {
      if (doSubmit()) {
        toastifyService.customShowLoading({
          title: 'Harap Tunggu',
          msg: 'Proses Login...',
        });
        dispatch(loginUser(values, props.router.navigate));

        // navigate(redirectUrl, { replace: true });
      } else {
        validation.setFieldError(
          'verification',
          'Kode Verifikasi Tidak Sesuai'
        );
      }
    },
  });

  const doSubmit = () => {
    let user_captcha = document.getElementById('verification').value;

    if (validateCaptcha(user_captcha) === true) {
      // alert("Captcha Matched");
      return true;
    } else {
      validation.setFieldValue('verification', '');
      loadCaptchaEnginge(6, '#D3D3D3', '#000000', 'numbers');
      // alert("Captcha Does Not Match");
      // document.getElementById('verification').value = '';
      return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userSession')) {
      navigate(redirectUrl, { replace: true });
    }
    loadCaptchaEnginge(6, '#D3D3D3', '#000000', 'numbers');
  }, [navigate, redirectUrl]);

  const selectLoginState = (state) => state.Login;
  const LoginProperties = createSelector(selectLoginState, (login) => ({
    error: login.error,
    login_success: login.login_success,
  }));

  const { error, login_success } = useSelector(LoginProperties);
  const errMessage = error?.data?.message || '';

  useEffect(() => {
    if (login_success == true) {
      // dispatch(changeLayout(layoutTypes.VERTICAL));
      toastifyService.close();
      dispatch(alreadyLogin());
      dispatch(getRootMenu());

      navigate(redirectUrl, { replace: true });
    }
  }, [login_success]);

  useEffect(() => {
    if (errMessage) {
      toastifyService.close();
    }
  }, [errMessage]);

  const loginSSO = async () => {
    try {
      const urlCallback = encodeURIComponent(`${baseUrlFE}oauth/callback`);

      const urlSSO = `${urlSsoServer}/protocol/openid-connect/auth?client_id=portal&response_type=code&scope=openid%20profile%20email&redirect_uri=${urlCallback}`;
      window.location.href = urlSSO;
    } catch (error) {
      errorMsg(error);
    }
  };

  return (
    <React.Fragment>
      <div
        className="account-pages bg-white"
        style={{ height: '100%', minHeight: '100vh' }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center pt-2 pt-md-5">
          <Container className="h-100">
            <Row className="d-flex justify-content-center">
              <Col xs={10} md={6}>
                <div className="d-flex align-items-center justify-content-center pb-5">
                  <img
                    src={ahulinkLogo}
                    alt="ahulink-logo"
                    className="cursor-pointer"
                    onClick={() => navigate('/')}
                  />
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <div className="position-relative z-0">
                  <img
                    className="position-absolute"
                    style={{ top: 20, right: -70 }}
                    src={topShape}
                    alt=""
                  />
                  <img
                    className="position-absolute"
                    style={{ bottom: 30, left: -75 }}
                    src={bottomShape}
                    alt=""
                  />

                  <Card className="overflow-hidden z-1 rounded-3 shadow-lg border-2 border-secondary border-opacity-25">
                    <CardBody className="p-5">
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="text-center mb-3">
                          <h1 className="fs-3 text-primary lh-1">Masuk</h1>
                          <h1 className="fs-6 fw-light text-secondary lh-1">
                            Silahkan isi informasi anda
                          </h1>
                        </div>
                        {errMessage ? (
                          <Alert color="danger">{errMessage}</Alert>
                        ) : null}
                        <div className="mb-3">
                          <Label>
                            Username/NIK <span className="text-danger">*</span>
                          </Label>
                          <Input
                            tabIndex={1}
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ''}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.username}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>
                            Password <span className="text-danger">*</span>
                          </Label>
                          <InputGroup>
                            <Input
                              tabIndex={2}
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              autoComplete="off"
                              value={validation.values.password || ''}
                              placeholder="Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            <Button
                              className="bg-white text-black border-start-0 border-secondary border-opacity-25"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <i className="mdi mdi-eye-off-outline fs-4 text-secondary" />
                              ) : (
                                <i className="mdi mdi-eye-outline fs-4 text-secondary" />
                              )}
                            </Button>
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>
                        <div className="mb-3 w-100 d-flex justify-content-between">
                          <Link
                            to="/forgot-password"
                            className="fw-semibold text-primary"
                          >
                            Lupa Password?
                          </Link>
                        </div>
                        <Row className="mb-3 row-gap-2">
                          <Col lg={6} xl={7}>
                            <Input
                              tabIndex={3}
                              id="verification"
                              name="verification"
                              autoComplete="off"
                              value={validation.values.verification || ''}
                              type="text"
                              placeholder="Kode Verifikasi"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.verification &&
                                validation.errors.verification
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.verification &&
                            validation.errors.verification ? (
                              <FormFeedback type="invalid">
                                {validation.errors.verification}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col
                            lg={6}
                            xl={5}
                            className="d-flex justify-content-lg-end"
                          >
                            <div className="captcha-container">
                              <LoadCanvasTemplateNoReload />
                            </div>
                          </Col>
                        </Row>
                        <div className="mt-5 w-100">
                          <button
                            tabIndex={4}
                            className="btn btn-primary btn-block w-100"
                            type="submit"
                          >
                            Selanjutnya
                          </button>
                        </div>

                        <div
                          className="w-100 my-3"
                          style={{ borderTop: '1px solid #d1d5db' }}
                        ></div>
                        <Row>
                          <Col xs={12}>
                            <Button
                              className="w-100"
                              color="success"
                              onClick={loginSSO}
                            >
                              Login Portal Dengan SSO{' '}
                              <i className="bx bx-right-arrow-alt" />
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>

            <div className="w-100 d-flex align-items-center justify-content-center fs-6 mb-5">
              <span className="text-secondary">Belum punya akun?</span>
              &nbsp;&nbsp;&nbsp;
              <div
                className="cursor-pointer"
                onClick={() => (window.location.href = urlRegisterLandingPage)}
              >
                <u className="text-primary">Daftar sekarang</u>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
