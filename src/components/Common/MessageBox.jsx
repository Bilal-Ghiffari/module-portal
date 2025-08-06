import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const MESSAGE_TYPES = {
  warning: {
    background: "#FAD9AE",
    color: "#454545",
  },
  success: {
    background: "#D4EDDA",
    color: "#155724",
  },
  danger: {
    background: "#F8D7DA",
    color: "#721C24",
  },
};

const MessageBox = ({ type = "warning", children, sx = {}, ...props }) => {
  const style = {
    ...MESSAGE_TYPES[type],
    borderRadius: 4,
    padding: 5,
    fontSize: 14,
    ...sx,
  };

  return (
    <Box sx={style} {...props}>
      <Typography component="div" sx={{ fontSize: 14 }}>
        {children}
      </Typography>
    </Box>
  );
};

MessageBox.propTypes = {
  type: PropTypes.oneOf(["warning", "success", "danger"]),
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default MessageBox;
