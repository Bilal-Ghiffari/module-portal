import { getMarinaNew } from "@/helpers/api_helper";
import {
  patchDataJson,
  postDataJson,
  postFormDataFile,
} from "../../services/apiHelper";
import { URL_WN_ANGKAT } from "./apiUrl";

export const apiGetAnakAngkat = (id_permohonan) => {
  return getMarinaNew(`${URL_WN_ANGKAT.getPermohonanDetail}/${id_permohonan}`);
};

export const apiPostAnakAngkat = (data) => {
  return postDataJson(URL_WN_ANGKAT.postPermohonan, data);
};

export const apiPatchAnakAngkat = (data) => {
  return patchDataJson(URL_WN_ANGKAT.patchPermohonan, data);
};

export const apiUploadAnakAngkat = (data) => {
  return postFormDataFile(URL_WN_ANGKAT.uploadFile, data);
};

export const apiSubmitAnakAngkat = (data) => {
  return patchDataJson(URL_WN_ANGKAT.patchPermohonan, data);
};
