import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Col, Container, Form, Row, Label, TabContent, FormFeedback, Input, Button } from 'reactstrap';
import Select from 'react-select';
import { FieldArray, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { reactSlcStyles } from '@/lib/ReactSelect';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changeBreadcrumb, getDropdownModules, getDropdownRoles } from '@/store/actions';
import { useSelector } from 'react-redux';
import ModalsComponent from '@/components/Common/Modals';
import { postFormData } from '@/helpers/api_helper';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';
import * as url from '@/helpers/url_helper';
import { toLowerCapitalCase } from '@/helpers/services/convert';
import { ToastifyService } from '@/components/Toastify/toastifyService';

const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '/user-management/tabel-user', label: 'User Management' }
];

export const optJnsKelamin = [
  {
    value: 'L',
    label: 'Laki-Laki'
  },
  {
    value: 'P',
    label: 'Perempuan'
  }
];
export const optPenyuluh = [
  {
    value: 'Ya',
    label: 'Ya'
  },
  {
    value: 'Tidak',
    label: 'Tidak'
  }
];

export const optStatusPegawaiNonKKP = [
  { value: 'NON ASN KKP', label: 'NON ASN KKP' },
  { value: 'ASN DINAS', label: 'ASN DINAS' },
  { value: 'NON ASN DINAS', label: 'NON ASN DINAS' },
  { value: 'NGO / LSM / Asosiasi', label: 'NGO / LSM / Asosiasi' }
];
export const optStatusPegawaiKKP = [
  { value: 'PNS', label: 'PNS' },
  { value: 'PPPK', label: 'PPPK' }
];
export const optNGOLSM = [
  { value: 'ARUNA', label: 'ARUNA' },
  { value: 'HNSI', label: 'HNSI' },
  { value: 'KNTI', label: 'KNTI' },
  { value: 'MDPI', label: 'MDPI' },
  { value: 'NELANGSA', label: 'NELANGSA' },
  { value: 'USAID Ber-IKAN', label: 'USAID Ber-IKAN' },
  { value: 'WWF', label: 'WWF' }
];
export const optStatusPenyuluh = [
  { value: 'PNS', label: 'PNS' },
  { value: 'P3K', label: 'P3K' },
  { value: 'Penyuluh Perikanan Bantu (PPB)', label: 'Penyuluh Perikanan Bantu (PPB)' }
];
export const optIdentifier = [
  { value: 'AHU', label: 'AHU' },
  { value: 'NON_AHU', label: 'NON AHU' }
];

