import LineDashed from "@/components/Common/Line/Dashed";
import { Box } from "@mui/material";
import InformasiAyahSection from "./DataAyah";
import InformasiIbuSection from "./DataIbu";
import InformasiPasanganSection from "./DataPasangan";

const IdentitasKeluargaSection = ({ formik }) => {
  const { values } = formik;
  console.log(values.statusPerkawinan);
  const isKawin = values.statusPerkawinan === "Kawin";
  const isBelumKawin = values.statusPerkawinan === "Belum Kawin";
  const isCerai =
    values.statusPerkawinan === "Cerai Hidup" ||
    values.statusPerkawinan === "Cerai Mati";
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      {(isBelumKawin || isCerai) && (
        <>
          <InformasiAyahSection formik={formik} />
          <LineDashed />
          <InformasiIbuSection formik={formik} />
          <LineDashed />
        </>
      )}
      {isKawin && (
        <>
          <InformasiPasanganSection formik={formik} />
          <LineDashed />
        </>
      )}
    </Box>
  );
};

export default IdentitasKeluargaSection;
