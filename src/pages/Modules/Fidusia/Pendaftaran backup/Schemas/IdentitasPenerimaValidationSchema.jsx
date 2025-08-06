import * as Yup from 'yup';

export const initialValuesIdentitasPenerima = {
  jenis_identitas: 'pemberi',
  jenis_transaksi: 'pendaftaran',
  jenis_pendaftaran: '',
  id_jenis_korporasi: '',
  sub_jenis_korporasi: '',
  id_badan_hukum: '',
  kewarganegaraan: '',
  jenis_kelamin: '',
  jenis_penggunaan: '',
  pengguna_produktif: '',
  nama: '',
  nik: '',
  npwp: '',
  no_sk: '',
  no_pengesahan: '',
  no_paspor: '',
  no_tlpon: '',
  id_negara_asal: '',
  email: '',
  alamat: '',
  id_provinsi: '',
  id_kebupaten: '',
  id_kecamatan: '',
  id_kelurahan: '',
  rt: '',
  rw: '',
  kode_pos: '',
  // penerima_fisudia: '',
  // },
};

// Regex Validation Patterns
const RT_RW_REGEX = /^[0-9]{1,3}$/; // 1-3 digit angka
const KODE_POS_REGEX = /^\d{5}$/; // 5 digit kode pos Indonesia
const NO_TELP_REGEX = /^(^\+62|62|^0)(\d{9,12})$/; // Nomor telepon Indonesia

