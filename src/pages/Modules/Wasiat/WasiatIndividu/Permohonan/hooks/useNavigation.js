import { useCallback } from "react";
import { getFilledValues } from "../../../utils/validate";
import validationSchema from "../schema";
import { STEP_FIELDS } from "../stepFields";

export const useNavigation = (formik, activeStep, setActiveStep) => {
  const MAX_STEPS = 3;

  const validateCurrentStep = useCallback(async (activeStep, formik) => {
    const currentSchema = validationSchema[activeStep];
    const currentStepFields = STEP_FIELDS[activeStep];
    const currentStepValues = getFilledValues(formik.values, currentStepFields);
    console.log("NEXT DATA", currentStepValues);

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

  const nextStep = async () => {
    if (activeStep === 3) {
      console.log("submit to api");
      return;
    }
    const isValid = await validateCurrentStep(activeStep, formik);
    console.log("VALIDATE", isValid);
    if (isValid.isValid) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return {
    activeStep,
    nextStep,
    prevStep,
    setActiveStep,
  };
};
