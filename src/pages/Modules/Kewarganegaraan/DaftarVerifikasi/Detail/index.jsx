import { CustomButton } from "@/components/Common/Button";
import {
  ArrowRight,
  DoNotDisturbAlt,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState, useCallback } from "react";
import { Container } from "reactstrap";
import PemohonSection from "./informasi/Pemohon";
import { useFormik } from "formik";
import { initialValues } from "./informasi/config";
import PasanganSection from "./informasi/Pasangan";
import DokumenSection from "./informasi/Dokumen";
import { useNavigate } from "react-router-dom";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useDetailVerifikasi } from "../hooks/useDetailVerifikasi";
import { useParams } from "react-router-dom";
import { mapDetailToFormik } from "./helpers/mapping";
import { useMemo } from "react";
import { apiPatchVerifkasi } from "../services/api";
import { getVerifikator } from "./utils/verifikator";
import { useDetailSuratKeterangan } from "../hooks/useDetailSk";

const DetailVerifikasi = () => {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [verifikasiData, setVerifikasiData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = new ToastifyService();
  const { data, loading, error } = useDetailVerifikasi(params.id);
  // const {
  //   data: dataSk,
  //   loading: loadingSk,
  //   error: errorSk,
  // } = useDetailSuratKeterangan(params.id);

  console.log("DATA DETAIL VERIFIKASI", data);
  const mappedValues = useMemo(() => {
    if (data) {
      return mapDetailToFormik(data);
    }
    return initialValues;
  }, [data]);

  const formik = useFormik({
    initialValues: mappedValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Submit values:", values);
      toast.customWarningMsg("API Belum tersedia");
    },
  });

  const statusAktivitas = getVerifikator(mappedValues.status_aktivitas);
  console.log("STATUS AKTIVITAS", statusAktivitas);
  console.log("mappedValues", mappedValues);

  // Callback untuk menerima data verifikasi dari DokumenSection
  const handleVerifikasiDataChange = useCallback((data) => {
    setVerifikasiData(data);
  }, []);

  const steps = [
    <PemohonSection formik={formik} />,
    <PasanganSection formik={formik} />,
    <DokumenSection
      formik={formik}
      onVerifikasiDataChange={handleVerifikasiDataChange}
    />,
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
    navigate("/kewarganegaraan/daftar-verifikasi");
  };

  const handleSubmitVerifikasi = async () => {
    if (!verifikasiData) {
      toast.customErrorMsg("Data verifikasi belum tersedia");
      return;
    }

    const filteredVerifikasiData = Object.entries(verifikasiData).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    console.log("Data verifikasi yang akan dikirim:", verifikasiData);

    const confirmed = await toast.confirmationCreate();
    if (confirmed) {
      setIsSubmitting(true);
      try {
        const response = await apiPatchVerifkasi({
          ...verifikasiData,
          tipe_verifikator: statusAktivitas,
        });
        console.log("API RESPONSE PATCH", response);
        if (response.message === "Success") {
          toast.customSuccessMsg("Verifikasi berhasil disimpan");
          setTimeout(() => {
            navigate("/kewarganegaraan/daftar-verifikasi");
          }, 1500);
        }
      } catch (error) {
        console.error("Error submitting verifikasi:", error);
        toast.customWarningMsg("Gagal menyimpan verifikasi");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReject = async () => {
    const confirmed = await toast.confirmationCustom(
      "Apakah anda yakin untuk menolak permohonan",
      "Isi alasan penolakan agar dapat disampaikan kepada pemohon."
    );

    if (confirmed) {
      setIsSubmitting(true);
      try {
        console.log("Data penolakan:", verifikasiData);

        const response = await apiPatchVerifkasi({
          ...verifikasiData,
          tipe_verifikator: statusAktivitas,
        });
        if (response.message === "Success") {
          toast.customSuccessMsg("Verifikasi berhasil ditolak");
          setTimeout(() => {
            navigate("/kewarganegaraan/daftar-verifikasi");
          }, 1500);
        }
      } catch (error) {
        console.error("Error submitting verifikasi:", error);
        toast.customWarningMsg("Gagal menyimpan verifikasi");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Cek apakah semua dokumen sudah diverifikasi (optional validation)
  const isVerificationComplete = useMemo(() => {
    if (!verifikasiData) return false;

    const validFields = Object.keys(verifikasiData).filter((key) =>
      key.endsWith("_valid")
    );
    const hasUnverified = validFields.some(
      (key) => verifikasiData[key] === undefined || verifikasiData[key] === null
    );

    return !hasUnverified;
  }, [verifikasiData]);

  return (
    <Container className="page-content bg-white mb-5" fluid>
      <h3>Verifikasi Formulir Permohonan</h3>
      <p className="text-muted">
        Tahapan ini merupakan proses verifikasi dokumen dan data permohonan
        penetapan Warga Negara Indonesia (WNI) yang dilakukan oleh verifikator
        tingkat <strong>{statusAktivitas}</strong>. Harap periksa keabsahan dan
        kelengkapan seluruh informasi yang disampaikan pemohon sebelum mengambil
        keputusan untuk menyetujui atau menolak permohonan.
      </p>
      {loading ? (
        <p>Loading</p>
      ) : (
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
                  disabled={isSubmitting}
                />
              )}
              {currentStep > 0 && (
                <CustomButton
                  text="Kembali"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                  bgColor="#e0e0e0"
                  textColor="#333"
                />
              )}
              {currentStep === steps.length - 1 ? (
                <>
                  <CustomButton
                    text={isSubmitting ? "Memproses..." : "Tolak"}
                    type="button"
                    onClick={handleReject}
                    rightIcon={
                      !isSubmitting && <DoNotDisturbAlt fontSize="small" />
                    }
                    bgColor={"#CF3533"}
                    hoverColor="#BE1122"
                    textColor="#fff"
                    disabled={isSubmitting}
                  />
                  <CustomButton
                    text={isSubmitting ? "Memproses..." : "Verifikasi"}
                    type="button"
                    onClick={handleSubmitVerifikasi}
                    rightIcon={
                      !isSubmitting && <TaskAltOutlined fontSize="small" />
                    }
                    bgColor={isVerificationComplete ? "#1F7C4D" : "#6c757d"}
                    hoverColor={isVerificationComplete ? "#1F6C4D" : "#5a6268"}
                    textColor="#fff"
                    disabled={isSubmitting}
                    title={
                      !isVerificationComplete
                        ? "Harap lengkapi verifikasi semua dokumen"
                        : ""
                    }
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
                  disabled={isSubmitting}
                />
              )}
            </Box>
          </form>

          {/* Debug panel - hanya tampil di development */}
          {/* {process.env.NODE_ENV === "development" && verifikasiData && (
            <Box mt={4} className="border-top pt-3">
              <h6>Debug - Verification Data:</h6>
              <pre
                style={{
                  fontSize: "12px",
                  maxHeight: "200px",
                  overflow: "auto",
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {JSON.stringify(verifikasiData, null, 2)}
              </pre>
              <small className="text-muted">
                Verification Complete: {isVerificationComplete ? "Yes" : "No"}
              </small>
            </Box>
          )} */}
        </Box>
      )}
    </Container>
  );
};

export default DetailVerifikasi;
