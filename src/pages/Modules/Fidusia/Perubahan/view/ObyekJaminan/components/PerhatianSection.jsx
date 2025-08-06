import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Typography } from '@mui/material';

// Import custom components
// Perhatian Section Component
const PerhatianSection = ({ formik, onCekObyek }) => (
  <Box sx={{ marginBottom: 2 }}>
    <Box
      sx={{
        backgroundColor: '#FFF3CD',
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Typography variant="body2" color="warning.main">
        <strong>PERHATIAN</strong>
        <br />
        Berdasarkan Undang-Undang Republik Indonesia Nomor 42 Tahun 1999 tentang
        Jaminan Fidusia Pasal 3, undang-undang ini tidak berlaku terhadap:
        <ul>
          {[
            'Hak tanggungan yang berkaitan dengan tanah dan bangunan, sepanjang peraturan perundang-undangan yang berlaku mengatur bahwa jaminan atas benda tersebut wajib didaftarkan',
            'Hipotek atas kapal yang terdaftar dengan isi kotak 20m³ (dua puluh meter kubik) atau lebih',
            'Hipotek atas pesawat terbang',
            'Gadai',
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Typography>
    </Box>

    <Box
      sx={{
        backgroundColor: '#FFF3CD',
        border: '1px solid #DEE2E6',
        borderRadius: 2,
        padding: 2,
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary">
          Silahkan lakukan pengecekan objek terlebih dahulu untuk menghindari
          pendaftaran fidusia ganda.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="info"
        startIcon={<SearchIcon />}
        onClick={onCekObyek}
        sx={{
          textTransform: 'none',
          paddingX: 3,
          backgroundColor: '#fff',
          marginLeft: '10px',
          color: 'blue',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
          },
        }}
      >
        Cek Objek
      </Button>
    </Box>
  </Box>
);

export default PerhatianSection;
