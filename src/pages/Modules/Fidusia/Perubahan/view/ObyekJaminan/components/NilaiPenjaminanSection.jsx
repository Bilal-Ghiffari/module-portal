import { Box, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

// Import custom components
import { FormHeader } from '@/components/Common/FormField';
import { RENTANG_NOMINAL } from '../../../Constants/master';
import TableNilaiPenjamin from './TableNilaiPenjamin';
import useDebounce from '../../../hooks/useDebounce';

// Function to calculate total nominal rupiah
const calculateTotalNominalRupiah = (data = []) => {
  return data.reduce((total, item) => {
    // Ensure we're using the correct field for nominal rupiah
    return total + (item.nilai_nominal_rupiah || 0);
  }, 0);
};

// Function to get category and voucher price based on total nominal
const getCategoryAndVoucherPrice = (totalNominal) => {
  for (const range of RENTANG_NOMINAL) {
    const [min, max] = range.value
      .split('-')
      .map((value) => (value === 'max' ? Infinity : Number(value)));

    if (totalNominal >= min && totalNominal <= max) {
      return {
        kategori: range.label,
        hargaVoucher: range.harga,
      };
    }
  }

  // Default return if no match
  return {
    kategori: '',
    hargaVoucher: '0',
  };
};

const NilaiPenjaminanSection = ({
  data = [],
  formik,
  exchangeRates,
  onEditRow,
  onDeleteRow,
  calculateNominalRupiah,
}) => {
  // Calculate total nominal rupiah
  const totalNominalRupiah = useMemo(
    () => calculateTotalNominalRupiah(data),
    [data]
  );

  // Debounce total nominal rupiah
  const debouncedTotalNominal = useDebounce(totalNominalRupiah, 300);

  // Get category and voucher price
  const { kategori, hargaVoucher } = useMemo(
    () => getCategoryAndVoucherPrice(debouncedTotalNominal),
    [debouncedTotalNominal]
  );

  // Optional: Format total nominal rupiah
  const formattedTotalNominal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalNominalRupiah);

  // Update formik values with total nominal and voucher price
  useMemo(() => {
    formik.setFieldValue('total_nominal_rupiah', totalNominalRupiah);
    formik.setFieldValue('harga_voucher', hargaVoucher);
    formik.setFieldValue('kategori_penjaminan', kategori);
  }, [totalNominalRupiah, hargaVoucher, kategori]);

  return (
    <>
      <FormHeader title="Nilai Penjaminan" />
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Jaminan ini diberikan untuk menjamin pelunasan utang pemberi fidusia
        sejumlah:
      </Typography>

      {/* Table untuk Menampilkan Nilai Penjaminan */}
      <TableNilaiPenjamin
        data={data}
        formik={formik}
        exchangeRates={exchangeRates}
        onEditRow={onEditRow}
        onDeleteRow={onDeleteRow}
        calculateNominalRupiah={calculateNominalRupiah}
      />

      {/* TextField untuk Kategori Nilai Penjaminan */}
      <Box sx={{ marginTop: 4 }}>
        <TextField
          fullWidth
          label="Kategori Nilai Penjaminan"
          value={kategori}
          InputProps={{
            disabled: true,
          }}
          variant="outlined"
          placeholder="Pilih kategori nilai penjaminan"
        />
      </Box>

      <Box
        sx={{
          marginTop: 4,
          backgroundColor: '#F9FAFB',
          padding: 2,
          borderRadius: 2,
          border: '1px solid #E5E7EB',
        }}
      >
        <FormHeader title="Total Harga Voucher" sx={{ marginBottom: 2 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            Total Nilai Penjaminan
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: 700,
              color: '#041662', // Your primary color
              letterSpacing: '-0.5px',
            }}
          >
            {formattedTotalNominal}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 1.5,
            paddingTop: 1.5,
            borderTop: '1px solid #E5E7EB',
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            Harga Voucher
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#12B76A', // Green color for voucher price
              letterSpacing: '-0.5px',
            }}
          >
            Rp {hargaVoucher}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default NilaiPenjaminanSection;
