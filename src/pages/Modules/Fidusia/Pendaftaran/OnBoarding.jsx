import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Col, Row } from 'reactstrap';
import { FidusiaPendaftaranSwal } from './services/fidusiaPendaftaranSwal';

const OnBoardingPendaftaran = ({ formik, setActiveStep, label }) => {
  const [loading, setLoading] = useState(false);
  // function handleCheckAndRedirect() {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // }
  function handleCheckAndRedirect() {
    FidusiaPendaftaranSwal.checkExistingPendaftaran({
      formik,
      setActiveStep,
      setLoading,
    });
  }

  // console.log('formik>>>', formik.values);
  return (
    <div className="bg-white">
      {loading && (
        <Backdrop
          sx={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
          open={loading}
        >
          <CircularProgress color="primary" />
          <Typography variant="body2" color="text.secondary">
            Memuat data...
          </Typography>
        </Backdrop>
      )}
      <div className="d-flex flex-column w-100 py-4">
        <Row
          className="w-100"
          style={{ maxWidth: '800px', padding: '0px 50px' }}
        >
          <Col xs="12" className="mb-2">
            <h4 className="fw-bold" style={{ color: '#041662' }}>
              {label}
            </h4>
            <hr className="mt-0 mb-3" />
          </Col>

          <Col xs="12" className="mb-4">
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Anda akan memulai proses permohonan pendaftaran fidusia.Pastikan
              Anda telah menyiapkan dokumen dan informasi yang dibutuhkan
              sebelum melanjutkan.
            </p>
          </Col>

          <Col xs="12" className="mb-4">
            <button
              onClick={handleCheckAndRedirect}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#041662',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            >
              <span>Mulai Pendaftaran</span> <FaArrowRight size={10} />
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPendaftaran;
