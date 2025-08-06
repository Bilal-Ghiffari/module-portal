const getInitialValuesIdentitasPemohon = () => {
  const data = localStorage.getItem("userSession") || "";
  const dataUser = JSON.parse(data)
  const name = dataUser.user_detail.fullname

  return {
    namaCV: "",
    singkatanCV: "",
    npwpCV: "",
    telepon: "",
    email: "",
    jangkaWaktu: "",
    batasJangkaWaktu: "",

    alamat: "",
    provinsi: "",
    kotakab: "",
    kecamatan: "",
    kelurahan: "",
    rt: "",
    rw: "",
    kodePos: "",

    noAkta: "",
    tanggalAkta: "",
    provinsiAkta: "",
    kotakabAkta: "",
    namaNotaris: name,
    kedudukanNotaris: "",
    notarisPengganti: "",
    namaNotarisPengganti: "",

    nilaiAset: "",

    kegiatanUsaha: [],
    setujuKegiatanUsaha: false,

    sekutu: [],
    pengurus: [],
  };
};

export default getInitialValuesIdentitasPemohon;
