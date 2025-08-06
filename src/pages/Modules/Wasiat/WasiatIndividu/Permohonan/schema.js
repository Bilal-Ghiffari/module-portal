import { pdfValidation } from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";

export const validationSchema = {
  // Voucher
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),

  // Informasi Pemohon Surat Keterangan Wasiat
  1: object({
    nama_lengkap_pemohon: string().required("Nama lengkap pemohon wajib diisi"),
    nomor_hp_pemohon: string()
      .required("Nomor HP wajib diisi")
      .matches(/^62[0-9]{8,11}$/, "Format nomor HP tidak valid"),
    email_pemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    provinsi_pemohon: string().required("Provinsi wajib diisi"),
    kab_kota_pemohon: string().required("Kabupaten/Kota wajib diisi"),
    kec_pemohon: string().required("Kecamatan wajib diisi"),
    kel_pemohon: string().required("Kelurahan wajib diisi"),
    rt_pemohon: string().required("RT wajib diisi"),
    rw_pemohon: string().required("RW wajib diisi"),
    kode_pos_pemohon: string()
      .required("Kode Pos wajib diisi")
      .matches(/^[0-9]{5}$/, "Kode pos harus 5 digit"),
    alamat_lengkap_pemohon: string().required("Alamat wajib diisi"),

    // Informasi Almarhum/Almarhumah
    nama_lengkap_almh: string().required(
      "Nama lengkap almarhum/almarhumah wajib diisi"
    ),
    alias_almh: string().required("Alias almarhum/almarhumah wajib diisi"),
    provinsi_almh: string().required("Provinsi wajib diisi"),
    kab_kota_almh: string().required("Kabupaten/Kota wajib diisi"),
    kec_almh: string().required("Kecamatan wajib diisi"),
    kel_almh: string().required("Kelurahan wajib diisi"),
    rt_almh: string().required("RT wajib diisi"),
    rw_almh: string().required("RW wajib diisi"),
    kode_pos_almh: string()
      .required("Kode Pos wajib diisi")
      .matches(/^[0-9]{5}$/, "Kode pos harus 5 digit"),
    alamat_lengkap_almh: string().required("Alamat wajib diisi"),

    // Informasi Kematian
    tgl_kematian: date().required("Tanggal kematian wajib diisi"),
    tempat_kematian: string().required("Tempat meninggal wajib diisi"),
    provinsi_kematian: string().required("Provinsi wajib diisi"),
    kab_kota_kematian: string().required("Kabupaten/Kota wajib diisi"),
    negara_kematian: string().required("Negara meninggal wajib diisi"),
    kota_negara_kematian: string().required(
      "Kota negara meninggal wajib diisi"
    ),
    alamat_lengkap_kematian: string().required("Alamat meninggal wajib diisi"),
  }),

  2: object({
    // Informasi Dokumen Kematian
    jenis_dokumen_kematian: string().required(
      "Jenis dokumen kematian wajib diisi"
    ),
    dikeluarkan_oleh: string().required("Wajib diisi"),
    nomor_dokumen_kematian: string().required(
      "Nomor dokumen kematian wajib diisi"
    ),
    tgl_dokumen_kematian: string().required(
      "Tanggal dokumen kematian wajib diisi"
    ),
    provinsi_dokumen_kematian: string().required(
      "Provinsi dokumen kematian wajib diisi"
    ),
    kab_kota_dokumen_kematian: string().required(
      "Kab/Kota dokumen kematian wajib diisi"
    ),
    kec_dokumen_kematian: string().required(
      "Kecamatan dokumen kematian wajib diisi"
    ),
    kel_dokumen_kematian: string().required(
      "Kelurahan dokumen kematian wajib diisi"
    ),

    // Upload Dokumen
    surat_pemohonan: pdfValidation,
    dok_catatan_sipil: pdfValidation,
    surat_ganti_nama: pdfValidation,
    akta_kelahiran: pdfValidation,
    akta_perkawinan: pdfValidation,

    persetujuan: string().required(
      "Mohon untuk menyetujui jika formulir yang dimasukkan sudah benar"
    ),
  }),
};

export default validationSchema;
