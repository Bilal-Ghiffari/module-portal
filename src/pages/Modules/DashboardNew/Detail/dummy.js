export const steps = [
  {
    label: "Pembelian Voucher",
    description: `Voucher berhasil dibeli sebagai syarat awal pengajuan permohonan.`,
    time: "10 Juni 2025, 09.00 WIB",
  },
  {
    label: "Pendaftaran Permohonan",
    description: "Data permohonan telah diisi dan dikirim oleh pemohon.",
    time: "10 Juni 2025, 09.00 WIB",
  },
  {
    label: "Verifikasi oleh Konseptor",
    description: `Berkas diperiksa awal oleh Konseptor untuk kelengkapan dan keabsahan.`,
    time: "10 Juni 2025, 09.00 WIB",
  },
  {
    label: "Verifikasi oleh Konseptor",
    description: `Verifikasi oleh Subkoordinator`,
    time: "10 Juni 2025, 09.00 WIB",
  },
  {
    label: "Verifikasi oleh Koordinator",
    description:
      "Koordinator melakukan pengecekan akhir sebelum diteruskan ke direktur.",
    time: "10 Juni 2025, 09.00 WIB",
  },
  {
    label: "Verifikasi oleh Direktur",
    description:
      "Persetujuan akhir oleh Direktur untuk menerbitkan keputusan resmi.",
    time: "10 Juni 2025, 09.00 WIB",
  },
  {
    label: "SK Terbit",
    description:
      "Surat Keputusan (SK) telah diterbitkan dan siap diunduh oleh pemohon.",
    subDescription: "Cetak Surat Keputusan",
    time: "10 Juni 2025, 09.00 WIB",
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
