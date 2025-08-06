export const initialValues = {
  // Step 0 boarding
  voucher: "",

  // Step 1 Identitas Pemohon
  // Informasi Pribadi
  namaLengkapPemohon: "",
  jenisKelaminPemohon: "",
  niknit: "",
  statusPerkawinan: "",
  tempatLahirPemohon: "",
  tanggalLahirPemohon: "",
  kewarganegaraan: "Indonesia",
  kewarganegaraanAsing: "",
  nomorHandphonePemohon: "",
  nomorTeleponPemohon: "",
  alasanPemohon: "",
  emailPemohon: "",
  pekerjaanPemohon: "",
  noSkNaturalisasi: "",

  // Data Alamat
  tempatTinggalPemohon: "",
  provinsiPemohon: "",
  kabkotPemohon: "",
  negaraTinggalPemohon: "",
  alamatTinggalPemohon: "",

  // Informasi dokumen Sipil (Akta Kelahiran)
  nomorAktaPemohon: "",
  tanggalAktaPemohon: "",

  // Informasi perkawinan
  nomorAktaPerkawinan: "",
  tanggalAktaPerkawinan: null,

  // Informasi Paspor
  nomorPasporRI: "",
  wilayahTerbitPasporRI: "",
  tanggalKedaluarsaPaspor: "",

  // Step 2 Identitas Pasangan & Anak
  // Informasi data Ibu
  namaLengkapIbu: "",
  kewarganegaraanIbu: "",
  emailIbu: "",
  nomorHpIbu: "",
  tempatLahirIbu: "",
  tanggalLahirIbu: null,
  alamatTinggalIbu: "",
  statusPerkawinanIbu: "",
  agamaIbu: "",

  // Informasi data Ayah
  namaLengkapAyah: "",
  kewarganegaraanAyah: "",
  emailAyah: "",
  nomorHpAyah: "",
  tempatLahirAyah: "",
  tanggalLahirAyah: null,
  alamatTinggalAyah: "",
  statusPerkawinanAyah: "",
  agamaAyah: "",

  // Informasi data Pasangan
  namaLengkapPasangan: "",
  kewarganegaraanPasangan: "",
  emailPasangan: "",
  nomorHpPasangan: "",
  tempatLahirPasangan: "",
  tanggalLahirPasangan: null,
  alamatTinggalPasangan: "",
  statusPerkawinanPasangan: "Kawin",
  agamaPasangan: "",

  // Step 3 Surat permohonan
  suratPermohonan: "",

  // Step 4 Unggah dokumen
  fotokopiAktaKelahiran: null,
  fotokopiAktaPerkawinan: null,
  fotokopiAktaPerceraian: null,
  fotokopiDokumenPerjalanan: null,
  suratKeteranganPejabatAsing: null,
  pasfoto: null,
};
