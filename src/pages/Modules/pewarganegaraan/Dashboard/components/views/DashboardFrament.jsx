import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Container } from "reactstrap";
import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import CustomFragment from "../Fragment";

export const DashboardFragments = ({ fragments }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      {fragments.map((fragment, index) => (
        <Box
          key={index}
          sx={{ width: { xs: "100%", sm: "48%", md: "48%", lg: "24%" } }}
        >
          <CustomFragment {...fragment} />
        </Box>
      ))}
    </Box>
  );
};
