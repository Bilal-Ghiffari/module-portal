import ApiService from '../ApiServices';

const FidusiaPendaftar = {
  //step 1 pemberi
  postFidusiaPendaftaranPemberi: async (body) => {
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/pendaftaran',
      method: 'POST',
      data: body,
    });
  },
  patchFidusiaPendaftaranPemberi: async (body) => {
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/pendaftaran',
      method: 'PATCH',
      data: body,
    });
  },

  //step 2 penerima
  getFidusiaPendaftaranPenerima: async (id_pendaftaran) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/penerima?id_pendaftaran=${id_pendaftaran}`,
      method: 'GET',
    });
  },
  postFidusiaPendaftaranPenerima: async (body) => {
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/pendaftaran/penerima',
      method: 'POST',
      data: body,
    });
  },

  patchFidusiaPendaftaran: async (body) => {
    // console.log(body);
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/pendaftaran',
      method: 'PATCH',
      data: body,
    });
  },
  deleteFidusiaPendaftaranPenerima: async (id) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/penerima/${id}`,
      method: 'DELETE',
    });
  },

  //step 3 informasi object
  getFidusiaNotaris: async () => {
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/notariat',
      method: 'GET',
    });
  },
  postFidusiaPendaftaranInformasi: async (body) => {
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/pendaftaran/perjanjian-pokok',
      method: 'POST',
      data: body,
    });
  },
  getFidusiaPendaftaranInformasi: async (id) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/perjanjian-pokok?id_pendaftaran=${id}`,
      method: 'GET',
    });
  },
  deleteFidusiaPendaftaranInformasi: async (id) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/perjanjian-pokok/${id}`,
      method: 'DELETE',
    });
  },

  //step 4 object jaminan

  getFidusiaPendaftaranObyekJaminan: async (id_pendaftaran) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/obyek-jaminan?id_pendaftaran=${id_pendaftaran}`,
      method: 'GET',
    });
  },
  postFidusiaPendaftaranObjectJaminan: async (body) => {
    return await ApiService.fetchDataWithAxios({
      url: '/fidusia/pendaftaran/obyek-jaminan',
      method: 'POST',
      data: body,
    });
  },
  getFidusiaPendaftaranSubKategori: async (kategori_obyek_name) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/kategori-obyek/jenis?kategori_obyek=${kategori_obyek_name}`,
      method: 'GET',
    });
  },
  getFidusiaPendaftaranAtribut: async (id_sub_kategori) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/kategori-obyek/atribut?id_jenis_kategori=${id_sub_kategori}`,
      method: 'GET',
    });
  },
  deleteFidusiaPendaftaranObyek: async (id) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/obyek-jaminan/${id}`,
      method: 'DELETE',
    });
  },

  // step 5 konfirmasi data
  getFidusiaPendaftaranKonfirmasiDetail: async (id_pendaftaran) => {
    return await ApiService.fetchDataWithAxios({
      url: `/fidusia/pendaftaran/detail/${id_pendaftaran}`,
      method: 'GET',
    });
  },
};

export default FidusiaPendaftar;
