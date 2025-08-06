import { reactSlcStyles } from '@/lib/ReactSelect';
import Select from 'react-select';
import { Label, FormFeedback } from 'reactstrap';

export const DynamicDropdown = ({
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
}) => {
  // Fungsi untuk mendapatkan nilai nested yang lebih robust
  const getNestedValue = (obj, path) => {
    try {
      const keys = path
        .replace(/\[(\d+)\]/g, '.$1') // ubah [1] jadi .1
        .split('.');

      return keys.reduce((acc, key) => {
        if (acc && typeof acc === 'object') {
          return acc[key];
        }
        return undefined;
      }, obj);
    } catch {
      return undefined;
    }
  };

  // Transformasi options untuk memastikan konsistensi
  const options = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        value: item.value !== undefined ? String(item.value) : '',
        label: item.label || String(item.value),
      }))
    : [];

  const handleChange = (selectedOptions) => {
    try {
      if (isMulti) {
        // Handle multi-select
        const values = selectedOptions
          ? selectedOptions.map((option) =>
              useLabel ? option.label : option.value
            )
          : [];

        formik.setFieldValue(fieldName, values);

        if (onChange) onChange(values);
      } else {
        // Handle single select
        const value = selectedOptions
          ? useLabel
            ? selectedOptions.label
            : selectedOptions.value
          : '';

        // Spesial handling untuk kasus khusus
        if (id == 'apostille' && selectedOptions) {
          formik.setFieldValue('jenis_layanan', selectedOptions.jenis_layanan);
        }
        formik.setFieldValue(fieldName, value);
        if (onChange) onChange(selectedOptions);
      }
    } catch (error) {
      console.error('Error in DynamicDropdown handleChange:', error);
    }
  };

  // Dapatkan nilai field dengan dukungan nested
  const fieldValue = getNestedValue(formik.values, fieldName);

  // Tentukan current value untuk single atau multi select
  const currentValue = isMulti
    ? options.filter((option) =>
        Array.isArray(fieldValue)
          ? fieldValue.includes(String(option.value)) ||
            fieldValue.includes(String(option.label))
          : false
      )
    : options.find(
        (option) =>
          String(option.value) === String(fieldValue) ||
          String(option.label) === String(fieldValue)
      ) || null;

  // Dapatkan status touched dan error untuk nested fields
  const touched = getNestedValue(formik.touched, fieldName);
  const error = getNestedValue(formik.errors, fieldName);

  // Tentukan apakah error harus ditampilkan
  const shouldShowError = touched === true && !!error;

  // Debug logging
  // console.log(`DynamicDropdown - ${fieldName}`, {
  //   fieldValue,
  //   touched,
  //   error,
  //   currentValue,
  // });

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
        value={currentValue}
        isClearable={isClearable}
        isSearchable
        onChange={handleChange}
        onBlur={() => formik.setFieldTouched(fieldName, true)}
        placeholder={`Pilih ${label || fieldName}`}
        styles={reactSlcStyles}
        isMulti={isMulti}
        isDisabled={isDisabled}
      />

      {/* Tampilkan error dengan dukungan nested */}
      {shouldShowError && (
        <FormFeedback className="d-block mt-1" style={{ fontSize: '10px' }}>
          {error}
        </FormFeedback>
      )}
    </div>
  );
};
// import { reactSlcStyles } from "@/lib/ReactSelect";
// import Select from "react-select";
// import { Label, FormFeedback } from "reactstrap";
// import get from "lodash/get";

// export const DynamicDropdown = ({
//   id = "",
//   formik,
//   fieldName,
//   data = [],
//   isMulti = false,
//   label,
//   isDisabled = false,
//   useLabel = false,
//   onChange,
//   isClearable = true,
//   required = false,
//   fontSize = "12px",
// }) => {
//   const options = Array.isArray(data) ? data : [];

//   const handleChange = (selectedOptions) => {
//     if (isMulti) {
//       const values = selectedOptions
//         ? selectedOptions.map((option) =>
//             useLabel ? option.label : option.value
//           )
//         : [];
//       formik?.setFieldValue(fieldName, values);
//       if (onChange) onChange(values);
//     } else {
//       const value = selectedOptions
//         ? useLabel
//           ? selectedOptions.label
//           : selectedOptions.value
//         : "";
//       if (id == "apostille") {
//         formik?.setFieldValue("type", selectedOptions?.type);
//       }
//       formik?.setFieldValue(fieldName, value);
//       if (onChange) onChange(value);
//     }
//   };

//   // Handle current value based on formik state
//   const fieldValue = get(formik?.values, fieldName);

//   const currentValue = isMulti
//     ? options.filter((option) =>
//         Array.isArray(fieldValue)
//           ? fieldValue.includes(option.value) ||
//             fieldValue.includes(option.label)
//           : false
//       )
//     : options.find(
//         (option) =>
//           option.value === String(fieldValue) ||
//           option.label === String(fieldValue)
//       ) || null;

//   return (
//     <div className="mb-2">
//       {label && (
//         <Label className="mb-0" style={{ fontSize }}>
//           {label} {required && <span className="text-danger">*</span>}
//         </Label>
//       )}

//       <Select
//         options={options}
//         value={currentValue}
//         isClearable={isClearable}
//         isSearchable
//         onChange={handleChange}
//         placeholder={`Pilih ${label || fieldName}`}
//         styles={reactSlcStyles}
//         isMulti={isMulti}
//         isDisabled={isDisabled}
//       />

//       {get(formik?.touched, fieldName) && get(formik?.errors, fieldName) && (
//         <p className="text-danger mt-1" style={{ fontSize: "10px" }}>
//           {get(formik?.errors, fieldName)}
//         </p>
//       )}
//     </div>
//   );
// };
