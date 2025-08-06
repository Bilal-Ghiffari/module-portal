import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import * as types from "./actionTypes";
import * as actions from "./actions";
import {
  apiGetActiveUser,
  apiGetDetailPengguna,
  apiGetDropdownModules,
  apiGetDropdownRole,
  
  apiGetListDataLog,
  apiGetListPengguna,
} from "../../../helpers/backend_helper_usman";

function* getDropdownRole({ payload }) {
  try {
    const response = yield call(apiGetDropdownRole, payload);
    yield put(actions.getDropdownRolesSuccess(response || []));
  } catch (error) {
    yield put(actions.apiUsmanError(error?.response));
  }
}

function* getDropdownModules({ payload }) {
  try {
    const response = yield call(apiGetDropdownModules, payload);
    yield put(actions.getDropdownModulesSuccess(response || []));
  } catch (error) {
    yield put(actions.apiUsmanError(error?.response));
  }
}

function* getListPengguna({ payload }) {
  try {
    const response = yield call(apiGetListPengguna, payload);
    yield put(actions.getListPenggunaSuccess(response || []));
  } catch (error) {
    yield put(actions.apiUsmanError(error?.response));
  }
}

function* getDetailPengguna({ payload }) {
  try {
    const response = yield call(apiGetDetailPengguna, payload);
    yield put(actions.getDetailPenggunaSuccess(response || []));
  } catch (error) {
    yield put(actions.apiUsmanError(error?.response));
  }
}

function* getListDataLog({ payload }) {
  try {
    const response = yield call(apiGetListDataLog, payload);
    yield put(actions.getListDataLogSuccess(response || []));
  } catch (error) {
    yield put(actions.apiUsmanError(error?.response));
  }
}

function* getActiveuser({ payload }) {
  try {
    const response = yield call(apiGetActiveUser, payload);
    yield put(actions.getActiveUserSuccess(response || []));
  } catch (error) {
    yield put(actions.apiUsmanError(error?.response));
  }
}

function* UsmanSaga() {
  yield takeEvery(types.GET_DROPDOWN_LIST_ROLE, getDropdownRole);
  yield takeEvery(types.GET_DROPDOWN_LIST_MODULES, getDropdownModules);
  yield takeEvery(types.GET_LIST_PENGGUNA, getListPengguna);
  yield takeEvery(types.GET_DETAIL_PENGGUNA, getDetailPengguna);
  yield takeEvery(types.GET_DATA_LOG, getListDataLog);
  yield takeEvery(types.GET_ACTIVE_USER, getActiveuser);
}

export default UsmanSaga;
