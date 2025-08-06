import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LineDashed from '@/components/Common/Line/Dashed';
import { useNavigate } from 'react-router-dom';

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

const SuccessPage = ({ formik }) => {
  const navigate = useNavigate();
  const handleDashboardClick = () => {
    navigate('/fidusia/daftar-fidusia', { replace: true });
  };
  return (
    <Box className="bg-white page-content mb-4" sx={{ width: '100%' }}>
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleDashboardClick}
        >
          Daftar Fidusia
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
