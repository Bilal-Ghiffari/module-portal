import { CustomButton } from "@/components/Common/Button";
import {
  ArrowRight,
  DoNotDisturbAlt,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import { Container } from "reactstrap";
import PemohonSection from "./informasi/Pemohon";
import { useFormik } from "formik";
import { initialValues } from "./informasi/config";
import PasanganSection from "./informasi/Pasangan";
import DokumenSection from "./informasi/Dokumen";
import { useNavigate } from "react-router-dom";
import { ToastifyService } from "@/components/Toastify/toastifyService";

const DetailSkTerbitPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const toast = new ToastifyService();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("Submit values:", values);
      toast.customWarningMsg("API Belum tersedia");
    },
  });

  const steps = [
    <PemohonSection formik={formik} />,
    <PasanganSection formik={formik} />,
    <DokumenSection formik={formik} />,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackDetail = () => {
    navigate("/pewarganegaraan/admin/daftar-sk-terbit");
  };

  const handleSubmit = () => {
    toast.confirmationCreate().then((res) => {
      if (res) {
        formik.handleSubmit();
      }
    });
  };
  const handleReject = () => {
    toast
      .confirmationCustom(
        "Apakah anda yakin untuk menolak permohonan",
        "Isi alasan penolakan agar dapat disampaikan kepada  pemohon."
      )
      .then((res) => {
        if (res) {
          setTimeout(() => {
            navigate("/pewarganegaraan/admin/daftar-sk-terbit");
          }, 3000);
        }
      });
  };

  return (
    <Container className="page-content bg-white  mb-5" fluid>
      <h3>Formulir Permohonan</h3>
      <Box className="rounded-3 border border-2 p-3">
        <form onSubmit={formik.handleSubmit}>
          {steps[currentStep]}

          <Box display="flex" justifyContent="flex-end" mt={4}>
            {currentStep === 0 && (
              <CustomButton
                text="Kembali"
                onClick={handleBackDetail}
                bgColor="#e0e0e0"
                textColor="#333"
              />
            )}
            {currentStep > 0 && (
              <CustomButton
                text="Kembali"
                onClick={handleBack}
                disabled={currentStep === 0}
                bgColor="#e0e0e0"
                textColor="#333"
              />
            )}
            {currentStep === steps.length - 1 ? (
              <>
                <CustomButton
                  text={"Tolak"}
                  type="button"
                  onClick={handleReject}
                  rightIcon={<DoNotDisturbAlt fontSize="small" />}
                  bgColor={"#CF3533"}
                  hoverColor="#BE1122"
                  textColor="#fff"
                />
                <CustomButton
                  text={"Verifikasi"}
                  type="button"
                  onClick={handleSubmit}
                  rightIcon={<TaskAltOutlined fontSize="small" />}
                  bgColor={"#1F7C4D"}
                  hoverColor="#1F6C4D"
                  textColor="#fff"
                />
              </>
            ) : (
              <CustomButton
                text={"Selanjutnya"}
                type="button"
                onClick={handleNext}
                rightIcon={<ArrowRight />}
                bgColor={"#041662"}
                textColor="#fff"
              />
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default DetailSkTerbitPage;
