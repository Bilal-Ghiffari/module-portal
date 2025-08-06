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
import { apiPostAuthReqReset } from '@/helpers/backend_helper';
import { useNavigate } from 'react-router-dom';
import { Label } from 'reactstrap';
import { Button } from 'reactstrap';
import { positiveNumb } from '@/helpers/services/handleInput';

const toastifyService = new ToastifyService();
const ForgetPasswordPage = (props) => {
  //meta title
  document.title = 'Forget Password | AHU RI';
  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      nik: ''
    },
    validationSchema: Yup.object({
      nik: Yup.string().min(16, 'NIK Harus 16 Karakter').required('NIK Wajib diisi')
    }),
    onSubmit: async (values) => {
      try {
        toastifyService.customShowLoading({ title: 'Harap Tunggu', msg: 'Proses Reset Password...' });
        const payload = { nik: values.nik };
        await apiPostAuthReqReset(payload);
        toastifyService.customWarningMsg('Silahkan cek Email anda untuk Melanjutkan Reset Password');
      } catch (error) {
        errorMsg(error);
        toastifyService.customWarningMsg('Email Tidak Ditemukan');
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
                        <h1 className="fs-3 text-primary lh-1">Temukan Akun Anda</h1>
                        <h1 className="fs-6 fw-light text-secondary lh-1">Masukkan Email Anda untuk mencari akun Anda.</h1>
                      </div>

                      {errMessage ? <Alert color="danger">{errMessage}</Alert> : null}

                      <div className="mb-3">
                        <Label>
                          NIK <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="nik"
                          className="form-control"
                          placeholder="Masukan NIK"
                          type="text"
                          onChange={(e) => {
                            if ((positiveNumb(e.target.value) && e.target.value.length <= 16) || e.target.value == '') {
                              validation.handleChange(e);
                            }
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values.nik || ''}
                          invalid={validation.touched.nik && validation.errors.nik ? true : false}
                        />
                        {validation.touched.nik && validation.errors.nik ? <FormFeedback type="invalid">{validation.errors.nik}</FormFeedback> : null}
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

export default withRouter(ForgetPasswordPage);

ForgetPasswordPage.propTypes = {
  history: PropTypes.object
};
