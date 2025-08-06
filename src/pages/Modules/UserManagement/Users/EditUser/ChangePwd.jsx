import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
  Label,
  FormFeedback,
  Input,
  Button,
  InputGroup,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Common/Breadcrumb';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changeBreadcrumb } from '@/store/actions';
import { useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import { useFormik } from 'formik';
import { apiPostReqResetPwd, apiPostResetPwdToken } from '@/helpers/backend_helper_usman';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';

const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '/user-management/tabel-user', label: 'User Management' },
  { link: '/', label: 'Ubah Kata Sandi' },
];

export default function ChangePwdUsers() {
  document.title = 'User Management | AHU RI';
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const toastifyService = new ToastifyService();
  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
  }, []);

  const postData = async (pwd) => {
    try {
      toastifyService.showLoading();
      const req = await apiPostReqResetPwd({ id: id });

      setTimeout(async () => {
        try {
          await apiPostResetPwdToken({ token: req.data?.token || '', password: pwd });
          successMsg(`Kata Sandi ${state?.username || ''} Berhasil Diubah`);
          navigate('/user-management/tabel-user');
        } catch (error) {
          errorMsg(error);
        } finally {
          toastifyService.close();
        }
      }, 2000);
    } catch (error) {
      toastifyService.close();
      errorMsg(error);
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: '',
      verification: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password Wajib diisi'),
      verification: Yup.string().required('Kode Verifikasi Tidak Sesuai'),
    }),
    onSubmit: (values) => {
      if (doSubmit()) {
        // dispatch(loginUser(values, props.router.navigate));
        // navigate(redirectUrl, { replace: true });
        console.log('runn');
        toastifyService
          .customConfirmation(`Kata Sandi ${state?.username || ''} Akan Diubah`)
          .then((res) => {
            if (res) {
              postData(values.password);
            }
          });
      } else {
        validation.setFieldError('verification', 'Kode Verifikasi Tidak Sesuai');
      }
    },
  });
  const doSubmit = () => {
    let user_captcha = document.getElementById('verification').value;

    if (validateCaptcha(user_captcha) === true) {
      return true;
    } else {
      validation.setFieldValue('verification', '');
      loadCaptchaEnginge(6, '#D3D3D3', '#000000', 'numbers');
      return false;
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6, '#D3D3D3', '#000000', 'numbers');
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="mb-3">
          <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">USER MANAGEMENT</h1>
        </div>
        <Container fluid={true}>
          <Breadcrumb content={breadCrumb} />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="p-5">
                  <div className="fw-semibold fs-4 mb-3">
                    Ubah Kata Sandi {state?.username || ''}
                  </div>
                  <div className="wizard clearfix">
                    <div className="content clearfix">
                      <Form className="needs-validation mt-4">
                        <Row className="mb-3 row-gap-2">
                          <Col md={2}>
                            <Label htmlFor="validationCustom01" className="col-form-label p-0">
                              Kata Sandi
                            </Label>
                          </Col>
                          <Col md={10}>
                            <InputGroup>
                              <Input
                                tabIndex={2}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="off"
                                value={validation.values.password || ''}
                                placeholder="Kata Sandi"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password && validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              <Button
                                className="bg-white text-black border-start-0 border-secondary border-opacity-25"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                              </Button>
                            </InputGroup>
                            {validation.touched.password && validation.errors.password ? (
                              <span className="text-danger font-size-11">
                                {validation.errors.password}
                              </span>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3 row-gap-2">
                          <Col md={2}>
                            <Label htmlFor="validationCustom01" className="col-form-label m-0 p-0">
                              Kode Verifikasi
                            </Label>
                          </Col>
                          <Col md={6} lg={4}>
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
                                validation.touched.verification && validation.errors.verification
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.verification && validation.errors.verification ? (
                              <FormFeedback type="invalid">
                                {validation.errors.verification}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col md={4} lg={2} className="d-flex justify-content-lg-end">
                            <div className="captcha-container">
                              <LoadCanvasTemplateNoReload />
                            </div>
                          </Col>
                        </Row>

                        <div className="actions clearfix justify-content-end d-flex">
                          <button
                            type="submit"
                            onClick={(event) => {
                              event.preventDefault();
                              validation.handleSubmit();
                            }}
                            className="btn btn-primary">
                            Simpan
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
