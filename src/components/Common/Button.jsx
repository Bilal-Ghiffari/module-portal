import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export const CustomButton = ({
  text,
  onClick,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  bgColor = "#041662",
  hoverColor = "#041992",
  textColor = "#fff",
  border = "1px solid transparent",
  fontSize = 12,
  variant = "primary",
  sx = {},
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        width: "auto",
        mr: 1,
        backgroundColor: bgColor,
        color: textColor,
        border,
        px: 2,
        py: 1,
        textTransform: "initial",
        fontFamily: "Poppins",
        "&:hover": {
          backgroundColor: hoverColor,
          color: "#fff",
        },
        "&.Mui-disabled": {
          backgroundColor: bgColor,
          color: "#fff",
        },
        ...sx,
      }}
    >
      {leftIcon && <span style={{ marginRight: 8 }}>{leftIcon}</span>}
      <span style={{ fontSize }}>{loading ? "Memproses..." : text}</span>
      {rightIcon && !loading && (
        <span style={{ marginLeft: 8 }}>{rightIcon}</span>
      )}
      {loading && (
        <FaSpinner
          size={14}
          style={{
            marginLeft: 8,
            color: "#fff",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
    </Button>
  );
};
