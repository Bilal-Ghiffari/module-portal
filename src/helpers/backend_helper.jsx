import {
  deleteMarina,
  getMarina,
  getMarinaNew,
  getMarinaPortal,
  postFormData,
} from "./api_helper";
import * as url from "./url_helper";

export const buildQueryString = (params) => {
  if (!params || typeof params !== "object") {
    // Return an empty string if params is undefined, null, or not an object
    return "";
  }

  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

// MASTER DATA
export const apiGetKBLI = (body) => {
  const queryString = buildQueryString(body || {});
  return getMarinaNew(`${url.GET_KBLI}?${queryString}`);
};

export const apiGetDropdownCountry = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_COUNTRY}?${queryString}`);
};
export const apiGetDropdownApostilleCountry = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_APOSTILLE_COUNTRY}?${queryString}`);
};
export const apiGetDropdownApostilleKanwil = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_APOSTILLE_KANWIL}?${queryString}`);
};
export const apiGetDropdownApostilleDokumen = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_APOSTILLE_JENIS_DOKUMEN}?${queryString}`);
};
export const apiGetDropdownApostilleSpesimenPejabat = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_APOSTILLE_SPESIMEN_PEJABAT}?${queryString}`);
};

export const postAuthChngPwd = (params) => {
  return postFormData(`${url.AUTH_CHANGE_PWD}`, params);
};

export const apiPostOauthSSO = (body) => {
  const queryString = buildQueryString(body || {});
  return getMarina(`${url.OAUTHSSO}?${queryString}`);
};
export const GenerateUrlSSO = () => {
  return getMarina(url.GENERATE_URL_SSO);
};
export const getAuthProfile = () => {
  return getMarina(url.GET_PROFILE);
};

// PUBLIK REGIONS

// Wilayah Provinsi
export const apiGetDropdownProv = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_PROVINSI}?${queryString}`);
};

export const apiGetDropdownKotakab = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_ROPDOWN_KOTAKAB}?${queryString}`);
};

export const apiGetDropdownKec = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_ROPDOWN_KECAMATAN}?${queryString}`);
};

export const apiGetDropdownDesa = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_ROPDOWN_DESA}?${queryString}`);
};
export const apiPostAuthReqReset = (body) => {
  return postFormData(url.AUTH_REQ_RESET, body);
};
export const apiPostAuthResetPass = (body) => {
  return postFormData(url.AUTH_RESET_PASS, body);
};

// PERSEROAN PERORANGAN
export const apiGetListPerseroanPeroranganByUser = (id) => {
  return getMarinaNew(`${url.GET_PERSEROAN_PERORANGAN_USER}/${id}`);
};
export const apiGetListPerseroanPerorangan = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_PERSEROAN_PERORANGAN}?${queryString}`);
};
export const apiGetListByIdPerseroanPerorangan = (id) => {
  return getMarinaNew(`${url.GET_PERSEROAN_PERORANGAN}/${id}`);
};
export const apiGetSertifikatPerseroanPerorangan = (id) => {
  return getMarinaNew(`${url.GET_SERTIFIKAT_PERSEROAN_PERORANGAN}/${id}`);
};

export const apiDeletePerseroanPerorangan = (id) => {
  return deleteMarina(`${url.GET_PERSEROAN_PERORANGAN}/${id}`);
};

// APOSTILLE
export const apiDeleteistApostillePermohonanRiwayat = (id) => {
  return deleteMarina(`${url.APOSTILLE_PERMOHONAN_RIWAYAT}/${id}`);
};

export const apiGetListApostillePermohonanRiwayat = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_APOSTILLE_PERMOHONAN_RIWAYAT}?${queryString}`);
};
export const apiGetListApostilleDetailPermohonanRiwayat = (id) => {
  return getMarinaNew(`${url.APOSTILLE_PERMOHONAN_RIWAYAT}/${id}`);
};
export const apiGetListApostilleVerifikasiPermohonanRiwayat = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(
    `${url.GET_APOSTILLE_VERIFIKASI_PERMOHONAN_RIWAYAT}?${queryString}`
  );
};
