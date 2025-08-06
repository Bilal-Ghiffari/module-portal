import { useCallback } from "react";
import { STEP_FIELDS } from "../constants/steps";
import { validationSchemas } from "../Schemas";
import { getFilledValues } from "../utils/formHelper";

export const useFormValidation = () => {
  const validateCurrentStep = useCallback(async (activeStep, formik) => {
    const currentSchema = validationSchemas[activeStep];
    const currentStepFields = STEP_FIELDS[activeStep];
    const currentStepValues = getFilledValues(formik.values, currentStepFields);

    // Debug log for step 4
    if (activeStep === 4) {
      console.log("=== DEBUG STEP 4 VALIDATION ===");
      console.log("Current step values:", currentStepValues);
      console.log("All formik values:", formik.values);

      currentStepFields.forEach((field) => {
        const value = formik.values[field];
        console.log(`${field}:`, {
          value,
          type: typeof value,
          isFile: value instanceof File,
          isObject: value && typeof value === "object",
          hasId: value && value.id,
          hasUrl: value && value.url,
          hasFilePath: value && value.file_path,
        });
      });
    }

    if (!currentSchema) return { isValid: true, errors: {} };

    // Mark current step fields as touched
    const newTouched = { ...formik.touched };
    currentStepFields.forEach((field) => {
      newTouched[field] = true;
    });
    formik.setTouched(newTouched);

    try {
      // Validate current step fields
      const stepValues = currentStepFields.reduce((acc, field) => {
        acc[field] = formik.values[field];
        return acc;
      }, {});

      await currentSchema.validate(stepValues, { abortEarly: false });

      // Clear errors for current step if validation passes
      const clearedErrors = { ...formik.errors };
      currentStepFields.forEach((field) => {
        delete clearedErrors[field];
      });
      formik.setErrors(clearedErrors);

      return {
        isValid: true,
        errors: {},
        step: activeStep,
        data: currentStepValues,
      };
    } catch (error) {
      console.log("Validation error for step", activeStep, ":", error);

      const stepErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          stepErrors[err.path] = err.message;
        });
      }

      formik.setErrors({
        ...formik.errors,
        ...stepErrors,
      });

      return { isValid: false, errors: stepErrors, data: {} };
    }
  }, []);

  const validateAllSteps = useCallback(async (formik) => {
    const allStepErrors = {};
    let hasErrors = false;

    for (let i = 0; i < STEP_FIELDS.length; i++) {
      const stepSchema = validationSchemas[i];
      const stepFieldList = STEP_FIELDS[i];

      if (!stepSchema) continue;

      try {
        const stepValues = stepFieldList.reduce((acc, field) => {
          acc[field] = formik.values[field];
          return acc;
        }, {});

        await stepSchema.validate(stepValues, { abortEarly: false });
      } catch (error) {
        hasErrors = true;
        const fieldErrors = {};
        if (error.inner) {
          error.inner.forEach((err) => {
            fieldErrors[err.path] = err.message;
          });
        }
        allStepErrors[i] = fieldErrors;
      }
    }

    return { hasErrors, allStepErrors };
  }, []);

  return {
    validateCurrentStep,
    validateAllSteps,
  };
};