// Validasi untuk perseorangan WNI
const createRegionValidation = () => ({
  // Validasi untuk WNA
  id_negara_asal: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNA'),
      then: (schema) => schema.required('Wajib diisi'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  alamat: Yup.string()
    .required('Email wajib diisi')
    .min(5, 'Alamat terlalu pendek')
    .max(50, 'Email maksimal 30 karakter'),

  id_provinsi: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) => schema.required('Provinsi wajib diisi'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  id_kabupaten: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) => schema.required('Kabupaten wajib diisi'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  id_kecamatan: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) => schema.required('kecamatan wajib diisi'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  id_kelurahan: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) => schema.required('kelurahan wajib diisi'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // Validasi untuk RT dan RW
  rt: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) =>
        schema
          .required('RT wajib diisi')
          .matches(RT_RW_REGEX, 'Format RT tidak valid')
          .max(3, 'RT maksimal 3 digit'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  rw: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) =>
        schema
          .required('RW wajib diisi')
          .matches(RT_RW_REGEX, 'Format RW tidak valid')
          .max(3, 'RW maksimal 3 digit'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  kode_pos: Yup.string().when(
    ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
    {
      is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
        (jenis_pendaftaran === 'kooperasi' &&
          (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
        (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
      then: (schema) =>
        schema
          .required('Kode Pos wajib diisi')
          .matches(KODE_POS_REGEX, 'Format Kode Pos tidak valid'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
});

// Skema Validasi Yup Utama
export const IdentitasPenerimaValidationSchema = Yup.object({
  jenis_identitas: Yup.string().oneOf(
    ['pemberi'],
    'Jenis identitas tidak valid'
  ),
  jenis_transaksi: Yup.string().oneOf(
    ['pendaftaran'],
    'Jenis transaksi tidak valid'
  ),

  jenis_pendaftaran: Yup.string().required('Wajib diisi'),

  // Validasi untuk korporasi
  id_jenis_korporasi: Yup.number().when('jenis_pendaftaran', {
    is: 'kooperasi',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  sub_jenis_korporasi: Yup.string().when('jenis_pendaftaran', {
    is: 'kooperasi',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  id_badan_hukum: Yup.string().when('id_jenis_korporasi', {
    is: 'indonesia',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Validasi untuk perseorangan
  kewarganegaraan: Yup.string().when('jenis_pendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Informasi umum
  nama: Yup.string().required('Wajib diisi'),
  nama_debitur: Yup.string().when(['kewarganegaraan', 'jenis_pendaftaran'], {
    is: (kewarganegaraan, jenis_pendaftaran) =>
      kewarganegaraan === 'wna' ||
      jenis_pendaftaran === 'kooperasi' ||
      jenis_pendaftaran === 'perseorangan',
    then: (schema) => schema.required('Nama Debitur wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  jenis_kelamin: Yup.string().when('jenis_pendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired('Jenis kelamin Wajib diisi'),
  }),

  email: Yup.string()
    .required('Email wajib diisi')
    .email('Format email tidak valid')
    .max(30, 'Email maksimal 30 karakter'),

  no_tlpon: Yup.string()
    .required('Nomor Telepon wajib diisi')
    .matches(NO_TELP_REGEX, 'Format Nomor Telepon tidak valid')
    .min(10, 'Nomor Telepon minimal 10 digit')
    .max(14, 'Nomor Telepon maksimal 14 digit'),

  // NIK Validation
  nik: Yup.string().when('jenis_pendaftaran', {
    is: 'perseorangan',
    then: (schema) =>
      schema
        .required('NIK wajib diisi')
        // .matches(NIK_REGEX, 'Format NIK tidak valid')
        .length(16, 'NIK harus 16 digit'),
    otherwise: (schema) => schema.notRequired(),
  }),

  npwp: Yup.string().when(['jenis_pendaftaran', 'id_jenis_korporasi'], {
    is: (jenis_pendaftaran, id_jenis_korporasi) =>
      !(jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2),
    then: (schema) => schema.required('NPWP wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  no_sk: Yup.string().when(['jenis_pendaftaran', 'id_jenis_korporasi'], {
    is: (jenis_pendaftaran, id_jenis_korporasi) =>
      !(jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2) &&
      jenis_pendaftaran !== 'perseorangan',
    then: (schema) => schema.required('Nomor SK wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Validasi Nama Kantor
  nama_kantor: Yup.string().when(['jenis_pendaftaran', 'id_jenis_korporasi'], {
    is: (jenis_pendaftaran, id_jenis_korporasi) =>
      !(jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2) &&
      jenis_pendaftaran !== 'perseorangan',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  no_paspor: Yup.string().when(['jenis_pendaftaran', 'kewarganegaraan'], {
    is: (jenis_pendaftaran, kewarganegaraan) =>
      jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNA',
    then: (schema) => schema.required('No Passport Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  ...createRegionValidation(),
});

export default IdentitasPenerimaValidationSchema;

// import * as Yup from 'yup';

// export const initialValuesIdentitasPenerima = {
//   jenis_identitas: 'pemberi',
//   jenis_transaksi: 'pendaftaran',
//   jenis_pendaftaran: '',
//   id_jenis_korporasi: '',
//   sub_jenis_korporasi: '',
//   id_badan_hukum: '',
//   kewarganegaraan: '',
//   jenis_kelamin: '',
//   jenis_penggunaan: '',
//   pengguna_produktif: '',
//   nama: '',
//   nik: '',
//   npwp: '',
//   no_sk: '',
//   no_pengesahan: '',
//   no_paspor: '',
//   no_tlpon: '',
//   id_negara_asal: '',
//   email: '',
//   alamat: '',
//   id_provinsi: '',
//   id_kebupaten: '',
//   id_kecamatan: '',
//   id_kelurahan: '',
//   rt: '',
//   rw: '',
//   kode_pos: '',
//   // penerima_fisudia: '',
//   // },
// };

// // Regex Validation Patterns
// const RT_RW_REGEX = /^[0-9]{1,3}$/; // 1-3 digit angka
// const KODE_POS_REGEX = /^\d{5}$/; // 5 digit kode pos Indonesia
// const NO_TELP_REGEX = /^(^\+62|62|^0)(\d{9,12})$/; // Nomor telepon Indonesia

// // Validasi untuk perseorangan WNI
// const createRegionValidation = () => ({
//   // Validasi untuk WNA
//   id_negara_asal: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNA'),
//       then: (schema) => schema.required('Wajib diisi'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   alamat: Yup.string()
//     .required('Email wajib diisi')
//     .min(5, 'Alamat terlalu pendek')
//     .max(50, 'Email maksimal 30 karakter'),

//   id_provinsi: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) => schema.required('Provinsi wajib diisi'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   id_kabupaten: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) => schema.required('Kabupaten wajib diisi'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   id_kecamatan: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) => schema.required('kecamatan wajib diisi'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   id_kelurahan: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) => schema.required('kelurahan wajib diisi'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   // Validasi untuk RT dan RW
//   rt: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) =>
//         schema
//           .required('RT wajib diisi')
//           .matches(RT_RW_REGEX, 'Format RT tidak valid')
//           .max(3, 'RT maksimal 3 digit'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   rw: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) =>
//         schema
//           .required('RW wajib diisi')
//           .matches(RT_RW_REGEX, 'Format RW tidak valid')
//           .max(3, 'RW maksimal 3 digit'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),

//   kode_pos: Yup.string().when(
//     ['jenis_pendaftaran', 'kewarganegaraan', 'id_jenis_korporasi'],
//     {
//       is: (jenis_pendaftaran, kewarganegaraan, id_jenis_korporasi) =>
//         (jenis_pendaftaran === 'kooperasi' &&
//           (id_jenis_korporasi === 1 || id_jenis_korporasi === 3)) ||
//         (jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNI'),
//       then: (schema) =>
//         schema
//           .required('Kode Pos wajib diisi')
//           .matches(KODE_POS_REGEX, 'Format Kode Pos tidak valid'),
//       otherwise: (schema) => schema.notRequired(),
//     }
//   ),
// });

// export const CustomeIdentitasPenerimaValidationSchema = Yup.object({
//   jenis_identitas: Yup.string().oneOf(
//     ['penerima'],
//     'Jenis identitas tidak valid'
//   ),
//   jenis_transaksi: Yup.string().oneOf(
//     ['pendaftaran'],
//     'Jenis transaksi tidak valid'
//   ),

//   jenis_pendaftaran: Yup.string().required('Wajib diisi'),

//   // Validasi untuk korporasi
//   id_jenis_korporasi: Yup.number().when('jenis_pendaftaran', {
//     is: 'kooperasi',
//     then: (schema) => schema.required('Wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),
//   sub_jenis_korporasi: Yup.string().when('jenis_pendaftaran', {
//     is: 'kooperasi',
//     then: (schema) => schema.required('Wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),
//   id_badan_hukum: Yup.string().when('id_jenis_korporasi', {
//     is: 'indonesia',
//     then: (schema) => schema.required('Wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   // Validasi untuk perseorangan
//   kewarganegaraan: Yup.string().when('jenis_pendaftaran', {
//     is: 'perseorangan',
//     then: (schema) => schema.required('Wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   // Informasi umum
//   nama: Yup.string().required('Wajib diisi'),
//   nama_debitur: Yup.string().when(['kewarganegaraan', 'jenis_pendaftaran'], {
//     is: (kewarganegaraan, jenis_pendaftaran) =>
//       kewarganegaraan === 'wna' ||
//       jenis_pendaftaran === 'kooperasi' ||
//       jenis_pendaftaran === 'perseorangan',
//     then: (schema) => schema.required('Nama Debitur wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   jenis_kelamin: Yup.string().when('jenis_pendaftaran', {
//     is: 'perseorangan',
//     then: (schema) => schema.required(),
//     otherwise: (schema) => schema.notRequired('Jenis kelamin Wajib diisi'),
//   }),

//   email: Yup.string()
//     .required('Email wajib diisi')
//     .email('Format email tidak valid')
//     .max(30, 'Email maksimal 30 karakter'),

//   no_tlpon: Yup.string()
//     .required('Nomor Telepon wajib diisi')
//     .matches(NO_TELP_REGEX, 'Format Nomor Telepon tidak valid')
//     .min(10, 'Nomor Telepon minimal 10 digit')
//     .max(14, 'Nomor Telepon maksimal 14 digit'),

//   // NIK Validation
//   nik: Yup.string().when('jenis_pendaftaran', {
//     is: 'perseorangan',
//     then: (schema) =>
//       schema
//         .required('NIK wajib diisi')
//         // .matches(NIK_REGEX, 'Format NIK tidak valid')
//         .length(16, 'NIK harus 16 digit'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   npwp: Yup.string().when(['jenis_pendaftaran', 'id_jenis_korporasi'], {
//     is: (jenis_pendaftaran, id_jenis_korporasi) =>
//       !(jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2),
//     then: (schema) => schema.required('NPWP wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   no_sk: Yup.string().when(['jenis_pendaftaran', 'id_jenis_korporasi'], {
//     is: (jenis_pendaftaran, id_jenis_korporasi) =>
//       !(jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2) &&
//       jenis_pendaftaran !== 'perseorangan',
//     then: (schema) => schema.required('Nomor SK wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   // Validasi Nama Kantor
//   nama_kantor: Yup.string().when(['jenis_pendaftaran', 'id_jenis_korporasi'], {
//     is: (jenis_pendaftaran, id_jenis_korporasi) =>
//       !(jenis_pendaftaran === 'kooperasi' && id_jenis_korporasi === 2) &&
//       jenis_pendaftaran !== 'perseorangan',
//     then: (schema) => schema.required('Wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   no_paspor: Yup.string().when(['jenis_pendaftaran', 'kewarganegaraan'], {
//     is: (jenis_pendaftaran, kewarganegaraan) =>
//       jenis_pendaftaran === 'perseorangan' && kewarganegaraan === 'WNA',
//     then: (schema) => schema.required('No Passport Wajib diisi'),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   ...createRegionValidation(),
// });

// const IdentitasPenerimaValidationSchema = Yup.object({
//   ...CustomeIdentitasPenerimaValidationSchema.fields,
//   penerima_fisudia: Yup.array()
//     .min(1, 'Minimal satu penerima fidusia harus diisi')
//     .of(
//       Yup.object({
//         ...CustomeIdentitasPenerimaValidationSchema.fields,
//       })
//     ),
// });

// export default IdentitasPenerimaValidationSchema;
