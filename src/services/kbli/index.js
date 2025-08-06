import ApiService from "../ApiServices";

const MasterKbli = {
  getListKBLI: async (params) => {
    const { page = 1, limit = 10, search = "" } = params;
    return await ApiService.fetchDataWithAxios({
      url: `/perseroan-perorangan/kbli?page=${page}&limit=${limit}&search=${search}`,
      method: "GET",
    });
  },
};

export default MasterKbli;
