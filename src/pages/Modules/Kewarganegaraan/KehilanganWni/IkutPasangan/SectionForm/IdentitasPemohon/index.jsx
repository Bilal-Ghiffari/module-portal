import { Box } from "@mui/material";
import LineDashed from "@/components/Common/Line/Dashed";
import InformasiPribadiSection from "./InformasiPribadi";
import DataAlamatSection from "./InformasiAlamat";
import DokumenSipilSection from "./DokumenSipil";
import InformasiPasporSection from "./InformasiPaspor";

const IdentitasPemohon = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <InformasiPribadiSection formik={formik} />
      <LineDashed />
      <DataAlamatSection formik={formik} />
      <LineDashed />
      <DokumenSipilSection formik={formik} />
      <LineDashed />
      <InformasiPasporSection formik={formik} />
      <LineDashed />
    </Box>
  );
};

export default IdentitasPemohon;
