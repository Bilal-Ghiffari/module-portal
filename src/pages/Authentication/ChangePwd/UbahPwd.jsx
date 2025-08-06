import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';
import ModalsComponent from '../../../components/Common/Modals';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postAuthChngPwd } from '../../../helpers/backend_helper';
import {
  errorMsg,
  successMsg,
} from '../../../helpers/Notification/toastNotification';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const SchemaProfile = Yup.object().shape({
  old_pass: Yup.string().required('Wajib Diisi Tidak Boleh Kosong'),
  new_pass: Yup.string().required('Wajib Diisi Tidak Boleh Kosong'),
  repassword: Yup.string().required('Wajib Diisi Tidak Boleh Kosong'),
});

export const UbahPwd = () => {
  const [modalPopup, setModalPopup] = useState(false);
  const navigate = useNavigate();

  const user = useMemo(() => {
    const ls = JSON.parse(localStorage.getItem('userSession'));
    return ls.user_detail;
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      old_pass: '',
      new_pass: '',
      repassword: '',
    },
    validationSchema: SchemaProfile,
    onSubmit: (values) => {
      if (values.new_pass === values.repassword) {
        modalsPopup();
      }
    },
  });

  const modalsPopup = () => {
    setModalPopup(!modalPopup);
    document.body.classList.add('no_padding');
  };
  const onApproveModals = async () => {
    modalsPopup();
    console.log('success');
    const py = {
      username: user.username,
      old_pass: validation.values.old_pass,
      new_pass: validation.values.new_pass,
    };
    try {
      const res = await postAuthChngPwd(py);
      console.log('res ', res);
      successMsg('Sukses Mengganti Password, Harap Login Ulang');
      setTimeout(() => {
        navigate('/logout');
      }, 1000);
    } catch (error) {
      let msg = error.response?.data;
      if (msg.error && msg.error === 'parameter {old_pass} tidak sesuai') {
        msg = 'Password Lama Tidak Sesuai';
      } else {
        msg = msg.message;
      }

      errorMsg(msg || 'Internal Server Error');
    }
  };

  const [showPassword, setShowPassword] = useState({});
  const tglVisiblePwd = (key) => {
    setShowPassword({ ...showPassword, [key]: !showPassword[key] });
  };
  return (
    <React.Fragment>
      <Card className="rounded-5">
        <CardBody className="container">
          <Form className="needs-validation mt-4">
            <Row className="mb-3">
              <Label
                htmlFor="validationCustom03"
                className="col-md-2 col-form-label"
              >
                Password Lama
              </Label>
              <div className="col-md-10">
                <InputGroup>
                  <Input
                    placeholder="Password Lama"
                    type={showPassword?.old_pass ? 'text' : 'password'}
                    name="old_pass"
                    className={`form-control ${
                      validation.touched.old_pass && validation.errors.old_pass
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="validationCustom01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.old_pass}
                  />
                  <Button
                    className="bg-white text-black border-start-0 border-secondary border-opacity-25"
                    onClick={() => tglVisiblePwd('old_pass')}
                  >
                    {showPassword.old_pass ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </Button>
                </InputGroup>
                {validation.touched.old_pass && validation.errors.old_pass ? (
                  <FormFeedback className="d-block" type="invalid">
                    {validation.errors.old_pass}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>
            <Row className="mb-3">
              <Label
                htmlFor="validationCustom03"
                className="col-md-2 col-form-label"
              >
                Password Baru
              </Label>
              <div className="col-md-10">
                <InputGroup>
                  <Input
                    placeholder="Password Baru"
                    type={showPassword?.new_pass ? 'text' : 'password'}
                    name="new_pass"
                    className={`form-control ${
                      validation.touched.new_pass && validation.errors.new_pass
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="validationCustom01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.new_pass}
                  />
                  <Button
                    className="bg-white text-black border-start-0 border-secondary border-opacity-25"
                    onClick={() => tglVisiblePwd('new_pass')}
                  >
                    {showPassword.new_pass ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </Button>
                </InputGroup>
                {validation.touched.new_pass && validation.errors.new_pass ? (
                  <FormFeedback className="d-block" type="invalid">
                    {validation.errors.new_pass}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>
            <Row className="mb-3">
              <Label
                htmlFor="validationCustom03"
                className="col-md-2 col-form-label"
              >
                Ulangi Password Baru
              </Label>
              <div className="col-md-10">
                <InputGroup>
                  <Input
                    placeholder="Ulangi Password Baru"
                    type={showPassword?.repassword ? 'text' : 'password'}
                    name="repassword"
                    className={`form-control ${
                      validation.touched.repassword &&
                      validation.errors.repassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="validationCustom01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.repassword}
                  />
                  <Button
                    className="bg-white text-black border-start-0 border-secondary border-opacity-25"
                    onClick={() => tglVisiblePwd('repassword')}
                  >
                    {showPassword.repassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </Button>
                </InputGroup>
                {validation.touched.repassword &&
                validation.errors.repassword ? (
                  <FormFeedback className="d-block" type="invalid">
                    {validation.errors.repassword}
                  </FormFeedback>
                ) : null}
                {validation.touched.repassword &&
                validation.values.new_pass != validation.values.repassword ? (
                  <FormFeedback className="d-block" type="invalid">
                    Password Tidak Sesuai
                  </FormFeedback>
                ) : null}
              </div>
            </Row>
          </Form>

          <div className="actions clearfix justify-content-end d-flex">
            <button
              onClick={validation.handleSubmit}
              className="btn bg-primary text-white"
            >
              Simpan
            </button>
          </div>
        </CardBody>
      </Card>
      <ModalsComponent
        modalBackdrop={modalPopup}
        modalPopup={modalsPopup}
        approve={() => onApproveModals()}
      />
    </React.Fragment>
  );
};
