// formikHelpers.js

export const setNestedTouched = (formik, errors) => {
  const newTouched = { ...formik.touched };

  const markNestedTouched = (errorObj, currentPath = '') => {
    Object.keys(errorObj).forEach((key) => {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;

      if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
        // If still an object (nested), recursively call
        if (!newTouched[key]) {
          newTouched[key] = {};
        }
        markNestedTouched(errorObj[key], fullPath);
      } else {
        // If leaf node, set touched
        if (currentPath) {
          const [parent, child] = fullPath.split('.');
          if (!newTouched[parent]) {
            newTouched[parent] = {};
          }
          newTouched[parent][child] = true;
        } else {
          newTouched[key] = true;
        }
      }
    });
  };

  // Process marking touched for all errors
  markNestedTouched(errors);

  // Set touched in Formik
  formik.setTouched(newTouched, true);
};

// export const getInvalidField = (activeStepFields, formData) => {
//   const {
//     identity_pemberi,
//     identity_penerima,
//     information_jaminan,
//     object_jaminan,
//   } = formData;

//   // Membuat objek untuk menyimpan data yang relevan
//   const dataToCheck = {
//     identity_pemberi,
//     identity_penerima,
//     information_jaminan,
//     object_jaminan,
//   };
//   console.log('first dataToCheck', dataToCheck);

//   //ignored
//   if (
//     dataToCheck.identity_pemberi === undefined ||
//     dataToCheck.identity_pemberi === null
//   ) {
//     return null;
//   }

//   // Memeriksa semua fields yang perlu di validasi berdasarkan activeStepFields
//   for (let field of activeStepFields) {
//     if (
//       !dataToCheck[field] ||
//       (Array.isArray(dataToCheck[field]) && dataToCheck[field].length === 0) ||
//       (typeof dataToCheck[field] === 'object' &&
//         dataToCheck[field] !== null &&
//         Object.keys(dataToCheck[field]).length === 0)
//     ) {
//       return field; // Jika ada data yang kosong, kembalikan nama field yang invalid
//     }
//   }

//   // Tambahkan pemeriksaan untuk perjanjian pokok dalam information_jaminan
//   if (
//     information_jaminan && // Memastikan information_jaminan ada
//     (!information_jaminan.perjanjian_pokok ||
//       (Array.isArray(information_jaminan.perjanjian_pokok) &&
//         information_jaminan.perjanjian_pokok.length === 0))
//   ) {
//     return 'Perjanjian Pokok'; // Mengembalikan 'perjanjian_pokok' jika tidak valid
//   }

//   return null; // Jika semua field valid
// };

export const getInvalidField = (activeStepFields, formData) => {
  const {
    identity_pemberi,
    identity_penerima,
    information_jaminan,
    object_jaminan,
  } = formData;

  // Mapping form data to check
  const dataToCheck = {
    identity_pemberi,
    identity_penerima,
    information_jaminan,
    object_jaminan,
  };

  // Only check fields that are part of the current step
  const relevantDataToCheck = activeStepFields.reduce((acc, field) => {
    if (dataToCheck[field] !== undefined && dataToCheck[field] !== null) {
      acc[field] = dataToCheck[field];
    }
    return acc;
  }, {});

  // console.log('Relevant fields to check:', relevantDataToCheck); // Debugging line to check the fields being validated

  // Now perform validation on relevant fields
  for (let field in relevantDataToCheck) {
    const value = relevantDataToCheck[field];

    // If field is empty or invalid, return it as invalid
    if (
      !value ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length === 0)
    ) {
      return field; // Return the first invalid field
    }
  }

  // Additional checks for nested fields like 'information_jaminan.perjanjian_pokok'
  // This will now only be checked if information_jaminan is part of the current step
  if (
    information_jaminan &&
    activeStepFields.includes('information_jaminan') && // Check if this field is part of the current step
    (!information_jaminan.perjanjian_pokok ||
      (Array.isArray(information_jaminan.perjanjian_pokok) &&
        information_jaminan.perjanjian_pokok.length === 0))
  ) {
    return 'Perjanjian Pokok'; // Return 'perjanjian_pokok' if it's invalid
  }

  return null; // All fields are valid
};

export const checkIgnoreValidate = (activeStep, formik) => {
  // Konfigurasi default untuk ignore validation
  const formikValues = formik.values;

  const ignoreConfig = {
    2: () => {
      return true;
    },
    3: () => {
      console.log('Checking pokok_jaminan for skip:', formikValues);
    },
    // 3: (values) => values.some_condition === true,
  };

  // Cek apakah step ada dalam konfigurasi
  if (ignoreConfig[activeStep]) {
    return ignoreConfig[activeStep](formikValues);
  }

  // Default: tidak di-ignore
  return false;
};

// Function to validate the current step in Formik
export const validateCurrentStep = async (
  formik,
  activeStep,
  validationSchemas,
  STEP_FIELDS
) => {
  // Cek apakah step bisa di-ignore
  const isIgnored = checkIgnoreValidate(activeStep, formik);
  console.log('isIgnored', isIgnored);

  // Jika step di-ignore, kembalikan validasi sebagai true
  if (isIgnored) {
    return {
      isValid: true,
      errors: {},
      ignored: true,
    };
  }

  console.log('first');
  const currentSchema = validationSchemas[activeStep];
  const currentStepFields = STEP_FIELDS[activeStep];
  // console.log('currentSchema', currentSchema);
  // console.log('currentStepFields', currentStepFields);

  // if (!currentSchema) return { isValid: true, errors: {} };

  // Trigger validation
  console.log('babi');
  const errors = await formik.validateForm();
  console.log('errorss', errors);

  // Gather errors specific to the current step
  const stepErrors = {};
  currentStepFields.forEach((field) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');

      // Check nested errors
      if (errors[parent] && errors[parent][child]) {
        if (!stepErrors[parent]) {
          stepErrors[parent] = {};
        }
        stepErrors[parent][child] = errors[parent][child];
      }
    } else {
      if (errors[field]) {
        stepErrors[field] = errors[field];
      }
    }
  });

  // Determine validation result
  if (Object.keys(stepErrors).length > 0) {
    // Set errors in Formik
    formik.setErrors({
      ...formik.errors,
      ...stepErrors,
    });

    return { isValid: false, errors: stepErrors };
  }

  return { isValid: true, errors: {} };
};

export const validateFormErrors = async (formik) => {
  try {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setErrors(errors);

      const touchedFields = {};
      const markAllTouched = (errorObj, prefix = '') => {
        Object.keys(errorObj).forEach((key) => {
          const fullPath = prefix ? `${prefix}.${key}` : key;

          if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
            markAllTouched(errorObj[key], fullPath);
          } else {
            touchedFields[fullPath] = true;
          }
        });
      };

      markAllTouched(errors);
      formik.setTouched(touchedFields, true);
      return { isValid: false, errors };
    }

    return { isValid: true, errors: {} };
  } catch (error) {
    console.error('Validation error:', error);
    return { isValid: false, errors: {} };
  }
};
