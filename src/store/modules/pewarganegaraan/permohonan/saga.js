import { call, put, takeEvery, all, select } from "redux-saga/effects";
import * as types from "./actionType";
import * as actions from "./action";
import {
  apiGetPermohonan,
  apiPatchPermohonan,
  apiPostPermohonan,
} from "@/pages/Modules/Pewarganegaraan/Permohonan/services/api";

const execute = {
  apiPostPermohonan,
  apiPatchPermohonan,
  apiGetPermohonan,
};

// =============== GET PERMOHONAN ===============
function* getPermohonanSaga(action) {
  try {
    const response = yield call(execute.apiGetPermohonan, action.payload);
    yield put(actions.getPermohonanSuccess(response.data));
    console.log("Permohonan data retrieved successfully:", response.data);
  } catch (error) {
    yield put(actions.getPermohonanError(error.message));
    console.error("Error retrieving permohonan data:", error.message);
  }
}

// =============== POST PERMOHONAN STEP 1 ===============
function* postPermohonanSaga(action) {
  try {
    const response = yield call(execute.apiPostPermohonan, action.payload);
    yield put(actions.nextStepSuccess(response.data));
    console.log("Permohonan berhasil dibuat:", response.data);
    localStorage.setItem(
      "currentPermohonanId",
      JSON.stringify(response.data.id_permohonan)
    );
    yield put(actions.setPermohonanData(response.data.id_permohonan));
  } catch (error) {
    yield put(actions.nextStepError(error.message));
  }
}

// =============== PATCH PERMOHONAN for DRAFT and NEXT_STEP  ===============
function* patchPermohonanSaga(action) {
  const permohonan = yield select((state) => state.permohonan);
  console.log("Current Permohonan State:", permohonan);
  const payloadData = action.payload;

  try {
    const response = yield call(api.apiPatchPermohonan, payloadData);

    // Jika ini dari DRAFT_REQUEST
    if (action.type === types.DRAFT_REQUEST) {
      yield put(actions.draftSuccess(response.data));
    }
    // Jika ini dari NEXT_STEP_REQUEST (jika NEXT_STEP kedua dan seterusnya menggunakan PATCH)
    else if (action.type === types.NEXT_STEP_REQUEST) {
      yield put(actions.nextStepSuccess(response.data));
    }
    // Tambahkan logika lain jika ada jenis PATCH lainnya
  } catch (error) {
    if (action.type === types.DRAFT_REQUEST) {
      yield put(actions.draftError(error.message));
    } else if (action.type === types.NEXT_STEP_REQUEST) {
      yield put(actions.nextStepError(error.message));
    }
  }
}

// =============== SUBMIT FINAL FORM ===============
function* submitFormSaga(action) {
  const permohonan = yield select((state) => state.permohonan);
  console.log("Current Permohonan State:", permohonan);
}

function* watchPermohonanSagas() {
  yield takeEvery(types.GET_PERMOHONAN_REQUEST, getPermohonanSaga);
  yield takeEvery(types.DRAFT_REQUEST, patchPermohonanSaga);
  yield takeEvery(types.NEXT_STEP_REQUEST, patchPermohonanSaga);
  yield takeEvery(types.POST_PERMOHONAN_REQUEST, postPermohonanSaga);
  yield takeEvery(types.SUBMIT_FORM_REQUEST, submitFormSaga);
}

export default watchPermohonanSagas;
