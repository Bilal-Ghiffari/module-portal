import * as Yup from 'yup';

export const initialValuesObyekJaminan = {
  id_jenis_kategori_obyek: '',
  value_jenis_kategori: [],
  kurs: '',
  nilai_kurs: '',
  nilai_nominal: '',
  nilai_nominal_rupiah: '',
  aggrement: '',
};

const ObyekJaminanValidationSchema = Yup.object({
  id_jenis_kategori_obyek: Yup.number().optional(
    'Jenis kategori objek wajib dipilih'
  ),

  value_jenis_kategori: Yup.array().of(
    Yup.object().shape({
      id_atribut_jenis: Yup.number().optional('ID atribut jenis wajib diisi'),
      value: Yup.string().optional('Value wajib diisi'),
    })
  ),
  // .min(1, 'Minimal satu kategori harus ada'),

  kurs: Yup.string().optional('Kurs wajib dipilih'),

  nilai_kurs: Yup.number()
    .optional()
    .positive('Nilai kurs harus lebih besar dari 0'),

  nilai_nominal: Yup.number()
    .optional()
    .positive('Nilai nominal harus lebih besar dari 0'),

  nilai_nominal_rupiah: Yup.number()
    .optional()
    .positive('Nilai nominal rupiah harus lebih besar dari 0'),

  // Tambahkan validasi agreement di dalam skema
  agreement: Yup.string().required('wajib diisi'),
});

export default ObyekJaminanValidationSchema;

// const ObyekJaminanValidationSchema = Yup.array().of(
//   Yup.object().shape({
//     id_jenis_kategori_obyek: Yup.number().required(
//       'Jenis kategori objek wajib dipilih'
//     ),

//     value_jenis_kategori: Yup.array()
//       .of(
//         Yup.object().shape({
//           id_atribut_jenis: Yup.number().required(
//             'ID atribut jenis wajib diisi'
//           ),
//           value: Yup.string().required('Value wajib diisi'),
//         })
//       )
//       .min(1, 'Minimal satu kategori harus ada'),

//     kurs: Yup.string().required('Kurs wajib dipilih'),

//     nilai_kurs: Yup.number()
//       .required('Nilai kurs wajib diisi')
//       .positive('Nilai kurs harus lebih besar dari 0'),

//     nilai_nominal: Yup.number()
//       .required('Nilai nominal wajib diisi')
//       .positive('Nilai nominal harus lebih besar dari 0'),

//     nilai_nominal_rupiah: Yup.number()
//       .required('Nilai nominal rupiah wajib diisi')
//       .positive('Nilai nominal rupiah harus lebih besar dari 0'),

//     // Tambahkan validasi agreement di dalam skema
//     agreement: Yup.string().required('Anda harus menyetujui pernyataan'),
//   })
// );

// export default ObyekJaminanValidationSchema;
