import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import SuratPermohonanPDF from "./Surat";
import { nextStep, prevStep, saveFormData } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Checked from "@/components/Common/Checked";
import Header from "../../Header";
import FilePreview from "@/components/Common/FilePreview";

const ExportSuratPermohonan = ({ formik }) => {
  const dispatch = useDispatch();
  const initialValuesStore = useSelector(
    (state) => state.formStep.formData.suratPermohonan
  );
  const activeStep = useSelector((state) => state.formStep.activeStep);

  const validationPermohonan = useFormik({
    enableReinitialize: true,
    initialValues: {
      checked: initialValuesStore.checked || false,
    },
    validationSchema: Yup.object({
      checked: Yup.bool()
        .oneOf([true], "Anda harus menyetujui terlebih dahulu")
        .required("Wajib dicentang"),
    }),
    onSubmit: (values) => {
      dispatch(saveFormData("suratPermohonan", values));
      dispatch(nextStep());
    },
  });

  return (
    <div className="mt-5 mb-3 px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        <Header label={"Pemilik Manfaat"} />
        <p
          className="mb-4"
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          Berdasarkan Peraturan Pemerintah (PP) Nomor 8 Tahun 2021 tentang Modal
          Dasar Perseroan Serta Pendaftaran Pendirian, Perubahan, dan Pembubaran
          Perseroan yang Memenuhi Kriteria untuk Usaha Mikro dan Kecil,
          disebutkan bahwa perseroan perorangan didirikan oleh satu Warga Negara
          Indonesia (WNI) berusia minimal 17 tahun, sehingga pemilik manfaat
          adalah pemilik usaha itu sendiri.
        </p>

        <Box sx={{ height: "500px", border: "1px solid #ccc", mb: 2 }}>
          {/* <PDFViewer width="100%" height="100%">
            <SuratPermohonanPDF />
          </PDFViewer> */}
          <div
            className="border rounded p-2 bg-white shadow-sm"
            style={{ width: "100%", height: "100%" }}
          >
            <iframe
              src={
                "http://192.168.72.87:9000/development/peraturan-pemerintah/PP%20Nomor%208%20Tahun%202021_Dasar%20PTP.pdf"
              }
              title="File Preview"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            ></iframe>
          </div>
        </Box>

        {validationPermohonan.touched.checked &&
          validationPermohonan.errors.checked && (
            <Typography color="error" fontSize={12}>
              {validationPermohonan.errors.checked}
            </Typography>
          )}

        <Box
          className="px-3"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box className="d-flex flex-column gap-2">
            <Checked
              fontSize="0.95rem"
              label={`Saya mengerti dan memahami pernyataan dan dokumen Peraturan Pemerintah Republik Nomor 8 Tahun 2021 tersebut.`}
              value="1"
              fieldName={`rules_10`}
              formik={formik}
            />
            <Checked
              fontSize="0.95rem"
              label={`Saya, Pemohon menyatakan data yang Saya sampaikan seluruhnya adalah benar. Apabila suatu hari ditemukan penyalahgunaan atas data yang disampaikan, Kementerian Hukum berhak membatalkan permohonan yang telah disampaikan. Pemohon bersedia menerima sanksi sesuai dengan ketentuan perundang-undangan yang berlaku. `}
              value="1"
              fieldName={`rules_11`}
              formik={formik}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ExportSuratPermohonan;
