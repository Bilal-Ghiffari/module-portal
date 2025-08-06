import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { Row, Col } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { DynamicDropdown } from "@/components/DynamicDropdown";

const PopupCRUD = ({ setOpen, open, status, label }) => {
  const handleClose = () => setOpen(false);
  const toastifyService = new ToastifyService();

  const formik = useFormik({
    initialValues: {
      nama_perseroan: "",
      keterangan: "",
    },
    validationSchema: Yup.object({
      nama_perseroan: Yup.string().required("Wajib diisi"),
      keterangan: Yup.string().required("Wajib diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      toastifyService.confirmationCreate().then((res) => {
        if (res) {
          toastifyService.info("API Belum tersedia");
          console.log("Form submitted:", values);
          resetForm();
          handleClose();
        }
      });
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: "9", marginTop: "40px" }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-center w-100">
            <h4
              className="fw-bold m-0 p-0"
              style={{ fontSize: "1rem", color: "#041662" }}
            >
              {status == "edit" ? "Perubahan" : "Tambah"} {label}
            </h4>
            <p style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>
              Silahkan isi untuk {status == "edit" ? "perubahan" : "penambahan"}{" "}
              ke daftar blacklist
            </p>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            {label == "Daftar Blacklist Nama Perseroan" && (
              <Row>
                <Col xs="12">
                  <FormInput
                    formik={formik}
                    name="nama_perseroan"
                    placeholder="Nama Perseroan"
                    required
                  />
                </Col>
                <Col xs="12">
                  <FormInput
                    formik={formik}
                    name="keterangan"
                    placeholder="Keterangan"
                    required
                  />
                </Col>
              </Row>
            )}
            {label == "Daftar Blacklist Kata Perseroan" && (
              <Row>
                <Col xs="12">
                  <FormInput
                    formik={formik}
                    name="tipe"
                    placeholder="Kata yang tidak diperbolehkan"
                    required
                  />
                </Col>
                <Col xs="12">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={"tipe"}
                    data={[]}
                    label="Tipe"
                    required
                  />
                </Col>
              </Row>
            )}

            <div className="text-end mt-3">
              <ButtonCustom type="submit" label="Simpan" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupCRUD;
