import axios from "axios";
import * as token from "./jwt-token-access/accessToken";

const baseUrlMarina = import.meta.env.VITE_APP_BASEURL_MARINA_PRODUCTION;
const baseUrlMarinaApi = import.meta.env.VITE_APP_BASEURL_MARINA_PRODUCTION_API;
const baseUrlMarinaPortal = import.meta.env.VITE_APP_BASEURL_MARINA_PORTAL;

export const axiosApi = axios.create({
  baseURL: baseUrlMarina,
});
export const axiosApiNew = axios.create({
  baseURL: baseUrlMarinaApi,
});

export const axiosApiPortal = axios.create({
  baseURL: baseUrlMarinaPortal,
});


axiosApi.defaults.headers.common["Authorization"] = token.accessToken;
axiosApi.defaults.headers.common["Content-Type"] = "application/json";
axiosApiNew.interceptors.request.use(
  async (config) => {
    if (token.accessToken) {
      config.headers["Authorization"] = token.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosApiNew.defaults.headers.common["Content-Type"] = "application/json";

export async function setAxiosAuthorization(token) {
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token || ""}`;
}

export async function getMarina(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function getMarinaNew(url, config = {}) {
  return await axiosApiNew
    .get(url, { ...config })
    .then((response) => response.data);
}
export async function deleteMarina(url, config = {}) {
  return await axiosApiNew
    .delete(url, { ...config })
    .then((response) => response.data);
}

export async function getMarinaPortal(url, config = {}) {
  return await axiosApiPortal
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, config).then((response) => response.data);
}
export async function postLayananFormData(url, data, config = {}) {
  return axiosApiNew
    .post(url, data, {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": undefined, // force axios to auto-set Content-Type (multipart/form-data)
      },
    })
    .then((response) => response.data);
}


export async function patchLayananFormData(url, data, config = {}) {
  return axiosApiNew.patch(url, data, config).then((response) => response.data);
}


export async function postLoginMarina(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => {
    setAxiosAuthorization(response.data?.data?.token);
    return response.data;
  });
}
