import React, { useState, useRef, useEffect } from "react";
import { Input, FormFeedback, Label, Button } from "reactstrap";
import { Box } from "@mui/material";
import {
  warningMsg,
  successMsg,
} from "@/helpers/Notification/toastNotification";
import { FiFileText, FiEye } from "react-icons/fi";
import { BsCheck, BsTrash, BsX } from "react-icons/bs";
import { Spinner } from "reactstrap";
import { FaSpinner } from "react-icons/fa";

export const FormUploadFile = ({
  formik,
  name,
  label,
  acceptedFileTypes = ["application/pdf"],
  maxFileSizeMB = 1,
  required = false,
  uploadFnc,
  delFnc,
  documentUrl,
  loadingUpload,
  ...restProps
}) => {
  const fileInputRef = useRef(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);
  const [displayUrl, setDisplayUrl] = useState(null);

  // Initialize component state from formik and documentUrl
  useEffect(() => {
    const formikValue = formik.values[name];

    // console.log(`=== FormUploadFile [${name}] useEffect ===`);
    // console.log("formikValue:", formikValue);
    // console.log("documentUrl:", documentUrl);
    // console.log("formikValue type:", typeof formikValue);
    // console.log("formikValue instanceof File:", formikValue instanceof File);

    if (documentUrl) {
      // console.log(`${name}: Setting from documentUrl`);
      setDisplayUrl(documentUrl);
      setUploadedData({ url: documentUrl, uploaded: true });
      setCurrentFile(null);
    }
    // If formik has a File object (newly selected)
    else if (formikValue instanceof File) {
      // console.log(`${name}: Setting from File object`);
      setCurrentFile(formikValue.name);
      setDisplayUrl(null);
      setUploadedData(null);
    }
    // If formik has upload response data
    else if (formikValue && typeof formikValue === "object") {
      // console.log(`${name}: Setting from upload response object`);
      setUploadedData(formikValue);
      setCurrentFile(null);
    }
    // If formik has a string URL
    else if (formikValue && typeof formikValue === "string") {
      // console.log(`${name}: Setting from string URL`);
      setDisplayUrl(formikValue);
      setUploadedData({ url: formikValue, uploaded: true });
      setCurrentFile(null);
    }
    // No file
    else {
      // console.log(`${name}: No file`);
      setCurrentFile(null);
      setDisplayUrl(null);
      setUploadedData(null);
    }
  }, [formik.values[name], documentUrl, name]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];

    // console.log(`=== File Change [${name}] ===`);
    // console.log("Selected file:", file);

    // Always mark as touched when user interacts
    formik.setFieldTouched(name, true);

    if (file) {
      const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

      console.log("File validation:", {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        maxSizeBytes: MAX_FILE_SIZE_BYTES,
        acceptedTypes: acceptedFileTypes,
      });

      // Validate file type
      if (!acceptedFileTypes.includes(file.type)) {
        const errorMessage = `Tipe file tidak valid. Harap unggah ${acceptedFileTypes
          .map((type) => type.split("/")[1].toUpperCase())
          .join(", ")}.`;

        console.log("❌ File type validation failed:", errorMessage);
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        setCurrentFile(null);
        warningMsg(errorMessage);
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const errorMessage = `Ukuran file tidak boleh lebih dari ${maxFileSizeMB}MB.`;

        console.log("❌ File size validation failed:", errorMessage);
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        setCurrentFile(null);
        warningMsg(errorMessage);
        return;
      }

      // File is valid - set to formik and local state
      console.log("✅ File validation passed, setting file to formik");
      formik.setFieldValue(name, file);
      setCurrentFile(file.name);

      // Clear any previous errors
      formik.setFieldError(name, undefined);

      console.log("File set successfully");
    } else {
      // No file selected
      console.log("No file selected, clearing state");
      formik.setFieldValue(name, null);
      setCurrentFile(null);
      formik.setFieldError(name, undefined);
    }
  };

  const resetFileState = () => {
    console.log(`=== Reset File State [${name}] ===`);
    setCurrentFile(null);
    setUploadedData(null);
    setDisplayUrl(null);
    formik.setFieldValue(name, null);
    formik.setFieldError(name, undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (e) => {
    e.stopPropagation();

    console.log(`=== Handle Upload [${name}] ===`);
    console.log("currentFile:", currentFile);
    console.log("formik.values[name]:", formik.values[name]);

    // Get the actual File object from formik
    const fileToUpload = formik.values[name];

    if (!fileToUpload || !(fileToUpload instanceof File)) {
      console.log("❌ No valid file to upload");
      warningMsg("Tidak ada file yang valid untuk diunggah");
      return;
    }

    if (!uploadFnc) {
      console.log("❌ No upload function provided");
      warningMsg("Fungsi upload tidak tersedia");
      return;
    }

    try {
      setIsUploading(true);
      console.log("🚀 Starting upload for file:", fileToUpload.name);

      const response = await uploadFnc(fileToUpload, name);

      console.log("✅ Upload response:", response);

      if (response) {
        // Store the complete response data
        setUploadedData(response);
        setCurrentFile(null);

        // ✅ IMPORTANT: Update formik with the response data (not the File object)
        formik.setFieldValue(name, response);

        // Clear any upload-related errors
        formik.setFieldError(name, undefined);

        successMsg("File berhasil diunggah");

        console.log("✅ Upload completed successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);

      // Don't overwrite existing file selection on upload error
      // Keep the file in formik so user can try again
      warningMsg(error.message || "Gagal mengunggah file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewDocument = (e) => {
    e.stopPropagation();

    if (!displayUrl) {
      warningMsg("Dokumen tidak tersedia");
      return;
    }

    window.open(displayUrl, "_blank");
  };

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  // Determine component state
  const hasSelectedFile = !!currentFile;
  const hasUploadedFile = !!uploadedData;
  const canUpload = hasSelectedFile && !isUploading;
  const canView = !!displayUrl;

  const isInvalid = formik.touched[name] && !!formik.errors[name];

  const getDisplayText = () => {
    if (hasUploadedFile && uploadedData.original_name) {
      return `${uploadedData.original_name}`;
    }
    if (hasSelectedFile) {
      return currentFile;
    }
    return "Unggah dokumen dengan klik untuk memilih file";
  };

  const getDisplayColor = () => {
    if (hasUploadedFile) return "#1F7C4D";
    if (hasSelectedFile) return "#041662";
    return "#B0B0B0";
  };

  // Debug logging
  // console.log(`FormUploadFile [${name}] render:`, {
  //   hasSelectedFile,
  //   hasUploadedFile,
  //   canUpload,
  //   canView,
  //   isInvalid,
  //   formikValue: formik.values[name],
  //   formikError: formik.errors[name],
  //   currentFile,
  //   uploadedData,
  // });

  return (
    <div className="mb-3">
      <Label style={{ fontSize: "12px", fontWeight: 500 }} htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <div className="d-flex align-items-center">
        <Box
          sx={{
            border: isInvalid ? "1px solid #dc3545" : "1px solid #E7E7E7",
            borderRadius: 2,
            width: "100%",
            backgroundColor: hasUploadedFile ? "#f8f9fa" : "white",
          }}
        >
          <Input
            id={name}
            name={name}
            type="file"
            className="form-control"
            onChange={handleFileChange}
            onBlur={() => formik.setFieldTouched(name, true)}
            innerRef={fileInputRef}
            style={{ display: "none" }}
            invalid={isInvalid}
            accept={acceptedFileTypes.join(",")}
            {...restProps}
          />

          <div
            onClick={handleButtonClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleButtonClick();
              }
            }}
            style={{
              minWidth: "100%",
              cursor: isUploading ? "not-allowed" : "pointer",
              opacity: isUploading ? 0.7 : 1,
            }}
            className="d-flex align-items-center justify-content-between p-2"
          >
            <div className="d-flex align-items-center">
              <Button
                style={{
                  backgroundColor: hasUploadedFile ? "#1F7C4D" : "#041662",
                  pointerEvents: "none",
                  border: "none",
                }}
                className="me-2 py-1 px-2"
                size="sm"
              >
                {!loadingUpload ? (
                  <FiFileText size={16} />
                ) : (
                  <FaSpinner className="animate spin" />
                )}
              </Button>

              {!loadingUpload ? (
                <span
                  style={{
                    color: getDisplayColor(),
                    fontSize: "12px",
                    lineHeight: "22px",
                    fontWeight: hasUploadedFile ? "500" : "400",
                  }}
                >
                  {getDisplayText()}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "12px",
                    lineHeight: "22px",
                    fontWeight: hasUploadedFile ? "500" : "400",
                  }}
                >
                  Mengunggah file, mohon tunggu...
                </span>
              )}
            </div>

            <div className="d-flex align-items-center">
              {/* View Button */}
              {canView && (
                <Button
                  style={{
                    backgroundColor: "#1F7C4D",
                    border: "none",
                  }}
                  className="me-1 py-1 px-2"
                  size="sm"
                  onClick={handleViewDocument}
                  disabled={isUploading}
                  title="Lihat dokumen"
                >
                  <FiEye size={14} />
                </Button>
              )}

              {/* Upload Button */}
              {canUpload && (
                <Button
                  style={{
                    backgroundColor: "#28a745",
                    border: "none",
                  }}
                  className="me-1 py-1 px-2"
                  size="sm"
                  onClick={handleUpload}
                  disabled={isUploading}
                  title="Upload file"
                >
                  {isUploading ? "..." : <BsCheck size={16} />}
                </Button>
              )}

              {/* Cancel Selection Button (for selected but not uploaded files) */}
              {hasSelectedFile && !hasUploadedFile && (
                <Button
                  style={{
                    backgroundColor: "#6c757d",
                    border: "none",
                  }}
                  className="py-1 px-2"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFileState();
                  }}
                  disabled={isUploading}
                  title="Batal pilih file"
                >
                  <BsX size={16} />
                </Button>
              )}
            </div>
          </div>
        </Box>
      </div>

      <span
        style={{
          fontSize: "10px",
          fontWeight: 400,
          lineHeight: "16px",
          color: "#6D6D6D",
        }}
      >
        * File berformat{" "}
        {acceptedFileTypes
          .map((type) => type.split("/")[1].toUpperCase())
          .join(" atau ")}{" "}
        dan tidak lebih dari {maxFileSizeMB}MB
      </span>

      {isInvalid && (
        <FormFeedback
          type="invalid"
          className="d-block"
          style={{ fontSize: "10px" }}
        >
          {formik.errors[name]}
        </FormFeedback>
      )}
    </div>
  );
};
