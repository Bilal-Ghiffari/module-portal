import * as Yup from "yup";

const AsetValidationSchema = {
  nilaiAset: Yup.number()
    .min(1, "Minimal Rp 1")
    .required("Nilai Aset wajib diisi"),
};

export default AsetValidationSchema;
