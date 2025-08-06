import { call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionType";
import * as action from "./actions";
import { nextStep } from "./actions";
import { useSelector } from "react-redux";

function* saveFormDataSaga({ payload: { stepName, data } }) {
  try {
    yield put({
      type: actionTypes.SAVE_FORM_DATA_SUCCESS,
      payload: { stepName, data },
    });
    // yield put(nextStep());
  } catch (error) {
    yield put({
      type: actionTypes.SAVE_FORM_DATA_FAIL,
      payload: error.message,
    });
  }
}

// ambil formData dari reducer
// const getFormData = useSelector((state) => state.registrationStep.formData);

function* submitRegistrationFormSaga({ payload: finalData }) {
  try {
    // const allFormData = yield select(getFormData);
    // Simulasi api post
    // const response = yield call(api.postRegistrationData, finalData);
    const response = yield call(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Simulating POST request with data:", finalData);
          resolve({
            success: true,
            message: "Pendaftaran berhasil!",
            // data: finalData,
          });
        }, 2000);
      });
    });

    if (response.success) {
      yield put({
        type: actionTypes.SUBMIT_REGISTRATION_FORM_SUCCESS,
        payload: response,
      });

      yield put(nextStep());
    } else {
      yield put({
        type: actionTypes.SUBMIT_REGISTRATION_FORM_FAIL,
        payload: response.message || "Pendaftaran gagal",
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.SUBMIT_REGISTRATION_FORM_FAIL,
      payload: error.message,
    });
  }
}

function* AhuPewargaPendaftaranSaga() {
  yield takeEvery(actionTypes.SAVE_FORM_DATA, saveFormDataSaga);
  yield takeEvery(
    actionTypes.SUBMIT_REGISTRATION_FORM,
    submitRegistrationFormSaga
  );
}

export default AhuPewargaPendaftaranSaga;
