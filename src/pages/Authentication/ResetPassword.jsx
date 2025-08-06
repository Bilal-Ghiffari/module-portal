import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withRouter from '../../components/Common/withRouter';

//redux
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback } from 'reactstrap';

import ahulinkLogo from '../../assets/logo/AHULINK-Logo.png';
import topShape from '../../assets/icons/top-shape.png';
import bottomShape from '../../assets/icons/bottom-shape.png';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { errorMsg } from '@/helpers/Notification/toastNotification';
import { apiPostAuthResetPass } from '@/helpers/backend_helper';
import { InputGroup } from 'reactstrap';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from 'reactstrap';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Label } from 'reactstrap';

const toastifyService = new ToastifyService();
const ResetPasswordPage = (props) => {
  //meta title
  document.title = 'Reset Password | AHU RI';

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Kata sandi baru Wajib diisi')
        .matches(/[a-z]/, 'Kata sandi harus mengandung huruf kecil')
        .matches(/[A-Z]/, 'Kata sandi harus mengandung huruf kapital')
        .matches(/\d/, 'Kata sandi harus mengandung angka')
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Kata sandi harus mengandung simbol')
        .min(8, 'Kata sandi minimal 8 karakter'),
      confirm_password: Yup.string()
        .required('Kata sandi baru Wajib diisi')
        .oneOf([Yup.ref('password'), null], 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru')
    }),
    onSubmit: async (values) => {
      try {
        toastifyService.customShowLoading({ title: 'Harap Tunggu', msg: 'Proses Reset Password...' });
        const payload = { token: token, password: values.password };
        await apiPostAuthResetPass(payload);

        const res = await toastifyService.customWarningMsgWBackdrop('Reset Password Berhasil Dilakukan, Silahkan Login');
        if (res) navigate('/login');
      } catch (error) {
        errorMsg(error);
        const res = await toastifyService.customWarningMsgWBackdrop('Reset Password gagal dilakukan, harap coba kembali melakukan reset password di Form Login');
        if (res) navigate('/login');
      }
    }
  });

  const selectLoginState = (state) => state.Login;
  const LoginProperties = createSelector(selectLoginState, (login) => ({
    error: login.error
  }));

  const { error } = useSelector(LoginProperties);
  const errMessage = error?.data?.message || '';

  return (
    <React.Fragment>
      <div className="account-pages d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col xs={10} md={6}>
              <div className="d-flex align-items-center justify-content-center pb-5">
                <img src={ahulinkLogo} alt="ahulink-logo" className="cursor-pointer" onClick={() => navigate('/')} />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="position-relative z-0">
                <img className="position-absolute" style={{ top: 20, right: -70 }} src={topShape} alt="" />
                <img className="position-absolute" style={{ bottom: 30, left: -75 }} src={bottomShape} alt="" />

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
                      <div className="text-center mb-5">
                        <h1 className="fs-4 text-primary lh-1">Reset Password</h1>
                        <h1 className="fs-6 fw-light text-secondary lh-1">Masukkan kata sandi baru untuk melanjutkan akses ke akun Anda.</h1>
                      </div>

                      {errMessage ? <Alert color="danger">{errMessage}</Alert> : null}

                      <div className="mb-3">
                        <Label>
                          Password Baru <span className="text-danger">*</span>
                        </Label>

                        <InputGroup>
                          <Input
                            tabIndex={2}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="off"
                            value={validation.values.password || ''}
                            placeholder="Masukkan kata sandi baru anda"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={validation.touched.password && validation.errors.password ? true : false}
                          />
                          <Button className="bg-white text-black border-start-0 border-secondary border-opacity-25" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <i className="mdi mdi-eye-off-outline fs-4 text-secondary" /> : <i className="mdi mdi-eye-outline fs-4 text-secondary" />}
                          </Button>
                          {validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <Label>
                          Konfirmasi Password <span className="text-danger">*</span>
                        </Label>

                        <InputGroup>
                          <Input
                            tabIndex={2}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirm_password"
                            autoComplete="off"
                            value={validation.values.confirm_password || ''}
                            placeholder="Ulangi kata sandi baru anda"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={validation.touched.confirm_password && validation.errors.confirm_password ? true : false}
                          />
                          <Button className="bg-white text-black border-start-0 border-secondary border-opacity-25" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <i className="mdi mdi-eye-off-outline fs-4 text-secondary" /> : <i className="mdi mdi-eye-outline fs-4 text-secondary" />}
                          </Button>
                          {validation.touched.confirm_password && validation.errors.confirm_password ? <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback> : null}
                        </InputGroup>
                      </div>

                      <Row className="mt-5">
                        <Col xs={6}>
                          <div>
                            <Button className="w-100" outline onClick={() => navigate('/login')}>
                              Kembali
                            </Button>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div>
                            <Button className="w-100" color="primary" type="submit">
                              Selanjutnya
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      {/* <div className="mt-3 w-100 d-flex align-items-end justify-content-end">
                        <div className="w-50 d-flex justify-content-end">
                          <button className="btn btn-primary btn-block" type="submit">
                            Lanjut <i className="bx bx-right-arrow-alt"></i>
                          </button>
                        </div>
                      </div> */}
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ResetPasswordPage);

ResetPasswordPage.propTypes = {
  history: PropTypes.object
};
