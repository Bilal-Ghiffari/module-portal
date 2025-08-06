import LineDashed from "@/components/Common/Line/Dashed";
import DataPasanganSection from "./InfromasiDataPasangan";
import { Box } from "@mui/material";
import DataAnakSection from "./InformasiDataAnak";

const IdentitasKeluargaSection = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <DataPasanganSection formik={formik} />
      <LineDashed />
      <DataAnakSection formik={formik} />
    </Box>
  );
};

export default IdentitasKeluargaSection;