export default function UserManagment() {
  document.title = 'User Management | AHU RI';
  const dispatch = useDispatch();
  const [payload, setPayload] = useState('');
  const [modalPopup, setModalPopup] = useState(false);
  const toastifyService = new ToastifyService();
  const navigate = useNavigate();

  const { list_dropdown_roles } = useSelector((el) => el.Usman);

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
    dispatch(getDropdownModules());
    dispatch(getDropdownRoles());
  }, []);

  const modalsPopup = () => {
    setModalPopup(!modalPopup);
    document.body.classList.add('no_padding');
  };

  const onSubmit = (values) => {
    const uniqueData = [...new Map(values.jenisUsman.map((item) => [item.jenis_role?.code, item])).values()];

    const data = {
      fullname: toLowerCapitalCase(values.fullname),
      username: values.username,
      password: values.password,
      valid: '1',
      deleted: 0,
      r_roles_code: uniqueData.map(o =>o.jenis_role?.code?.toString()) 
    };

    const filteredTransform = Object.fromEntries(Object.entries(data).filter(([_, value]) => value));
    setPayload(filteredTransform);

    modalsPopup();
  };

  const onApproveModals = async () => {
    try {
      toastifyService.customShowLoading({msg:'Menyimpan Data...'});
      console.log('py', payload);
      await postFormData(url.POST_NEW_USMAN, payload);
      successMsg('Sukses');
      navigate('/user-management/tabel-user');
    } catch (error) {
      errorMsg(error);
    } finally {
      toastifyService.close();
    }

    modalsPopup();
  };

  const uniqueData = Array.from(new Map(list_dropdown_roles?.data?.map((item) => [item.code, item])).values());
  

  const onNotValidated = () => {
    toastifyService.customWarningMsg('Harap Lengkapi dan Cek Kembali Inputan Anda');
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumb content={breadCrumb} title="Tambah User Management" />
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="p-5">
                  <div className="wizard clearfix">
                    <div className="content clearfix">
                      <TabContent className="body pt-0">
                        <Formik
                          initialValues={{
                            identifier: '',
                            fullname: '',
                            nik: '',
                            no_hp: '',
                            email: '',
                            alamat: '',
                            ngo_lsm_asosiasi: '',

                            status_kepegawaian: '',
                            eselon_1: '',
                            eselon_2: '',
                            upt: '',
                            username: '',
                            prov: '',
                            kab: '',
                            wilayah_prov: '',
                            wilayah_kab: '',
                            jenisUsman: [{ jenis_role: '', jenis_modul: '' }],
                            penyuluh: '',
                            status_penyuluh: ''
                          }}
                          validationSchema={Yup.object({
                            fullname: Yup.string().required('Nama Lengkap Wajib Diisi'),
                            // nik: Yup.string().required('NIK Wajib Diisi'),
                            // no_hp: Yup.string().required('No Telp Wajib Diisi'),
                            // email: Yup.string()
                            //   .email('Invalid email address')
                            //   .required('Email Wajib Diisi'),
                            // alamat: Yup.string().required('Alamat Wajib Diisi'),
                            // prov: Yup.object().required('Provinsi Wajib Diisi'),
                            // kab: Yup.object().required('Kabupaten/Kota Wajib Diisi'),
                            // ngo_lsm_asosiasi: Yup.object(),
                            // jenis_kelamin: Yup.string().required('Jenis Kelamin Wajib Dipilih'),
                            // status_kepegawaian: Yup.object().required('Status Pegawai Wajib Dipilih'),
                            username: Yup.string().required('Username Wajib Diisi')
                            // eselon_1: Yup.object().required('Eselon 1 Wajib Diisi'),
                            // eselon_2: Yup.object(),
                            // upt: Yup.object(),
                            // penyuluh: Yup.string(),
                            // status_penyuluh: Yup.object(),
                          })}
                          onSubmit={(values, { setSubmitting, validateForm }) => {
                            validateForm().then((errors) => {
                              if (Object.keys(errors).length > 0) {
                                onNotValidated();
                              } else {
                                onSubmit(values); // Submit jika tidak ada error
                              }
                              setSubmitting(false);
                            });
                          }}
                        >
                          {({ handleChange, setValues, setFieldValue, handleBlur, handleSubmit, values, errors, touched, validateForm }) => {
                            const configInput = useMemo(() => {
                              switch (values.identifier?.value) {
                                case 'AHU':
                                  return {
                                    nip: true,
                                    fullname: true,
                                    nik: true,
                                    no_hp: true,
                                    email: true,
                                    alamat: true,
                                    prov: true,
                                    kab: true,
                                    eselon_1: true,
                                    eselon_2: true,
                                    upt: true,
                                    status_kepegawaian_kkp: true,
                                    penyuluh: true,
                                    username: true,
                                    role: true
                                  };
                                case 'NON_AHU':
                                  return {
                                    fullname: true,
                                    nik: true,
                                    no_hp: true,
                                    email: true,
                                    alamat: true,
                                    prov: true,
                                    kab: true,
                                    status_kepegawaian_NON_AHU: true,
                                    ngo_lsm_asosiasi: true,
                                    penyuluh: true,
                                    username: true,
                                    role: true
                                  };

                                default:
                                  return {};
                              }
                            }, [values.identifier?.value]);

                            return (
                              <Form onSubmit={handleSubmit} className="needs-validation">
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fullname}
                                        className={`form-control ${touched.fullname && errors.fullname ? 'is-invalid' : ''}`}
                                      />
                                      {touched.fullname && errors.fullname ? <FormFeedback type="invalid">{errors.fullname}</FormFeedback> : null}
                                    </div>
                                  </div>
                                </Row>

                                <Row className="mb-3">
                                  <Label htmlFor="validationCustom02" className="col-md-2 col-form-label">
                                    Username
                                  </Label>
                                  <div className="col-md-10">
                                    <div className="d-flex flex-column align-items-start">
                                      <Input
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        id="validation3"

                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.username || ''}
                                        className={`form-control input-type-number ${touched.username && errors.username ? 'is-invalid' : ''}`}
                                      />
                                      {touched.username && errors.username ? <FormFeedback type="invalid">{errors.username}</FormFeedback> : null}
                                    </div>
                                  </div>
                                </Row>
                                <Row className="mb-3">
                                  <Label htmlFor="validationCustom02" className="col-md-2 col-form-label">
                                    Password
                                  </Label>
                                  <div className="col-md-10">
                                    <div className="d-flex flex-column align-items-start">
                                      <Input
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        id="validation3"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.password || ''}
                                        className={`form-control input-type-number ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                      />
                                      {touched.password && errors.password ? <FormFeedback type="invalid">{errors.password}</FormFeedback> : null}
                                    </div>
                                  </div>
                                </Row>

                                <>
                                  <Row className="mb-3">
                                    <div>
                                      <React.Fragment>
                                        <FieldArray name="jenisUsman">
                                          {({ push, remove }) => (
                                            <React.Fragment>
                                              {values?.jenisUsman?.map((_, index) => (
                                                <Row key={index} className="bg-secondary bg-opacity-10 p-4 rounded mb-3" style={{ rowGap: '.5rem' }}>
                                                  <div className="d-flex justify-content-between mb-3">
                                                    <div className="fw-bold">Hak Akses / Role</div>
                                                    <div className="d-flex">
                                                      <Button
                                                        type="button"
                                                        color="success"
                                                        className="btn-sm rounded me-2"
                                                        onClick={() =>
                                                          push({
                                                            jenis_modul: '',
                                                            jenis_role: ''
                                                          })
                                                        }
                                                      >
                                                        <i className="bx bx-plus fs-5"></i>
                                                      </Button>
                                                      {index > 0 && (
                                                        <Button type="button" color="danger" className="btn-sm rounded" onClick={() => remove(index)}>
                                                          <i className="bx bx-trash-alt fs-5"></i>
                                                        </Button>
                                                      )}
                                                    </div>
                                                  </div>

                                                  <Row className="mb-3">
                                                    <Col md={2}>
                                                      <Label htmlFor="validationCustom01" className="col-form-label pb-0">
                                                        Jenis Role
                                                      </Label>
                                                    </Col>

                                                    <Col md={10}>
                                                      <Select
                                                        getOptionValue={(option) => option.code}
                                                        getOptionLabel={(option) => option.title}
                                                        onChange={(selectedOption) => {
                                                          //Cari dan Pastikan role code belum dipilih
                                                          const find = values.jenisUsman?.find((o) => o.jenis_role?.code == selectedOption.code);

                                                          if (find) {
                                                            setFieldValue(`jenisUsman.${index}.jenis_role`, null);
                                                          } else {
                                                            setFieldValue(`jenisUsman.${index}.jenis_role`, selectedOption);
                                                          }
                                                        }}
                                                        options={uniqueData}
                                                        styles={reactSlcStyles}
                                                        value={values.jenisUsman[index].jenis_role}
                                                        id={`jenisUsman.${index}.jenis_role`}
                                                        name={`jenisUsman.${index}.jenis_role`}
                                                        placeholder="Pilih Jenis Role"
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Row>
                                              ))}
                                            </React.Fragment>
                                          )}
                                        </FieldArray>
                                      </React.Fragment>
                                    </div>
                                  </Row>
                                  <div className="actions clearfix justify-content-end d-flex">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        validateForm().then((errors) => {
                                          if (Object.keys(errors).length > 0) {
                                            handleSubmit();
                                            onNotValidated();
                                            console.log('formik', values);
                                          } else {
                                            handleSubmit();
                                          }
                                        });
                                      }}
                                      className="btn btn-primary"
                                    >
                                      Simpan
                                    </button>
                                  </div>
                                </>
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
    </React.Fragment>
  );
}
