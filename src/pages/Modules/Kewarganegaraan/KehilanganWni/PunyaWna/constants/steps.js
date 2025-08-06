export const STEP_FIELDS = [
  // Step 0 pengisian voucher
  ["voucher"],
  // Step 1 Identitas Pemohon
  [
    // informasi pribadi
    "namaLengkapPemohon",
    "jenisKelaminPemohon",
    "nomorHandphonePemohon",
    "nomorTeleponPemohon",
    "tempatLahirPemohon",
    "tanggalLahirPemohon",
    "emailPemohon",
    "pekerjaanPemohon",
    "niknit",
    "statusPerkawinan",
    "kewarganegaraanAsing",

    // data alamat
    "tempatTglIndoPemohon",
    "tempatTglLnPemohon",
    "negaraPemohon",

    // Informasi dokumen Sipil
    "nmrAktaLahirPemohon",
    "tAktaLahirPemohon",
    "nmrAktaPerkawinanPemohon",
    "tAktaPerkawinanPemohon",

    // Informasi Paspor,
    "nmrPasporRI",
    "wlyTerbitPasporRI",
    "tglKedaluarsaPasporRi",
    "nmrPasporAsing",
    "wlyTerbitPasporAsing",
    "tglKedaluarsaPasporAsing",
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
    "dokumenPerjalanRi",
    "suratPjbtAsing",
    "pasporAsing",
    "buktiPengemPaspor",
    "pasfoto",
  ],
];
