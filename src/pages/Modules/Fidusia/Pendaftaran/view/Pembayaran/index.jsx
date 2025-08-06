import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import DownloadIcon from '@mui/icons-material/Download';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PaymentMethodModal from './PaymentSections/PaymentModal'; // Import the modal component
import { PAYMENT_STATUS } from '../../Schemas/PaymentValidationSchema';
import Header from '../../Header';
import ahulinkLogo from '@/assets/logo/image 70.png';
import { useState, useMemo } from 'react';

const PaymentPage = ({ formik }) => {
  const toastifyService = new ToastifyService();
  const { payment } = formik.values;
  const [openPaymentMethodModal, setOpenPaymentMethodModal] = useState(false);

  const handleOpenPaymentMethodModal = (bool) => {
    setOpenPaymentMethodModal(bool);
  };

  const handlePayment = async (paymentInfo) => {
    try {
      const newStatus = paymentInfo || PAYMENT_STATUS.SUKSES;
      formik.setFieldValue('payment.status', newStatus);

      if (newStatus === PAYMENT_STATUS.SUKSES) {
        toastifyService.customSuccessMsg('Pembayaran berhasil');
        handleOpenPaymentMethodModal(false);
      }
    } catch (error) {
      toastifyService.customErrorMsg(
        error.response?.data?.message || 'Pembayaran gagal. Silakan coba lagi.'
      );
    }
  };

  const handleDownloadBukti = () => {
    try {
      window.print(); // Change this to download logic if needed
    } catch (error) {
      toastifyService.customErrorMsg('Gagal mengunduh bukti pembayaran');
    }
  };

  const renderPaymentDetails = useMemo(() => {
    const paymentDetails = [
      { key: 'Kode Voucher', value: payment?.kode_voucher || '-' },
      { key: 'Nama Pemohon', value: payment?.nama_pemohon || '-' },
      { key: 'Email Pemohon', value: payment?.email_pemohon || '-' },
      { key: 'Nomor HP', value: payment?.nomor_hp || '-' },
      { key: 'Wilayah', value: payment?.wilayah || '-' },
      {
        key: 'Tanggal Transaksi',
        value: payment?.tanggal_transaksi
          ? new Date(payment?.tanggal_transaksi).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : '',
      },
      {
        key: 'Tanggal Expired',
        value: payment?.tanggal_expired
          ? new Date(payment?.tanggal_expired).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : '',
      },
      { key: 'Tagihan', value: payment?.tagihan || '-' },
      { key: 'Status', value: payment?.status || '-' },
    ];

    return paymentDetails.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 1,
          borderBottom:
            index < paymentDetails.length - 1 ? '1px solid' : 'none',
          borderColor: 'divider',
          color:
            item.key === 'Status'
              ? item.value === PAYMENT_STATUS.BELUM_BAYAR
                ? 'error.main'
                : item.value === PAYMENT_STATUS.SUKSES
                ? 'success.main'
                : 'inherit'
              : 'inherit',
          fontWeight:
            item.key === 'Status'
              ? item.value === PAYMENT_STATUS.BELUM_BAYAR ||
                item.value === PAYMENT_STATUS.SUKSES
                ? 'bold'
                : 'normal'
              : 'normal',
        }}
      >
        <Typography>{item.key}</Typography>
        <Typography>
          {item.key === 'Tagihan'
            ? new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(item.value || 0)
            : item.value}
        </Typography>
      </Box>
    ));
  }, [payment]);

  // console.log('payment', payment);

  return (
    <>
      <Header label="Tagihan Pembayaran" isEdit={false} />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Box
            component="img"
            src={ahulinkLogo}
            alt="Kemenhumham Logo"
            sx={{
              height: 100,
              mb: 2,
              mx: 'auto',
              display: 'block',
            }}
          />
          <Typography variant="h5" gutterBottom>
            DIREKTORAT JENDERAL AHU
          </Typography>
          <Typography variant="subtitle1" color="green" gutterBottom>
            BUKTI PEMESANAN NOMOR VOUCHER
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Pendaftaran Fidusia - Kementerian Hukum dan HAM
          </Typography>

          <Divider sx={{ my: 2 }} />
          {renderPaymentDetails}
        </Paper>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            gap: 2,
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadBukti}
            sx={{
              width: 'auto',
              backgroundColor: '#fff',
              color: '#041662',
              border: '1px solid #041662',
            }}
          >
            Download
          </Button>
          <Button
            startIcon={<PaymentOutlinedIcon />}
            variant="contained"
            color="primary"
            fullWidth
            disabled={payment?.status === PAYMENT_STATUS.SUKSES}
            onClick={() => handleOpenPaymentMethodModal(true)}
            sx={{
              width: 'auto',
              mr: 1,
              backgroundColor: '#041662',
              color: '#fff',
              border: '1px solid transparent',
              px: 2,
              py: 1,
              textTransform: 'initial',
              '&:hover': {
                backgroundColor: '#041992',
                color: '#fff',
              },
            }}
          >
            {payment?.status === PAYMENT_STATUS.BELUM_BAYAR
              ? 'Bayar Sekarang'
              : 'Sudah Bayar'}
          </Button>
        </Box>

        <PaymentMethodModal
          show={openPaymentMethodModal}
          handleClose={() => handleOpenPaymentMethodModal(false)}
          formik={formik}
          handlePayment={handlePayment}
        />
      </Container>
    </>
  );
};

export default PaymentPage;
