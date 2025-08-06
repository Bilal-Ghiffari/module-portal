import * as Yup from "yup";

const ValidationSchemaInformasiDokumen = Yup.object().shape({
  setuju: Yup.boolean().oneOf([true], "Wajib menyetujui Informasi Dokumen"),
  dataPemilikManfaat: Yup.array().min(
    1,
    "Minimal harus memiliki 1 Pemilik Manfaat"
  ),
});

export default ValidationSchemaInformasiDokumen;
