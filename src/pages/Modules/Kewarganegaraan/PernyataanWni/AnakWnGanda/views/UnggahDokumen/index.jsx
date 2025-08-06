import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { useEffect } from "react";
import {
  successMsg,
  warningMsg,
  errorMsg,
} from "@/helpers/Notification/toastNotification";
import { Row } from "reactstrap";
import { getCurrentPermohonanId } from "@/pages/Modules/Kewarganegaraan/hooks/useStorage";
import { FormHeader } from "@/components/Common/FormField";
import { getFileUrl } from "@/pages/Modules/Kewarganegaraan/utils/files";
import { apiUploadAnakWnGanda } from "../../services/api";
import { FormUploadFile } from "@/pages/Modules/Kewarganegaraan/components/FileUploader";

const FILE_TYPES = {
  kutipanAktaKelahiran: 1,
  kutipanAktaPerkawinan: 2,
  pasporRepublik: 3,
  ktp: 4,
  keputusanMenteri: 5,
  pasFoto: 6,
};

const FILE_TYPE_TO_FIELD = Object.fromEntries(
  Object.entries(FILE_TYPES).map(([key, value]) => [value, key])
);

const UnggahDokumen = ({ formik }) => {
  const currentIdDraft = getCurrentPermohonanId("anakwnganda");
  const files = formik.values.files || [];
  console.log("FILES ===>", formik.values.files);
  console.log("=== START SYNC FILES ===");

  useEffect(() => {
    if (!Array.isArray(files) || files.length === 0) {
      console.log("📭 files is not ready or empty:", files);
      return;
    }

    files.forEach((file) => {
      if (!file || typeof file.file_type === "undefined") {
        console.warn("⚠️ Invalid file object:", file);
        return;
      }

      const fieldName = FILE_TYPE_TO_FIELD[file.file_type];
      console.log("SYNC FIELDNAME", fieldName);
      if (fieldName) {
        const currentFieldValue = formik.values[fieldName];
        if (!currentFieldValue || currentFieldValue !== file) {
          console.log(`✅ Updating ${fieldName} with file data`);
          formik.setFieldValue(fieldName, file);
        }
      } else {
        console.warn(
          `❌ No field mapping found for file_type: ${file.file_type}`
        );
      }
    });

    console.log("=== END SYNC FILES ===");
  }, [files, formik]);

  const handleUpload = async (file, fieldName) => {
    // Validation checks
    if (!currentIdDraft) {
      const error =
        "ID Permohonan tidak ditemukan. Silakan simpan draft terlebih dahulu.";
      warningMsg(error);
      throw new Error(error);
    }

    const file_type = FILE_TYPES[fieldName];
    if (!file_type) {
      const error = `Tipe dokumen tidak valid untuk field: ${fieldName}`;
      warningMsg(error);
      throw new Error(error);
    }

    if (!file) {
      const error = "File tidak valid";
      warningMsg(error);
      throw new Error(error);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id_permohonan", currentIdDraft);
      formData.append("file_type", file_type);

      console.log(
        `🚀 Uploading file: ${file.name} for field: ${fieldName} (type: ${file_type})`
      );

      const response = await apiUploadAnakWnGanda(formData);

      console.log("✅ Upload response:", response.data);

      if (response.message === "Success" && response.data) {
        const uploadedFileData = response.data;

        console.log(
          "📝 Updating formik with uploaded file data:",
          uploadedFileData
        );

        // ✅ UPDATE FILES ARRAY - remove existing file with same type and add new one
        const updatedFiles = [
          ...files.filter((f) => f.file_type !== file_type),
          uploadedFileData,
        ];

        // ✅ UPDATE FORMIK STATE - BOTH files array AND individual field
        formik.setFieldValue("files", updatedFiles);
        formik.setFieldValue(fieldName, uploadedFileData);

        // ✅ CLEAR ANY ERRORS for this field
        formik.setFieldError(fieldName, undefined);

        console.log(`✅ Successfully updated formik:`, {
          fieldName,
          uploadedFileData,
          updatedFilesCount: updatedFiles.length,
        });

        successMsg(`Dokumen ${fieldName} berhasil diunggah`);

        return uploadedFileData;
      } else {
        throw new Error(
          response.data?.message || "Upload response format tidak valid"
        );
      }
    } catch (error) {
      console.error("❌ Upload error:", error);

      let errorMessage = "Gagal mengunggah dokumen";

      if (error.code === "ECONNABORTED") {
        errorMessage =
          "Upload timeout. Periksa koneksi internet dan coba lagi.";
      } else if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            errorMessage = data?.message || "Request tidak valid";
            break;
          case 401:
            errorMessage = "Unauthorized. Silakan login ulang.";
            break;
          case 413:
            errorMessage = "File terlalu besar";
            break;
          case 415:
            errorMessage = "Tipe file tidak didukung";
            break;
          case 500:
            errorMessage = "Server error. Silakan coba lagi nanti.";
            break;
          default:
            errorMessage = data?.message || `Server error: ${status}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = "Gagal terhubung ke server. Periksa koneksi internet.";
      }

      errorMsg(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const uploadProps = {
    uploadFnc: handleUpload,
  };

  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <FormHeader title={"Upload Dokumen"} />
      <Row>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaKelahiran"
            label="Kutipan akta kelahiran pemohon yang telah disahkan oleh Pejabat atau Perwakilan Republik Indonesia"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.kutipanAktaKelahiran)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaPerkawinan"
            label="Kutipan akta perkawinan atau buku nikah pemohon yang telah disahkan oleh Pejabat atau Perwakilan Republik Indonesia"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.kutipanAktaPerkawinan)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporRepublik"
            label="Paspor Republik Indonesia, surat sejenis paspor, atau dokumen lain yang membuktikan bahwa pemohon pernah menjadi WNI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.pasporRepublik)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="ktp"
            label="Kartu Tanda Penduduk (KTP) atau surat penerbitan Nomor Identitas Tunggal (NIT)"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.ktp)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="keputusanMenteri"
            label="Surat pernyataan penolakan menjadi warga negara asing, dibuat di atas kertas bermaterai yang telah disetujui oleh perwakilan negara asing yang berwenang."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.keputusanMenteri)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasFoto"
            label="Pas foto terbaru ukuran 4x6 cm, berwarna, latar belakang merah, berpakaian rapi dan sopan."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.pasFoto)}
            required
            {...uploadProps}
          />
        </Col>
      </Row>
    </Box>
  );
};

export default UnggahDokumen;
