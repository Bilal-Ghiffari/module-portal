import React from 'react';
import Select from 'react-select';
import { Label, FormFeedback } from 'reactstrap';
import { reactSlcStyles } from '@/lib/ReactSelect';

export const DynamicDropdownCurrencyNested = ({
  id = '',
  formik,
  fieldName,
  data = [],
  isMulti = false,
  label,
  isDisabled = false,
  useLabel = false,
  onChange,
  isClearable = true,
  required = false,
  fontSize = '12px',
  value,
}) => {
  // Fungsi untuk mendapatkan nilai nested
  const getNestedValue = (obj, path) => {
    if (typeof path === 'string') {
      const keys = path.split('.');
      let result = obj;

      for (let key of keys) {
        if (!result || typeof result !== 'object') {
          return undefined;
        }
        result = result[key];
      }

      return result;
    }
    return undefined;
  };

  // Transformasi options
  const options = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        value: item.value !== undefined ? String(item.value) : '',
        label: item.label || String(item.value),
      }))
    : [];

  const handleChange = (selectedOptions) => {
    if (isMulti) {
      const values = selectedOptions
        ? selectedOptions.map((option) =>
            useLabel ? option.label : option.value
          )
        : [];
      formik.setFieldValue(fieldName, values);
      if (onChange) onChange(values);
    } else {
      const value = selectedOptions
        ? useLabel
          ? selectedOptions.label
          : selectedOptions.value
        : '';
      formik.setFieldValue(fieldName, value);
      if (onChange) onChange(selectedOptions);
    }
  };

  // Mengambil nilai field dari Formik
  const fieldValue = getNestedValue(formik.values, fieldName);

  // Tentukan current value
  const currentValue = isMulti
    ? Array.isArray(fieldValue)
      ? options.filter(
          (option) =>
            fieldValue.includes(String(option.value)) ||
            fieldValue.includes(String(option.label))
        )
      : []
    : options.find(
        (option) =>
          String(option.value) === String(fieldValue) ||
          String(option.label) === String(fieldValue)
      ) || null;

  const touched = getNestedValue(formik.touched, fieldName);
  const error = getNestedValue(formik.errors, fieldName);

  return (
    <div className="mb-2">
      {label && (
        <Label className="mb-0" style={{ fontSize }}>
          {label}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <Select
        options={options}
        value={value ?? currentValue}
        isClearable={isClearable}
        isSearchable
        onChange={handleChange}
        onBlur={() => formik.setFieldTouched(fieldName, true)}
        placeholder={`Pilih ${label || fieldName}`}
        styles={reactSlcStyles}
        isMulti={isMulti}
        isDisabled={isDisabled}
      />

      {/* Menampilkan pesan error */}
      {touched && error && (
        <FormFeedback className="d-block mt-1" style={{ fontSize: '10px' }}>
          {error}
        </FormFeedback>
      )}
    </div>
  );
};
