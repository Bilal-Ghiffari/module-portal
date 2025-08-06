import { Stepper, Step, StepLabel } from "@mui/material";

const MultiStepForm = ({ steps, activeStep }) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        "& .MuiStepConnector-root": {
          top: 10,
          left: "calc(-50% + 16px)",
          right: "calc(50% + 16px)",
        },
        "& .MuiStepConnector-line": {
          borderTopStyle: "dashed",
          borderTopWidth: 2,
          borderColor: "#E7E7E7",
        },
        "& .MuiStepConnector-active .MuiStepConnector-line": {
          borderColor: "#041662",
        },
        "& .MuiStepConnector-completed .MuiStepConnector-line": {
          borderColor: "#041662",
        },
      }}
    >
      {steps.map((step, index) => {
        return (
          <Step key={step.id}>
            <StepLabel>
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#888888",
                }}
              >
                {step.label}
              </span>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default MultiStepForm;
