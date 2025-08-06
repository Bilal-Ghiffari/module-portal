import { getMarinaNew } from "@/helpers/api_helper";
import {
  patchDataJson,
  postDataJson,
  postFormDataFile,
} from "../../services/apiHelper";
import { URL_WN_GANDA } from "./apiUrl";

export const apiGetAnakWnGanda = (id_permohonan) => {
  return getMarinaNew(`${URL_WN_GANDA.getPermohonanDetail}/${id_permohonan}`);
};

export const apiPostAnakWnGanda = (data) => {
  return postDataJson(URL_WN_GANDA.postPermohonan, data);
};

export const apiPatchAnakWnGanda = (data) => {
  return patchDataJson(URL_WN_GANDA.patchPermohonan, data);
};

export const apiUploadAnakWnGanda = (data) => {
  return postFormDataFile(URL_WN_GANDA.uploadFile, data);
};

export const apiSubmitAnakWnGanda = (data) => {
  return patchDataJson(URL_WN_GANDA.patchPermohonan, data);
};
