import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Form, Row, Label, TabContent, FormFeedback, Input, Button } from 'reactstrap';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { reactSlcStyles } from '@/lib/ReactSelect';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changeBreadcrumb, getDropdownModules, getDropdownRoles } from '@/store/actions';
import { useSelector } from 'react-redux';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';

import { useMemo } from 'react';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { apiGetDetailPengguna, apiPostUpdatePengguna } from '@/helpers/backend_helper_usman';
import { useFormik } from 'formik';
import { filterEmptyValues } from '@/helpers/services/convert';
import { positiveNumb } from '@/helpers/services/handleInput';

const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '/user-management/tabel-user', label: 'User Management' },
  { link: '/', label: 'Edit User Management' }
];

const toastifyService = new ToastifyService();
export default function EditUserManagment() {
  document.title = 'User Management | AHU RI';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { list_dropdown_roles } = useSelector((el) => el.Usman);

  const validation = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      list_roles: [{ jenis_role: '' }],

      email: '',
      nik: '',
      nip: '',
      no_kitas_paspor: '',
      no_telp: '',
      nib: '',
      npwp: '',
      r_roles_code: '',
      deleted: '',
      valid: ''
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Wajib diisi'),
      username: Yup.string().required('Wajib diisi')
    }),
    onSubmit: async (values) => {
      const confirm = await toastifyService.confirmSubmit('Apakah anda yakin ingin mengubah data?', 'Saya Yakin');
      if (!confirm) return;

      let py = {
        id: id,

        fullname: values?.fullname,
        username: values?.username,
        email: values?.email,
        nik: values.nik,
        nip: values.nip,
        no_kitas_paspor: values.no_kitas_paspor,
        no_telp: values.no_telp,
        nib: values.nib,
        npwp: values.npwp,

        deleted: '0',
        valid: values.valid?.toString(),
        r_roles_code: values.list_roles.map(o =>o.jenis_role?.code?.toString()) 
      };

      //Send Data
      try {
        toastifyService.showLoading();
        await apiPostUpdatePengguna(filterEmptyValues(py));
        successMsg('Data Berhasil Terupdate');
        navigate('/user-management/tabel-user');
      } catch (error) {
        errorMsg(error);
      } finally {
        toastifyService.close();
      }
    }
  });

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
    dispatch(getDropdownModules());
    dispatch(getDropdownRoles());
  }, []);

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          toastifyService.showLoading();
          const { data } = await apiGetDetailPengguna({ id: id });
          const uniqueRoles = Array.from(new Map(data.roles?.map((item) => [item.code, item])).values());
          const listRole = uniqueRoles.map((item) => ({ jenis_role: { code: item.role_code, title: item.role } }));
          console.log('uniqueRoles ', uniqueRoles);

          validation.setValues((prev) => ({
            ...prev,

            fullname: data.fullname,
            username: data.username,
            list_roles: listRole.length > 0 ? listRole : [{ jenis_role: '' }],

            email: data.email,
            nik: data.nik,
            nip: data.nip,
            no_kitas_paspor: data.no_kitas_paspor,
            no_telp: data.no_telp,
            nib: data.nib,
            npwp: data.npwp,

            valid: data.valid
          }));
        } catch (error) {
          errorMsg(error);
        } finally {
          toastifyService.close();
        }
      };
      fetchDetail();
    }
  }, [id]);

  const uniqueData = useMemo(() => Array.from(new Map(list_dropdown_roles?.data?.map((item) => [item.code, item])).values()), [list_dropdown_roles]);

  return (
    <Container fluid={true} className="page-content">
      <Breadcrumb content={breadCrumb} title="Ubah User Management" />
      <Card>
        <CardBody className="p-5">
          <div className="wizard clearfix">
            <div className="content clearfix">
              <TabContent className="body pt-0">
                <Form className="needs-validation mt-0">
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
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      Email
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="email"
                          placeholder="Email"
                          type="text"
                          id="validation1"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values?.email || ''}
                          className={`form-control ${validation.touched.email && validation.errors.email ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.email && validation.errors.email ? <FormFeedback type="invalid">{validation.errors.email}</FormFeedback> : null}
                      </div>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      NIK
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="nik"
                          placeholder="Masukkan NIK"
                          type="text"
                          id="validation1"
                          onChange={(e) => {
                            if ((positiveNumb(e.target.value) && e.target.value.length <= 16) || e.target.value === '') validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values?.nik || ''}
                          className={`form-control ${validation.touched.nik && validation.errors.nik ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.nik && validation.errors.nik ? <FormFeedback type="invalid">{validation.errors.nik}</FormFeedback> : null}
                      </div>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      NIP
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="nip"
                          placeholder="Masukkan NIP"
                          type="text"
                          id="validation1"
                          onChange={(e) => {
                            if (positiveNumb(e.target.value) || e.target.value === '') validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values?.nip || ''}
                          className={`form-control ${validation.touched.nip && validation.errors.nip ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.nip && validation.errors.nip ? <FormFeedback type="invalid">{validation.errors.nip}</FormFeedback> : null}
                      </div>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      No. Kitas Pasport
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="no_kitas_paspor"
                          placeholder="Masukkan No. Kitas Pasport"
                          type="text"
                          id="validation1"
                          onChange={(e) => {
                            if (positiveNumb(e.target.value) || e.target.value === '') validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values?.no_kitas_paspor || ''}
                          className={`form-control ${validation.touched.no_kitas_paspor && validation.errors.no_kitas_paspor ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.no_kitas_paspor && validation.errors.no_kitas_paspor ? <FormFeedback type="invalid">{validation.errors.no_kitas_paspor}</FormFeedback> : null}
                      </div>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      No. Telp
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="no_telp"
                          placeholder="Masukkan No. Telp"
                          type="text"
                          id="validation1"
                          onChange={(e) => {
                            if (positiveNumb(e.target.value) || e.target.value === '') validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values?.no_telp || ''}
                          className={`form-control ${validation.touched.no_telp && validation.errors.no_telp ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.no_telp && validation.errors.no_telp ? <FormFeedback type="invalid">{validation.errors.no_telp}</FormFeedback> : null}
                      </div>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      NIB
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="nib"
                          placeholder="Masukkan NIB"
                          type="text"
                          id="validation1"
                          onChange={(e) => {
                            if ((positiveNumb(e.target.value) && e.target.value.length <= 13) || e.target.value === '') validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values?.nib || ''}
                          className={`form-control ${validation.touched.nib && validation.errors.nib ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.nib && validation.errors.nib ? <FormFeedback type="invalid">{validation.errors.nib}</FormFeedback> : null}
                      </div>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                      NPWP
                    </Label>
                    <div className="col-md-10">
                      <div className="d-flex flex-column align-items-start">
                        <Input
                          name="npwp"
                          placeholder="Masukkan NPWP"
                          type="text"
                          id="validation1"
                          onChange={(e) => {
                            if (positiveNumb(e.target.value) || e.target.value === '') validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values?.npwp || ''}
                          className={`form-control ${validation.touched.npwp && validation.errors.npwp ? 'is-invalid' : ''}`}
                        />
                        {validation.touched.npwp && validation.errors.npwp ? <FormFeedback type="invalid">{validation.errors.npwp}</FormFeedback> : null}
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

                  <Row className="mb-3">
                    <div>
                      {(validation?.values?.list_roles).map((el, index) => (
                        <Row key={index} className="bg-secondary bg-opacity-10 p-4 rounded mb-3" style={{ rowGap: '.5rem' }}>
                          <div className="d-flex justify-content-end mb-3">
                            <Button
                              type="button"
                              color="success"
                              className="btn-sm rounded me-2"
                              onClick={() => validation.setFieldValue('list_roles', [...validation.values.list_roles, { jenis_role: '' }])}
                            >
                              <i className="bx bx-plus fs-5"></i>
                            </Button>
                            {index > 0 && (
                              <Button
                                type="button"
                                color="danger"
                                className="btn-sm rounded"
                                onClick={() =>
                                  validation.setFieldValue(
                                    'list_roles',
                                    validation.values.list_roles.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                <i className="bx bx-trash-alt fs-5"></i>
                              </Button>
                            )}
                          </div>

                          <Row className="mb-3">
                            <Col md={2}>
                              <Label htmlFor="validationCustom01" className="col-form-label pb-0">
                                Jenis Role
                              </Label>
                            </Col>
                            <Col md={10}>
                              <Select
                                value={el.jenis_role || null}
                                getOptionValue={(option) => option.code}
                                getOptionLabel={(option) => option.title}
                                onChange={(selectedOption) => {
                                  //Cari dan Pastikan role code belum dipilih
                                  const find = validation.values.list_roles?.find((o) => o.jenis_role?.code == selectedOption.code);

                                  if (find) {
                                    validation.setFieldValue(`list_roles.${index}.jenis_role`, null);
                                  } else {
                                    validation.setFieldValue(`list_roles.${index}.jenis_role`, selectedOption);
                                  }
                                }}
                                options={uniqueData}
                                styles={reactSlcStyles}
                                id={`list_roles.${index}.jenis_role`}
                                name={`list_roles.${index}.jenis_role`}
                                placeholder="Pilih Jenis Role"
                              />
                            </Col>
                          </Row>
                        </Row>
                      ))}
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
                      Simpan
                    </button>
                  </div>
                </Form>
              </TabContent>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
