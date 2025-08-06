import { Box, Typography } from "@mui/material";
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
import { apiUploadAnakAngkat } from "../../services/api";
import { FormUploadFile } from "@/pages/Modules/Kewarganegaraan/components/FileUploader";
import MessageBox from "@/components/Common/MessageBox";

const FILE_TYPES = {
  kutipanAktaKelahiran: 1,
  IzinKeimigrasian: 2,
  skTmpTinggal: 3,
  pasporAnak: 4,
  penetapanKeadilan: 5,
  srtPerwaNgrAsal: 6,
  kutipanAktaKelaOrtu: 7,
  pasporKtpOrtu: 8,
  kutipanAktaPerkawinan: 9,
  pasfoto: 10,
};

const FILE_TYPE_TO_FIELD = Object.fromEntries(
  Object.entries(FILE_TYPES).map(([key, value]) => [value, key])
);

const UnggahDokumenAnakAngkat = ({ formik }) => {
  const currentIdDraft = getCurrentPermohonanId("anakwnangkat");
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

      const response = await apiUploadAnakAngkat(formData);

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
            label="Kutipan akta atau surat keterangan kelahiran anak yang telah disahkan oleh pejabat"
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
            name="IzinKeimigrasian"
            label="Izin keimigrasian bagi anak yang tinggal di luar wilayah Indonesia"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.IzinKeimigrasian)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="skTmpTinggal"
            label="Surat keterangan tempat tinggal dari camat untuk anak yang tinggal di dalam negeri"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.skTmpTinggal)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporAnak"
            label="Paspor anak yang masih berlaku"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.pasporAnak)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="penetapanKeadilan"
            label="Penetapan pengadilan negeri tentang pengangkatan anak"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.penetapanKeadilan)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="srtPerwaNgrAsal"
            label="Surat dari perwakilan negara asal anak yang menyatakan tidak keberatan anak menjadi WNI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.srtPerwaNgrAsal)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaKelaOrtu"
            label="Kutipan akta kelahiran orang tua angkat yang telah disahkan oleh pejabat"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.kutipanAktaKelaOrtu)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporKtpOrtu"
            label="Paspor atau KTP orang tua angkat yang telah disahkan oleh pejabat"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.pasporKtpOrtu)}
            required
            {...uploadProps}
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaPerkawinan"
            label="Kutipan akta perkawinan, perceraian, talak, atau kematian orang tua angkat yang telah disahkan oleh pejabat"
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
            name="pasfoto"
            label="Pasfoto terbaru anak berwarna"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={10}
            documentUrl={getFileUrl(files, FILE_TYPES.pasfoto)}
            required
            {...uploadProps}
          />
        </Col>
      </Row>
      <MessageBox>
        <Typography>
          Semua dokumen yang perlu untuk dilegalisir harus dilakukan sebelum
          Anda mendaftar secara online. Verifikator tidak akan menerima dokumen
          legalisir yang dilakukan setelah Anda mendaftar online.
        </Typography>
        <Typography>
          Anda harus mengirimkan dokumen-dokumen di atas beserta dokumen yang
          Anda cetak dan tanda tangani kepada: Subdirektorat Notariat,
          Direktorat Perdata, Direktorat Jenderal Administrasi Hukum Umum,
          Kementerian Hukum dan HAM RI, EX Gedung Sentra Mulia, Jl. HR. Rasuna
          Said Kav x-6/8 Lantai 3 dan 6, Kuningan, Jakarta Selatan, Kode Pos
          12940. Selambat-lambatnya 7 hari setelah Anda memasukkan permohonan
          ini.
        </Typography>
      </MessageBox>
    </Box>
  );
};

export default UnggahDokumenAnakAngkat;
