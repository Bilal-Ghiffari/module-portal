const generateFieldKeys = (fileKey) => {
  const prefixMap = {
    fotokopiAktaKelahiran: "akta_lahir_pemohon",
    fotokopiKitap: "kitap",
    fotokopiAktaKelahiranPasangan: "akta_lahir_pasangan",
    fotokopiKtpPasangan: "ktp_pasangan",
    fotokopiAktaPerkawinan: "akta_kawin",
    suratKeteranganImigrasi: "skim",
    sckcAsli: "skck",
    suratPerwakilanNegara: "sk_negara",
    pasfoto: "pas_foto",
    suratKeteranganSehat: "sk_sehat",
    buktiPembayaran: "bukti_pnbp", // Diperbaiki dari "bukti_pnbp"
    suratPermohonanTertulis: "surat_permohonan",
    suratPernyataanAlasan: "surat_alasan_wni",
    suratPernyataanBerbahasa: "surat_pernyataan_bahasa", // Diperbaiki dari "pernyataan_bahasa"
    suratPernyataanNama: "surat_pernyataan_nama_sk", // Diperbaiki dari "pernyataan_nama_sk"
    suratPernyataanKesetiaan: "surat_pernyataan_setia_nkri", // Diperbaiki dari "pernyataan_setia_nkri"
  };

  const prefix = prefixMap[fileKey];
  return {
    validKey: `${prefix}_valid`,
    catatanKey: `catatan_${prefix}`,
  };
};

// Untuk debugging - mapping yang benar berdasarkan backend response
const BACKEND_FIELD_MAPPING = {
  // Format: fileKey -> { validField, catatanField }
  fotokopiAktaKelahiran: {
    validField: "akta_lahir_pemohon_valid",
    catatanField: "catatan_akta_lahir_pemohon",
  },
  fotokopiKitap: {
    validField: "kitap_valid",
    catatanField: "catatan_kitap",
  },
  fotokopiAktaKelahiranPasangan: {
    validField: "akta_lahir_pasangan_valid",
    catatanField: "catatan_akta_lahir_pasangan",
  },
  fotokopiKtpPasangan: {
    validField: "ktp_pasangan_valid",
    catatanField: "catatan_ktp_pasangan",
  },
  fotokopiAktaPerkawinan: {
    validField: "akta_kawin_valid",
    catatanField: "catatan_akta_kawin",
  },
  suratKeteranganImigrasi: {
    validField: "skim_valid",
    catatanField: "catatan_skim",
  },
  sckcAsli: {
    validField: "skck_valid",
    catatanField: "catatan_skck",
  },
  suratPerwakilanNegara: {
    validField: "sk_negara_valid",
    catatanField: "catatan_sk_negara",
  },
  pasfoto: {
    validField: "pas_foto_valid",
    catatanField: "catatan_pas_foto",
  },
  suratKeteranganSehat: {
    validField: "sk_sehat_valid",
    catatanField: "catatan_sk_sehat",
  },
  buktiPembayaran: {
    validField: "bukti_pnbp_valid",
    catatanField: "catatan_pnbp", // PERHATIAN: Tidak ada "bukti_" di catatan
  },
  suratPermohonanTertulis: {
    validField: "surat_permohonan_valid",
    catatanField: "catatan_surat_permohonan",
  },
  suratPernyataanAlasan: {
    validField: "surat_alasan_wni_valid",
    catatanField: "catatan_surat_alasan_wni",
  },
  suratPernyataanBerbahasa: {
    validField: "surat_pernyataan_bahasa_valid", // Backend menggunakan "surat_"
    catatanField: "catatan_pernyataan_bahasa", // Tapi catatan tetap tanpa "surat_"
  },
  suratPernyataanNama: {
    validField: "surat_pernyataan_nama_sk_valid", // Backend menggunakan "surat_"
    catatanField: "catatan_pernyataan_nama_sk", // Tapi catatan tetap tanpa "surat_"
  },
  suratPernyataanKesetiaan: {
    validField: "surat_pernyataan_setia_nkri_valid", // Backend menggunakan "surat_"
    catatanField: "catatan_pernyataan_setia_nkri", // Tapi catatan tetap tanpa "surat_"
  },
};

// Function yang disesuaikan dengan backend response yang EKSAKT
const generateFieldKeysExact = (fileKey) => {
  const mapping = BACKEND_FIELD_MAPPING[fileKey];

  if (!mapping) {
    console.warn(`No mapping found for fileKey: ${fileKey}`);
    return {
      validKey: `${fileKey}_valid`,
      catatanKey: `catatan_${fileKey}`,
    };
  }

  return {
    validKey: mapping.validField,
    catatanKey: mapping.catatanField,
  };
};

export { generateFieldKeys, generateFieldKeysExact, BACKEND_FIELD_MAPPING };
