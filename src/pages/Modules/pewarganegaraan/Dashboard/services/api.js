import { getMarinaNew } from "@/helpers/api_helper";
import { URL_PERMOHONAN } from "./apiUrl";

// export const pewargaStatictoken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWlucyIsInNlc3Npb25faWQiOiI0ZmRlNmRkOS01OWJhLTRkMmUtODE1Zi1hOTQzOGJlYzkxMWIiLCJpbml0aWFsIjoxNzUyNzU2MTY4LCJleHBpcmVkIjoxNzUyNzU5NzY4LCJpYXQiOjE3NTI3NTYxNjh9.ozhBTX1yVC6o96ScllODxu8rfqprjry1EM0XAlxxfdM";

// const defaultConfig = {
//   headers: {
//     Authorization: `Bearer ${pewargaStatictoken}`,
//   },
// };

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
  return getMarinaNew(`${URL_PERMOHONAN.riwayatPermohonan}${queryString}`);
};

export const apiGetDetailPermohonan = (id_permohonan) => {
  return getMarinaNew(`${URL_PERMOHONAN.detailPermohonan}${id_permohonan}`);
};

export const apiGetSkPermohonan = (params = {}) => {
  const queryString = buildQueryString(params);
  console.log("QUERY STRING", queryString);
  return getMarinaNew(`${URL_PERMOHONAN.skPermohonan}${queryString}`);
};
