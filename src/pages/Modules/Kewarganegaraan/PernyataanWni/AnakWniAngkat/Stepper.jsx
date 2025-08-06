import CustomStepConnector from "@/components/Common/Stepper/CustomStepConnector";
import { Stepper, Step, StepLabel } from "@mui/material";

const MultiStepForm = ({
  steps,
  activeStep,
  isStepSkipped,
  isStepValid,
  isStepHasError,
}) => {
  const getStepIcon = (index, active, completed) => {
    let backgroundColor = "#fff";
    let color = "#041662";
    let borderColor = "#E7E7E7";

    if (active || completed) {
      backgroundColor = "#041662";
      color = "#fff";
      borderColor = "#041662";
    }

    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          transition: "all 0.3s ease",
        }}
      >
        {index + 1}
      </div>
    );
  };

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<CustomStepConnector />}
    >
      {steps.map((step, index) => {
        const stepProps = {};
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        } else if (index < activeStep) {
          stepProps.completed = true;
        }

        return (
          <Step key={step.id} {...stepProps}>
            <StepLabel
              StepIconComponent={({ active, completed }) =>
                getStepIcon(index, active, completed)
              }
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
