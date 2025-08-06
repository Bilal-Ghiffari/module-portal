import * as types from "./actionType";

// =============== GET PERMOHONAN ACTIONS ===============
export const getPermohonanRequest = (id) => ({
  type: types.GET_PERMOHONAN_REQUEST,
  payload: id,
});
export const getPermohonanSuccess = (data) => ({
  type: types.GET_PERMOHONAN_SUCCESS,
  payload: data,
});
export const getPermohonanError = (error) => ({
  type: types.GET_PERMOHONAN_ERROR,
  payload: error,
});

// =============== POST PERMOHONAN ACTIONS ===============
export const postPermohonanRequest = (data) => ({
  type: types.POST_PERMOHONAN_REQUEST,
  payload: data,
});
export const postPermohonanSuccess = (data) => ({
  type: types.POST_PERMOHONAN_SUCCESS,
  payload: data,
});
export const postPermohonanError = (error) => ({
  type: types.POST_PERMOHONAN_ERROR,
  payload: error,
});
export const setPermohonanData = (data) => ({
  type: types.SET_PERMOHONAN,
  payload: data,
});

// =============== DRAFT ACTIONS ===============
export const draftRequest = (data) => ({
  type: types.DRAFT_REQUEST,
  payload: data,
});

export const draftSuccess = (data) => ({
  type: types.DRAFT_SUCCESS,
  payload: data,
});

export const draftError = (error) => ({
  type: types.DRAFT_ERROR,
  payload: error,
});

// =============== NEXT STEP ACTIONS after step 1 ===============
export const nextStepRequest = (data) => ({
  type: types.NEXT_STEP_REQUEST,
  payload: data,
});

export const nextStepSuccess = (data) => ({
  type: types.NEXT_STEP_SUCCESS,
  payload: data,
});

export const nextStepError = (error) => ({
  type: types.NEXT_STEP_ERROR,
  payload: error,
});

// =============== SUBMIT FINAL ACTIONS ===============
export const submitFormRequest = (data) => ({
  type: types.SUBMIT_FORM_REQUEST,
  payload: data,
});

export const submitFormSuccess = (data) => ({
  type: types.SUBMIT_FORM_SUCCESS,
  payload: data,
});

export const submitFormError = (error) => ({
  type: types.SUBMIT_FORM_ERROR,
  payload: error,
});
