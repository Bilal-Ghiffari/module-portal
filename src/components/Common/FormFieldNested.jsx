import React, { useState, useRef, useEffect } from 'react';
import { Input, FormFeedback, Label, Button } from 'reactstrap';
import {
  Box,
  Button as MuiButton,
  Typography,
  Checkbox,
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  FormLabel,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { warningMsg } from '@/helpers/Notification/toastNotification';
import get from 'lodash/get';
import { FiFileText } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { getIn } from 'formik';
import { size } from 'lodash';

export const FormHeader = ({ title }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#EFF7FF',
        padding: 1,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: '#041662',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '24px',
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
        backgroundColor: '#EFF7FF',
        padding: 1,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: '#041662',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '24px',
        }}
      >
        {title}
      </Typography>

      {/* Button with custom styles */}
      {buttonText && onButtonClick && (
        <MuiButton
          variant="outlined"
          sx={{
            height: '36px',
            padding: '0 20px',
            fontSize: '14px',
            textTransform: 'none',
            color: '#041662',
            borderColor: '#041662',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#041662',
              color: '#fff',
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
  type = 'text',
  placeholder,
  readonly = false,
  autoComplete = 'off',
  onlyNumber = false,
  required = false,
  title = '',
  leftIcon = null,
  fontSize = '12px',
  maks,
  ...restProps
}) => {
  const [displayValue, setDisplayValue] = React.useState('');

  const handleInputChange = (event) => {
    let value = event.target.value;
    // console.log('value change>>>', value);

    if (onlyNumber || type === 'number' || type === 'tel') {
      value = value.replace(/[^0-9]/g, '');
    }

    const numericValue = parseInt(value || '0', 10);
    if (maks && numericValue > maks) {
      return;
    }

    let formattedValue = value;
    if (name === 'total_modal_usaha') {
      if (value === '') value = '0';
      formattedValue =
        'Rp ' + new Intl.NumberFormat('id-ID').format(Number(value) || 0);
    }

    // console.log('name>>>', name);
    // console.log('value>>>', value);
    formik.setFieldValue(name, value);

    if (name === 'total_modal_usaha') {
      setDisplayValue(formattedValue);
    }
  };

  React.useEffect(() => {
    if (name === 'total_modal_usaha') {
      const current = get(formik.values, name, '0');
      const numeric = Number(current) || 0;
      const formatted = 'Rp ' + new Intl.NumberFormat('id-ID').format(numeric);
      setDisplayValue(formatted);
    }
  }, [get(formik?.values, name)]);

  const fieldValue = get(formik.values, name, '');

  const inputType = type === 'date' ? 'date' : 'text';
  return (
    <div className="mb-3" style={{ fontFamily: 'Poppins' }}>
      {placeholder && (
        <Label
          className="m-0 p-0"
          style={{
            fontSize,
          }}
          htmlFor={name}
        >
          {title ? title : placeholder}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <Box sx={{ position: 'relative' }}>
        {leftIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#aaa',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {leftIcon}
          </Box>
        )}

        <Input
          id={name}
          name={name}
          type={type}
          className="form-control"
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ''}
          invalid={formik.touched[name] && !!formik.errors[name]}
          readOnly={readonly}
          autoComplete={autoComplete}
          style={{
            border: '1px solid #E7E7E7',
            color: !formik.values[name] ? '#B0B0B0' : '#000',
            paddingLeft: leftIcon ? '25px' : '12px',
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

export const FormInputNested = ({
  formik,
  name,
  type = 'text',
  placeholder,
  readonly = false,
  autoComplete = 'off',
  onlyNumber = false,
  required = false,
  title = '',
  leftIcon = null,
  fontSize = '12px',
  maks,
  formatCurrency = false,
  ...restProps
}) => {
  const [displayValue, setDisplayValue] = React.useState('');

  // Function to get nested value
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

  const handleInputChange = (event) => {
    let value = event.target.value;

    // Ensure only numbers if specified
    if (onlyNumber || type === 'number' || type === 'tel') {
      value = value.replace(/[^0-9]/g, '');
    }

    // Validate maximum value
    const numericValue = parseInt(value || '0', 10);
    if (maks && numericValue > maks) {
      return;
    }

    let formattedValue = value;

    // Format value as currency if needed
    if (formatCurrency) {
      if (value === '') value = '0';
      formattedValue =
        'Rp ' + new Intl.NumberFormat('id-ID').format(Number(value) || 0);
    }

    // Set value in Formik
    formik.setFieldValue(name, value);

    // Update display value for formatted currency
    if (formatCurrency) {
      setDisplayValue(formattedValue);
    }
  };

  // Update the display value on change
  React.useEffect(() => {
    if (formatCurrency) {
      const current = getNestedValue(formik.values, name);
      const numeric = Number(current) || 0;
      const formatted = 'Rp ' + new Intl.NumberFormat('id-ID').format(numeric);
      setDisplayValue(formatted);
    }
  }, [getNestedValue(formik.values, name), formatCurrency]);

  const fieldValue = getNestedValue(formik.values, name);

  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const inputType = type === 'date' ? 'date' : 'text';

  return (
    <div className="mb-3" style={{ fontFamily: 'Poppins' }}>
      {placeholder && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={name}>
          {title ? title : placeholder}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <Box sx={{ position: 'relative' }}>
        {leftIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#aaa',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {leftIcon}
          </Box>
        )}

        <Input
          id={name}
          name={name}
          type={inputType}
          className="form-control"
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formatCurrency ? displayValue : fieldValue || ''}
          invalid={touched && !!error} // Properly set invalid state
          readOnly={readonly}
          autoComplete={autoComplete}
          style={{
            border: '1px solid #E7E7E7',
            color: !fieldValue ? '#B0B0B0' : '#000',
            paddingLeft: leftIcon ? '25px' : '12px',
          }}
          {...restProps}
        />
      </Box>

      {/* Make sure to display the error message correctly */}
      {/* {(touched || error) && error && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )} */}
      {touched && error && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </div>
  );
};

export const FormDatePickerNested = ({
  formik,
  name,
  type = 'text',
  placeholder,
  readonly = false,
  autoComplete = 'off',
  onlyNumber = false,
  required = false,
  title = '',
  leftIcon = null,
  fontSize = '12px',
  maks,
  formatCurrency = false,
  minDate, // Passed prop for min date
  maxDate, // Passed prop for max date
  ...restProps
}) => {
  const [displayValue, setDisplayValue] = useState('');

  // Function to get nested value
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

  const handleInputChange = (event) => {
    let value = event.target.value;

    // Ensure only numbers if specified
    if (onlyNumber || type === 'number' || type === 'tel') {
      value = value.replace(/[^0-9]/g, '');
    }

    // Validate maximum value
    const numericValue = parseInt(value || '0', 10);
    if (maks && numericValue > maks) {
      return;
    }

    let formattedValue = value;

    // Format value as currency if needed
    if (formatCurrency) {
      if (value === '') value = '0';
      formattedValue =
        'Rp ' + new Intl.NumberFormat('id-ID').format(Number(value) || 0);
    }

    // Set value in Formik
    formik.setFieldValue(name, value);

    // Update display value for formatted currency
    if (formatCurrency) {
      setDisplayValue(formattedValue);
    }
  };

  // Update the display value on change
  React.useEffect(() => {
    if (formatCurrency) {
      const current = getNestedValue(formik.values, name);
      const numeric = Number(current) || 0;
      const formatted = 'Rp ' + new Intl.NumberFormat('id-ID').format(numeric);
      setDisplayValue(formatted);
    }
  }, [getNestedValue(formik.values, name), formatCurrency]);

  const fieldValue = getNestedValue(formik.values, name);

  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const inputType = type === 'date' ? 'date' : 'text';

  return (
    <div className="mb-3" style={{ fontFamily: 'Poppins' }}>
      {placeholder && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={name}>
          {title ? title : placeholder}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <Box sx={{ position: 'relative' }}>
        {leftIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#aaa',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {leftIcon}
          </Box>
        )}

        <Input
          id={name}
          name={name}
          type={inputType}
          className="form-control"
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formatCurrency ? displayValue : fieldValue || ''}
          invalid={touched && !!error} // Properly set invalid state
          readOnly={readonly}
          autoComplete={autoComplete}
          style={{
            border: '1px solid #E7E7E7',
            color: !fieldValue ? '#B0B0B0' : '#000',
            paddingLeft: leftIcon ? '25px' : '12px',
          }}
          // Apply passed min and max date attributes
          min={minDate}
          max={maxDate}
          {...restProps}
        />
      </Box>

      {/* Display error message if touched and error exist */}
      {touched && error && (
        <FormFeedback className="d-block">{error}</FormFeedback>
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
  autoComplete = 'off',
  required = false,
  title = '',
  fontSize = '12px',
  ...restProps
}) => {
  // Fungsi untuk mendapatkan nilai nested yang lebih robust
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

  // Fungsi untuk mengatur nilai nested
  const handleChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue(name, value);
  };

  // Mendapatkan nilai dengan support nested path
  const fieldValue = getNestedValue(formik.values, name);

  // Penanganan error untuk nested paths
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  // Tentukan apakah error harus ditampilkan
  const shouldShowError = touched === true && !!error;

  return (
    <div className="mb-3">
      {placeholder && (
        <Label className="m-0 p-0" style={{ fontSize }} htmlFor={name}>
          {title || placeholder}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <Input
        id={name}
        name={name}
        type="select"
        className="form-control"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={fieldValue || ''}
        invalid={shouldShowError}
        readOnly={readonly}
        autoComplete={autoComplete}
        style={{
          border: '1px solid #E7E7E7',
          color: !fieldValue ? '#B0B0B0' : '#000',
          boxShadow: 'none',
          fontSize,
        }}
        {...restProps}
      >
        <option value="">{`Pilih ${placeholder}`}</option>
        {options.map((option) => (
          <option
            style={{ color: '#000' }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Input>

      {shouldShowError && (
        <FormFeedback className="d-block">{error}</FormFeedback>
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
  title = '',
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
      formik.setFieldValue(name, selectedOption ? selectedOption.value : '');
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
          {title} {required && <span className="text-danger">*</span>}{' '}
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
        className={isInvalid ? 'is-invalid' : ''}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: isInvalid ? '#dc3545' : '#E7E7E7',
            '&:hover': {
              borderColor: isInvalid ? '#dc3545' : '#E7E7E7',
            },
            boxShadow:
              state.isFocused && isInvalid
                ? '0 0 0 0.25rem rgba(220,53,69,.25)'
                : state.isFocused
                ? '0 0 0 0.25rem rgba(13,110,253,.25)'
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
  acceptedFileTypes = ['application/pdf'],
  maxFileSizeMB = 1,
  required = false,
  ...restProps
}) => {
  const fileInputRef = useRef(null);
  // fileName akan diambil dari nilai Formik jika sudah ada,
  // jika tidak, akan di-update saat file baru dipilih
  const [currentFileName, setCurrentFileName] = useState('');

  // Efek untuk sinkronisasi fileName dengan formik.values[name]
  useEffect(() => {
    // Memastikan nilai awal Formik atau perubahan nilai dari luar tercermin
    if (formik.values[name] instanceof File) {
      setCurrentFileName(formik.values[name].name);
    } else {
      // Reset jika bukan objek File
      setCurrentFileName('');
    }
  }, [formik.values[name]]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldTouched(name, true);

    if (file) {
      const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

      if (!acceptedFileTypes.includes(file.type)) {
        const errorMessage = `Tipe file tidak valid. Harap unggah ${acceptedFileTypes
          .map((type) => type.split('/')[1].toUpperCase())
          .join(', ')}.`;
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        setCurrentFileName('');
        warningMsg(errorMessage);
        // Hentikan proses jika tipe file tidak valid
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const errorMessage = `Ukuran file tidak boleh lebih dari ${maxFileSizeMB}MB.`;
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        setCurrentFileName('');
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
      setCurrentFileName('');
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
      <Label style={{ fontSize: '12px', fontWeight: 500 }} htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}{' '}
      </Label>
      <div className="d-flex align-items-center">
        <Box
          sx={{ border: '1px solid #E7E7E7', borderRadius: 2, width: '100%' }}
        >
          <Input
            id={name}
            name={name}
            type="file"
            className="form-control"
            onChange={handleFileChange}
            onBlur={() => formik.setFieldTouched(name, true)} // Mark as touched on blur
            innerRef={fileInputRef}
            style={{ display: 'none' }}
            invalid={isInvalid}
            //  accept attribute hint kepada browser
            accept={acceptedFileTypes.join(',')}
            {...restProps}
          />
          <div
            onClick={handleButtonClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleButtonClick();
              }
            }}
            style={{
              minWidth: '100%',
              cursor: 'pointer', //
            }}
            className="d-flex align-items-center "
          >
            <Button
              style={{
                backgroundColor: '#041662',
                pointerEvents: 'none',
              }}
              className="me-2 py-2"
            >
              <FiFileText size={19} />
            </Button>

            <span
              style={{
                color: currentFileName ? '#041662' : '#B0B0B0',
                fontSize: '14px',
                lineHeight: '22px',
              }}
            >
              {currentFileName ||
                'Unggah dokumen dengan klik untuk memilih file'}
            </span>
          </div>
        </Box>
      </div>
      <span
        style={{
          fontSize: '10px',
          fontWeight: 400,
          lineHeight: '16px',
          color: '#6D6D6D',
        }}
      >
        * File berformat{' '}
        {acceptedFileTypes
          .map((type) => type.split('/')[1].toUpperCase())
          .join(' atau ')}{' '}
        dan tidak lebih dari {maxFileSizeMB}MB
      </span>
      {isInvalid && (
        <FormFeedback
          type="invalid"
          className="d-block"
          style={{ fontSize: '10px' }}
        >
          {formik.errors[name]}
        </FormFeedback>
      )}
    </div>
  );
};

export const CheckedNested = ({
  formik,
  name,
  type = 'checkbox',
  placeholder,
  required = false,
  title = '',
  fontSize = '12px',
  value = true, // Default value when checked
  uncheckedValue = false, // Value when unchecked
  ...restProps
}) => {
  // Function to get nested value
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

  // Handle change for nested fields
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const newValue = isChecked ? value : uncheckedValue;

    // Set value using setFieldValue
    formik.setFieldValue(name, newValue);
    console.log('Checkbox Checked:', isChecked); // Debug log
  };

  // Get nested values
  const fieldValue = getNestedValue(formik.values, name);
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  // Determine if checkbox is checked
  const isChecked = fieldValue === value;

  return (
    <div className="mb-3" style={{ fontFamily: 'Poppins' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Input
          id={name}
          name={name}
          type={type}
          className="form-check-input"
          onChange={handleCheckboxChange}
          onBlur={formik.handleBlur}
          checked={isChecked}
          invalid={touched && !!error}
          style={{
            cursor: 'pointer',
            width: '16px',
            height: '16px',
          }}
          {...restProps}
        />

        {placeholder && (
          <Label
            check
            className="form-check-label"
            htmlFor={name}
            style={{
              fontSize,
              cursor: 'pointer',
              userSelect: 'none',
              margin: 0,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            {title || placeholder}
            {required && <span className="text-danger">*</span>}
          </Label>
        )}
      </Box>

      {touched && error && (
        <FormFeedback className="d-block text-danger">{error}</FormFeedback>
      )}
    </div>
  );
};

// export const CheckedNested = ({
//   formik,
//   name,
//   type = 'checkbox',
//   placeholder,
//   required = false,
//   title = '',
//   fontSize = '12px',
//   value = true, // Default value when checked
//   uncheckedValue = false, // Value when unchecked
//   ...restProps
// }) => {
//   // Function to get nested value (sama seperti di FormInputNested)
//   const getNestedValue = (obj, path) => {
//     if (typeof path === 'string') {
//       const keys = path.split('.');
//       let result = obj;

//       for (let key of keys) {
//         if (!result || typeof result !== 'object') {
//           return undefined;
//         }
//         result = result[key];
//       }
//       return result;
//     }
//     return undefined;
//   };

//   // Handle change untuk nested fields
//   const handleCheckboxChange = (event) => {
//     const isChecked = event.target.checked;
//     const newValue = isChecked ? value : uncheckedValue;

//     // Set value menggunakan setFieldValue
//     formik.setFieldValue(name, newValue);
//   };

//   // Ambil values nested
//   const fieldValue = getNestedValue(formik.values, name);
//   const touched = getNestedValue(formik.touched, name);
//   const error = getNestedValue(formik.errors, name);

//   // Tentukan apakah checkbox di-check
//   const isChecked = fieldValue === value;

//   return (
//     <div className="mb-3" style={{ fontFamily: 'Poppins' }}>
//       <Box
//         sx={{
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '10px',
//         }}
//       >
//         <Input
//           id={name}
//           name={name}
//           type="checkbox"
//           className="form-check-input"
//           onChange={handleCheckboxChange}
//           onBlur={formik.handleBlur}
//           checked={isChecked}
//           invalid={touched && !!error}
//           style={{
//             cursor: 'pointer',
//             width: '16px',
//             height: '16px',
//           }}
//           {...restProps}
//         />

//         {placeholder && (
//           <Label
//             check
//             className="form-check-label"
//             htmlFor={name}
//             style={{
//               fontSize,
//               cursor: 'pointer',
//               userSelect: 'none',
//               margin: 0,
//             }}
//           >
//             {title || placeholder}
//             {required && <span className="text-danger">*</span>}
//           </Label>
//         )}
//       </Box>

//       {touched && error && (
//         <FormFeedback className="d-block text-danger">{error}</FormFeedback>
//       )}
//     </div>
//   );
// };
