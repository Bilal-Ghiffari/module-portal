import LineDashed from "@/components/Common/Line/Dashed";
import InformasiAyah from "./InformasiAyah";
import InformasiIbu from "./InformasiIbu";
import { Box } from "@mui/material";

const IdentitasOrtu = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <InformasiAyah formik={formik} />
      <LineDashed />
      <InformasiIbu formik={formik} />
    </Box>
  );
};

export default IdentitasOrtu;
