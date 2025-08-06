import { Stepper, Step, StepLabel, useTheme } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

const MultiStepForm = ({
  steps,
  activeStep,
  isStepSkipped,
  isStepValid,
  isStepHasError,
}) => {
  const theme = useTheme();

  const getStepIcon = (index, active, completed) => {
    const hasError = isStepHasError && isStepHasError(index);
    const isValid = isStepValid && isStepValid(index);

    let backgroundColor = "#fff";
    let color = "#041662";
    let borderColor = "#E7E7E7";

    if (hasError) {
      // backgroundColor = theme.palette.error.main;
      backgroundColor = "#041662";
      color = "#fff";
      // borderColor = theme.palette.error.main;
      borderColor = "#041662";
    } else if (active || completed || isValid) {
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
        {/* {hasError ? (
          <Error fontSize="small" />
        ) : isValid ? (
          <CheckCircle fontSize="small" />
        ) : (
          index + 1
        )} */}
        {index + 1}
      </div>
    );
  };
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
        const stepProps = {};
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }

        return (
          <Step key={step.id} {...stepProps}>
            <StepLabel
            // StepIconComponent={({ active, completed }) =>
            //   getStepIcon(index, active, completed)
            // }
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
