import { useState } from "react";
import { CustomButton } from "@/components/Common/Button";
import { BsPlus } from "react-icons/bs";
import { Box, Modal, Typography } from "@mui/material";
import {
  FormInput,
  FormSelect,
  FormUploadFile,
} from "@/components/Common/FormField";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  imageValidation,
  pdfValidation,
} from "@/helpers/services/fileValidation";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const TambahDaftar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      jabatan_verifikator: "",
      nama_verifikator: "",
      gambar_paraf: null,
    },
    validationSchema: Yup.object().shape({
      jabatan_verifikator: Yup.string().required("Jabatan wajib diisi"),
      nama_verifikator: Yup.string().required("Nama Verifikator wajib diisi"),
      gambar_paraf: imageValidation,
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      handleClose();
    },
  });

  return (
    <>
      <CustomButton
        text={"Tambah"}
        textColor="#fff"
        leftIcon={<BsPlus size={15} />}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: "Poppins" }}
            >
              Tambah Paraf Verifikator
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ fontFamily: "Poppins", mt: 2, mb: 2 }}
            >
              Silahkan tambah paraf verifikator baru
            </Typography>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <FormSelect
              formik={formik}
              name="jabatan_verifikator"
              title="Jabatan"
              placeholder="Pilih jabatan"
              options={[
                { label: "Supervisor", value: "Supervisor" },
                { label: "Manager", value: "Manager" },
              ]}
            />
            <FormInput
              formik={formik}
              name="nama_verifikator"
              title="Nama"
              placeholder="Tulis nama"
            />

            <Box sx={{ mt: 2 }}>
              <FormUploadFile
                formik={formik}
                name="gambar_paraf"
                label="Gambar Paraf"
                acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
                maxFileSizeMB={5}
                required
              />
            </Box>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                type="button"
                text="Kembali"
                textColor="#041662"
                bgColor="transparent"
                onClick={handleClose}
              />
              <CustomButton
                type="submit"
                text="Simpan"
                textColor="#fff"
                bgColor="#041662"
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TambahDaftar;
