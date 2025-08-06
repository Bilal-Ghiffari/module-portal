import ApiService from './ApiServices';

const MasterServices = {
  getOptionJenisKorporasi: async () => {
    const response = await ApiService.fetchDataWithAxios({
      url: '/master/jenis-korporasi',
      method: 'GET',
    });
    return response.data?.map((item) => ({
      label: item.nama,
      value: item.id,
    }));
  },

  getOptionBadanHukum: async (id) => {
    const response = await ApiService.fetchDataWithAxios({
      url: `/master/badan-hukum?id_m_jenis_korporasi=${id}`,
      method: 'GET',
    });
    return response.data?.map((item) => ({
      label: item.nama,
      value: item.id,
      id_m_jenis_korporasi: item.id_m_jenis_korporasi,
    }));
  },
};

export default MasterServices;
