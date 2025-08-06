import { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Form, Row, Label, TabContent, FormFeedback, Input } from 'reactstrap';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changeBreadcrumb, getDetailPengguna } from '@/store/actions';
import { useSelector } from 'react-redux';
import ModalsComponent from '@/components/Common/Modals';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';
import { useMemo } from 'react';
import { Button } from 'reactstrap';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { apiPostUpdatePengguna } from '@/helpers/backend_helper_usman';

const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '#', label: 'Profile User' }
];

export default function ProfileUser() {
  document.title = 'User Management | AHU RI';
  const dispatch = useDispatch();
  const [payload, setPayload] = useState('');
  const [modalPopup, setModalPopup] = useState(false);
  const navigate = useNavigate();
  const toastifyService = new ToastifyService();

  const { id } = useParams();

  const { detail_pengguna } = useSelector((el) => el.Usman);

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
  }, []);

  const modalsPopup = () => {
    setModalPopup(!modalPopup);
    document.body.classList.add('no_padding');
  };

  const onSubmit = (values) => {
    const transformData = values.jenisUsman?.map((o, index) => {
      return {
        [`r_roles_code[${index}]`]: o.jenis_role?.code || ''
      };
    });

    const data = {
      id: id,
      fullname: values?.fullname,
      username: values?.username,
      valid: 1,
      deleted: 0,
      ...transformData.reduce((acc, curr) => ({ ...acc, ...curr }), {})
    };

    const filteredTransform = Object.fromEntries(Object.entries(data).filter(([_, value]) => value));

    // console.log(filteredTransform);

    setPayload(filteredTransform);

    modalsPopup();
  };

  const onApproveModals = async () => {
    try {
      await apiPostUpdatePengguna(payload);
      successMsg('Sukses Mengubah Data, Anda Diharuskan Login kembali untuk update Data');
      navigate('/logout');
    } catch (error) {
      errorMsg(error);
    }

    modalsPopup();
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetailPengguna({ id }));
    }
  }, [id]);

  const jenisRole = useMemo(() => {
    const roles = detail_pengguna?.data?.roles;

    if (Array.isArray(roles)) {
      const unqData = [...new Map(roles.map((item) => [item.role_code, item])).values()];

      if (unqData.length) {
        return unqData.map((el) => ({
          jenis_role: { code: el?.role_code, title: el?.role } || '',
          jenis_modul: { code: el?.module_code, title: el?.module } || ''
        }));
      }
    }

    return [{ jenis_role: null, jenis_modul: null }];
  }, [detail_pengguna?.data]);

  const initialValues = {
    fullname: detail_pengguna?.data?.fullname || '',
    username: detail_pengguna?.data?.username || '',
    jenisUsman: jenisRole
  };

  const handleNonaktif = () => {
    toastifyService.customConfirmation('Akun Anda Akan Dinonaktifkan, dan Hanya Bisa Diaktifkan Kembali Oleh Admin').then((res) => {
      if (res) {
        const data = {
          id: id,
          valid: 0,
          deleted: 0
        };
        try {
          apiPostUpdatePengguna(data).then((res) => {
            if (res) {
              navigate('/logout');
            }
          });
        } catch (error) {
          errorMsg(error);
        }
      }
    });
  };

  return (
    <div className="page-content pt-4">
      <Row>
        <Col md={6}>
          <div className="mb-3">
            <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">Profile User</h1>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-end column-gap-3">
          <Button color="primary" onClick={() => navigate('/auth/ubah-pwd')}>
            Ubah Kata Sandi
          </Button>
          <Button color="danger" onClick={handleNonaktif}>
            Non Aktifkan Akun
          </Button>
        </Col>
      </Row>
      <Container fluid={true}>
        {/* <Breadcrumb content={breadCrumb} /> */}
        <Row className="mt-3">
          <Col lg="12">
            <Card>
              <CardBody className="px-4 py-3">
                <div className="fw-semibold fs-4 mb-3">Edit Data User</div>
                <div className="wizard clearfix">
                  <div className="content clearfix">
                    <TabContent className="body pt-0">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                          fullname: Yup.string().required('Nama Lengkap Wajib Diisi'),
                          username: Yup.string().required('Username Wajib Diisi')
                         
                        })}
                        onSubmit={(values) => {
                          onSubmit(values);
                        }}
                        className="needs-validation"
                      >
                        {(validation) => {
                          return (
                            <Form className="needs-validation mt-4">
                              <Row className="mb-3">
                                <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                                  Nama Lengkap
                                </Label>
                                <div className="col-md-10">
                                  <div className="d-flex flex-column align-items-start">
                                    <Input
                                      name="fullname"
                                      placeholder="Nama Lengkap"
                                      type="text"
                                      id="validation1"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values?.fullname || ''}
                                      className={`form-control ${validation.touched.fullname && validation.errors.fullname ? 'is-invalid' : ''}`}
                                    />
                                    {validation.touched.fullname && validation.errors.fullname ? <FormFeedback type="invalid">{validation.errors.fullname}</FormFeedback> : null}
                                  </div>
                                </div>
                              </Row>
                              
                              <Row className="mb-3">
                                <Label htmlFor="validationCustom03" className="col-md-2 col-form-label">
                                  Username
                                </Label>
                                <div className="col-md-10">
                                  <Input disabled name="username" placeholder="Username" value={validation.values?.username || ''} className={`select2-selection`} />
                                </div>
                              </Row>

                              <div className="actions clearfix justify-content-end d-flex">
                                <button
                                  type="submit"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    validation.handleSubmit();
                                  }}
                                  className="btn btn-primary"
                                >
                                  Ubah Data
                                </button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </TabContent>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ModalsComponent modalBackdrop={modalPopup} modalPopup={modalsPopup} approve={() => onApproveModals()} />
    </div>
  );
}
