import { URL_VERIFIKASI } from "./apiUrls";
import { patchDataJson } from "./apiHelper";
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

export const apiGetDaftarVerifikasi = (params = { page: 1, limit: 10 }) => {
  const queryString = buildQueryString(params);
  return getMarinaNew(`${URL_VERIFIKASI.daftarVerifikasi}${queryString}`);
};

export const apiGetDetailPermohonan = (id) => {
  return getMarinaNew(`${URL_VERIFIKASI.detailPermohonan}/${id}`);
};

export const apiPatchVerifkasi = (data) => {
  return patchDataJson(`${URL_VERIFIKASI.patchVerifikasi}`, data);
};
