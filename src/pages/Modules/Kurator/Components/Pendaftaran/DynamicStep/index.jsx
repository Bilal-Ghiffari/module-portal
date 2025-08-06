import { Box } from "@mui/material";
import InformasiPemohon from "./InformasiPemohon";
import InformasiDokumen from "./InformasiDokumen";
import UnggahDokumen from "./UnggahDokumen";
import FormulirPermohonan from "./FormulirPermohonan";
import LaporanBerkalaKurator from "./Laporan/LaporanBerkalaKurator";
import FormLaporanBerkalaKurator from "./Laporan/FormLaporanBerkalaKurator";
import LaporanBerkalaPengurus from "./Laporan/LaporanBerkalaPengurus";
import FormLaporanBerkalaPengurus from "./Laporan/FormLaporanBerkalaPengurus";

const DynamicStep = ({ formik, disabled = false, label }) => {
  return (
    <div className="px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {label == "Informasi Pemohon" && (
          <InformasiPemohon formik={formik} disabled={disabled} />
        )}
        {label == "Informasi Dokumen" && (
          <InformasiDokumen formik={formik} disabled={disabled} />
        )}
        {label == "Unggah Dokumen" && (
          <UnggahDokumen formik={formik} disabled={disabled} />
        )}
        {label == "Formulir Permohonan" && (
          <FormulirPermohonan formik={formik} disabled={disabled} />
        )}
        {label == "Laporan Berkala Kurator" && (
          <LaporanBerkalaKurator formik={formik} disabled={disabled} />
        )}
        {label == "Form Laporan Berkala Kurator" && (
          <FormLaporanBerkalaKurator formik={formik} disabled={disabled} />
        )}
        {label == "Laporan Berkala Pengurus" && (
          <LaporanBerkalaPengurus formik={formik} disabled={disabled} />
        )}
        {label == "Form Laporan Berkala Pengurus" && (
          <FormLaporanBerkalaPengurus formik={formik} disabled={disabled} />
        )}
      </Box>
    </div>
  );
};

export default DynamicStep;
