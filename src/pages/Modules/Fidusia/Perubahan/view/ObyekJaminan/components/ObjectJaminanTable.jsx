import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { formatCurrency } from '@/helpers/services/handleInput';
import { FormHeader } from '@/components/Common/FormField';
import Header from '../../../Header';

const ObyekJaminanTable = ({ objectJaminan }) => {
  // Determine the maximum number of value_jenis_kategori
  const maxAtributCount = Math.max(
    ...objectJaminan.map((obj) => obj.value_jenis_kategori.length)
  );

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#041662',
          marginBottom: 2,
        }}
      >
        Jenis Obyek Jaminan
      </Typography>

      {objectJaminan?.map((objek, index) => (
        <Box key={objek.id} sx={{ marginBottom: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: '#333',
              marginBottom: 1,
            }}
          >
            <Header label={`Obyek Jaminan ${index + 1}`} isEdit={false} />
          </Typography>

          {/* Main Information */}
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Informasi Obyek
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Kategori Obyek</TableCell>
                  <TableCell>{objek.kategori_obyek}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sub Kategori Obyek</TableCell>
                  <TableCell>{objek.jenis_kategori_obyek}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kurs</TableCell>
                  <TableCell>{objek.kurs}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nominal</TableCell>
                  <TableCell>
                    {formatCurrency(Number(objek.nilai_nominal))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nominal Rupiah</TableCell>
                  <TableCell>
                    Rp {formatCurrency(Number(objek.nilai_nominal_rupiah))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 2 }} />

          {/* Detailed Attributes */}
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  {objek.value_jenis_kategori.map((attr) => (
                    <TableCell
                      key={attr.id}
                      sx={{ fontWeight: 600, textAlign: 'center' }}
                    >
                      {attr.nama || `Atribut ${attr.id_atribut_jenis}`}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {objek.value_jenis_kategori.map((attr) => (
                    <TableCell key={attr.id} sx={{ textAlign: 'center' }}>
                      {attr.value || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      {/* Fallback for no data */}
      {(!objectJaminan || objectJaminan?.length === 0) && (
        <Typography variant="body1" color="textSecondary" align="center">
          Tidak ada data objek jaminan yang tersedia.
        </Typography>
      )}
    </Box>
  );
};

export default ObyekJaminanTable;
