import { axiosApiNew } from "@/helpers/api_helper";

export async function postDataJson(url, data = {}, config = {}) {
  return await axiosApiNew
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...config,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("POST JSON Error:", error);
      throw error;
    });
}

export async function patchDataJson(url, data = {}, config = {}) {
  return await axiosApiNew
    .patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...config,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("PATCH JSON Error:", error);
      throw error;
    });
}

export async function postFormDataFile(url, data, config = {}) {
  return axiosApiNew
    .post(url, data, {
      headers: { "Content-Type": "multipart/form-data", ...config },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("UPLOAD File Error:", error);
      throw error;
    });
}
