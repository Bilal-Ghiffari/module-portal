// reducer.js
import * as types from "./actionType";

const initialState = {
  draft: {
    loading: false,
    data: null,
    error: null,
  },
  next_loading: false,
  next_error: null,
  submit_loading: false,
  submit_error: null,
  id_permohonan: null,
};

const permohonanReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET PERMOHONAN
    case types.SET_PERMOHONAN:
      return {
        ...state,
        id_permohonan: action.payload,
      };
    // GET PERMOHONAN
    case types.GET_PERMOHONAN_REQUEST:
      return {
        ...state,
        draft: {
          loading: true,
          error: null,
        },
      };
    case types.GET_PERMOHONAN_SUCCESS:
      return {
        ...state,
        draft: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case types.GET_PERMOHONAN_ERROR:
      return {
        ...state,
        draft: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    // DRAFT
    case types.DRAFT_REQUEST:
      return {
        ...state,
        draft: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case types.DRAFT_SUCCESS:
      return {
        ...state,
        draft: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case types.DRAFT_ERROR:
      return {
        ...state,
        draft: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    // NEXT_STEP
    case types.NEXT_STEP_REQUEST:
      return {
        ...state,
        next_loading: true,
      };
    case types.NEXT_STEP_SUCCESS:
      return {
        ...state,
        draft: {
          loading: false,
          data: action.payload,
          error: null,
        },
        next_loading: false,
      };
    case types.NEXT_STEP_ERROR:
      return {
        ...state,

        next_error: action.payload,
      };
    case types.SUBMIT_FORM_REQUEST:
      return {
        ...state,
        submit_loading: true,
      };
    case types.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
      };
    case types.SUBMIT_FORM_ERROR:
      return {
        ...state,

        submit_error: action.payload,
      };

    default:
      return state;
  }
};

export default permohonanReducer;
