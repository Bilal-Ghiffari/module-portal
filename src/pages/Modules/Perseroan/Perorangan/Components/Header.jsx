import { Box, Typography } from "@mui/material";

const Header = ({ label, padding = 1 }) => {
  return (
    <Box
      className="d-flex align-items-center justify-content-between"
      sx={{
        backgroundColor: "#EFF7FF",
        padding: 1,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#041662",
          fontSize: "0.95rem",
          px: 0,
          fontFamily: "Poppins",
        }}
        className="fw-semibold"
      >
        {label}
      </Typography>
      {/* {disabled && (
        <button
          className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
          style={{
            backgroundColor: "#E7E7E7", // abu-abu muda
            borderRadius: "6px", // optional: biar agak rounded
          }}
        >
          <i className="mdi mdi-grease-pencil"></i>
          <p className="m-0 p-0">Ubah</p>
        </button>
      )} */}
    </Box>
  );
};

export default Header;
