import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExifReader from "exifreader";
import { Label } from "reactstrap";
import { formatPlaceholder } from "./FormField";

const allValidTypes = {
  zip: ["application/zip", "application/x-zip-compressed"],
  xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  image: ["image/jpeg", "image/png"],
  pdf: ["application/pdf"],
};

const getValidTypes = (specified, validType) => {
  if (specified) {
    return allValidTypes[validType] || [];
  }
  return ["application/pdf", "image/jpeg", "image/jpg"];
};

const FileUploadComponent = (props) => {
  const {
    text,
    resFile,
    name,
    maxSizeMb,
    searchLatLon,
    resLatLon,
    fieldType,
    validType,
    specified,
    label,
    fontSize = "12px",
    required = false,
    fieldValue,
    showAlert = true,
    handleDelete,
  } = props;
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null); // untuk reset nama file di input text
  const [uploaded, setUploaded] = useState(false); // state untuk cek file sudah ada

  useEffect(() => {
    if (fieldValue) {
      setUploaded(true);

      const fileName =
        fieldValue.original_name ||
        fieldValue.orig_name ||
        fieldValue.name ||
        "";

      if (textInputRef.current) {
        textInputRef.current.value = fileName;
      }
    } else {
      setUploaded(false);

      if (textInputRef.current) {
        textInputRef.current.value = "";
      }
    }
  }, [fieldValue]);

  const handleClick = () => {
    if (uploaded) {
      handleRemove(); // kalau sudah upload, klik akan hapus
    } else {
      fileInputRef.current.click(); // kalau belum, klik akan buka file picker
    }
  };

  const handleRemove = () => {
    fileInputRef.current.value = ""; // reset input file
    textInputRef.current.value = ""; // reset input text
    setUploaded(false); // update state
    resFile(null); // kirim null ke parent supaya parent tahu file sudah dihapus
    handleDelete();
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      try {
        if (searchLatLon) {
          const arrayBuffer = await file.arrayBuffer();
          const tags = ExifReader.load(arrayBuffer);

          const gpsLatitude = tags.GPSLatitude
            ? tags.GPSLatitude.description
            : "";
          const gpsLatitudeRef = tags.GPSLatitudeRef
            ? tags.GPSLatitudeRef.description
            : "";
          const gpsLongitude = tags.GPSLongitude
            ? tags.GPSLongitude.description
            : "";
          const gpsLongitudeRef = tags.GPSLongitudeRef
            ? tags.GPSLongitudeRef.description
            : "";

          let latitude = parseFloat(gpsLatitude);
          let longitude = parseFloat(gpsLongitude);

          if (gpsLatitudeRef === "South latitude") {
            latitude = -latitude;
          }
          if (gpsLongitudeRef === "West longitude") {
            longitude = -longitude;
          }

          if (latitude && longitude) {
            resLatLon({ lat: latitude, lon: longitude });
          }
        }
      } catch (err) {
        console.error("Gagal membaca metadata GPS:", err);
      }

      const validTypes = getValidTypes(specified, validType);
      const maxSize = (maxSizeMb || 64) * 1024 * 1024;

      if (!validTypes.includes(fileType)) {
        alert(
          specified
            ? `File Tidak Valid, Hanya Tipe ${validType.toUpperCase()} Yang Diperbolehkan`
            : "File Tidak Valid, Hanya Tipe JPG, JPEG dan PDF Yang Diperbolehkan"
        );
        fileInputRef.current.value = "";
        return;
      }

      if (fileSize > maxSize) {
        alert(
          `Ukuran File Melebihi ${maxSizeMb || 64} Mb, Maksimal ${
            maxSizeMb || 64
          } Mb`
        );
        fileInputRef.current.value = "";
        return;
      }

      const fileURL = URL.createObjectURL(file);
      if (fieldType === "location") {
        resFile({ file, fileURL });
      } else {
        resFile(file);
      }

      // tampilkan nama file di input text
      if (textInputRef.current) {
        textInputRef.current.value = file.name;
      }

      setUploaded(true);
    }
  };

  const str = (validType ? [validType] : ["pdf", "jpeg", "jpg"])
    .map((type) => `.${type}`)
    .join(", ");

  return (
    <div>
      {label && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={text}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <div className="d-flex align-items-center w-100">
        <input
          type="text"
          className="form-control"
          placeholder={text}
          aria-label={text}
          readOnly
          ref={textInputRef}
          onClick={() => !uploaded && fileInputRef.current.click()}
          style={{
            flexGrow: 1,
            marginRight: "10px",
            cursor: uploaded ? "default" : "pointer",
          }}
        />
        <input
          name={name}
          type="file"
          className="form-control d-none"
          ref={fileInputRef}
          accept={str}
          onChange={handleChange}
        />
        <div
          className={`btn ${uploaded ? "btn-danger" : "btn-primary"}`}
          onClick={handleClick}
        >
          {uploaded ? "Hapus" : "Unggah"}
        </div>
      </div>
      {showAlert && (
        <p style={{ fontSize: "10px" }}>
          *File harus berformat {validType} dan berukuran tidak lebih dari 5MB
        </p>
      )}
    </div>
  );
};

export default FileUploadComponent;
