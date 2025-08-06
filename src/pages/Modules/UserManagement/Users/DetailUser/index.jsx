import { useEffect } from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getDetailPengguna } from '../../../../../store/actions';
import { useMemo } from 'react';

// import { getDetailPengolahanIkan } from "../../../../../../store/actions";

const DetailUser = ({ idUser, modalBackdrop, modalPopupPasar }) => {
  document.title = 'Detail User | AHU RI';
  const dispatch = useDispatch();
  const { detail_pengguna } = useSelector((el) => el.Usman);

  useEffect(() => {
    dispatch(getDetailPengguna({ id: idUser }));
  }, [idUser]);

  const uniqueRoles = useMemo(() => {
    const roles = detail_pengguna?.data?.roles || [];

    if (roles.length > 0) {
      const unqData = [...new Map(roles.map((item) => [item.role_code, item])).values()];

      const res = unqData.map((o) => ({
        ...o,
        all_module: roles.filter((p) => p.role_code === o.role_code).map((q) => q.module),
      }));

      return res;
    }

    return [];
  }, [detail_pengguna?.data]);

  return (
    <Modal
      isOpen={modalBackdrop}
      toggle={() => {
        modalPopupPasar();
      }}
      size="xl"
      scrollable={true}>
      <ModalHeader
        toggle={() => {
          modalPopupPasar();
        }}>
        <span className="fw-bold fs-4">Detail User Management</span>
      </ModalHeader>
      <ModalBody>
        <div>
          <Container fluid={true}>
            {/* <Breadcrumb content={breadCrumb} title="DETAIL KUSUKA" /> */}
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        Nama Lengkap
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="fullname"
                            placeholder="Nama Lengkap"
                            type="text"
                            id="validation1"
                            value={detail_pengguna?.data?.fullname || '-'}
                            className={`form-control`}
                          />
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
                            disabled
                            name="nik"
                            placeholder="NIK"
                            type="text"
                            id="validation1"
                            value={detail_pengguna?.data?.nik || '-'}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        No Telp
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="no_hp"
                            placeholder="No Telp"
                            type="text"
                            id="validation1"
                            value={detail_pengguna?.data?.no_hp || '-'}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom02" className="col-md-2 col-form-label">
                        Email
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="email"
                            placeholder="Email"
                            type="email"
                            id="validation2"
                            value={detail_pengguna?.data?.email || '-'}
                            className={`form-control `}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        Alamat
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="alamat"
                            placeholder="Alamat"
                            type="textarea"
                            rows={3}
                            id="validation1"
                            value={detail_pengguna?.data?.alamat || '-'}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        Provinsi
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="prov_text"
                            placeholder="Provinsi"
                            type="text"
                            id="validation1"
                            value={detail_pengguna?.data?.prov_text || '-'}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        Kabupaten/Kota
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="kab_text"
                            placeholder="Kabupaten/Kota"
                            type="text"
                            id="validation1"
                            value={detail_pengguna?.data?.kab_text || '-'}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        Jenis Kelamin
                      </Label>
                      <div className="col-md-10 d-flex">
                        <div className="form-check">
                          <input
                            disabled
                            className="form-check-input"
                            type="radio"
                            name="jns_kelamin"
                            id="flexRadioDefault1"
                            value="L"
                            checked={detail_pengguna?.data?.jenis_kelamin === 'L'}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Laki-Laki
                          </label>
                        </div>
                        <div className="form-check ms-5">
                          <input
                            disabled
                            className="form-check-input"
                            type="radio"
                            name="jns_kelamin"
                            id="flexRadioDefault2"
                            value="P"
                            checked={detail_pengguna?.data?.jenis_kelamin === 'P'}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Perempuan
                          </label>
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom03" className="col-md-2 col-form-label">
                        Unit Eselon 1
                      </Label>
                      <div className="col-md-10">
                        <Input
                          disabled
                          name="unit_kerja"
                          placeholder="Pilih Unit Eselon 1"
                          value={detail_pengguna?.data?.eselon_1_text || '-'}
                          className={`select2-selection `}
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom03" className="col-md-2 col-form-label">
                        Unit Eselon 2
                      </Label>
                      <div className="col-md-10">
                        <Input
                          disabled
                          name="unit_kerja_e_2"
                          placeholder="Pilih Unit Eselon 2"
                          value={detail_pengguna?.data?.eselon_2_text || '-'}
                          className={`select2-selection`}
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom03" className="col-md-2 col-form-label">
                        UPT
                      </Label>
                      <div className="col-md-10">
                        <Input
                          disabled
                          name="upt"
                          placeholder="Pilih UPT"
                          value={detail_pengguna?.data?.upt_text || '-'}
                          className={`select2-selection`}
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                        Status Kepegawaian
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="status_kepegawaian"
                            placeholder="Status Kepegawaian"
                            type="text"
                            id="validation1"
                            value={detail_pengguna?.data?.status_kepegawaian || '-'}
                            className={`form-control`}
                          />
                        </div>
                      </div>
                    </Row>

                    {detail_pengguna?.data?.status_kepegawaian === 'NGO / LSM / Asosiasi' ? (
                      <Row className="mb-3">
                        <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                          NGO/LSM/ASOSIASI
                        </Label>
                        <div className="col-md-10">
                          <div className="d-flex flex-column align-items-start">
                            <Input
                              disabled
                              name="ngo_lsm_asosiasi"
                              placeholder="NGO/LSM/ASOSIASI"
                              type="text"
                              id="validation1"
                              value={detail_pengguna?.data?.ngo_lsm_asosiasi || '-'}
                              className={`form-control`}
                            />
                          </div>
                        </div>
                      </Row>
                    ) : (
                      <>
                        <Row className="mb-3">
                          <Label htmlFor="validationCustom01" className="col-md-2 col-form-label">
                            Apakah Penyuluh
                          </Label>
                          <div className="col-md-10 d-flex">
                            <div className="form-check">
                              <input
                                disabled
                                className="form-check-input"
                                type="radio"
                                name="penyuluh"
                                id="flexRadioDefault1"
                                value="L"
                                checked={detail_pengguna?.data?.penyuluh === '1'}
                              />
                              <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Ya
                              </label>
                            </div>
                            <div className="form-check ms-5">
                              <input
                                disabled
                                className="form-check-input"
                                type="radio"
                                name="penyuluh"
                                id="flexRadioDefault2"
                                value="P"
                                checked={detail_pengguna?.data?.penyuluh === '0'}
                              />
                              <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Tidak
                              </label>
                            </div>
                          </div>
                        </Row>
                        {detail_pengguna?.data?.penyuluh === '1' && (
                          <Row className="mb-3">
                            <Label htmlFor="validationCustom03" className="col-md-2 col-form-label">
                              Status Penyuluh
                            </Label>
                            <div className="col-md-10">
                              <Input
                                disabled
                                name="upt"
                                placeholder="Pilih Status Penyuluh"
                                value={detail_pengguna?.data?.status_penyuluh || '-'}
                                className={`select2-selection`}
                              />
                            </div>
                          </Row>
                        )}
                      </>
                    )}

                    <Row className="mb-3">
                      <Label htmlFor="validationCustom02" className="col-md-2 col-form-label">
                        Username
                      </Label>
                      <div className="col-md-10">
                        <div className="d-flex flex-column align-items-start">
                          <Input
                            disabled
                            name="username"
                            placeholder="Username"
                            type="text"
                            id="validation3"
                            value={detail_pengguna?.data?.username || '-'}
                            className={`form-control `}
                          />
                        </div>
                      </div>
                    </Row>

                    {uniqueRoles.map((el, index) => (
                      <Row
                        key={index}
                        className="bg-secondary bg-opacity-10 p-4 rounded mb-3"
                        style={{ rowGap: '.5rem' }}>
                        <Row className="mb-3">
                          <Col md={2}>
                            <Label htmlFor="validationCustom01" className="col-form-label pb-0">
                              Jenis Role
                            </Label>
                          </Col>
                          <Col md={10}>
                            <Input
                              disabled
                              value={el?.role}
                              // name={`jenisUsman.${index}.jenis_role`}
                              placeholder="Pilih Jenis Role"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={2} className="mb-3">
                            <Label htmlFor="validationCustom01" className="col-form-label pb-0">
                              Akses Modul
                            </Label>
                          </Col>
                          <Col md={10}>
                            <Input
                              disabled
                              type="textarea"
                              rows={3}
                              value={el?.all_module.join(', ')}
                              // id={`jenisUsman.${index}.jenis_modul`}
                              name={`jenis_modul`}
                              placeholder="Pilih Akses Modul"
                            />
                          </Col>
                        </Row>
                        {(el?.role_code === '04' ||
                          (el?.role_code?.startsWith('05') && el?.role_code <= '05.05') ||
                          (el?.role_code?.startsWith('06') && el?.role_code <= '06.05') ||
                          el?.role.toLowerCase().includes('enumerator')) && (
                          <>
                            <Row className="mb-3">
                              <Col md={2}>
                                <Label htmlFor="validationCustom01" className="col-form-label pb-0">
                                  Provinsi
                                </Label>
                              </Col>
                              <Col sm={12} md={10} lg={10}>
                                <Input
                                  disabled
                                  name="prov"
                                  placeholder="Provinsi"
                                  value={detail_pengguna?.data?.wilayah_prov_text || null}
                                  className="select2-selection"
                                />
                              </Col>
                            </Row>
                            {(el?.role_code === '04' ||
                              (el?.role_code?.startsWith('05') && el?.role_code <= '05.05') ||
                              el?.role.toLowerCase().includes('enumerator')) && (
                              <Row className="mb-3">
                                <Col md={2}>
                                  <Label
                                    htmlFor="validationCustom01"
                                    className="col-form-label pb-0">
                                    Kabupaten
                                  </Label>
                                </Col>
                                <Col sm={12} md={10} lg={10}>
                                  <Input
                                    disabled
                                    name="kab"
                                    placeholder="Kab/Kota"
                                    value={detail_pengguna?.data?.wilayah_kab_text || null}
                                    className="select2-selection"
                                  />
                                </Col>
                              </Row>
                            )}
                          </>
                        )}
                      </Row>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DetailUser;
