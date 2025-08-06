import * as Yup from "yup";

const PernyataanValidationSchema = Yup.object().shape({
  pernyataan: Yup.array()
    .min(4, "Semua pernyataan wajib disetujui")
    .required("Pernyataan wajib disetujui"),
  aktaPendiri: Yup.mixed()
    .required("File harus diunggah")
    .test("fileFormat", "Hanya menerima file PDF", (value) => {
      return value && value.type === "application/pdf";
    })
    .test("fileSize", "Ukuran maksimal 5MB", (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
  fcKeteranganAlamat: Yup.mixed()
    .required("File harus diunggah")
    .test("fileFormat", "Hanya menerima file PDF", (value) => {
      return value && value.type === "application/pdf";
    })
    .test("fileSize", "Ukuran maksimal 5MB", (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
});

export default PernyataanValidationSchema;
