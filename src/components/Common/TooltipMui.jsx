import { convertHexToRGB } from '@/helpers/services/convert';
import { styled, Tooltip } from '@mui/material';

export const CustomTooltipMui = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: `rgba(${convertHexToRGB('#2A3042')}, 0.8)`, // Warna background
    color: 'white', // Warna teks
    padding: '16px', // Padding custom
    fontSize: '0.9rem', // Ukuran font
    borderRadius: '8px', // Radius untuk tooltip
  },
  [`& .MuiTooltip-arrow`]: {
    color: `rgba(${convertHexToRGB('#2A3042')}, 0.8)`, // Warna panah tooltip
  },
}));
