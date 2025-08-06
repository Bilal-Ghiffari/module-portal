import * as Yup from 'yup';

export const initialValuesObyekJaminan = {
  id_jenis_kategori_obyek: '',
  value_jenis_kategori: [],
  kurs: '',
  nilai_kurs: '',
  nilai_nominal: '',
  nilai_nominal_rupiah: '',
  agreement: false,
  // agreement: '',
};

const ObyekJaminanValidationSchema = Yup.object({
  id_jenis_kategori_obyek: Yup.number().optional().nullable(),

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

  // agreement: Yup.string().required('aggrement wajib diisi'),
  // agreement: Yup.boolean().oneOf(
  //   [true],
  //   'Anda harus menyetujui syarat & ketentuan'
  // ),
  // agreement: Yup.boolean()
  //   .oneOf([true], 'Anda harus menyetujui syarat & ketentuan')
  //   .required('Agreement harus diisi'),
});

export default ObyekJaminanValidationSchema;
