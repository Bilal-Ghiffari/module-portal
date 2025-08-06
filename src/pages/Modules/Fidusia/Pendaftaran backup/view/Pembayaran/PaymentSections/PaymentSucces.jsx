import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import { formatCurrency } from '@/helpers/services/handleInput';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  backgroundColor: theme.palette.background.default,
}));

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(3),
}));

const PaymentSuccessPage = ({
  invoiceNumber = 'INV-2025-0001',
  // amount = 500000,
  bankName = 'Bank BCA',
  onBackToHome,
  dataPayment,
  onHandlePayment,
  formik,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true); // Set loading to true when payment starts
    // Simulate loading delay (you can replace this with an actual API call or processing logic)
    setTimeout(() => {
      onHandlePayment('SUKSES');
      setLoading(false); // Set loading to false once the operation is complete
      onBackToHome();
    }, 2000); // Simulate 2 seconds delay
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledPaper elevation={3}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <SuccessIcon />
          </Grid>

          <Grid item>
            <Typography
              variant="h4"
              color="primary"
              sx={{
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Pembayaran Berhasil
            </Typography>
          </Grid>

          <Grid item>
            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 3,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                Nomor Invoice: {invoiceNumber}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                Rp.{formatCurrency(formik.values.payment.tagihan)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Dibayar melalui {bankName.toUpperCase()}
              </Typography>
            </Box>
          </Grid>

          <Grid item sx={{ width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                borderRadius: 8,
                py: 1.5,
                fontWeight: 'bold',
              }}
              onClick={handlePayment}
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Kembali ke Pembayaran'
              )}
            </Button>
          </Grid>

          <Grid item>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              Simpan bukti pembayaran sebagai referensi Anda
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default PaymentSuccessPage;
