import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Pastikan sudah import icon edit

const Header = ({
  label,
  isEdit = true,
  onEdit,
  padding = 1,
  disabled = false,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#EFF7FF',
        padding: 1,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        height: '48px', // Sesuaikan tinggi dengan gambar
        width: '100%',
      }}
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
        {label}
      </Typography>

      {isEdit && (
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onEdit}
          disabled={disabled}
          sx={{
            color: '#041662',
            borderColor: '#041662',
            textTransform: 'none',
            padding: '4px 12px',
            height: '32px',
            fontSize: '12px',
            '&:hover': {
              backgroundColor: 'rgba(4, 22, 98, 0.1)',
              borderColor: '#041662',
            },
          }}
        >
          Ubah
        </Button>
      )}
    </Box>
  );
};

export default Header;
