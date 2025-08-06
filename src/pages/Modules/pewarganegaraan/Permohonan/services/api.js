import { patchDataJson, postDataJson, postFormDataFile } from "./apiHelper";
import { URL_FILE, URL_MASTER, URL_PERMOHONAN } from "./apiUrl";
import { getMarinaNew } from "@/helpers/api_helper";

const buildQueryString = (params) => {
  if (!params || typeof params !== "object") return "";
  const query = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return query ? `?${query}` : "";
};

export const apiGetCountry = () => {
  return getMarinaNew(URL_MASTER.apiNegara);
};

export const apiGetDropdownProv = () => {
  const queryString = buildQueryString({ tipe: "provinsi" });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`);
};

export const apiGetDropdownKotakab = (idProvinsi) => {
  const queryString = buildQueryString({ tipe: "kotakab", id: idProvinsi });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`);
};

export const apiGetDropdownKec = (idKotaKab) => {
  const queryString = buildQueryString({ tipe: "kecamatan", id: idKotaKab });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`);
};

export const apiGetDropdownDesa = (idKecamatan) => {
  const queryString = buildQueryString({ tipe: "desa", id: idKecamatan });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`);
};

export const apiGetPekerjaan = () => {
  return getMarinaNew(URL_MASTER.apiPekerjaan);
};

export const apiGetAgama = () => {
  return getMarinaNew(URL_MASTER.apiAgama);
};

export const apiGetStatusKawin = () => {
  return getMarinaNew(URL_MASTER.apiStatusKawin);
};

export const apiPostPermohonan = (data) => {
  return postDataJson(URL_PERMOHONAN.postPermohonan, data);
};

export const apiGetPermohonan = (id) => {
  return getMarinaNew(`${URL_PERMOHONAN.postPermohonan}/${id}`);
};

export const apiPatchPermohonan = (data) => {
  return patchDataJson(URL_PERMOHONAN.patchPermohonan, data);
};

export const apiUploadFile = (data) => {
  return postFormDataFile(URL_FILE.uploadFile, data);
};

export const apiSubmitPermohonan = (data) => {
  return patchDataJson(URL_PERMOHONAN.patchPermohonan, data);
};
