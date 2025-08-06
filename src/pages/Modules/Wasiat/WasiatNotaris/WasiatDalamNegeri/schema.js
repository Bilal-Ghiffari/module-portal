import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  voucher: Yup.string().required("Kode voucher wajib diisi"),

  // Informasi Akta Wasiat
  jenis_akta: Yup.string().required("Jenis akta wajib diisi"),
  nomor_akta: Yup.string().required("Nomor akta wajib diisi"),
  tgl_akta: Yup.date().required("Tanggal akta wajib diisi"),
  no_repertorium: Yup.string().required("Nomor repertorium wajib diisi"),

  // Informasi Pemberi Wasiat
  nama_lengkap_pemberi: Yup.string().required("Nama lengkap wajib diisi"),
  alias_pemberi: Yup.string().required("Alias wajib diisi"),
  nik_pemberi: Yup.string()
    .required("NIK wajib diisi")
    .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka"),
  pekerjaan_pemberi: Yup.string().required("Pekerjaan wajib diisi"),
  tempat_lahir_pemberi: Yup.string().required("Tempat lahir wajib diisi"),
  tgl_lahir_pemberi: Yup.date().required("Tanggal lahir wajib diisi"),

  // Informasi Alamat Wasiat
  id_provinsi_pemberi: Yup.string().required("Provinsi wajib diisi"),
  id_kab_kota_pemberi: Yup.string().required("Kab/Kota wajib diisi"),
  id_kec_pemberi: Yup.string().required("Kecamatan wajib diisi"),
  id_kel_pemberi: Yup.string().required("Kelurahan wajib diisi"),
  no_hp_pemberi: Yup.string()
    .required("No HP wajib diisi")
    .matches(/^62[0-9]{8,11}$/, "Format nomor HP tidak valid"),
  email_pemberi: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  rt_pemberi: Yup.string().required("RT wajib diisi"),
  rw_pemberi: Yup.string().required("RW wajib diisi"),
  kode_pos_pemberi: Yup.string()
    .required("Kode Pos wajib diisi")
    .matches(/^[0-9]{5}$/, "Kode pos harus 5 digit"),
  alamat_pemberi: Yup.string().required("Alamat wajib diisi"),

  pratinjau: Yup.string().required("Rules wajib dicentang"),
});

export default validationSchema;
