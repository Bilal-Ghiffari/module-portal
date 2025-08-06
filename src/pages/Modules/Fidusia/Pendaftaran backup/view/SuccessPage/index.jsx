import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LineDashed from '@/components/Common/Line/Dashed';
// import { useNavigate } from 'react-router-dom';

// Custom Styled Check Icon
const CheckIcon = styled('div')({
  width: 120,
  height: 120,
  backgroundColor: '#4CAF50', // Hijau yang sama
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 24,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '35%',
    top: '50%',
    width: '20%',
    height: '10%',
    backgroundColor: 'white',
    transform: 'rotate(-45deg)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '40%',
    width: '40%',
    height: '10%',
    backgroundColor: 'white',
    transform: 'rotate(45deg)',
  },
});

const SuccessPage = () => {
  // const navigate = useNavigate();
  // const handleDashboardClick = () => {
  //   navigate('/fidusia');
  // };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 3,
        border: '1px solid #E7E7E7',
      }}
    >
      <CheckIcon />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#1A237E', // Warna sesuai tema
          mb: 2,
        }}
      >
        Pendaftaran Berhasil!
      </Typography>

      <LineDashed />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          maxWidth: '75%',
          mb: 3,
          px: 2,
          textAlign: 'center',
        }}
      >
        Pendaftaran Anda telah berhasil. Silakan buka laman dashboard untuk
        mengunduh sertifikat pendirian Perseroan Perorangan.
      </Typography>

      {/* <Button
        variant="contained"
        onClick={handleDashboardClick}
        sx={{
          backgroundColor: '#1A237E',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#283593',
          },
        }}
      >
        Buka Dashboard
      </Button> */}
    </Box>
  );
};

export default SuccessPage;
