// make sure, now is active step
export const getVisibleSteps = (allSteps, activeStepIds) => {
  return allSteps.filter((step) => activeStepIds.includes(step.id));
};

// stepper indicator based on active step
export const getStepperActiveStep = (visibleStepperSteps, currentStep) => {
  return visibleStepperSteps.findIndex((s) => s.id === currentStep?.id ?? 0);
};

/**
 * Creates a draft version of validation schema where all fields are optional
 * This allows saving partial data without triggering required field validations
 */
export const createDraftSchema = (originalSchema) => {
  if (!originalSchema || !originalSchema.fields) {
    return originalSchema;
  }

  const draftFields = {};

  // Convert each field to optional version while keeping other validations
  Object.keys(originalSchema.fields).forEach((fieldName) => {
    const field = originalSchema.fields[fieldName];

    // Clone the field and make it optional
    if (field && typeof field.optional === "function") {
      draftFields[fieldName] = field.optional();
    } else {
      // Fallback: keep original field but remove required validation
      draftFields[fieldName] = field;
    }
  });

  // Create new schema object with optional fields
  return originalSchema.constructor(draftFields);
};

/**
 * Checks if a value is considered "filled" for draft purposes
 */
export const isValueFilled = (value) => {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    !(Array.isArray(value) && value.length === 0) &&
    !(
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    )
  );
};

/**
 * Filters form values to only include filled fields
 */
export const getFilledValues = (values, fields) => {
  return fields.reduce((acc, field) => {
    const value = values[field];
    if (isValueFilled(value)) {
      acc[field] = value;
    }
    return acc;
  }, {});
};
