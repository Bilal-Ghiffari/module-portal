import { Box, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

// Import custom components
import { FormHeader } from '@/components/Common/FormField';
import { RENTANG_NOMINAL } from '../../../Constants/master';
import TableNilaiPenjamin from './TableNilaiPenjamin';
import useDebounce from '../../../hooks/useDebounce'; // Path ke file useDebounce

const getKategoriDariNominal = (totalNominal) => {
  for (const range of RENTANG_NOMINAL) {
    const [min, max] = range.value.split('-').map(Number);
    if (totalNominal >= min && (max === 'max' || totalNominal <= max)) {
      return range.label; // Return the category label
    }
  }
  return ''; // Return empty if no matching category
};

const NilaiPenjaminanSection = ({
  data = [],
  formik,
  exchangeRates,
  onEditRow,
  onDeleteRow,
  calculateNominalRupiah,
}) => {
  const totalNominalRupiah =
    formik.values.object_jaminan.total_nominal_rupiah || 0;

  // Debounce total nominal rupiah
  const debouncedTotalNominal = useDebounce(totalNominalRupiah, 300);

  // Memoize kategori calculation
  const kategori = useMemo(
    () => getKategoriDariNominal(debouncedTotalNominal),
    [debouncedTotalNominal]
  );

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
    </>
  );
};

export default NilaiPenjaminanSection;

// import React, { useEffect } from 'react';
// import { Box, Typography, TextField } from '@mui/material';

// // Import custom components
// import { FormHeader } from '@/components/Common/FormField';
// import { DynamicDropdown } from '@/components/DynamicDropdown';
// import TableNilaiPenjamin from './TableNilaiPenjamin';
// import { RENTANG_NOMINAL } from '../../../Constants/master';

// const getKategoriDariNominal = (totalNominal) => {
//   for (const range of RENTANG_NOMINAL) {
//     const [min, max] = range.value.split('-').map(Number);
//     if (totalNominal >= min && (max === 'max' || totalNominal <= max)) {
//       return range.label; // Mengembalikan label kategori
//     }
//   }
//   return ''; // Jika tidak ada kategori cocok
// };

// const NilaiPenjaminanSection = ({
//   data = [],
//   formik,
//   showSelect = true,
//   exchangeRates,
//   onEditRow,
//   onDeleteRow,
//   calculateNominalRupiah,
//   kurs,
//   // totalNominalRupiah,
// }) => {
//   const totalNominalRupiah = formik.values.object_jaminan.total_nominal_rupiah; // Mengambil nilai object_jaminan.totalNominalRupiah'
//   console.log('totalNominalRupiah:', totalNominalRupiah);
//   // const getKategoriDariNominal = (totalNominal) => {
//   //   for (const range of RENTANG_NOMINAL) {
//   //     const [min, max] = range.value.split('-').map(Number);
//   //     if (totalNominal >= min && (max === 'max' || totalNominal <= max)) {
//   //       return range.label; // Mengembalikan label kategori
//   //     }
//   //   }
//   //   return null; // Jika tidak ada kategori
//   // };

//   const kategori = getKategoriDariNominal(totalNominalRupiah);
//   console.log('Kategori Berdasarkan Total Nominal:', kategori);

//   React.useEffect(() => {
//     formik.setFieldValue('object_jaminan.total_nominal_rupiah', kategori);
//   }, []);

//   return (
//     <>
//       <FormHeader title="Nilai Penjaminan" />
//       <Typography variant="body2" sx={{ marginBottom: 2 }}>
//         Jaminan ini diberikan untuk menjamin pelunasan utang pemberi fidusia
//         sejumlah:
//       </Typography>

//       {/* Table for Nilai Penjaminan */}
//       <TableNilaiPenjamin
//         data={data}
//         formik={formik}
//         exchangeRates={exchangeRates}
//         onEditRow={onEditRow}
//         onDeleteRow={onDeleteRow}
//         calculateNominalRupiah={calculateNominalRupiah}
//       />

//       {/* DynamicDropdown for Kategori Nilai Penjaminan */}
//       <Box sx={{ marginTop: 2 }}>
//         <TextField
//           fullWidth
//           label="Kategori Nilai Penjaminan"
//           value={formik.values.object_jaminan.total_nominal_rupiah}
//           InputProps={{
//             readOnly: true, // Set sebagai read-only agar tidak bisa diedit
//           }}
//           variant="outlined"
//           placeholder="Pilih kategori nilai penjaminan"
//           required
//         />
//       </Box>
//       {/* <Box sx={{ marginTop: 2 }}>
//         <DynamicDropdown
//           formik={formik}
//           fieldName="object_jaminan.kategoriNilaiPenjaminan"
//           label="Kategori Nilai Penjaminan *"
//           // value={kategori}
//           data={RENTANG_NOMINAL.map((range) => ({
//             value: range.value,
//             label: range.label,
//             selected: range.label === kategori, // Menandai pilihan yang sesuai
//           }))}
//           placeholder="Pilih kategori nilai penjaminan"
//           required
//         />
//       </Box> */}
//       {/* <Box sx={{ marginTop: 2 }}>
//         <DynamicDropdown
//           formik={formik}
//           fieldName="object_jaminan.kategoriNilaiPenjaminan"
//           label="Kategori Nilai Penjaminan *"
//           data={RENTANG_NOMINAL}
//           placeholder="Pilih kategori nilai penjaminan"
//           required
//         />
//       </Box> */}
//     </>
//   );
// };

// export default NilaiPenjaminanSection;
