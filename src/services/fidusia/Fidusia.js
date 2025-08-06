import ApiService from '../ApiServices';

const FidusiaMaster = {
  getDaftarFidusia: async (params) => {
    const { page = 1, limit = 5, search = '' } = params;
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/riwayat?page=${page}&limit=${limit}&search=${search}`,
      method: 'GET',
    });
  },
};

export default FidusiaMaster;
