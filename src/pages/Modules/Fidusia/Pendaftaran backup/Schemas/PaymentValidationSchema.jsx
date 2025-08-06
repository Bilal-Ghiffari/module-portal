import * as Yup from 'yup';

export const PAYMENT_STATUS = {
  BELUM_BAYAR: 'BELUM_BAYAR',
  SUKSES: 'SUKSES',
  GAGAL: 'GAGAL',
};

// Generate kode voucher
const generateVoucherCode = () => {
  const now = new Date();
  return `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${Math.floor(
    Math.random() * 1000000
  )
    .toString()
    .padStart(6, '0')}`;
};

export const initialValuesPayment = {
  status: PAYMENT_STATUS.BELUM_BAYAR,
  kode_voucher: generateVoucherCode(),
  nama_pemohon: '',
  email_pemohon: '',
  nomor_hp: '',
  wilayah: '',
  tagihan: 0,
  tanggal_transaksi: '',
  tanggal_expired: '',
  jenis_identitas: 'pemberi',
  jenis_transaksi: 'pendaftaran',
};

const PaymentValidationSchema = Yup.object({
  // Status pembayaran wajib diisi dan hanya boleh nilai tertentu
  status: Yup.string()
    .oneOf(Object.values(PAYMENT_STATUS), 'Status pembayaran tidak valid')
    .required('Status pembayaran wajib diisi'),

  // Kode voucher wajib diisi
  // kode_voucher: Yup.string()
  //   .required('Kode voucher wajib diisi')
  //   .min(10, 'Kode voucher minimal 10 karakter'),
  // // Informasi pembayaran
  // nama_pemohon: Yup.string()
  //   .required('Nama pemohon wajib diisi')
  //   .max(100, 'Nama pemohon maksimal 100 karakter'),
  // email_pemohon: Yup.string()
  //   .required('Email pemohon wajib diisi')
  //   .email('Format email tidak valid'),
  // nomor_hp: Yup.string()
  //   .required('Nomor HP wajib diisi')
  //   .matches(/^[0-9]{10,14}$/, 'Nomor HP tidak valid'),
  // // Informasi tambahan pembayaran
  // tagihan: Yup.number()
  //   .required('Tagihan wajib diisi')
  //   .positive('Tagihan harus bernilai positif')
  //   .min(1, 'Tagihan minimal 1'),
  // // Tanggal transaksi
  // tanggal_transaksi: Yup.date()
  //   .required('Tanggal transaksi wajib diisi')
  //   .max(new Date(), 'Tanggal transaksi tidak boleh di masa depan'),
  // // Tanggal expired
  // tanggal_expired: Yup.date()
  //   .required('Tanggal expired wajib diisi')
  //   .min(
  //     Yup.ref('tanggal_transaksi'),
  //     'Tanggal expired harus setelah tanggal transaksi'
  //   ),
  // Wilayah opsional tapi dengan validasi jika diisi
  // wilayah: Yup.string().notRequired().max(100, 'Wilayah maksimal 100 karakter'),
});

export default PaymentValidationSchema;
