export const STEP_FIELDS = [
  // Step 0 input voucher
  ["voucher"],

  // Step 1 Identitas Pemohon
  [
    // Informasi Anak
    "nama_lengkap_pemohon",
    "jenis_kelamin_pemohon",
    "id_tempat_lahir_pemohon",
    "tgl_lahir_pemohon",
    "email_pemohon",
    "id_kwn_asal_pemohon",
    "tempat_tinggal_pemohon",
    "id_negara_tinggal_pemohon",
    "id_provinsi_tinggal_pemohon",
    "id_kab_kota_tinggal_pemohon",
    "alamat_tinggal_pemohon",

    // Informasi pengangkatan Anak
    "no_dok_pengangkatan_anak",
    "tgl_dok_pengangkatan_anak",

    // Informasi paspor asing
    "no_paspor_asing_pemohon",
    "id_wilayah_paspor_asing_pemohon",
    "tgl_exp_paspor_asing_pemohon",
  ],

  // Step 2 Identitas Ortu
  [
    // Data Ayah
    "nama_lengkap_ayah",
    "nik_ayah",
    "email_ayah",
    "no_hp_ayah",
    "id_kwn_asal_ayah",
    "status_kawin_ayah",
    "alamat_tinggal_ayah",
    "tempat_lahir_ayah",
    "id_provinsi_lahir_ayah",
    "id_kab_kota_lahir_ayah",
    "id_negara_lahir_ayah",
    "tgl_lahir_ayah",
    "id_pekerjaan_ayah",

    // Data Ibu
    "nama_lengkap_ibu",
    "nik_ibu",
    "email_ibu",
    "no_hp_ibu",
    "id_kwn_asal_ibu",
    "status_kawin_ibu",
    "alamat_tinggal_ibu",
    "tempat_lahir_ibu",
    "id_provinsi_lahir_ibu",
    "id_kab_kota_lahir_ibu",
    "id_negara_lahir_ibu",
    "tgl_lahir_ibu",
    "id_pekerjaan_ibu",
  ],
  [
    // Step 3 Surat permohonan
    "suratPermohonan",
  ],
  // Step 4 Unggah Dokumen
  [
    "kutipanAktaKelahiran",
    "IzinKeimigrasian",
    "skTmpTinggal",
    "pasporAnak",
    "penetapanKeadilan",
    "srtPerwaNgrAsal",
    "kutipanAktaKelaOrtu",
    "pasporKtpOrtu",
    "kutipanAktaPerkawinan",
    "pasfoto",
  ],
];
