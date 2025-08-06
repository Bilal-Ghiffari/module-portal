// Mapping field tiap step
export const STEP_FIELDS = [
  // Step 0 pengisian voucher
  ["voucher"],
  // Step 1 identitas pemohon
  [
    // Data Pribadi
    "nama_lengkap_pemohon",
    "nik_pemohon",
    "id_provinsi_pemohon",
    "id_kab_kota_pemohon",
    "id_negara_lahir_pemohon",
    "tgl_lahir_pemohon",
    "jenis_kelamin_pemohon",
    "status_kawin_pemohon",
    "id_kewarganegaraan_asal_pemohon",
    "id_pekerjaan_pemohon",

    // Skema Data Alamat
    "tempat_tinggal_pemohon",
    "id_negara_tinggal_pemohon",
    "id_provinsi_tinggal_pemohon",
    "id_kab_kota_tinggal_pemohon",
    "alamat_tinggal_pemohon",
    "no_hp_pemohon",
    "no_telp_pemohon",
    "email_pemohon",

    // Dokumen Kependudukan
    "no_akta_lahir_pemohon",
    "tgl_akta_lahir_pemohon",

    // Dokumen Perkawinan
    "no_akta_kawin_pemohon",
    "tgl_akta_kawin_pemohon",

    // Dokumen Perjalanan
    "no_paspor_ri_pemohon",
    "wilayah_paspor_ri_pemohon",
    "tgl_exp_paspor_ri_pemohon",
    "no_paspor_kebangsaan_pemohon",
    "wilayah_paspor_kebangsaan_pemohon",
    "tgl_exp_paspor_kebangsaan_pemohon",
  ],
  // Step 2 identitas pasangan
  [
    "nama_lengkap_pasangan",
    "id_kewarganegaraan_pasangan",
    "email_pasangan",
    "no_hp_pasangan",
    "id_negara_lahir_pasangan",
    "tgl_lahir_pasangan",
    "alamat_tinggal_pasangan",
    "status_kawin_pasangan",
    "agama_pasangan",
    "no_paspor_asing_pasangan",
    "tgl_exp_paspor_asing_pasangan",
  ],
  // Step 3 surat permohonan
  ["suratPermohonan"],
  // Step 4 unggah dokumen
  [
    "kutipanAktaLahirPemohon",
    "kutipanAktaPerkawinanAtauBukuNikah",
    "dokumenPernahWNI",
    "ktpAtauNIT",
    "suratPernyataanPenolakanWNA",
    "pasFoto",
  ],
];
