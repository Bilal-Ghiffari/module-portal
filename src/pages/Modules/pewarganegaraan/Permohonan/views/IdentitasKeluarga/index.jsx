import LineDashed from "@/components/Common/Line/Dashed";
import { Box } from "@mui/material";
import InformasiPasanganSection from "./DataPasangan";

const IdentitasKeluargaSection = ({ formik }) => {
  const { values } = formik;

  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <InformasiPasanganSection formik={formik} />
      <LineDashed />
    </Box>
  );
};

export default IdentitasKeluargaSection;
