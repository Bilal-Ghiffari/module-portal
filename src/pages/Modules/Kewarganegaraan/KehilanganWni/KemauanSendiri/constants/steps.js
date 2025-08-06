export const STEP_FIELDS = [
  // Step 0 pengisian voucher
  ["voucher"],
  // Step 1 Identitas Pemohon
  [
    // informasi pribadi
    "namaLengkapPemohon",
    "jenisKelaminPemohon",
    "niknit",
    "statusPerkawinan",
    "tempatLahirPemohon",
    "tanggalLahirPemohon",
    "kewarganegaraan",
    "kewarganegaraanAsing",
    "nomorHandphonePemohon",
    "nomorTeleponPemohon",
    "alasanPemohon",
    "emailPemohon",
    "pekerjaanPemohon",
    "noSkNaturalisasi",

    // data alamat
    "tempatTinggalPemohon",
    "provinsiPemohon",
    "kabkotPemohon",
    "negaraTinggalPemohon",
    "alamatTinggalPemohon",

    // Informasi dokumen Sipil
    "nomorAktaPemohon",
    "tanggalAktaPemohon",

    // Informasi perkawinan
    "nomorAktaPerkawinan",
    "tanggalAktaPerkawinan",

    // Informasi Paspor,
    "nomorPasporRI",
    "wilayahTerbitPasporRI",
    "tanggalKedaluarsaPaspor",
  ],
  // Step 2 Identitas Suami / Istri /anak
  [
    // informasi data Ibu
    "namaLengkapIbu",
    "kewarganegaraanIbu",
    "emailIbu",
    "nomorHpIbu",
    "tempatLahirIbu",
    "tanggalLahirIbu",
    "alamatTinggalIbu",
    "statusPerkawinanIbu",
    "agamaIbu",

    // informasi data Ayah
    "namaLengkapAyah",
    "kewarganegaraanAyah",
    "emailAyah",
    "nomorHpAyah",
    "tempatLahirAyah",
    "tanggalLahirAyah",
    "alamatTinggalAyah",
    "statusPerkawinanAyah",
    "agamaAyah",

    // informasi data pasangan
    "namaLengkapPasangan",
    "kewarganegaraanPasangan",
    "emailPasangan",
    "nomorHpPasangan",
    "tempatLahirPasangan",
    "tanggalLahirPasangan",
    "alamatTinggalPasangan",
    "statusPerkawinanPasangan",
    "agamaPasangan",
  ],
  // Step 3 Surat permohonan
  ["suratPermohonan"],
  // Step 4 unggah dokumen
  [
    "fotokopiAktaKelahiran",
    "fotokopiAktaPerkawinan",
    "fotokopiAktaPerceraian",
    "fotokopiDokumenPerjalanan",
    "suratKeteranganPejabatAsing",
    "pasfoto",
  ],
];
