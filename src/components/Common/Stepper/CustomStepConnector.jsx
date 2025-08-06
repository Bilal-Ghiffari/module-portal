import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`& .${stepConnectorClasses.line}`]: {
    transition: "all 0.4s ease",
    borderTopWidth: 2,
    borderColor: "#E7E7E7",
    borderTopStyle: "dashed",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: "#041662",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: "#041662",
  },
}));

export default CustomStepConnector;
