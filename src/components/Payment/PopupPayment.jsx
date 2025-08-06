import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Pendaftaran from "./Step";

const PopupPayment = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <a
        onClick={handleOpen}
        // href="https://simpadhu.example.com"
        // target="_blank"
        // rel="noopener noreferrer"
        style={{
          textDecoration: "underline",
          color: "#041662",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        <u>Beli Voucher di SIMPADHU</u>
      </a>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: "9",marginTop:'40px' }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-center w-100"></div>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Pendaftaran />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupPayment;
