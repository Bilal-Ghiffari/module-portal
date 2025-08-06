import { Check, TextSnippet } from "@mui/icons-material";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { BsFiletypePdf } from "react-icons/bs";

const VerticalStepper = ({ step = [], activeStep = 0 }) => {
  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {step.map((step, index) => (
        <Step
          key={step.label}
          sx={{
            "& .MuiStepLabel-root": {
              alignItems: "flex-start",
              ...(index === activeStep && {
                marginBottom: "0px",
              }),
            },

            "& .MuiStepLabel-labelContainer": {
              borderRadius: "4px",
              padding: "8px 12px",
              marginRight: "8px",
              width: "100%",
              marginTop: "-4px",
            },
            "& .MuiStepContent-root": {
              display: "none",
            },
            "& .MuiStepConnector-line": {
              borderTopStyle: "dashed",
              borderTopWidth: 2,
              color: "#E7E7E7",
            },
          }}
        >
          <StepLabel StepIconComponent={CustomStepIcon}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#262626",
                  }}
                >
                  {step.label}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#6D6D6D",
                  }}
                >
                  {step.description}
                </Typography>
                {step.subDescription && (
                  <Button
                    sx={{
                      border: "1px solid #E7E7E7",
                      borderRadius: "4px",
                    }}
                  >
                    <BsFiletypePdf color="#041662" />
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#041662",
                        textTransform: "initial",
                        marginLeft: 1,
                      }}
                    >
                      {step.subDescription}
                    </Typography>
                  </Button>
                )}
              </div>
              <div>{step.time}</div>
            </Box>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        border: `2px solid ${completed ? "#1F7C4D" : "#B0B0B0"}`,
        backgroundColor: completed ? "#1F7C4D" : "transparent",
      }}
    >
      {completed ? <Check sx={{ color: "#fff", fontSize: 20 }} /> : null}
    </Box>
  );
};

export default VerticalStepper;
