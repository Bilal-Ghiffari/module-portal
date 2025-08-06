import React, { useState, useRef, useEffect } from "react";
import { Input, FormFeedback, Label, Button } from "reactstrap";
import { Box, Button as MuiButton, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { warningMsg } from "@/helpers/Notification/toastNotification";
import get from "lodash/get";
import { FiFileText } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";

export const formatPlaceholder = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // hapus semua karakter non-alfanumerik (kecuali spasi dan underscore)
    .replace(/\s+/g, "_"); // ubah spasi jadi underscore
};

export const FormHeader = ({ title }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF7FF",
        padding: 1,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#041662",
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export const FormHeaderWithButton = ({ title, buttonText, onButtonClick }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF7FF",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#041662",
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>

      {/* Button with custom styles */}
      {buttonText && onButtonClick && (
        <MuiButton
          variant="outlined"
          sx={{
            height: "36px",
            padding: "0 20px",
            fontSize: "14px",
            textTransform: "none",
            color: "#041662",
            borderColor: "#041662",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#041662",
              color: "#fff",
            },
          }}
          onClick={onButtonClick}
        >
          {buttonText}
        </MuiButton>
      )}
    </Box>
  );
};

export const FormInput = ({
  formik,
  name,
  type = "text",
  placeholder,
  readonly = false,
  autoComplete = "off",
  onlyNumber = false,
  required = false,
  title = "",
  leftIcon = null,
  fontSize = "12px",
  maks,
  maksDate,
  isCurrency = false,
  rows = 4,
  usePlaceholder = false,
  ...restProps
}) => {
  const [displayValue, setDisplayValue] = React.useState("");
  const id = usePlaceholder ? formatPlaceholder(placeholder) : name;
  const handleInputChange = (event) => {
    let value = event.target.value || "";

    if (isCurrency || onlyNumber) {
      // Hanya angka: hapus karakter non-digit
      value = value.replace(/\D/g, "");

      const numericValue = Number(value) || 0;

      if (maks && numericValue > maks) return;

      // Simpan angka ke formik
      formik.setFieldValue(id, numericValue);

      if (isCurrency) {
        // Format tampilan sebagai mata uang
        if (numericValue > 0) {
          const formatted =
            "Rp " + new Intl.NumberFormat("id-ID").format(numericValue);
          setDisplayValue(formatted);
        } else {
          setDisplayValue("");
        }
      }
    } else {
      if (type === "number") {
        value = value.replace(/\D/g, "");
        const numericValue = Number(value) || 0;

        if (typeof maks === "number" && numericValue > maks) return;

        formik.setFieldValue(name, value);
      } else {
        // Field biasa: simpan teks langsung
        formik.setFieldValue(id, value);
      }
    }
  };

  React.useEffect(() => {
    if (isCurrency) {
      const current = get(formik.values, id, "");
      const numeric = Number(current);
      if (numeric > 0) {
        const formatted =
          "Rp " + new Intl.NumberFormat("id-ID").format(numeric);
        setDisplayValue(formatted);
      } else {
        setDisplayValue("");
      }
    }
  }, [get(formik?.values, id), isCurrency]);

  const fieldValue = get(formik.values, id, "");
  const inputValue = isCurrency ? displayValue : fieldValue;

  return (
    <div className="mb-3" style={{ fontFamily: "Poppins" }}>
      {placeholder && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={id}>
          {title || placeholder}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <Box sx={{ position: "relative" }}>
        {leftIcon && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#aaa",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            {leftIcon}
          </Box>
        )}

        {type === "textarea" ? (
          <textarea
            id={id}
            name={id}
            rows={rows} // ⬅️ Tambahkan ini untuk tinggi
            className="form-control"
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={inputValue}
            readOnly={readonly}
            style={{
              border: "1px solid #E7E7E7",
              color: !inputValue ? "#B0B0B0" : "#000",
              backgroundColor: readonly ? "#f5f5f5" : "#fff",
            }}
            {...restProps}
          />
        ) : (
          <Input
            id={id}
            name={id}
            type={type}
            className="form-control"
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={inputValue}
            invalid={formik.touched[id] && !!formik.errors[id]}
            readOnly={readonly}
            autoComplete={autoComplete}
            max={type === "date" && maksDate ? maksDate : undefined}
            style={{
              border: "1px solid #E7E7E7",
              color: !inputValue ? "#B0B0B0" : "#000",
              paddingLeft: leftIcon ? "25px" : "12px",
              backgroundColor: readonly ? "#f5f5f5" : "#fff",
            }}
            {...restProps}
          />
        )}
      </Box>

      {formik.touched[id] && formik.errors[id] && (
        <FormFeedback className="d-block">{formik.errors[id]}</FormFeedback>
      )}
    </div>
  );
};

