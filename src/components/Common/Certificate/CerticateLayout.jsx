import { Box } from "@mui/material";
import BlankCertificate from "./Frame 1171276625.png";
const CerticateLayout = ({ suratRef, children }) => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        mb: 3,
        width: "210mm",
        height: "330mm",
        margin: "0 auto",
      }}
    >
      <div
        ref={suratRef}
        style={{
          padding: 35,
          fontFamily: "Times New Roman",
          fontSize: 12,
          lineHeight: 1.6,
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={BlankCertificate}
          alt="Blank Certificate Template"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            paddingLeft: 30,
            paddingRight: 30,
            color: "#000000",
          }}
        >
          {children}
        </div>
      </div>
    </Box>
  );
};

export default CerticateLayout;
