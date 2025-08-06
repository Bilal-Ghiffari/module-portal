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
import { pdfValidation } from "@/helpers/services/fileValidation";
import { Search } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const DetailKanwil = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "kanwil-ntt",
      wilayah: "Nusa Tenggara Timur",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Jabatan wajib diisi"),
      wilayah: Yup.string().required("Nama Verifikator wajib diisi"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      handleClose();
    },
  });

  return (
    <>
      <CustomButton
        text={""}
        textColor="#041662"
        bgColor="transparent"
        leftIcon={<Search size={15} />}
        sx={{ padding: 0 }}
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
              Detail Kantor Wilayah{" "}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ fontFamily: "Poppins", mt: 2, mb: 2 }}
            >
              Berikut adalah detail kantor wilayah{" "}
            </Typography>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <FormInput
              formik={formik}
              name="username"
              title="Username"
              placeholder="Tulis nama"
              value={formik.values.username}
              readonly
            />

            <FormInput
              formik={formik}
              name="wilayah"
              title="Wilayah"
              placeholder="Tulis nama"
              value={formik.values.wilayah}
              readonly
            />
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                type="button"
                text="Kembali"
                textColor="#041662"
                bgColor="transparent"
                onClick={handleClose}
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default DetailKanwil;