export const FormSelect = ({
  formik,
  name,
  placeholder,
  options = [],
  readonly = false,
  autoComplete = "off",
  required = false,
  title = "",
  fontSize = "12px",
  ...restProps
}) => {
  return (
    <div className="mb-3">
      {placeholder && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={name}>
          {placeholder}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type="select"
        className="form-control"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name] || ""}
        invalid={formik.touched[name] && !!formik.errors[name]}
        readOnly={readonly}
        autoComplete={autoComplete}
        style={{
          border: "1px solid #E7E7E7",
          color: formik.values[name] === "" ? "#B0B0B0" : "#000",
          boxShadow: "none",
          fontSize,
        }}
        {...restProps}
      >
        <option value="">{`Pilih ${placeholder}`}</option>
        {options.map((option) => (
          <option
            style={{ color: "#000" }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Input>
      {formik.touched[name] && formik.errors[name] && (
        <FormFeedback>{formik.errors[name]}</FormFeedback>
      )}
    </div>
  );
};

export const FormAutocomplete = ({
  formik,
  name,
  placeholder,
  options = [],
  isMulti = false,
  readonly = false,
  required = false,
  title = "",
  ...restProps
}) => {
  const selectedValue = isMulti
    ? options.filter((option) => formik.values[name]?.includes(option.value))
    : options.find((option) => option.value === formik.values[name]);

  const handleSelectChange = (selectedOption) => {
    if (isMulti) {
      formik.setFieldValue(
        name,
        selectedOption ? selectedOption.map((option) => option.value) : []
      );
    } else {
      formik.setFieldValue(name, selectedOption ? selectedOption.value : "");
    }
    formik.setFieldTouched(name, true);
  };

  const handleBlur = () => {
    formik.setFieldTouched(name, true);
    formik.handleBlur(name);
  };

  const isInvalid = formik.touched[name] && !!formik.errors[name];

  return (
    <div className="mb-3">
      {placeholder && (
        <Label htmlFor={name}>
          {title} {required && <span className="text-danger">*</span>}{" "}
        </Label>
      )}
      <Select
        id={name}
        name={name}
        options={options}
        value={selectedValue}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        isMulti={isMulti}
        placeholder={`Pilih ${placeholder}`}
        isDisabled={readonly}
        classNamePrefix="react-select"
        className={isInvalid ? "is-invalid" : ""}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: isInvalid ? "#dc3545" : "#E7E7E7",
            "&:hover": {
              borderColor: isInvalid ? "#dc3545" : "#E7E7E7",
            },
            boxShadow:
              state.isFocused && isInvalid
                ? "0 0 0 0.25rem rgba(220,53,69,.25)"
                : state.isFocused
                ? "0 0 0 0.25rem rgba(13,110,253,.25)"
                : provided.boxShadow,
          }),
        }}
        {...restProps}
      />
      {formik.touched[name] && formik.errors[name] && (
        <FormFeedback className="d-block">{formik.errors[name]}</FormFeedback>
      )}
    </div>
  );
};

export const FormUploadFile = ({
  formik,
  name,
  label,
  acceptedFileTypes = ["application/pdf"],
  maxFileSizeMB = 1,
  required = false,
  ...restProps
}) => {
  const fileInputRef = useRef(null);
  // fileName akan diambil dari nilai Formik jika sudah ada,
  // jika tidak, akan di-update saat file baru dipilih
  const [currentFileName, setCurrentFileName] = useState("");

  // Efek untuk sinkronisasi fileName dengan formik.values[name]
  useEffect(() => {
    // Memastikan nilai awal Formik atau perubahan nilai dari luar tercermin
    if (formik.values[name] instanceof File) {
      setCurrentFileName(formik.values[name].name);
    } else {
      // Reset jika bukan objek File
      setCurrentFileName("");
    }
  }, [formik.values[name]]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldTouched(name, true);

    if (file) {
      const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

      if (!acceptedFileTypes.includes(file.type)) {
        const errorMessage = `Tipe file tidak valid. Harap unggah ${acceptedFileTypes
          .map((type) => type.split("/")[1].toUpperCase())
          .join(", ")}.`;
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        setCurrentFileName("");
        warningMsg(errorMessage);
        // Hentikan proses jika tipe file tidak valid
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const errorMessage = `Ukuran file tidak boleh lebih dari ${maxFileSizeMB}MB.`;
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        setCurrentFileName("");
        warningMsg(errorMessage);
        // Hentikan proses jika ukuran file terlalu besar
        return;
      }

      formik.setFieldValue(name, file);
      setCurrentFileName(file.name);
      // Clear previous errors
      formik.setFieldError(name, undefined);
    } else {
      // Jika file dibatalkan atau tidak ada
      formik.setFieldValue(name, null);
      setCurrentFileName("");
      // Clear errors if no file
      formik.setFieldError(name, undefined);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const isInvalid = formik.touched[name] && !!formik.errors[name];

  return (
    <div className="mb-3">
      <Label style={{ fontSize: "12px", fontWeight: 500 }} htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}{" "}
      </Label>
      <div className="d-flex align-items-center">
        <Box
          sx={{ border: "1px solid #E7E7E7", borderRadius: 2, width: "100%" }}
        >
          <Input
            id={name}
            name={name}
            type="file"
            className="form-control"
            onChange={handleFileChange}
            onBlur={() => formik.setFieldTouched(name, true)} // Mark as touched on blur
            innerRef={fileInputRef}
            style={{ display: "none" }}
            invalid={isInvalid}
            //  accept attribute hint kepada browser
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
              cursor: "pointer", //
            }}
            className="d-flex align-items-center "
          >
            <Button
              style={{
                backgroundColor: "#041662",
                pointerEvents: "none",
              }}
              className="me-2 py-2"
            >
              <FiFileText size={19} />
            </Button>

            <span
              style={{
                color: currentFileName ? "#041662" : "#B0B0B0",
                fontSize: "14px",
                lineHeight: "22px",
              }}
            >
              {currentFileName ||
                "Unggah dokumen dengan klik untuk memilih file"}
            </span>
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
