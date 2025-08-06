import { CustomButton } from "@/components/Common/Button";
import { Box } from "@mui/material";
import PreviewInformasi from "./InformasiPemohon";

const PratinjauPermohonan = ({ formik, prevStep, nextStep }) => {
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
        <PreviewInformasi formik={formik} />
      </Box>
      <div className="d-flex flex-row justify-content-end mb-3">
        <CustomButton
          text={"Kembali"}
          onClick={prevStep}
          textColor="#041662"
          bgColor="transparent"
          border="1px solid #E7E7E7"
        />
        <CustomButton text={"Submit"} onClick={nextStep} />
      </div>
    </div>
  );
};

export default PratinjauPermohonan;
