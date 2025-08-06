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

const VerticalStepper = ({
  step = [],
  activeStep = 0,
  canShowSk = false,
  onClickSk,
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        "& .MuiStepConnector-root": {
          ml: "11px",
        },
      }}
    >
      {step.map((step, index) => (
        <Step
          key={`${index}-${step.label}`}
          sx={{
            "& .MuiStepLabel-root": {
              alignItems: "flex-start",
              ...(index === activeStep && {
                marginBottom: "0px",
              }),
            },
            "& .MuiStepLabel-labelContainer": {
              borderRadius: "6px",
              padding: "12px 16px",
              marginRight: "8px",
              width: "100%",
              marginTop: "-18px",
              backgroundColor: index === activeStep ? "#F5F9FF" : "transparent",
              border: index === activeStep ? "1px solid #D6E4FF" : "none",
              transition: "all 0.3s ease",
            },
            "& .MuiStepContent-root": {
              display: "none",
            },
            "& .MuiStepConnector-line": {
              borderLeftStyle: "dashed",
              borderLeftWidth: 2,
              color: "#E7E7E7",
              minHeight: "24px",
            },
            "&:last-child .MuiStepConnector-line": {
              display: "none", // Hide connector for last step
            },
          }}
        >
          <StepLabel StepIconComponent={CustomStepIcon}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                gap: 2,
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: index === activeStep ? 600 : 500,
                    color: index === activeStep ? "#041662" : "#262626",
                    mb: 0.5,
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
                    lineHeight: 1.4,
                  }}
                >
                  {step.description}
                </Typography>

                {step.subDescription && canShowSk && (
                  <Button
                    onClick={onClickSk}
                    sx={{
                      border: "1px solid #E7E7E7",
                      borderRadius: "4px",
                      mt: 1.5,
                      px: 1.5,
                      py: 0.5,
                      "&:hover": {
                        backgroundColor: "#F5F5F5",
                      },
                    }}
                    disabled={!canShowSk}
                  >
                    <BsFiletypePdf color="#041662" size={16} />
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#041662",
                        textTransform: "initial",
                        marginLeft: 1,
                      }}
                    >
                      Cetak SK
                    </Typography>
                  </Button>
                )}
              </div>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#8C8C8C",
                  whiteSpace: "nowrap",
                  pt: 0.5,
                }}
              >
                {step.time}
              </Typography>
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
        border: `2px solid ${
          completed ? "#1F7C4D" : active ? "#041662" : "#B0B0B0"
        }`,
        backgroundColor: completed
          ? "#1F7C4D"
          : active
          ? "#041662"
          : "transparent",
        position: "relative",
        zIndex: 1,
        "&:before": {
          content: '""',
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: "50%",
          // backgroundColor: completed ? "#fff" : active ? "#fff" : "transparent",
        },
      }}
    >
      {completed ? (
        <Check sx={{ color: "#fff", fontSize: 16 }} />
      ) : active ? (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
        />
      ) : null}
    </Box>
  );
};

export default VerticalStepper;
