import * as Yup from "yup";

const pengurusValidationSchema = Yup.object().shape({
  namaPengurus: Yup.string().required("Nama Pengurus wajib diisi"),
  nik: Yup.string()
    .matches(/^\d+$/, "NIK harus berupa angka")
    .length(16, "NIK harus 16 digit")
    .required("NIK wajib diisi"),
  jabatan: Yup.string().required("Jabatan wajib diisi"),
  pekerjaan: Yup.string().required("Pekerjaan wajib diisi"),
  alamatDomisili: Yup.string().required("Alamat wajib diisi"),
  nomorNPWP: Yup.string()
    .matches(/^\d+$/, "NPWP harus berupa angka")
    .min(15, "NPWP minimal 15 digit")
    .max(16, "NPWP maksimal 16 digit")
    .required("NPWP wajib diisi"),
});

export default pengurusValidationSchema;
