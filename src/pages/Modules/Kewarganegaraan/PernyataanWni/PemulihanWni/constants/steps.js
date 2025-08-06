export const STEP_FIELDS = [
  // Step 0 pengisian voucher
  ["voucher"],
  // Step 1 Identitas Pemohon
  [
    // informasi pribadi
    "namaLengkapPemohon",
    "niknit",
    "kewarganegaraan",
    "kewarganegaraanAsing",
    "jenisKelaminPemohon",
    "statusPerkawinan",
    "pekerjaanPemohon",
    "tempatLahirPemohon",
    "tanggalLahirPemohon",
    "alasanPemohon",
    "nomorAktaPemohon",
    "tanggalAktaPemohon",

    // data alamat
    "tempatTinggalPemohon",
    "negaraTinggalPemohon",
    "nomorHandphonePemohon",
    "nomorTeleponPemohon",
    "provinsi",
    "kabkot",
    "emailPemohon",
    "alamatTinggalPemohon",

    // dokumen kelahiran anak
    "nomorAktaAnak",
    "tanggalAktaAnak",

    // Dokumen perkawinan
    "nomorAktaPerkawinan",
    "tanggalAktaPerkawinan",
    "nomorAktaCerai",
    "tanggalAktaCerai",

    // Dokumen perjalanan,
    "nomorPasporRI",
    "wilayahTerbitPasporRI",
    "tanggalKedaluarsaPaspor",
  ],
  // Step 2 Identitas Suami / Istri /anak
  [
    // informasi data pasangan
    "namaLengkapPasangan",
    "kewarganegaraanPasangan",
    "emailPasangan",
    "nomorHpPasangan",
    "tempatLahirPasangan",
    "tanggalLahirPasangan",
    "alamatTinggalPasangan",

    // informasi data anak
    "namaLengkapAnak",
    "emailAnak",
    "tempatLahirAnak",
    "tanggalLahirAnak",
    "alamatTinggalAnak",
  ],
  // Step 3 Surat permohonan
  ["suratPermohonan"],
  // Step 4 unggah dokumen
  [
    "fotokopiAktaKelahiran",
    "fotokopiPasporRI",
    "fotokopiKtp",
    "fotokopiAktaNikah",
    "fotokopiAktaCerai",
    "fotokopiAktaKelahiranAnak",
    "suratPernyataanKesetiaan",
    "suratPernyataanMelepaskan",
    "daftarRiwayatHidup",
    "pasFoto",
  ],
];
