import { FormUploadFile } from "../../components/FormField";
import { Box } from "@mui/material";
import axios from "axios";
import { Col } from "reactstrap";
import { useEffect } from "react";
import {
  successMsg,
  warningMsg,
  errorMsg,
} from "@/helpers/Notification/toastNotification";
import { getCurrentPermohonanId } from "../../hooks/useLocalStorage";
import { getFileUrl } from "../../utils/files";
import { apiUploadFile } from "../../services/api";
import { useState } from "react";

// File type mapping as per backend requirements
const FILE_TYPES = {
  fotokopiAktaKelahiran: 1,
  fotokopiKitap: 2,
  fotokopiAktaKelahiranPasangan: 3,
  fotokopiKtpPasangan: 4,
  fotokopiAktaPerkawinan: 5,
  suratKeteranganImigrasi: 6,
  sckcAsli: 7,
  suratPerwakilanNegara: 8,
  pasfoto: 9,
  suratKeteranganSehat: 10,
  buktiPembayaran: 11,
  suratPermohonanTertulis: 12,
  suratPernyataanAlasan: 13,
  suratPernyataanBerbahasa: 14,
  suratPernyataanNama: 15,
  suratPernyataanKesetiaan: 16,
};

// Reverse mapping untuk mencari field name berdasarkan file_type
const FILE_TYPE_TO_FIELD = Object.fromEntries(
  Object.entries(FILE_TYPES).map(([key, value]) => [value, key])
);

