import { call, put, takeEvery } from 'redux-saga/effects';

import { ROOT_GET_MENU } from './actionTypes';
import { errorRoot, getRootMenuSuccess } from './actions';

import { apiGetDropdownMenuList } from '@/helpers/backend_helper_usman';

function* getRootMenuList({ payload }) {
  try {
    const response = yield call(apiGetDropdownMenuList, payload);
    yield put(getRootMenuSuccess(response.data));
  } catch (error) {
    yield put(errorRoot(error?.response));
  }
}

function* RootSaga() {
  yield takeEvery(ROOT_GET_MENU, getRootMenuList);
}

export default RootSaga;
