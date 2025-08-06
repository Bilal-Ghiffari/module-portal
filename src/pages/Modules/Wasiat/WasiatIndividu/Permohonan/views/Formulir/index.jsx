import LineDashed from "@/components/Common/Line/Dashed";
import { Box } from "@mui/material";
import FormInformasiPemohon from "./InformasiPemohon";
import { CustomButton } from "@/components/Common/Button";
import FormInformasiAlmarhum from "./InformasiAlmarhum";
import FormInformasiKematian from "./InformasiKematian";

const FormulirPermohonan = ({ formik, nextStep, prevStep }) => {
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
        <FormInformasiPemohon formik={formik} />
        <LineDashed />
        <FormInformasiAlmarhum formik={formik} />
        <LineDashed />
        <FormInformasiKematian formik={formik} />
        <LineDashed />
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

export default FormulirPermohonan;
