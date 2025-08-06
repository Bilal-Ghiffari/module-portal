export const steps = [
  {
    id: 1,
    label: "Pembelian Voucher",
    description: `Voucher berhasil dibeli sebagai syarat awal pengajuan permohonan.`,
  },
  {
    id: 2,
    label: "Pendaftaran Permohonan",
    description: "Data permohonan telah diisi dan dikirim oleh pemohon.",
  },
  {
    id: 3,
    label: "Verifikasi oleh PBK",
    description: `Berkas diperiksa awal oleh PBK untuk kelengkapan dan keabsahan.`,
  },
  {
    id: 4,
    label: "Verifikasi oleh FU",
    description: `Verifikasi oleh FU`,
  },
  {
    id: 5,
    label: "Verifikasi oleh Kasi",
    description: `Verifikasi oleh FU`,
  },
  {
    id: 6,
    label: "Verifikasi oleh Kasubdit",
    description:
      "Kasubdit melakukan pengecekan akhir sebelum diteruskan ke direktur.",
  },
  {
    id: 7,
    label: "Verifikasi oleh Direktur",
    description:
      "Persetujuan akhir oleh Direktur untuk menerbitkan keputusan resmi.",
  },
  {
    id: 8,
    label: "SK Terbit",
    description:
      "Surat Keputusan (SK) telah diterbitkan dan siap diunduh oleh pemohon.",
    subDescription: "Cetak Surat Keputusan",
  },
];

export const dummyFormData = {
  informasiPribadi: {
    namaLengkap: "Ahmad Fauzi",
    kewarganegaraanAsal: "Indonesia",
    tempatLahir: "Surabaya",
    jenisKelamin: "Laki-laki",
    agama: "Islam",
    pekerjaan: "Pegawai Negeri Sipil",
    alamat: "Jln Merdeka 123",
  },
  informasiPernikahan: {
    statusPerkawinan: "Menikah",
    tanggalPernikahan: "12 Januari 2015",
    nomorBukuNikah: "456/DEF/2015",
    nomorSKIM: "SKIM-12345",
    pasanganWNI: "",
  },
  alamatPribadi: {
    jalan: "Jl. Merdeka No. 10",
    kelurahan: "Ketabang",
    kecamatan: "Genteng",
    kota: "Surabaya",
    provinsi: "Jawa Timur",
    kodePos: "60272",
  },
  pasanganWNI: {
    namaLengkap: "Siti Aminah",
    tempatLahir: "Surabaya",
    tanggalLahir: "10 Februari 1988",
    pekerjaan: "Guru",
    alamat: "Jl. Merdeka No. 10, Surabaya",
    kewarganegaraan: "Indonesia",
    nomorKTP: "3578123456780001",
  },
};
