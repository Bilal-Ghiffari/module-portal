import { URL_VERIFIKASI } from "./apiUrls";
import { patchDataJson } from "./apiHelper";
import { accessToken } from "@/helpers/jwt-token-access/accessToken";
import { getMarinaNew } from "@/helpers/api_helper";

const defaultConfig = {
  headers: {
    Authorization: `${accessToken}`,
  },
};

const buildQueryString = (params) => {
  if (!params || typeof params !== "object") return "";
  const query = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return query ? `?${query}` : "";
};

export const apiGetDaftarVerifikasi = (params = { page: 1, limit: 10 }) => {
  const queryString = buildQueryString(params);
  return getMarinaNew(
    `${URL_VERIFIKASI.daftarVerifikasi}${queryString}`,
    defaultConfig
  );
};

export const apiGetDetailPermohonan = (id) => {
  return getMarinaNew(
    `${URL_VERIFIKASI.detailPermohonan}/${id}`,
    defaultConfig
  );
};

// ?id_permohonan=1
export const apiGetDetailSk = (id_permohonan) => {
  const queryString = buildQueryString({ id_permohonan });

  return getMarinaNew(
    `${URL_VERIFIKASI.detailSk}${queryString}`,
    defaultConfig
  );
};

export const apiPatchVerifkasi = (data) => {
  return patchDataJson(
    `${URL_VERIFIKASI.patchVerifikasi}`,
    data,
    defaultConfig
  );
};
