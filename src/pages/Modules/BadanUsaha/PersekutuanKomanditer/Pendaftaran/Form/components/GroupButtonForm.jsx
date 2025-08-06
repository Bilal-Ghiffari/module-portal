import { CustomButton } from "@/components/Common/Button";
import { ArrowForward } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useFormikContext } from "formik";

const GroupButtonForm = ({
  steps = [],
  activeStep = 0,
  handleBack = () => {},
  useFormik = true,
  onSubmit: customSubmit = () => {},
  onDraft = () => {},
  showDraft = true,
}) => {
  const formik = useFormik ? useFormikContext() : null;

  const handleDraft = () => {
    if (useFormik && formik) {
      console.log("Simpan draft values:", formik.values);
    }
    onDraft(formik?.values || {});
  };

  const handleNext = () => {
    if (useFormik && formik) {
      formik.submitForm();
    } else {
      customSubmit();
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        pt: 2,
        px: 2,
        gap: 2,
      }}
    >
      {activeStep !== 0 && (
        <CustomButton
          text="Kembali"
          bgColor="transparent"
          border="1px solid #E7E7E7"
          textColor="#041662"
          onClick={handleBack}
        />
      )}

      {showDraft && (
        <CustomButton
          text="Simpan Draft"
          bgColor="#f97316"
          border="1px solid #E7E7E7"
          textColor="#fff"
          hoverColor="#ea580c"
          onClick={handleDraft}
        />
      )}

      <CustomButton
        type="submit"
        onClick={handleNext}
        text={isLastStep ? "Submit" : "Selanjutnya"}
        rightIcon={<ArrowForward fontSize="14" />}
      />
    </Box>
  );
};

export default GroupButtonForm;
