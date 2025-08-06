import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import GantiKurator from "../../Laporan/GantiKurator";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import LaporanPengakhiran from "../../Laporan/LaporanPengakhiran";

const PopupCRUD = ({ setOpen, open, label, type }) => {
  const handleClose = () => setOpen(false);
  const toastifyService = new ToastifyService();

  const formik = useFormik({
    initialValues: {
      nama: "",
      nik: "",
      alamat: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      toastifyService.info("API belum tersedia");
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [label]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ zIndex: "9", marginTop: "40px" }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-center w-100">
            {type ? (
              <h4
                className="fw-bold m-0 p-0 text-capitalize"
                style={{ fontSize: "1rem", color: "black" }}
              >
                Tambah {type}
              </h4>
            ) : (
              <h4
                className="fw-bold m-0 p-0 text-capitalize"
                style={{ fontSize: "1rem", color: "black" }}
              >
                {label.includes("Kurator")
                  ? "Tambah Kurator"
                  : "Tambah Pengurus"}
              </h4>
            )}
            <p className="m-0 p-0 fs-6">Silakan isi data dibawah ini</p>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {type == "Laporan Pengakhiran Kurator" && (
            <LaporanPengakhiran formik={formik} label="Kurator" />
          )}
          {type == "Laporan Pengakhiran Pengurus" && (
            <LaporanPengakhiran formik={formik} label="Pengurus" />
          )}
          {!type && <GantiKurator formik={formik} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupCRUD;
