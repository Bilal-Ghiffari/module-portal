import { Box } from "@mui/material";
import InformasiAyahSection from "./InformasiAyah";
import LineDashed from "@/components/Common/Line/Dashed";
import InformasiIbuSection from "./InformasiIbu";

const IdentitasOrtu = ({ formik }) => {
  return (
    <>
      <Box
        className="mt-3 mb-3"
        sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
      >
        <InformasiAyahSection formik={formik} />
        <LineDashed />
        <InformasiIbuSection formik={formik} />
      </Box>
    </>
  );
};

export default IdentitasOrtu;
