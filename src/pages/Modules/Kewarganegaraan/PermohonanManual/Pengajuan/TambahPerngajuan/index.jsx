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
import FilterSection from "../../../Dashboard/components/views/FilterSection";
import { categoryFilter } from "../dummy";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const TambahPengajuan = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <FilterSection data={categoryFilter} />
          <div className="d-flex flex-row align-items-center gap-2 flex-wrap justify-content-end">
            <CustomButton
              text={"Kembali"}
              bgColor="transparent"
              textColor="#5D5D5D"
              border="1px solid #E7E7E7"
              onClick={handleClose}
            />
            <CustomButton text={"Kembali"} onClick={handleClose} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TambahPengajuan;
