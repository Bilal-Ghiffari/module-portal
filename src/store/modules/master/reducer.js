import * as types from "./actionTypes";

const initialState = {
  provinsi: { data: [], loading: false, error: null },
  kotakab: { data: [], loading: false, error: null },
  kotakabPsgn: { data: [], loading: false, error: null },
  kecamatan: { data: [], loading: false, error: null },
  desa: { data: [], loading: false, error: null },
  negara: { data: [], loading: false, error: null },
  pekerjaan: { data: [], loading: false, error: null },
  agama: { data: [], loading: false, error: null },
  statusKawin: { data: [], loading: false, error: null },
};

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    // PROVINSI
    case types.FETCH_PROVINSI_REQUEST:
      return {
        ...state,
        provinsi: { ...state.provinsi, loading: true, error: null },
      };
    case types.FETCH_PROVINSI_SUCCESS:
      return {
        ...state,
        provinsi: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_PROVINSI_ERROR:
      return {
        ...state,
        provinsi: { ...state.provinsi, loading: false, error: action.payload },
      };

    // KOTA/KAB
    case types.FETCH_KOTAKAB_REQUEST:
      return {
        ...state,
        kotakab: { ...state.kotakab, loading: true, error: null },
      };
    case types.FETCH_KOTAKAB_SUCCESS:
      return {
        ...state,
        kotakab: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_KOTAKAB_ERROR:
      return {
        ...state,
        kotakab: { ...state.kotakab, loading: false, error: action.payload },
      };

    // masalah pasangan
    case types.FETCH_KOTAKAB_REQUEST_PSGN:
      return {
        ...state,
        kotakabPsgn: { ...state.kotakabPsgn, loading: true, error: null },
      };
    case types.FETCH_KOTAKAB_SUCCESS_PSGN:
      return {
        ...state,
        kotakabPsgn: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_KOTAKAB_ERROR_PSGN:
      return {
        ...state,
        kotakabPsgn: {
          ...state.kotakabPsgn,
          loading: false,
          error: action.payload,
        },
      };

    // KECAMATAN
    case types.FETCH_KECAMATAN_REQUEST:
      return {
        ...state,
        kecamatan: { ...state.kecamatan, loading: true, error: null },
      };
    case types.FETCH_KECAMATAN_SUCCESS:
      return {
        ...state,
        kecamatan: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_KECAMATAN_ERROR:
      return {
        ...state,
        kecamatan: {
          ...state.kecamatan,
          loading: false,
          error: action.payload,
        },
      };

    // DESA
    case types.FETCH_DESA_REQUEST:
      return { ...state, desa: { ...state.desa, loading: true, error: null } };
    case types.FETCH_DESA_SUCCESS:
      return {
        ...state,
        desa: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_DESA_ERROR:
      return {
        ...state,
        desa: { ...state.desa, loading: false, error: action.payload },
      };

    // NEGARA
    case types.FETCH_NEGARA_REQUEST:
      return {
        ...state,
        negara: { ...state.negara, loading: true, error: null },
      };
    case types.FETCH_NEGARA_SUCCESS:
      return {
        ...state,
        negara: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_NEGARA_ERROR:
      return {
        ...state,
        negara: { ...state.negara, loading: false, error: action.payload },
      };

    // PEKERJAAN
    case types.FETCH_PEKERJAAN_REQUEST:
      return {
        ...state,
        pekerjaan: { ...state.pekerjaan, loading: true, error: null },
      };
    case types.FETCH_PEKERJAAN_SUCCESS:
      return {
        ...state,
        pekerjaan: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_PEKERJAAN_ERROR:
      return {
        ...state,
        pekerjaan: {
          ...state.pekerjaan,
          loading: false,
          error: action.payload,
        },
      };

    // AGAMA
    case types.FETCH_AGAMA_REQUEST:
      return {
        ...state,
        agama: { ...state.agama, loading: true, error: null },
      };
    case types.FETCH_AGAMA_SUCCESS:
      return {
        ...state,
        agama: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_AGAMA_ERROR:
      return {
        ...state,
        agama: { ...state.agama, loading: false, error: action.payload },
      };

    // STATUS KAWIN
    case types.FETCH_STATUS_KAWIN_REQUEST:
      return {
        ...state,
        statusKawin: { ...state.statusKawin, loading: true, error: null },
      };
    case types.FETCH_STATUS_KAWIN_SUCCESS:
      return {
        ...state,
        statusKawin: { data: action.payload, loading: false, error: null },
      };
    case types.FETCH_STATUS_KAWIN_ERROR:
      return {
        ...state,
        statusKawin: {
          ...state.statusKawin,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default masterReducer;
