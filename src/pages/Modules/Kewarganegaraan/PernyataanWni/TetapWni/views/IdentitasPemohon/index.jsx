import { Box } from "@mui/material";
import IdentitasDiriSection from "./IdentitasPemohon";
import IdentitasAlamatPemohon from "./IdentitasAlamat";
import LineDashed from "@/components/Common/Line/Dashed";
import IdentitasKependudukan from "./IdentitasKependudukan";
import IdentitasPerkawinan from "./IdentitasPerkawinan";
import IdentitasPerjalanan from "./IdentitasPerjalanan";

const IdentitasPemohonSection = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <IdentitasDiriSection formik={formik} />
      <LineDashed />
      <IdentitasAlamatPemohon formik={formik} />
      <LineDashed />
      <IdentitasKependudukan formik={formik} />
      <LineDashed />
      <IdentitasPerkawinan formik={formik} />
      <LineDashed />
      <IdentitasPerjalanan formik={formik} />
    </Box>
  );
};

export default IdentitasPemohonSection;