const UnggahDokumenSection = ({ formik }) => {
  const [loadingUpload, setLoadingUpload] = useState({});
  const currentIdDraft = getCurrentPermohonanId();
  console.log("Unggah dokumen", formik.values);
  const files = formik.values.files || [];

  // ✅ SYNC FILES ARRAY DENGAN INDIVIDUAL FIELDS
  useEffect(() => {
    // console.log("=== SYNC FILES TO FORMIK FIELDS ===");
    // console.log("Files array:", files);
    // console.log("Current formik values:", formik.values);

    // Map setiap file ke field yang sesuai
    files.forEach((file) => {
      const fieldName = FILE_TYPE_TO_FIELD[file.file_type];
      if (fieldName) {
        const currentFieldValue = formik.values[fieldName];

        // console.log(`File type ${file.file_type} -> ${fieldName}:`, {
        //   fileData: file,
        //   currentFieldValue,
        //   needsUpdate: !currentFieldValue || currentFieldValue !== file,
        // });

        // Update field jika belum ada atau berbeda
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
      setLoadingUpload((prev) => ({ ...prev, [fieldName]: true }));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id_permohonan", currentIdDraft);
      formData.append("file_type", file_type);

      console.log(
        `🚀 Uploading file: ${file.name} for field: ${fieldName} (type: ${file_type})`
      );

      const response = await apiUploadFile(formData);

      console.log("✅ Upload response:", response);
      console.log("✅ Upload response data:", response.data);

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
    } finally {
      setLoadingUpload((prev) => ({ ...prev, [fieldName]: false }));
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
      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="fotokopiAktaKelahiran"
          label="1. Fotokopi akta kelahiran pemohon yang sudah diterjemahkan ke Bahasa Indonesia oleh penerjemah resmi dan dilegalisasi."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.fotokopiAktaKelahiran)}
          required
          loadingUpload={loadingUpload["fotokopiAktaKelahiran"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="fotokopiKitap"
          label="2. Unggah fotokopi KITAP (Kartu Izin Tinggal Tetap) pemohon yang masih berlaku dan telah dilegalisasi."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.fotokopiKitap)}
          required
          loadingUpload={loadingUpload["fotokopiKitap"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="fotokopiAktaKelahiranPasangan"
          label="3. Fotokopi akta kelahiran pasangan (suami/istri) yang sudah dilegalisasi."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(
            files,
            FILE_TYPES.fotokopiAktaKelahiranPasangan
          )}
          required
          loadingUpload={loadingUpload["fotokopiAktaKelahiranPasangan"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="fotokopiKtpPasangan"
          label="4. Fotokopi KTP pasangan (suami/istri) yang sudah dilegalisasi."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.fotokopiKtpPasangan)}
          required
          loadingUpload={loadingUpload["fotokopiKtpPasangan"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="fotokopiAktaPerkawinan"
          label="5. Fotokopi akta perkawinan/buku nikah yang diterjemahkan ke Bahasa Indonesia dan dilegalisasi."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.fotokopiAktaPerkawinan)}
          required
          loadingUpload={loadingUpload["fotokopiAktaPerkawinan"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratKeteranganImigrasi"
          label="6. Asli surat keterangan dari Imigrasi yang menyatakan pemohon sudah tinggal di Indonesia minimal 5 tahun berturut-turut atau 10 tahun tidak berturut-turut."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratKeteranganImigrasi)}
          required
          loadingUpload={loadingUpload["suratKeteranganImigrasi"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="sckcAsli"
          label="7. Asli SKCK dari Mabes Polri yang masih berlaku."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.sckcAsli)}
          required
          loadingUpload={loadingUpload["sckcAsli"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratPerwakilanNegara"
          label="8. Asli surat dari perwakilan negara asal yang menyatakan pemohon akan kehilangan kewarganegaraan lamanya jika menjadi WNI."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratPerwakilanNegara)}
          required
          loadingUpload={loadingUpload["suratPerwakilanNegara"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="pasfoto"
          label="9. Pas foto terbaru ukuran 4x6 cm, berwarna, latar belakang merah, berpakaian rapi dan sopan."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.pasfoto)}
          required
          loadingUpload={loadingUpload["pasfoto"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratKeteranganSehat"
          label="10. Asli surat keterangan sehat jasmani dan rohani dari rumah sakit pemerintah."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratKeteranganSehat)}
          required
          loadingUpload={loadingUpload["suratKeteranganSehat"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="buktiPembayaran"
          label="11. Asli bukti pembayaran permohonan untuk menjadi WNI."
          acceptedFileTypes={["application/pdf"]}
          documentUrl={getFileUrl(files, FILE_TYPES.buktiPembayaran)}
          maxFileSizeMB={20}
          required
          loadingUpload={loadingUpload["buktiPembayaran"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratPermohonanTertulis"
          label="12. Asli surat permohonan tertulis dalam Bahasa Indonesia, ditandatangani dan bermaterai, ditujukan ke Menteri Hukum melalui Ditjen AHU."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratPermohonanTertulis)}
          required
          loadingUpload={loadingUpload["suratPermohonanTertulis"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratPernyataanAlasan"
          label="13. Asli surat pernyataan alasan menjadi WNI, ditulis tangan, ditandatangani, dan bermaterai."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratPernyataanAlasan)}
          required
          loadingUpload={loadingUpload["suratPernyataanAlasan"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratPernyataanBerbahasa"
          label="14. Asli surat pernyataan bisa berbahasa Indonesia, ditulis tangan, ditandatangani, dan bermaterai."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratPernyataanBerbahasa)}
          required
          loadingUpload={loadingUpload["suratPernyataanBerbahasa"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratPernyataanNama"
          label="15. Asli surat pernyataan nama lengkap yang akan digunakan dalam SK, ditulis tangan, ditandatangani, dan bermaterai."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratPernyataanNama)}
          required
          loadingUpload={loadingUpload["suratPernyataanNama"]}
          {...uploadProps}
        />
      </Col>

      <Col lg="12" xl="12">
        <FormUploadFile
          formik={formik}
          name="suratPernyataanKesetiaan"
          label="16. Asli surat pernyataan kesetiaan pada NKRI, Pancasila, UUD 1945, dan kesediaan menjalankan kewajiban sebagai WNI secara tulus, ditulis tangan, ditandatangani, dan bermaterai."
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={20}
          documentUrl={getFileUrl(files, FILE_TYPES.suratPernyataanKesetiaan)}
          required
          loadingUpload={loadingUpload["suratPernyataanKesetiaan"]}
          {...uploadProps}
        />
      </Col>
    </Box>
  );
};

export default UnggahDokumenSection;
