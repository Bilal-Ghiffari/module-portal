// fields in form
export const STEP_FIELDS = [
  // Step 0 - Voucher
  ["voucher"],

  // Step 1 - Identitas Pemohon
  [
    // Informasi Pribadi
    "nama_lengkap_pemohon",
    "id_kewarganegaraan_asal_pemohon",
    "id_negara_lahir_pemohon",
    "tgl_lahir_pemohon",
    "jenis_kelamin_pemohon",
    "agama_pemohon",
    "id_pekerjaan_pemohon",
    // Informasi Pernikahan
    "status_kawin",
    "tgl_kawin",
    "no_buku_nikah",
    "no_skim",
    // Data Alamat
    "id_provinsi_pemohon",
    "id_kab_kota_pemohon",
    "id_kec_pemohon",
    "id_desa_kel_pemohon",
    "no_telp_pemohon",
    "email_pemohon",
    "rt",
    "rw",
    "kode_pos",
    "alamat_pemohon",
  ],

  // Step 2 - Identitas pasangan
  [
    // Informasi data pasangan
    "nama_pasangan",
    "nik_pasangan",
    "no_telp_pasangan",
    "email_pasangan",
    "tempat_lahir_pasangan", // Pastikan field ini ada untuk tracking
    "id_provinsi_lahir_pasangan",
    "id_kab_kota_lahir_pasangan",
    "id_negara_lahir_pasangan", // Fixed: gunakan nama yang konsisten
    "tgl_lahir_pasangan",
    "id_pekerjaan_pasangan",
    "id_kewarganegaraan_pasangan",
    "jenis_kelamin_pasangan",
    "agama_pasangan",
  ],

  // Step 3 - Surat Permohonan
  ["suratPermohonan"],

  // Step 4 - Unggah Dokumen
  [
    "fotokopiAktaKelahiran",
    // "fotokopiKtp",
    "fotokopiKitap",
    "fotokopiAktaKelahiranPasangan",
    "fotokopiKtpPasangan",
    "fotokopiAktaPerkawinan",
    "suratKeteranganImigrasi",
    "sckcAsli",
    "suratPerwakilanNegara",
    "pasfoto",
    "suratKeteranganSehat",
    "buktiPembayaran",
    "suratPermohonanTertulis",
    "suratPernyataanAlasan",
    "suratPernyataanBerbahasa",
    "suratPernyataanNama",
    "suratPernyataanKesetiaan",
  ],
];
