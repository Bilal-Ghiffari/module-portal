import { CustomButton } from "@/components/Common/Button";
import { ArrowForward, Drafts, Send } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { useSubmit } from "./hooks/useSubmit";
import { usePatchPermohonan } from "./hooks/usePatchPermohonan";

const NavigationButton = ({
  handleSubmit,
  handleNext,
  handleBack,
  handleDraft,
  activeStep,
  stepsResult,
  isSubmitting = false,
  postLoading = false,
  patchLoading = false,
}) => {
  // Determine if we're on the last step (Upload Documents = step 4)
  const isLastStep = activeStep === 5;
  const isFirstStep = activeStep === 0;
  const step3 = activeStep === 3;
  const step4 = activeStep === 4;

  console.log("Current Step", activeStep);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 0,
        pt: 2,
        px: 2,
      }}
    >
      {activeStep > 1 && (
        <CustomButton
          text="Kembali"
          bgColor="transparent"
          border="1px solid #E7E7E7"
          textColor="#041662"
          disabled={isFirstStep}
          onClick={handleBack}
        />
      )}

      {!isFirstStep && !step3 && !step4 && !isLastStep && (
        <CustomButton
          text="Draft"
          bgColor="#f97316"
          border="1px solid #E7E7E7"
          textColor="#fff"
          hoverColor="#ea580c"
          onClick={handleDraft}
          rightIcon={<Drafts fontSize="14px" />}
          loading={patchLoading || postLoading}
        />
      )}

      {!isLastStep && (
        <CustomButton
          onClick={handleNext}
          text="Selanjutnya"
          bgColor="#041662"
          hoverColor="#1e40af"
          loading={patchLoading || postLoading}
        />
      )}

      {isLastStep && (
        <CustomButton
          onClick={handleSubmit}
          text="Submit Permohonan"
          bgColor="#041662"
          hoverColor="#1e40af"
        />
      )}
    </Box>
  );
};

export default NavigationButton;
