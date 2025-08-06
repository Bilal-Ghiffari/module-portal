import { Stepper as MuiStepper, Step, StepLabel } from "@mui/material";
import CustomStepConnector from "./CustomStepConnector";

const HorizontalStepper = ({ activeStep, steps }) => {
  return (
    <MuiStepper
      activeStep={activeStep}
      alternativeLabel
      connector={<CustomStepConnector />}
      sx={{
        "& .MuiStepConnector-root": {
          top: 10,
          left: "calc(-50% + 16px)",
          right: "calc(50% + 16px)",
        },
        "& .MuiStepConnector-line": {
          borderTopStyle: "dashed",
          borderTopWidth: 2,
          color: "#E7E7E7",
        },
        "& .MuiStepLabel-label": {
          marginTop: "8px",
        },
      }}
    >
      {steps.map((label, idx) => (
        <Step key={idx}>
          <StepLabel
            StepIconComponent={({ active, completed }) => (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "1px solid #E7E7E7",
                  backgroundColor: active || completed ? "#041662" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active || completed ? "#fff" : "#041662",
                  transition: "all 0.3s ease",
                }}
              >
                {idx + 1}
              </div>
            )}
          >
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "18px",
                color: "#888888",
              }}
            >
              {label}
            </span>
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};

export default HorizontalStepper;
