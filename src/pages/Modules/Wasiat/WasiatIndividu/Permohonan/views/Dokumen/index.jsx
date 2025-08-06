import LineDashed from "@/components/Common/Line/Dashed";
import { Box } from "@mui/material";
import { CustomButton } from "@/components/Common/Button";
import FormInformasiDokumen from "./InformasiDokumen";
import InformasiFile from "./InformasiFile";
import Checked from "@/components/Common/Checked";

const DokumenPermohonan = ({ formik, nextStep, prevStep }) => {
  return (
    <div className="mt-4">
      <Box
        sx={{
          borderRadius: "16px",
          border: "1px solid #E7E7E7",
          padding: "16px",
          mb: 4,
        }}
      >
        <FormInformasiDokumen formik={formik} />
        <LineDashed />
        <InformasiFile formik={formik} />
        <LineDashed />
        <div className="px-4">
          <Checked
            fontSize="0.85rem"
            label="Jika saya dalam proses pengisian data pada format isian tidak sesuai dengan data yang sebenarnya, maka saya bersedia menerima sanksi sesuai dengan peraturan perundang-undangan."
            value="1"
            fieldName={"persetujuan"}
            formik={formik}
          />
        </div>
      </Box>
      <div className="d-flex flex-row justify-content-end mb-3">
        <CustomButton
          text={"Kembali"}
          onClick={prevStep}
          textColor="#041662"
          bgColor="transparent"
          border="1px solid #E7E7E7"
        />
        <CustomButton text={"Selanjutnya"} onClick={nextStep} />
      </div>
    </div>
  );
};

export default DokumenPermohonan;
