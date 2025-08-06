import { Box } from "@mui/material";
import InformasiPribadiSection from "./identitasPribadi";
import LineDashed from "@/components/Common/Line/Dashed";
import DataAlamatSection from "./DataAlamat";
import DokumenKelahiranSection from "./DokumenKelahiran";
import DokumenPerkawinanSection from "./DokumenPerkawinan";
import DokumenPerjalanSection from "./DokumenPerjalanan";

const IdentitasPemohonSection = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <InformasiPribadiSection formik={formik} />
      <LineDashed />
      <DataAlamatSection formik={formik} />
      <LineDashed />
      <DokumenKelahiranSection formik={formik} />
      <LineDashed />
      <DokumenPerkawinanSection formik={formik} />
      <LineDashed />
      <DokumenPerjalanSection formik={formik} />
    </Box>
  );
};

export default IdentitasPemohonSection;
