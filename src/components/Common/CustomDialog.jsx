import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="reusable-dialog-title"
      aria-describedby="reusable-dialog-description"
      sx={{ borderRadius: "8px" }}
    >
      {title && (
        <DialogTitle
          id="reusable-dialog-title"
          sx={{
            fontFamily: "Poppins",
            color: "#262626",
            fontSize: "18px",
            lineHeight: "36px",
            fontWeight: 500,
          }}
        >
          {title}
        </DialogTitle>
      )}

      <DialogContent>
        {description && (
          <DialogContentText
            id="reusable-dialog-description"
            sx={{
              fontFamily: "Poppins",
              color: "#888888",
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: 400,
              marginBottom: "12px",
            }}
          >
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
