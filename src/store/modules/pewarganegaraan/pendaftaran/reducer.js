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

const initialState = {
  activeStep: 0,
  formData: {
    identitasDiri: {},
    identitasSuamiIstri: {},
    suratPermohonan: {},
    unggahDokumen: {},
  },
  loading: false,
  error: null,
  submissionSuccess: false,
};

const registrationStep = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STEP:
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    case PREV_STEP:
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case RESET_STEPPER:
      return initialState;

    case SAVE_FORM_DATA_SUCCESS:
      const { stepName, data } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [stepName]: {
            ...state.formData[stepName],
            ...data,
          },
        },
        loading: false,
        error: null,
      };
    case SAVE_FORM_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_FORM_DATA:
      return {
        ...state,
        formData: initialState.formData,
      };

    case SUBMIT_REGISTRATION_FORM:
      return {
        ...state,
        loading: true,
        submissionSuccess: false,
        error: null,
      };
    case SUBMIT_REGISTRATION_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        submissionSuccess: true,
        error: null,
        // opsional kalo misal reset formData setelah sukses submit
        // formData: initialState.formData,
      };

    case SUBMIT_REGISTRATION_FORM_FAIL:
      return {
        ...state,
        loading: false,
        submissionSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registrationStep;
