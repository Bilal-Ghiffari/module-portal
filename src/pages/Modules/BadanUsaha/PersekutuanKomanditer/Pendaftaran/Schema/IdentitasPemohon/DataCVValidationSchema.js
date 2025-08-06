import * as Yup from "yup";

const DataCVValidationSchema = {
  namaCV: Yup.string().required("Nama CV wajib diisi"),
  singkatanCV: Yup.string().required("Singkatan wajib diisi"),
  npwpCV: Yup.string()
    .matches(/^\d+$/, "NPWP harus berupa angka")
    .min(15, "NPWP minimal 15 digit")
    .max(16, "NPWP maksimal 16 digit")
    .required("NPWP wajib diisi"),
  telepon: Yup.string().required("Nomor telepon wajib diisi"),
  email: Yup.string().email("Format email salah").required("Email wajib diisi"),
  jangkaWaktu: Yup.string().required("Pilih jangka waktu"),
  batasJangkaWaktu: Yup.number().when("jangkaWaktu", {
    is: "LIMITED",
    then: (schema) => schema.required("Harus diisi jika terbatas"),
    otherwise: (schema) => schema.notRequired(),
  }),
};

export default DataCVValidationSchema;
