import { call, put, takeEvery, all } from "redux-saga/effects";
import axios from "axios"; // Ensure axios is imported if getMarinaPortal relies on it
import * as types from "./actionTypes";
import * as actions from "./action";
import {
  apiGetDropdownProv,
  apiGetDropdownKotakab,
  apiGetDropdownKec,
  apiGetDropdownDesa,
  apiGetCountry,
  apiGetPekerjaan,
  apiGetAgama,
  apiGetStatusKawin,
} from "@/pages/Modules/Pewarganegaraan/Permohonan/services/api"; // Verify this path
import { transformData } from "@/pages/Modules/Pewarganegaraan/Permohonan/utils/transform"; // Verify this path

const api = {
  apiGetCountry,
  apiGetDropdownProv,
  apiGetDropdownKotakab,
  apiGetDropdownKec,
  apiGetDropdownDesa,
  apiGetPekerjaan,
  apiGetAgama,
  apiGetStatusKawin,
};

/**
 * Generic saga to fetch data from an API.
 * This saga expects the action to have a 'payload' for the ID (if needed)
 * and 'meta' property for saga-specific configurations.
 *
 * @param {object} action - The Redux action object.
 * @param {function} action.meta.apiFunc - The API function to call.
 * @param {function} action.meta.successAction - The success action creator.
 * @param {function} action.meta.errorAction - The error action creator.
 * @param {object} action.meta.transformKeys - Keys for data transformation.
 * @param {*} action.payload - The ID or other data passed with the action.
 */
function* fetchDataSaga(action) {
  const { apiFunc, successAction, errorAction, transformKeys } = action.meta;
  const id = action.payload;

  try {
    const response = yield call(apiFunc, id); // Pass the ID directly to the API function
    let data = response.data;

    if (transformKeys) {
      data = transformData(data, transformKeys);
    }

    yield put(successAction(data));
  } catch (error) {
    yield put(errorAction(error.message));
  }
}

function* watchFetchData() {
  yield all([
    takeEvery(types.FETCH_PROVINSI_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action, // Keep original action properties
        meta: {
          apiFunc: api.apiGetDropdownProv,
          successAction: actions.fetchProvinsiSuccess,
          errorAction: actions.fetchProvinsiError,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
        payload: null,
      });
    }),

    // Negara data fetch (no ID needed)
    takeEvery(types.FETCH_NEGARA_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetCountry,
          successAction: actions.fetchNegaraSuccess,
          errorAction: actions.fetchNegaraError,
          transformKeys: { valueKey: "id_negara", labelKey: "nama_negara" },
        },
        payload: null,
      });
    }),

    // Kota/Kabupaten data fetch by Provinsi ID
    takeEvery(types.FETCH_KOTAKAB_REQUEST_BY_PROVINSI, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownKotakab,
          successAction: actions.fetchKotaKabSuccess,
          errorAction: actions.fetchKotaKabError,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
        // action.payload already contains idProvinsi from the dispatched action
      });
    }),

    takeEvery(types.FETCH_KOTAKAB_REQUEST_BY_PROVINSI_PSGN, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownKotakab,
          successAction: actions.fetchKotaKabSuccessPsgn,
          errorAction: actions.fetchKotaKabErrorPsgn,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
      });
    }),

    // Fallback/direct Kota/Kabupaten fetch (if needed, but usually redundant with _BY_PROVINSI)
    takeEvery(types.FETCH_KOTAKAB_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownKotakab,
          successAction: actions.fetchKotaKabSuccess,
          errorAction: actions.fetchKotaKabError,
          transformKeys: { value: "id", label: "nama" },
        },
        payload: null, // No ID for this general request
      });
    }),

    // Kecamatan data fetch by Kota/Kabupaten ID
    takeEvery(types.FETCH_KECAMATAN_REQUEST_BY_KOTAKAB, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownKec,
          successAction: actions.fetchKecamatanSuccess,
          errorAction: actions.fetchKecamatanError,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
        // action.payload already contains idKotaKab from the dispatched action
      });
    }),

    // Fallback/direct Kecamatan fetch (if needed)
    takeEvery(types.FETCH_KECAMATAN_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownKec,
          successAction: actions.fetchKecamatanSuccess,
          errorAction: actions.fetchKecamatanError,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
        payload: null,
      });
    }),

    // Desa data fetch by Kecamatan ID
    takeEvery(types.FETCH_DESA_REQUEST_BY_KECAMATAN, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownDesa,
          successAction: actions.fetchDesaSuccess,
          errorAction: actions.fetchDesaError,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
        // action.payload already contains idKecamatan from the dispatched action
      });
    }),

    // Fallback/direct Desa fetch (if needed)
    takeEvery(types.FETCH_DESA_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetDropdownDesa,
          successAction: actions.fetchDesaSuccess,
          errorAction: actions.fetchDesaError,
          transformKeys: { valueKey: "id", labelKey: "nama" },
        },
        payload: null,
      });
    }),

    // Pekerjaan data fetch
    takeEvery(types.FETCH_PEKERJAAN_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetPekerjaan,
          successAction: actions.fetchPekerjaanSuccess,
          errorAction: actions.fetchPekerjaanError,
          transformKeys: {
            valueKey: "id_pekerjaan",
            labelKey: "nama_pekerjaan",
          },
        },
        payload: null,
      });
    }),

    // Agama data fetch
    takeEvery(types.FETCH_AGAMA_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetAgama,
          successAction: actions.fetchAgamaSuccess,
          errorAction: actions.fetchAgamaError,
          transformKeys: { labelKey: "agama", useSameLabelAndValue: true },
        },
        payload: null,
      });
    }),

    // Status Kawin data fetch
    takeEvery(types.FETCH_STATUS_KAWIN_REQUEST, function* (action) {
      yield call(fetchDataSaga, {
        ...action,
        meta: {
          apiFunc: api.apiGetStatusKawin,
          successAction: actions.fetchStatusKawinSuccess,
          errorAction: actions.fetchStatusKawinError,
          transformKeys: {
            valueKey: "status_kawin",
            labelKey: "status_kawin",
          },
        },
        payload: null,
      });
    }),
  ]);
}

export default watchFetchData;
