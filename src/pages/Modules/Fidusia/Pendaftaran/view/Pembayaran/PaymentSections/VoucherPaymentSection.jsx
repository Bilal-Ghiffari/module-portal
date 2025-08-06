import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  IconButton,
  Typography,
  Snackbar,
  Tooltip,
  Divider,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Bank Logos
import BCALogo from '@/assets/bank/BCA.png';
import BNILogo from '@/assets/bank/BNI.png';
import BRILogo from '@/assets/bank/BRI.png';
import MandiriLogo from '@/assets/bank/Mandiri.png';
import { formatCurrency } from '@/helpers/services/handleInput';

const LineCustomeDashed = () => {
  return (
    <Divider
      sx={{
        borderBottom: '2px dashed #E7E7E7',
        width: '100%',
        my: 1.5,
      }}
    />
  );
};

const ScrollContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  overflowY: 'auto',
  scrollbarWidth: 'none', // Firefox
  '-ms-overflow-style': 'none', // IE 10+
  '&::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari, Opera
  },
}));

const VoucherPaymentSection = ({ selectedMethod, dataPayment, formik }) => {
  // console.log('dataPayment', dataPayment);
  const billingCode = '896 0822 5432 2312';
  const [expanded, setExpanded] = useState({
    mbanking: false,
    ibanking: false,
  });

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  const handleCopy = (text) => {
    setLoading(true); // Start loading when copying
    navigator.clipboard.writeText(text.replace(/\s/g, '')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setLoading(false); // Stop loading after copying
    });
  };

  const VerificationInfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.contrastText,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(0.5),
  }));

  const bankLogos = {
    bca: BCALogo,
    mandiri: MandiriLogo,
    bri: BRILogo,
    bni: BNILogo,
  };

  return (
    <ScrollContainer>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 'bold', mb: 1, color: '#1A237E' }}
      >
        Pembayaran Voucher
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mb: 1 }}
      >
        Silakan lakukan pembayaran sebelum batas waktu yang ditentukan
      </Typography>

      {/* Total Pembayaran Box */}
      <Box
        sx={{
          backgroundColor: '#1A237E',
          color: 'white',
          p: 1,
          borderRadius: '6px 6px 0px 0px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Total Pembayaran</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Rp {formatCurrency(formik.values.payment.tagihan)}
          </Typography>
        </Box>
      </Box>

      {/* Payment Time Box */}
      <Box
        sx={{
          backgroundColor: '#E3F2FD',
          p: 1,
          borderRadius: '0px 0px 6px 6px',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Bayar Dalam
          </Typography>
          <Typography variant="body2" color="text.secondary">
            23 jam 59 menit 51 detik
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" align="right">
          Jatuh tempo 06 Jul 2025, 11:22
        </Typography>
      </Box>

      {/* Bank Method Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <img
          src={bankLogos[selectedMethod]}
          alt={selectedMethod}
          style={{
            height: 32,
            width: 32,
            objectFit: 'contain',
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {selectedMethod === 'bca'
            ? 'Bank BCA'
            : selectedMethod === 'mandiri'
            ? 'Bank Mandiri'
            : selectedMethod === 'bri'
            ? 'Bank BRI'
            : 'Bank BNI'}{' '}
          (Virtual Account)
        </Typography>
      </Box>
      <LineCustomeDashed />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Nomor Kode Billing
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1A237E',
              letterSpacing: 1,
            }}
          >
            {billingCode}
          </Typography>
        </Box>
        <Tooltip title="Salin Kode Billing" arrow>
          <IconButton
            onClick={() => handleCopy(billingCode)}
            sx={{
              color: '#1A237E',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: 'rgba(26, 35, 126, 0.1)',
              },
            }}
            disabled={loading} // Disable copy button while loading
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <ContentCopyIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <LineCustomeDashed />

      {/* Verification Info Section */}
      <VerificationInfoBox>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoOutlinedIcon color="info" />
          <Typography variant="body2">
            Proses verifikasi kurang dari 10 menit setelah pembayaran berhasil
          </Typography>
        </Box>
      </VerificationInfoBox>

      {/* Snackbar untuk konfirmasi copy */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={copied}
        message="Kode Billing berhasil disalin"
        autoHideDuration={2000}
      />

      {/* Informasi Tambahan */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          mt: 0.5,
          mb: 1,
          display: 'block',
          fontStyle: 'italic',
        }}
      >
        Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan kembali
        dengan Virtual Account agar nomor tetap sama.
      </Typography>

      <LineCustomeDashed />

      {/* Petunjuk Transfer */}
      <Box
        sx={{
          backgroundColor: '#EFF7FF',
          padding: 1,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: expanded.mbanking ? 0 : 2,
          width: '100%',
        }}
        onClick={() =>
          setExpanded((prev) => ({ ...prev, mbanking: !prev.mbanking }))
        }
      >
        <Typography
          sx={{
            color: '#041662',
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
          }}
        >
          Petunjuk Transfer mBanking
        </Typography>
        <Typography>{expanded.mbanking ? '▲' : '▼'}</Typography>
      </Box>
      {expanded.mbanking && (
        <Box sx={{ p: 2, backgroundColor: '#F9F9F9', mb: 2 }}>
          <Typography variant="body2">
            1. Login ke mBanking-mu. Pilih Payment, kemudian pilih e-Commerce.
          </Typography>
          <Typography variant="body2">
            2. Pilih Penyedia Layanan: AHU Link, dan masukkan nomor Virtual
            Account.
          </Typography>
          <Typography variant="body2">
            3. Periksa informasi yang tertera di layar.
          </Typography>
        </Box>
      )}
      {/* iBanking Instructions */}
      <Box
        sx={{
          backgroundColor: '#EFF7FF',
          padding: 1,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: expanded.ibanking ? 0 : 2,
          width: '100%',
        }}
        onClick={() =>
          setExpanded((prev) => ({ ...prev, ibanking: !prev.ibanking }))
        }
      >
        <Typography
          sx={{
            color: '#041662',
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
          }}
        >
          Petunjuk Transfer iBanking
        </Typography>
        <Typography>{expanded.ibanking ? '▲' : '▼'}</Typography>
      </Box>
      {expanded.ibanking && (
        <Box sx={{ p: 2, backgroundColor: '#F9F9F9' }}>
          <Typography variant="body2">
            1. Login ke iBanking-mu dan pilih menu Payment.
          </Typography>
          <Typography variant="body2">
            2. Masukkan nomor Virtual Account dan konfirmasi detail pembayaran.
          </Typography>
          <Typography variant="body2">
            3. Periksa kembali detail pesanan, lalu masukkan token dan
            selesaikan pembayaran.
          </Typography>
        </Box>
      )}
    </ScrollContainer>
  );
};

export default VoucherPaymentSection;
