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
import TableKegiatanUsaha from "./TableKegiatanUsaha";
import ButtonCustom from "../ButtonCustom";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useEffect } from "react";
import { apiGetKBLI } from "@/helpers/backend_helper";

const PopupTable = ({ formik }) => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState({
    data: [],
    total_count: 0,
  });
  const toastifyService = new ToastifyService();

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const fetchData = () => {
    toastifyService.showLoading();
    apiGetKBLI()
      .then((res) => {
        setTableData({
          data: res.data,
          total_count: res.total,
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        toastifyService.close(); // panggil fungsinya
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
        onClick={handleOpen}
        style={{
          backgroundColor: "#E7E7E7", // abu-abu muda
          borderRadius: "6px", // optional: biar agak rounded
        }}
      >
        + Tambah
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-center w-100">
            <p className="m-0 p-0 fs-5 fw-bold">Kegiatan Usaha</p>
            <p className="m-0 p-0 fs-6 text-muted">
              Silakan pilih kegiatan usaha anda
            </p>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableKegiatanUsaha
            data={tableData?.data}
            total_count={tableData?.total_count}
            formik={formik}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <ButtonCustom
              onClick={() => {
                handleClose();
              }}
              label="Simpan"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupTable;
