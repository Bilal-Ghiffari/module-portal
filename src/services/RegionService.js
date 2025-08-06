import ApiService from './ApiServices';

export async function getCountries() {
  return await ApiService.fetchDataWithAxios({
    url: `master/negara`,
    method: 'get',
  });
}
export async function getProvinces() {
  return await ApiService.fetchDataWithAxios({
    url: `/master/wilayah?tipe=provinsi`,
    method: 'get',
  });
}

export async function getRegencies(provinceId) {
  return await ApiService.fetchDataWithAxios({
    url: `/master/wilayah?tipe=kotakab&id=${provinceId}`,
    method: 'get',
  });
}

export async function getDistricts(regencyId) {
  return await ApiService.fetchDataWithAxios({
    url: `/master/wilayah?tipe=kecamatan&id=${regencyId}`,
    method: 'get',
  });
}
export async function getVillages(districtId) {
  return await ApiService.fetchDataWithAxios({
    url: `/master/wilayah?tipe=desa&id=${districtId}`,
    method: 'get',
  });
}
