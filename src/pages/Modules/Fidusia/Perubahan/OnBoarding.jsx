import { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
  FormLabel,
} from '@mui/material';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { DynamicDropdown } from '@/components/DynamicDropdown'; // Assuming this component exists
import { FidusiaPendaftaranSwal } from './services/fidusiaPendaftaranSwal';

const OnBoardingPerubahaan = ({ formik, setActiveStep, label }) => {
  const [data, setData] = useState({
    jenisPerubahan: [],
    notaris: [],
  });

  const [loading, setLoading] = useState(false);

  function handleCheckAndRedirect() {
    FidusiaPendaftaranSwal.checkExistingPendaftaran({
      formik,
      setActiveStep,
      setLoading,
    });
  }

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
        <Grid
          container
          spacing={3}
          style={{ maxWidth: '800px', padding: '0px 50px' }}
        >
          {/* Header */}
          <Grid item xs={12}>
            <h4 className="fw-bold" style={{ color: '#041662' }}>
              {label}
            </h4>
            <hr className="mt-0 mb-3" />
          </Grid>

          {/* Information Text */}
          <Grid item xs={12}>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Anda akan memulai proses permohonan perubahan data fidusia.
              Pastikan Anda telah menyiapkan dokumen dan informasi yang
              dibutuhkan sebelum melanjutkan.
            </p>
          </Grid>

          {/* Jenis Perubahan Dropdown */}
          <Grid item xs={12} className="mb-4">
            <DynamicDropdown
              formik={formik}
              fieldName={'jenisPerubahan'}
              data={data.jenisPerubahan}
              label="Jenis Perubahan"
              required
            />
          </Grid>

          {/* Nomor Sertifikat and Tanggal Sertifikat */}
          <Grid item xs={12} md={6}>
            <FormLabel>Nomor Sertifikat</FormLabel>
            <TextField
              fullWidth
              label="Nomor Sertifikat"
              {...formik.getFieldProps('nomorSertifikat')}
              placeholder="Tulis nomor sertifikat"
              helperText={
                formik.touched.nomorSertifikat && formik.errors.nomorSertifikat
              }
              error={
                formik.touched.nomorSertifikat &&
                Boolean(formik.errors.nomorSertifikat)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormLabel>Tanggal Sertifikat</FormLabel>
            <TextField
              fullWidth
              type="date"
              // label="Tanggal Sertifikat"
              {...formik.getFieldProps('tanggalSertifikat')}
              helperText={
                formik.touched.tanggalSertifikat &&
                formik.errors.tanggalSertifikat
              }
              error={
                formik.touched.tanggalSertifikat &&
                Boolean(formik.errors.tanggalSertifikat)
              }
            />
          </Grid>

          {/* Nama Notaris with Search Button Inside Input */}
          <Grid item xs={12}>
            <FormLabel>Notaris</FormLabel>
            <TextField
              fullWidth
              label="Nama Notaris / Kedudukan"
              {...formik.getFieldProps('namaNotaris')}
              placeholder="Tulis nama/kedudukan notaris"
              helperText={
                formik.touched.namaNotaris && formik.errors.namaNotaris
              }
              error={
                formik.touched.namaNotaris && Boolean(formik.errors.namaNotaris)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaSearch
                      size={20}
                      onClick={() => {
                        /* Implement search action here */
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Voucher Input */}
          <Grid item xs={12}>
            <FormLabel>Voucher</FormLabel>
            <TextField
              fullWidth
              label="Voucher"
              {...formik.getFieldProps('voucher')}
              placeholder="Masukkan kode voucher"
              helperText={formik.touched.voucher && formik.errors.voucher}
              error={formik.touched.voucher && Boolean(formik.errors.voucher)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              onClick={handleCheckAndRedirect}
              variant="contained"
              color="primary"
              endIcon={<FaArrowRight />}
              fullWidth
              sx={{
                padding: '10px 16px',
                fontSize: '14px',
                textTransform: 'none',
                backgroundColor: '#041662',
              }}
            >
              Mulai Perubahaan
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OnBoardingPerubahaan;
