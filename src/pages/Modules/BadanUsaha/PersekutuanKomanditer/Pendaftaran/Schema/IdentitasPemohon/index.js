import * as Yup from "yup";
import DataCVValidationSchema from "./DataCVValidationSchema";
import AlamatCVValidationSchema from "./AlamatCVValidationSchema";
import AktaNotarisValidationSchema from "./AktaNotarisValidationSchema";
import AsetValidationSchema from "./AsetValidationSchema copy";

const ValidationSchemaIdentitasPemohon = Yup.object().shape({
  ...DataCVValidationSchema,
  ...AlamatCVValidationSchema,
  ...AktaNotarisValidationSchema,
  ...AsetValidationSchema,
  kegiatanUsaha: Yup.array().min(1, "Minimal 1 kegiatan usaha harus dipilih"),
  setujuKegiatanUsaha: Yup.boolean().oneOf(
    [true],
    "Wajib menyetujui Kegiatan Usaha"
  ),
  sekutu: Yup.array()
    .min(2, "Minimal harus memiliki 2 sekutu")
    .test(
      "minimal-1-aktif-1-pasif",
      "Harus memiliki satu sekutu aktif dan satu sekutu pasif",
      function (value) {
        if (!Array.isArray(value)) return false;

        const aktifCount = value.filter(
          (item) => item.jabatan === "aktif"
        ).length;
        const pasifCount = value.filter(
          (item) => item.jabatan === "pasif"
        ).length;

        return aktifCount >= 1 && pasifCount >= 1;
      }
    ),
  pengurus: Yup.array().min(1, "Minimal harus memiliki 1 pengurus"),
});

export default ValidationSchemaIdentitasPemohon;
