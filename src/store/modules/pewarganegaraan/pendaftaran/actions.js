import {
  NEXT_STEP,
  PREV_STEP,
  RESET_STEPPER,
  SAVE_FORM_DATA,
  SAVE_FORM_DATA_SUCCESS,
  SAVE_FORM_DATA_FAIL,
  SUBMIT_REGISTRATION_FORM,
  SUBMIT_REGISTRATION_FORM_SUCCESS,
  SUBMIT_REGISTRATION_FORM_FAIL,
  RESET_FORM_DATA,
} from "./actionType";

// Stepper control
export const nextStep = () => ({
  type: NEXT_STEP,
});

export const prevStep = () => ({
  type: PREV_STEP,
});

export const resetStepper = () => ({
  type: RESET_STEPPER,
});

// Save form state
export const saveFormData = (stepName, data) => ({
  type: SAVE_FORM_DATA,
  payload: { stepName, data },
});

export const saveFormDataSuccess = (stepName, data) => ({
  type: SAVE_FORM_DATA_SUCCESS,
  payload: { stepName, data },
});
export const resetFormData = () => ({
  type: RESET_FORM_DATA,
});

// Send form state to API
export const saveFormDataFail = (error) => ({
  type: SAVE_FORM_DATA_FAIL,
  payload: error,
});

export const submitRegistrationForm = (finalData) => ({
  type: SUBMIT_REGISTRATION_FORM,
  payload: finalData,
});

export const submitRegistrationFormSuccess = (response) => ({
  type: SUBMIT_REGISTRATION_FORM_SUCCESS,
  payload: response,
});

export const submitRegistrationFormFail = (error) => ({
  type: SUBMIT_REGISTRATION_FORM_FAIL,
  payload: error,
});
