import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const CustomButtonFilter = ({ title, value, color, style }) => {
  return (
    <Button
      sx={{
        width: "fit-content",
        height: "50px",
        border: "1px solid #E7E7E7",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        margin: "5px",
        ...style,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderLeft: `3px solid ${color}`,
            paddingLeft: 3,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "Poppins",
                color: "#262626",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                color: "#262626",
                mt: 1,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Button>
  );
};

export default CustomButtonFilter;
