import * as Yup from "yup";

const sekutuValidationSchema = Yup.object().shape({
  namaSekutu: Yup.string().required("Nama Sekutu wajib diisi"),
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
  kontribusi: Yup.string().required("Kontribusi wajib dipilih"),
  nilaiKontribusi: Yup.number()
    .typeError("Nilai kontribusi harus berupa angka")
    .positive("Nilai harus lebih dari 0")
    .required("Nilai kontribusi wajib diisi"),

  namaBarang: Yup.string().when("kontribusi", {
    is: "barang",
    then: (schema) =>
      schema.required("Jika kontribusi barang nama barang wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),

  setujuSekutu: Yup.boolean().oneOf([true], "Wajib menyetujui"),
});

export default sekutuValidationSchema;
