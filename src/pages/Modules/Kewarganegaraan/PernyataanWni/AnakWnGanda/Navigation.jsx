import { CustomButton } from "@/components/Common/Button";
import { ArrowForward, Drafts, Send } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";

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
  const isLastStep = activeStep === 5;
  const isFirstStep = activeStep === 0;
  const showDraftButton = activeStep > 0 && ![3, 4, 5].includes(activeStep);

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

      {showDraftButton && (
        <CustomButton
          text="Draft"
          bgColor="#f97316"
          border="1px solid #E7E7E7"
          textColor="#fff"
          hoverColor="#ea580c"
          onClick={handleDraft}
          rightIcon={<Drafts fontSize="14px" />}
          loading={postLoading || patchLoading}
        />
      )}

      {!isLastStep && (
        <CustomButton
          onClick={handleNext}
          loading={postLoading || patchLoading}
          text="Selanjutnya"
          bgColor="#041662"
          hoverColor="#1e40af"
        />
      )}

      {isLastStep && (
        <CustomButton
          onClick={handleSubmit}
          text="Submit Permohonan"
          bgColor="#041662"
          hoverColor="#1e40af"
          loading={isSubmitting}
        />
      )}
    </Box>
  );
};

export default NavigationButton;
