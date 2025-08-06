import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useNavigate } from "react-router-dom";
import Kurator from "./Kurator";
import { filterEmptyValues } from "@/helpers/services/convert";

const Laporan = ({ disabled = false, label, type }) => {
  const toastifyService = new ToastifyService();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      status: "",
      jenis_debitor: "Korporasi",
      data_kurator: [],
      data_pengurus: [],
    },
    // validationSchema: currentStepConfig.validation,
    enableReinitialize: true,
    onSubmit: (values) => {
      toastifyService.confirmationCreate().then((res) => {
        if (res) {
          // toastifyService.showLoading();
          const payload = {
            ...values,
          };
          console.log("payload", filterEmptyValues(payload));
          toastifyService.info("API Belum tersedia");
        }
      });
    },
  });

  console.log("formik", formik.values);

  return (
    <div className="page-content">
      <Typography
        sx={{
          fontSize: "1rem",
          px: 0,
          fontFamily: "Poppins",
        }}
        className="fw-semibold mb-2 text-capitalize"
      >
        {label}
      </Typography>
      <Kurator
        formik={formik}
        disabled={disabled}
        type={type}
        fieldData={
          type == "kurator"
            ? formik.values?.data_kurator
            : formik.values?.data_pengurus
        }
      />
      {/* Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          pt: 2,
          px: 2,
          mb: 4,
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{
            mr: 1,
            backgroundColor: "#e5e7eb",
            color: "#000",
            px: 2,
            py: 1,
            textTransform: "initial",
            fontFamily: "Poppins",
            "&:hover": {
              backgroundColor: "#d1d5db",
              color: "#000",
            },
          }}
        >
          Kembali
        </Button>
        <Button
          onClick={formik.handleSubmit}
          sx={{
            mr: 1,
            backgroundColor: "#041662",
            color: "#fff",
            border: "1px solid grey",
            px: 2,
            py: 1,
            fontFamily: "Poppins",
            "&:hover": {
              backgroundColor: "#041992",
              color: "#fff",
            },
            textTransform: "initial",
          }}
        >
          Simpan
        </Button>
      </Box>
    </div>
  );
};

export default Laporan;
