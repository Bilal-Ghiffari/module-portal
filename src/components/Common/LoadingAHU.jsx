import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import logo
import AHULogo from '@/assets/logo/AHULINK-Logo.png';

// Custom styled components
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  // backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Translucent white background

  zIndex: theme.zIndex.drawer + 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Translucent white background
  backdropFilter: 'blur(10px)', // Blur effect
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  textAlign: 'center',
  maxWidth: '300px',
  width: '100%',
}));

const LogoImage = styled('img')({
  width: '220px',
  height: 'auto',
  marginBottom: '40px',
  animation: 'pulse 2s infinite', // Tambahkan animasi pulse
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
});

const AHULoading = ({ open, message = '', logoSrc = AHULogo }) => {
  return (
    <StyledBackdrop open={open}>
      <LoadingContainer>
        <LogoImage
          src={logoSrc}
          alt="AHU Logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'fallback-logo-path.png'; // Fallback logo jika gagal
          }}
        />
        <CircularProgress
          size={40}
          thickness={4}
          color="primary"
          sx={{
            color: '#3f51b5', // Custom color
            animationDuration: '550ms',
            marginBottom: 2,
          }}
        />
        {/* <Typography
          variant="h6"
          color="black"
          sx={{
            fontWeight: 600,
            letterSpacing: 1.2,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {message}
        </Typography> */}
      </LoadingContainer>
    </StyledBackdrop>
  );
};

export default AHULoading;
