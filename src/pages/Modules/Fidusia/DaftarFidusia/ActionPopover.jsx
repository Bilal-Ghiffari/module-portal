import React from 'react';
import { Box, Popover, Typography, styled } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import PdfIcon from '@mui/icons-material/PictureAsPdf';

// Styled component untuk item popover
const PopoverItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  gap: '12px',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& svg': {
    color: theme.palette.primary.main,
  },
}));

// Styled container untuk memastikan gap dan padding
const PopoverContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '12px',
  width: '280px', // Sesuaikan lebar sesuai kebutuhan
});

const ActionPopover = ({
  anchorEl,
  open,
  onClose,
  onActionClick,
  currentRow,
}) => {
  const actionItems = [
    {
      icon: <ListIcon />,
      text: 'Riwayat',
      color: 'orange',
      action: 'riwayat',
    },
    {
      icon: <PdfIcon />,
      text: 'Pernyataan',
      color: 'crimson',
      action: 'pernyataan',
    },
    {
      icon: <PdfIcon />,
      text: 'Lampiran Obyek',
      color: 'lightblue',
      action: 'lampiran',
    },
    {
      icon: <PdfIcon />,
      text: 'Sertifikat',
      color: 'burlywood',
      action: 'sertifikat',
    },
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.1)',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      // PaperProps={{

      // }}
    >
      <PopoverContainer>
        {actionItems.map((item, index) => (
          <PopoverItem
            key={item.action}
            onClick={() => onActionClick(item.action, currentRow)}
          >
            {item.icon}
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 500,
                color: item.color,
                // color: 'lightblue',
                // color: item.color === 'orange' ? 'orange' : 'inherit',
              }}
            >
              {item.text}
            </Typography>
          </PopoverItem>
        ))}
      </PopoverContainer>
    </Popover>
  );
};

export default ActionPopover;
