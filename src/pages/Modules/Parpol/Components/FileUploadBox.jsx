import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import FileUploadComponent from "@/components/Common/UploadFile";
import FilePreview from "@/components/Common/FilePreview";

const FileUploadBox = ({
  id = "",
  label = "Lambang atau Tanda Gambar Partai Politik",
  formik,
}) => {
  const [error, setError] = useState("");

  const file = formik?.values?.[id];
  const fileName = file?.name || "";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("File harus berformat PDF");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file tidak boleh lebih dari 5MB");
      return;
    }

    setError("");
    formik.setFieldValue(id, file);
  };

  const handleFileRemove = () => {
    formik.setFieldValue(id, null);
    setError("");
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold" style={{ fontSize: "12px" }}>
        {label} <span className="text-danger">*</span>
      </label>

      <Box
        className="rounded"
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "250px",
            borderRadius: "12px",
            backgroundColor: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginBottom: 2,
          }}
        >
          {fileName ? (
            <FilePreview file={formik?.values?.[id]} />
          ) : (
            <FaUserCircle color="#bbb" size={100} />
          )}
        </Box>

        {!fileName ? (
          <>
            <label
              className="btn btn-outline-primary fw-bold w-100"
              htmlFor={`fileUpload-${id}`}
            >
              Pilih Foto
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              id={`fileUpload-${id}`}
              hidden
            />
          </>
        ) : (
          <Button
            variant="outlined"
            color="error"
            onClick={handleFileRemove}
            className="fw-bold w-100 fs-6"
          >
            Hapus Foto
          </Button>
        )}
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            id="fileUpload"
            hidden
          />

          {fileName && !error && (
            <Typography
              className="mt-2 text-success"
              sx={{
                fontSize: "12px",
              }}
            >
              File dipilih: <strong>{fileName}</strong>
            </Typography>
          )}

          <Typography
            sx={{
              color: error ? "red" : "#666",
              fontSize: "10px",
            }}
          >
            {error ||
              "*File harus berformat PDF dan berukuran tidak lebih dari 5MB"}
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default FileUploadBox;
