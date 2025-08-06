import { getMarinaNew } from "@/helpers/api_helper";
import { URL_TETAP_WNI } from "./apiUrl";
import { accessToken } from "@/helpers/jwt-token-access/accessToken";

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

export const apiGetDaftarPermohonan = (params = { page: 1, limit: 10 }) => {
  const queryString = buildQueryString(params);
  return getMarinaNew(
    `${URL_TETAP_WNI.riwayatPermohonan}${queryString}`,
    defaultConfig
  );
};

export const apiGetDetailPermohonan = (id_permohonan) => {
  return getMarinaNew(
    `${URL_TETAP_WNI.detailPermohonan}${id_permohonan}`,
    defaultConfig
  );
};

export const apiGetSkPermohonan = (params = {}) => {
  const queryString = buildQueryString(params);
  console.log("QUERY STRING", queryString);
  return getMarinaNew(
    `${URL_TETAP_WNI.skPermohonan}${queryString}`,
    defaultConfig
  );
};
