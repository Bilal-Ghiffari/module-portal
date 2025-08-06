import { Box } from "@mui/material";
import InformasiPribadiSection from "./identitasPribadi";
import LineDashed from "@/components/Common/Line/Dashed";
import InformasiAlamatSection from "./DataAlamat";
import InformasiDokSipil from "./DokumenSipil";
import InformasiDokPaspor from "./DokumenPaspor";

const IdentitasPemohonSection = ({ formik }) => {
  const { values } = formik;
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <InformasiPribadiSection formik={formik} />
      <LineDashed />
      <InformasiAlamatSection formik={formik} />
      <LineDashed />
      <InformasiDokSipil formik={formik} />
      <LineDashed />
      <InformasiDokPaspor formik={formik} />
    </Box>
  );
};

export default IdentitasPemohonSection;
