import React, { useState, useEffect } from "react";
import { FormFeedback, Label } from "reactstrap";
import Select from "react-select";
import { Box } from "@mui/material";

export const FormAutocomplete = ({
  formik,
  name,
  placeholder,
  options = [],
  isMulti = false,
  readonly = false,
  isDisabled = false,
  required = false,
  title = "",
  fontSize = "12px",
  isSearchable = true,
  noOptionsMessage = "Tidak ada opsi",
  loadingMessage = "Memuat...",
  menuPortalTarget = typeof document !== "undefined" ? document.body : null,
  ...restProps
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

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

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
  };

  const isInvalid = formik.touched[name] && !!formik.errors[name];

  return (
    <div className="mb-3" style={{ position: "relative", zIndex: 1 }}>
      {placeholder && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={name}>
          {title || placeholder}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <Box sx={{ position: "relative" }}>
        <Select
          id={name}
          name={name}
          options={filteredOptions}
          value={selectedValue}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          onInputChange={handleInputChange}
          inputValue={searchTerm}
          isMulti={isMulti}
          isSearchable={isSearchable}
          placeholder={`Pilih ${placeholder}`}
          noOptionsMessage={() => noOptionsMessage}
          loadingMessage={() => loadingMessage}
          isDisabled={readonly || isDisabled}
          classNamePrefix="react-select"
          className={isInvalid ? "is-invalid" : ""}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          styles={{
            control: (provided, state) => ({
              ...provided,
              borderColor:
                // isInvalid ? "#dc3545" :
                "#E7E7E7",
              "&:hover": {
                borderColor:
                  // isInvalid ? "#dc3545" :
                  "#E7E7E7",
              },
              boxShadow:
                state.isFocused && isInvalid
                  ? "0 0 0 0.25rem rgba(220,53,69,.25)"
                  : state.isFocused
                  ? "0 0 0 0.25rem rgba(13,110,253,.25)"
                  : provided.boxShadow,
              fontSize: fontSize,
              minHeight: "38px",
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
              position: "absolute",
            }),
            option: (provided) => ({
              ...provided,
              fontSize: fontSize,
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#B0B0B0",
              fontSize: fontSize,
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#000",
              fontSize: fontSize,
            }),
            multiValue: (provided) => ({
              ...provided,
              fontSize: fontSize,
            }),
          }}
          {...restProps}
        />
      </Box>
      {formik.touched[name] && formik.errors[name] && (
        <FormFeedback className="d-block">{formik.errors[name]}</FormFeedback>
      )}
    </div>
  );
};
