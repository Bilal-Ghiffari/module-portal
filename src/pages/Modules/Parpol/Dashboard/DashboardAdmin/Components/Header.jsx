import { Divider, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontFamily: "Poppins",
          color: "#202020",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ my: 2, color: "#E7E7E7" }} />
    </>
  );
};

export default Header;
