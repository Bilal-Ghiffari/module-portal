import * as Yup from 'yup';

export const initialValuesInformasiJaminan = {
  nomor_akta_notaris: '',
  tgl_akta: '',
  id_notaris: '',
  nama_notaris: '',
  nama_perjanjian: '',
  no_perjanjian: '',
  tgl_perjanjian: '',
  tgl_mulai_perjanjian: '',
  tgl_akhir_perjanjian: '',

  // Penambahan untuk perjanjianPokok
  perjanjian_pokok: [
    {
      kurs: '',
      nominal: '',
      nominal_rupiah: '',
      terbilang_nominal: '',
      jenis_transaksi: '',
      id_transaksi: '',
    },
  ],
};

export const InformasiJaminanValidationSchema = Yup.object({
  nomor_akta_notaris: Yup.string().required('Wajib diisi'),
  tgl_akta: Yup.date().required('Wajib diisi'),
  id_notaris: Yup.string().required('Wajib diisi'),

  perjanjian_pokok: Yup.array()
    .of(
      Yup.object({
        id_perjanjian_pokok: Yup.string().required('Wajib diisi'),
        kurs: Yup.string().required('Wajib diisi'),
        nilai_kurs: Yup.string().required('Wajib diisi'),
        nilai_nominal: Yup.number().required('Wajib diisi'),
        nilai_nominal_rupiah: Yup.number().required('Wajib diisi'),
        terbilang_nominal: Yup.string().required('Wajib diisi'),
      })
    )
    .min(1, 'Anda harus menambahkan setidaknya satu perjanjian pokok'),

  nama_perjanjian: Yup.string().required('Wajib diisi'),
  no_perjanjian: Yup.string().required('Wajib diisi'),
  tgl_perjanjian: Yup.date().required('Wajib diisi'),
  tgl_mulai_perjanjian: Yup.date().required('Wajib diisi'),
  tgl_akhir_perjanjian: Yup.date().required('Wajib diisi'),
});

export default InformasiJaminanValidationSchema;
