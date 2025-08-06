import * as Yup from "yup";

const ValidationSchemaPengajuanNama = Yup.object().shape({
  namaPemohon: Yup.string().required("Nama pemohon wajib diisi"),
  telepon: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon harus berupa angka")
    .required("Nomor telepon wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),

  alamat: Yup.string().required("Alamat wajib diisi"),
  provinsi: Yup.string().required("Provinsi wajib diisi"),
  kotakab: Yup.string().required("Kabupaten/Kota wajib diisi"),
  kecamatan: Yup.string().required("Kecamatan wajib diisi"),
  kelurahan: Yup.string().required("Kelurahan wajib diisi"),
  rt: Yup.string()
    .matches(/^[0-9]+$/, "RT harus berupa angka")
    .max(3, "RT maksimal 3 digit")
    .required("RT wajib diisi"),
  rw: Yup.string()
    .matches(/^[0-9]+$/, "RW harus berupa angka")
    .max(3, "RW maksimal 3 digit")
    .required("RW wajib diisi"),
  kodePos: Yup.string()
    .matches(/^[0-9]+$/, "Kode Pos harus berupa angka")
    .max(5, "Kode Pos maksimal 5 digit")
    .required("Kode Pos wajib diisi"),

  namaCV: Yup.string().required("Nama CV wajib diisi"),
  singkatanCV: Yup.string().required("Singkatan CV wajib diisi"),

  setuju: Yup.boolean()
    .oneOf([true], "Anda harus menyetujui pernyataan ini")
    .required("Pernyataan wajib disetujui"),
});

export default ValidationSchemaPengajuanNama;
