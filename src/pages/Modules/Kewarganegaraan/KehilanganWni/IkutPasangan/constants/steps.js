export const STEP_FIELDS = [
  // Step 0 pengisian voucher
  ["voucher"],
  // Step 1 Identitas Pemohon
  [
    // informasi pribadi
    "namaLengkapPemohon",
    "jenisKelaminPemohon",
    "noHpPemohon",
    "noTelpPemohon",
    "tmpLahirPemohon",
    "tglLahirPemohon",
    "emailPemohon",
    "pekerjaanPemohon",
    "niknitPemohon",
    "statusPerkawinan",
    "alasanPemohon",

    // data alamat
    "alamatTglIndoPemohon",
    "alamatTglAsgPemohon",
    "negaraPemohon",

    // Informasi Dokumen Sipil
    "nomorAktaLahir",
    "tanggalAktaLahir",
    "nomorAktaPerkawinan",
    "tanggalAktaPerkawinan",

    // Informasi Paspor,
    "nomorPasporRI",
    "wilayahTerbitPasporRI",
    "tanggalKedaluarsaPaspor",
  ],
  // Step 2 Identitas Suami / Istri
  [
    // informasi data pasangan
    "namaLengkapPasangan",
    "kewarganegaraanPasangan",
    "emailPasangan",
    "nomorHpPasangan",
    "tempatLahirPasangan",
    "tanggalLahirPasangan",
    "alamatTinggalPasangan",
    "statusKawinPasangan",
    "agamaPasangan",
  ],
  // Step 3 Surat permohonan
  ["suratPermohonan"],
  // Step 4 unggah dokumen
  [
    "kutipanAktaKelahiran",
    "kutipanAktaPerkawinan",
    "kutipanAktaPerceraian",
    "fotokopiPasporRI",
    "suratNaturalisasiAsing",
    "pasfoto",
  ],
];
