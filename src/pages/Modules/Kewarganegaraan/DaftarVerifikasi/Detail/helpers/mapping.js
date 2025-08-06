export const mapDetailToFormik = (data) => {
  return {
    // Step 1 - Data Pribadi Pemohon
    id_permohonan: data.id_permohonan || "",
    nama_lengkap_pemohon: data.nama_lengkap_pemohon || "",
    nik_pemohon: data.nik_pemohon || "",
    id_provinsi_pemohon: data.id_provinsi_pemohon || "",
    id_kab_kota_pemohon: data.id_kab_kota_pemohon || "",
    id_negara_lahir_pemohon: data.negara_lahir_pemohon_text || "",
    tgl_lahir_pemohon: data.tgl_lahir_pemohon || "",
    jenis_kelamin_pemohon: data.jenis_kelamin_pemohon || "",
    status_kawin_pemohon: data.status_kawin_pemohon || "",
    id_kewarganegaraan_asal_pemohon: "Indonesia",
    id_pekerjaan_pemohon: data.pekerjaan_pemohon_text || "",

    tempat_tinggal_pemohon: data.tempat_tinggal_pemohon || "",
    id_negara_tinggal_pemohon:
      data.tempat_tinggal_pemohon === "Luar Negeri"
        ? String(data.id_negara_tinggal_pemohon || "")
        : "",
    id_provinsi_tinggal_pemohon: data.provinsi_pemohon_text,
    id_kab_kota_tinggal_pemohon: data.kab_kota_pemohon_text,
    alamat_tinggal_pemohon: data.alamat_tinggal_pemohon || "",
    no_hp_pemohon: data.no_hp_pemohon || "",
    no_telp_pemohon: data.no_telp_pemohon || "",
    email_pemohon: data.email_pemohon || "",

    no_akta_lahir_pemohon: data.no_akta_lahir_pemohon || "",
    tgl_akta_lahir_pemohon: data.tgl_akta_lahir_pemohon || "",

    no_akta_kawin_pemohon: data.no_akta_kawin_pemohon || "",
    tgl_akta_kawin_pemohon: data.tgl_akta_kawin_pemohon || "",

    no_paspor_ri_pemohon: data.no_paspor_ri_pemohon || "",
    wilayah_paspor_ri_pemohon: String(data.wilayah_paspor_ri_pemohon || ""),
    tgl_exp_paspor_ri_pemohon: data.tgl_exp_paspor_ri_pemohon || "",

    no_paspor_kebangsaan_pemohon: data.no_paspor_kebangsaan_pemohon || "",
    wilayah_paspor_kebangsaan_pemohon: String(
      data.wilayah_paspor_kebangsaan_pemohon || ""
    ),
    tgl_exp_paspor_kebangsaan_pemohon:
      data.tgl_exp_paspor_kebangsaan_pemohon || "",

    // Step 2 - Identitas Pasangan
    nama_lengkap_pasangan: data.nama_lengkap_pasangan || "",
    alamat_tinggal_pasangan: data.alamat_tinggal_pasangan || "",
    email_pasangan: data.email_pasangan || "",
    negara_lahir_pasangan_text: data.negara_lahir_pasangan_text || "",
    no_hp_pasangan: data.no_hp_pasangan || "",
    tgl_lahir_pasangan: data.tgl_lahir_pasangan || "",
    alamat_tinggal_pasangan: data.alamat_tinggal_pasangan || "",
    status_kawin_pasangan: data.status_kawin_pasangan || "",
    agama_pasangan: data.agama_pasangan || "",
    no_paspor_asing_pasangan: data.no_paspor_asing_pasangan || "",
    tgl_exp_paspor_asing_pasangan: data.tgl_exp_paspor_asing_pasangan || "",

    //
    status_aktivitas: data.status_aktivitas,
    files: data.files,
    status_aktivitas_text: data.status_aktivitas_text,
  };
};
