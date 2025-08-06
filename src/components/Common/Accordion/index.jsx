import { ExpandCircleDownRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";

const CustomAccordion = ({ title, children, defaultExpanded = true }) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      sx={{
        borderRadius: "8px",
        "&.Mui-expanded": {
          border: "none",
          boxShadow: "none",
          borderRadius: "8px",
          margin: "0px",
        },
        "& .MuiAccordionSummary-root": {
          borderRadius: "8px 8px 0 0",
          border: "none",
        },
        "& .MuiAccordionDetails-root": {
          borderRadius: "0 0 8px 8px",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandCircleDownRounded
            sx={{
              color: "#041662",
              border: "1px solid #E7E7E7",
              borderRadius: "6px",
            }}
          />
        }
        aria-controls={`panel-${title.replace(/\s/g, "")}-content`}
        id={`panel-${title.replace(/\s/g, "")}-header`}
        sx={{
          backgroundColor: "#EFF7FF",
          "&.Mui-expanded": {
            borderRadius: "4px 4px 0 0",
          },
          "& .MuiAccordionSummary-content": {
            my: 1,
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "#041662",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, py: 2 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
