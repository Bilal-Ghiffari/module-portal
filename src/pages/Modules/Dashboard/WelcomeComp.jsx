import React, { useState } from 'react';

import { Row, Col, Card, CardBody } from 'reactstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import profileImg from '../../../assets/images/profile-img.png';
import avatar1 from '../../../assets/images/users/user.jpeg';
import ProfileNotaris from './components/ProfileNotaris';
const dummyDetail = {
  FOTO: avatar1,
  NAMA_LENGKAP: 'Ahmad Ramadhan',
  NAMA_KECIL: 'Ahmad',
  ALIAS: 'AR',
  TEMPAT_LAHIR: 'Jakarta',
  TGL_LAHIR: '1985-05-12 00:00:00',
  JENIS_KELAMIN: '1',
  ALAMAT_JALAN: 'Jl. Merdeka No.123, Jakarta Pusat',
  NO_SK_KEHAKIMAN: 'SK-1234/2020',
  TGL_SK_KEHAKIMAN: '2020-01-15',
  NO_SK_PELANTIKAN: 'SKP-5678/2021',
  TGL_SK_PELANTIKAN: '2021-03-20',
  NO_SK_PENGANGKATAN: 'SKP-9876/2022',
  TGL_SK_PENGANGKATAN: '2022-05-10',
  KOTA_SK: 'Jakarta',
  NAMA_PROVINSI_PENEMPATAN: 'DKI Jakarta',
  NAMA_KABUPATEN_PENEMPATAN: 'Jakarta Pusat',
  STATUS: 1,
  NO_HP: '081234567890',
  NO_TELP: '021-1234567',
  EMAIL: 'ahmad.notaris@example.com',
  EMAIL_ALTERNATIF: 'ahmad.alt@example.com',
};

const WelcomeComp = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="text-white px-4 py-3" style={{backgroundColor: '#9A64FF'}}>
          <Row className="align-items-center">
            <Col xs="8">
              <h5 className="fw-semibold mb-1">Selamat Datang</h5>
              <p className="mb-0 small">Satu Layanan AHU Portal Dashboard</p>
            </Col>
            <Col xs="4" className="text-end">
              <img
                src={profileImg}
                alt="Profile"
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </Col>
          </Row>
        </div>

        <CardBody className="px-4 py-4">
          <Row className="align-items-center">
            <Col sm="4" className="text-center mb-4 mb-sm-0">
              <img
                src={avatar1}
                alt="Avatar"
                className="rounded-circle shadow-sm"
                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
              />
              <div className="mt-2">
                <h6 className="fw-medium m-0 p-0">Super Admin</h6>
                <span className="text-muted small m-0 p-0">CTO Of BHT</span>
              </div>
            </Col>

            <Col sm="8">
              <Row className="text-center text-sm-start gy-3">
                <Col xs="6">
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">125</h6>
                    <p className="text-muted mb-0 small">Total Transaksi</p>
                  </div>
                </Col>
                <Col xs="6">
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">$1.245</h6>
                    <p className="text-muted mb-0 small">Billing Voucher</p>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 text-sm-start text-center">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-sm btn-outline-primary rounded-pill px-3">
                  Lihat Profil <i className="mdi mdi-arrow-right ms-1"></i>
                </button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Modal Tambah */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileNotaris detail={dummyDetail} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary">Simpan</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default WelcomeComp;
