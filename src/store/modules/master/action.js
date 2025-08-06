import * as types from "./actionTypes";

// Provinsi
export const fetchProvinsiRequest = () => ({
  type: types.FETCH_PROVINSI_REQUEST,
});

export const fetchProvinsiSuccess = (data) => ({
  type: types.FETCH_PROVINSI_SUCCESS,
  payload: data,
});

export const fetchProvinsiError = (error) => ({
  type: types.FETCH_PROVINSI_ERROR,
  payload: error,
});

// Kota/Kabupaten
export const fetchKotaKabRequest = () => ({
  type: types.FETCH_KOTAKAB_REQUEST,
});

export const fetchKotaKabRequestByProvinsi = (idProvinsi) => ({
  type: types.FETCH_KOTAKAB_REQUEST_BY_PROVINSI,
  payload: idProvinsi,
});

export const fetchKotaKabSuccess = (data) => ({
  type: types.FETCH_KOTAKAB_SUCCESS,
  payload: data,
});

export const fetchKotaKabError = (error) => ({
  type: types.FETCH_KOTAKAB_ERROR,
  payload: error,
});

// Kecamatan
export const fetchKecamatanRequest = () => ({
  type: types.FETCH_KECAMATAN_REQUEST,
});

export const fetchKecamatanRequestByKotaKab = (idKotaKab) => ({
  type: types.FETCH_KECAMATAN_REQUEST_BY_KOTAKAB,
  payload: idKotaKab,
});

export const fetchKecamatanSuccess = (data) => ({
  type: types.FETCH_KECAMATAN_SUCCESS,
  payload: data,
});

export const fetchKecamatanError = (error) => ({
  type: types.FETCH_KECAMATAN_ERROR,
  payload: error,
});

// Desa
export const fetchDesaRequest = () => ({
  type: types.FETCH_DESA_REQUEST,
});

export const fetchDesaRequestByKecamatan = (idKecamatan) => ({
  type: types.FETCH_DESA_REQUEST_BY_KECAMATAN,
  payload: idKecamatan,
});

export const fetchDesaSuccess = (data) => ({
  type: types.FETCH_DESA_SUCCESS,
  payload: data,
});

export const fetchDesaError = (error) => ({
  type: types.FETCH_DESA_ERROR,
  payload: error,
});

// Negara
export const fetchNegaraRequest = () => ({
  type: types.FETCH_NEGARA_REQUEST,
});

export const fetchNegaraSuccess = (data) => ({
  type: types.FETCH_NEGARA_SUCCESS,
  payload: data,
});

export const fetchNegaraError = (error) => ({
  type: types.FETCH_NEGARA_ERROR,
  payload: error,
});

// Pekerjaan
export const fetchPekerjaanRequest = () => ({
  type: types.FETCH_PEKERJAAN_REQUEST,
});

export const fetchPekerjaanSuccess = (data) => ({
  type: types.FETCH_PEKERJAAN_SUCCESS,
  payload: data,
});

export const fetchPekerjaanError = (error) => ({
  type: types.FETCH_PEKERJAAN_ERROR,
  payload: error,
});

// Agama
export const fetchAgamaRequest = () => ({
  type: types.FETCH_AGAMA_REQUEST,
});

export const fetchAgamaSuccess = (data) => ({
  type: types.FETCH_AGAMA_SUCCESS,
  payload: data,
});

export const fetchAgamaError = (error) => ({
  type: types.FETCH_AGAMA_ERROR,
  payload: error,
});

// Status Kawin
export const fetchStatusKawinRequest = () => ({
  type: types.FETCH_STATUS_KAWIN_REQUEST,
});

export const fetchStatusKawinSuccess = (data) => ({
  type: types.FETCH_STATUS_KAWIN_SUCCESS,
  payload: data,
});

export const fetchStatusKawinError = (error) => ({
  type: types.FETCH_STATUS_KAWIN_ERROR,
  payload: error,
});

// masalah kota kabupaten pasangan yang nyangkut pake id provinsi pemohon
export const fetchKotaKabRequestPsgn = () => ({
  type: types.FETCH_KOTAKAB_REQUEST_PSGN,
});

export const fetchKotaKabRequestByProvinsiPsgn = (idProvinsi) => ({
  type: types.FETCH_KOTAKAB_REQUEST_BY_PROVINSI_PSGN,
  payload: idProvinsi,
});

export const fetchKotaKabSuccessPsgn = (data) => ({
  type: types.FETCH_KOTAKAB_SUCCESS_PSGN,
  payload: data,
});
export const fetchKotaKabErrorPsgn = (error) => ({
  type: types.FETCH_KOTAKAB_ERROR_PSGN,
  payload: error,
});
