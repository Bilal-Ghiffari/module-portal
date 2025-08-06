import { getMarinaNew } from "@/helpers/api_helper";
import {
  patchDataJson,
  postDataJson,
  postFormDataFile,
} from "../../services/apiHelper";
import { URL_TETAP_WNI } from "./apiUrl";

const buildQueryString = (params) => {
  if (!params || typeof params !== "object") return "";
  const query = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return query ? `?${query}` : "";
};

export const apiGetTetapWni = (id_permohonan) => {
  return getMarinaNew(`${URL_TETAP_WNI.getPermohonanDetail}/${id_permohonan}`);
};

export const apiPostTetapWni = (data) => {
  return postDataJson(URL_TETAP_WNI.postPermohonan, data);
};

export const apiPatchTetapWni = (data) => {
  return patchDataJson(URL_TETAP_WNI.patchPermohonan, data);
};

export const apiUploadTetapWni = (data) => {
  return postFormDataFile(URL_TETAP_WNI.uploadFile, data);
};

export const apiSubmitTetapWni = (data) => {
  return patchDataJson(URL_TETAP_WNI.patchPermohonan, data);
};
