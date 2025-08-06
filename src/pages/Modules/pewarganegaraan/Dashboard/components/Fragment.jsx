import { Card, CardContent, Typography, Box } from "@mui/material";

const CustomFragment = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #E7E7E7",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderLeft: `3px solid ${color}`,
          }}
        >
          <Box sx={{ width: "100%", paddingLeft: 3 }}>
            <Typography
              variant="subtitle2"
              color=""
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "Poppins",
                borderBottom: "2px solid #E7E7E7",
                paddingBottom: 1,
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
    </Card>
  );
};

export default CustomFragment;
