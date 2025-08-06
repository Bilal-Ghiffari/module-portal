import * as Yup from "yup";

const AktaNotarisValidationSchema = {
  noAkta: Yup.string()
    .required("Nomor Akta wajib diisi"),
  tanggalAkta: Yup.date()
    .required("Tanggal Akta wajib diisi")
    .typeError("Tanggal Akta tidak valid"),
  provinsiAkta: Yup.string().required("Provinsi wajib dipilih"),
  kotakabAkta: Yup.string().required("Kabupaten/Kota wajib dipilih"),
  namaNotaris: Yup.string().required("Nama Notaris wajib diisi"),
  kedudukanNotaris: Yup.string().required("Kedudukan Notaris wajib diisi"),
  notarisPengganti: Yup.string().required(
    "Harap pilih apakah memiliki Notaris Pengganti"
  ),
  namaNotarisPengganti: Yup.string().when("notarisPengganti", {
    is: "ya",
    then: (schema) => schema.required("Nama Notaris Pengganti wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
};

export default AktaNotarisValidationSchema;
