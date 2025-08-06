// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import AlamatPemberiFidusia from './AlamatPenerimaFidusia';
// import InformasiPemberiFidusia from './InformasiPenerimaFidusia';
// // import InformasiPenerimaFidusiaTable from './InformasiPenerimaFidusiaTable';
// import JenisPemberiFidusia from './JenisPenerimaFidusia';
// import LineDashed from '@/components/Common/Line/Dashed';

// const InformasiPenerimaFidusiaTable = ({ formik }) => {
//   const [openModal, setOpenModal] = useState(false);

//   // Open modal
//   const handleTambah = () => {
//     setOpenModal(true);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   // Add data to table
//   const handleSimpan = () => {
//     // Validate form fields
//     formik.validateForm().then((errors) => {
//       if (Object.keys(errors).length === 0) {
//         // Create new entry from current form values
//         const newEntry = {
//           jenisPemberi: formik.values.identity_penerima.jenisPemberi,
//           informasiPemberi: formik.values.identity_penerima.informasiPemberi,
//           alamatPemberi: formik.values.identity_penerima.alamatPemberi,
//           // Add a unique identifier
//           id: Date.now(),
//         };
//         console.log('newEntry>>>', newEntry);
//         console.log('formik??', formik.values);

//         // Update penerima_fidusia array in formik
//         const currentEntries =
//           formik.values.identity_penerima.penerima_fidusia || [];
//         formik.setFieldValue('identity_penerima.penerima_fidusia', [
//           ...currentEntries,
//           newEntry,
//         ]);

//         // Reset form and close modal
//         formik.resetForm({
//           values: {
//             ...formik.initialValues,
//             penerima_fidusia: [...currentEntries, newEntry],
//           },
//         });
//         handleCloseModal();
//       } else {
//         // Trigger validation
//         formik.submitForm();
//       }
//     });
//   };

//   // Delete row from table
//   const handleDelete = (id) => {
//     const updatedEntries = (
//       formik.values.identity_penerima.penerima_fidusia || []
//     ).filter((entry) => entry.id !== id);

//     formik.setFieldValue('identity_penerima.penerima_fidusia', updatedEntries);
//   };

//   return (
//     <Box>
//       <Button variant="contained" onClick={handleTambah} sx={{ mb: 2 }}>
//         + Tambah
//       </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>No</TableCell>
//               <TableCell>Jenis Pemberi Fidusia</TableCell>
//               <TableCell>Informasi Pemberi Fidusia</TableCell>
//               <TableCell>Alamat Pemberi Fidusia</TableCell>
//               <TableCell>Aksi</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(formik.values.identity_penerima.penerima_fidusia || []).map(
//               (row, index) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.jenisPemberi}</TableCell>
//                   <TableCell>{row.informasiPemberi}</TableCell>
//                   <TableCell>{row.alamatPemberi}</TableCell>
//                   <TableCell>
//                     <Button color="error" onClick={() => handleDelete(row.id)}>
//                       Hapus
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               )
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal Form */}
//       <Dialog
//         open={openModal}
//         onClose={handleCloseModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Tambah Penerima Fidusia</DialogTitle>
//         <DialogContent>
//           {/* Reuse existing form components */}
//           <JenisPemberiFidusia formik={formik} />
//           <LineDashed />
//           <InformasiPemberiFidusia formik={formik} />
//           <LineDashed />
//           <AlamatPemberiFidusia formik={formik} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal}>Batal</Button>
//           <Button onClick={handleSimpan} variant="contained">
//             Simpan
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };
// export default InformasiPenerimaFidusiaTable;

// // // In your main form component, update initial values
// // const initialValues = {
// //   // ... other initial values
// //   penerima_fidusia: [], // Array to store table entries
// // };

// // // In your Formik setup
// // <Formik
// //   initialValues={initialValues}
// //   validationSchema={validationSchema}
// //   onSubmit={handleSubmit}
// // >
// //   {(formik) => (
// //     <Form>
// //       {/* Other form fields */}
// //       <InformasiPenerimaFidusiaTable formik={formik} />
// //     </Form>
// //   )}
// // </Formik>;
