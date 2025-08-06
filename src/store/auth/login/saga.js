import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import {
  postJwtLogin,
  postJwtLogout,
} from "../../../helpers/fakebackend_helper";

import Cookies from "js-cookie";

function* loginUser({ payload: { user, history } }) {
  try {
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        username: user.username,
        password: user.password,
      });
      const payload = {
        decoded: response.data.decoded,
        token: response.data.token,
      };
      Cookies.set("userSession", JSON.stringify(payload?.token));
      localStorage.setItem("userSession", JSON.stringify(response.data));
      yield put(loginSuccess(response.data));
    }
    // history("/");
  } catch (error) {
    yield put(apiError(error?.response));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("userSession");
    Cookies.remove("userSession");

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogout);
      yield put(logoutUserSuccess(response));
    }
    history("/login");
  } catch (error) {
    history("/login");
    // yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
