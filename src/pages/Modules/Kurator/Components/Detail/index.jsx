import Section from "./Section";
import "./style.css";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import dayjs from "dayjs";
import "dayjs/locale/id"; // jika ingin pakai bahasa Indonesia
import Header from "@/components/Header";
import FilePreview from "@/components/Common/FilePreview";

dayjs.locale("id");
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Detail = ({ formik }) => {
  const informasi_pemohon_left = [
    { label: "Nama", value: formik?.values?.nama || "-" },
    {
      label: "Nama Gelar Depan",
      value: formik?.values?.nama_gelar_depan || "-",
    },
    { label: "Gelar S1", value: formik?.values?.gelar_s1 || "-" },
    { label: "Gelar S2", value: formik?.values?.gelar_s2 || "-" },
    { label: "NIK", value: formik?.values?.nik || "-" },
    {
      label: "Nomor NPWP",
      value: formik?.values?.npwp || "-",
    },
    { label: "Agama", value: formik?.values?.agama || "-" },
  ];
  const informasi_pemohon_right = [
    { label: "Email", value: formik?.values?.email || "-" },
    { label: "Nomor HP", value: formik?.values?.no_hp || "-" },
    { label: "Jenis Kelamin", value: formik?.values?.jenis_kelamin || "-" },
    { label: "Tempat Lahir", value: formik?.values?.tempat_lahir || "-" },
    { label: "Tanggal Lahir", value: formik?.values?.tanggal_lahir || "-" },
    {
      label: "Profesi",
      value: formik?.values?.profesi || "-",
    },
    { label: "Organisasi", value: formik?.values?.agama || "-" },
  ];
  const alamat_kantor_left = [
    { label: "Provinsi", value: formik?.values?.provinsi_kantor_nama || "-" },
    {
      label: "Kabupaten/Kota",
      value: formik?.values?.kabupaten_kantor_nama || "-",
    },
    { label: "Kecamatan", value: formik?.values?.kecamatan_kantor_nama || "-" },
    { label: "Kelurahan", value: formik?.values?.kelurahan_kantor_nama || "-" },
  ];
  const alamat_kantor_right = [
    { label: "RT", value: formik?.values?.rt_kantor || "-" },
    { label: "RW", value: formik?.values?.rw_kantor || "-" },
    { label: "Kode POS", value: formik?.values?.kode_pos_kantor || "-" },
    { label: "Alamat", value: formik?.values?.alamat || "-" },
  ];

  const sertifikat_tanda_lulus = [
    {
      label: "Nomor Sertifikat",
      value: formik?.values?.nomor_sertifikat || "-",
    },
    {
      label: "Tanggal Sertifikat",
      value: formik?.values?.tanggal_sertifikat || "-",
    },
  ];

  const surat_rekomendasi = [
    { label: "Nomor Surat", value: formik?.values?.nomor_surat || "-" },
    { label: "Tanggal Surat", value: formik?.values?.nomor_surat || "-" },
  ];

  const surat_pernyataan = [
    {
      label: "Tanggal Surat pernyataan tidak rangkap jabatan",
      value:
        formik?.values?.tanggal_surat_pernyataan_tidak_rangkap_jabatan || "-",
    },
    {
      label:
        "Tanggal Surat pernyataan bersedia memintakan harta pribadi dengan pemisahan",
      value:
        formik?.values
          ?.tanggal_surat_pernyataan_bersedia_memintakan_harta_pribadi_dengan_pemisahan ||
        "-",
    },
    {
      label:
        "Tanggal surat pernyataan bersedia dihapus dari daftar jika melanggar kode etik atau ketentuan hukum",
      value:
        formik?.values
          ?.tanggal_surat_pernyataan_bersedia_dihapus_dari_daftar_jika_melanggar_kode_etik_atau_ketentuan_hukum ||
        "-",
    },
    {
      label:
        "Tanggal surat pernyataan tidak pernah menjadi Direksi/Komisaris yang menyebabkan perseroan pailit",
      value:
        formik?.values
          ?.tanggal_surat_pernyataan_tidak_pernah_menjadi_direksikomisaris_yang_menyebabkan_perseroan_pailit ||
        "-",
    },
    {
      label:
        "Tanggal surat pernyataan tidak pernah dihukum atas pidana ≥5 tahun dengan putusan tetap",
      value:
        formik?.values
          ?.tanggal_surat_pernyataan_tidak_pernah_dihukum_atas_pidana_5_tahun_dengan_putusan_tetap ||
        "-",
    },
    {
      label:
        "Tanggal surat pernyataan siap menjalankan tugas dengan itikad baik dan bertanggung jawab atas kerugian debitor",
      value:
        formik?.values
          ?.tanggal_surat_pernyataan_siap_menjalankan_tugas_dengan_itikad_baik_dan_bertanggung_jawab_atas_kerugian_debitor ||
        "-",
    },
    {
      label: "Tanggal Surat pernyataan tidak sedang dalam keadaan pailit",
      value:
        formik?.values
          ?.tanggal_surat_pernyataan_tidak_sedang_dalam_keadaan_pailit || "-",
    },
  ];

  const surat_keterangan_sehat = [
    {
      label:
        "Nomor Surat keterangan sehat jasmani dan rohani dari rumah sakit pemerintah",
      value:
        formik?.values
          ?.nomor_surat_keterangan_sehat_jasmani_dan_rohani_dari_rumah_sakit_pemerintah ||
        "-",
    },
    {
      label:
        "Tanggal Surat keterangan sehat jasmani dan rohani dari Rumah Sakit Pemerintah",
      value:
        formik?.values
          ?.nomor_surat_keterangan_sehat_jasmani_dan_rohani_dari_rumah_sakit_pemerintah ||
        "-",
    },
    {
      label: "Rumah Sakit / Puskesmas",
      value: formik?.values?.rumah_sakit || "-",
    },
  ];
  const skck = [
    {
      label: "Nomor Surat",
      value: formik?.values?.nama_lengkap || "-",
    },
    {
      label: "Berlaku SKCK dari Tanggal",
      value: formik?.values?.nik || "-",
    },
  ];
  const ijazah = [
    {
      label:
        "Nomor Ijazah S1 Hukum atau Ekonomi yang sudah dilegalisir perguruan tinggi",
      value:
        formik?.values
          ?.tanggal_ijazah_s1_hukum_atau_ekonomi_yang_sudah_dilegalisir_perguruan_tinggi ||
        "-",
    },
    {
      label:
        "Tanggal Ijazah S1 Hukum atau Ekonomi yang sudah dilegalisir perguruan tinggi",
      value:
        formik?.values
          ?.tanggal_ijazah_s1_hukum_atau_ekonomi_yang_sudah_dilegalisir_perguruan_tinggi ||
        "-",
    },
  ];
  const surat_keterangan_terdaftar = [
    {
      label: "Nomor Surat Keterangan Terdaftar sebagai Advokat/Akuntan Publik",
      value:
        formik?.values?.[
          "nomor_surat_keterangan_terdaftar_sebagai_advokat/akuntan_publik"
        ] || "-",
    },
    {
      label:
        "Tanggal Surat Keterangan Terdaftar sebagai Advokat/Akuntan Publik",
      value:
        formik?.values?.[
          "tanggal_surat_keterangan_terdaftar_sebagai_advokat/akuntan_publik"
        ] || "-",
    },
    {
      label:
        "Tanggal Surat Keterangan Pengalaman Kerja Paling Sedikit 3 tahun  di Kantor Advokat/Konsultan Hukum",
      value:
        formik?.values?.[
          "tanggal_surat_keterangan_pengalaman_kerja_paling_sedikit_3_tahun_di_kantor_advokat/konsultan_hukum"
        ] || "-",
    },
  ];

  const fileFields = [
    {
      key: "surat_permohonan_pendaftaran",
      label:
        "Surat permohonan pendaftaran yang ditujukan kepada Direktur Jenderal",
    },
    {
      key: "ktp",
      label: "Fotokopi Kartu Tanda Penduduk (KTP) yang masih berlaku",
    },
    {
      key: "file_npwp",
      label: "Fotokopi Nomor Pokok Wajib Pajak (NPWP) yang telah dilegalisir",
    },
    {
      key: "sertifikat_kelulusan_ujian_kurator",
      label:
        "Sertifikat kelulusan ujian Kurator dan Pengurus yang dikeluarkan oleh Komite Bersama",
    },
    {
      key: "surat_rekomendasi",
      label:
        "Surat rekomendasi terbaru dari Organisasi Profesi Kurator dan Pengurus",
    },
    {
      key: "surat_pernyataan_tidak_rangkap_jabatan",
      label: "Surat pernyataan tidak merangkap jabatan",
    },
    {
      key: "surat_pernyataan_bersedia_membuka_rekening",
      label:
        "Surat pernyataan bersedia membuka rekening untuk setiap perkara kepailitan atas nama debitur pailit",
    },
    {
      key: "surat_pernyataan_tidak_sedang_dalam_pailit",
      label: "Surat pernyataan tidak sedang dalam keadaan paili",
    },
    {
      key: "surat_pernyataan_tidak_menjadi_direksi",
      label:
        "Surat pernyataan tidak pernah menjadi direksi/komisaris yang menyebabkan pailit",
    },
    {
      key: "surat_pernyataan_tidak_pernah_dihukum",
      label:
        "Surat pernyataan tidak pernah dihukum atas tindak pidana dengan ancaman ≥5 tahun berdasarkan putusan yang berkekuatan hukum tetap",
    },
    {
      key: "surat_pernyataan_tidak_siap_bertanggung_jawab",
      label:
        "Surat pernyataan siap bertanggung jawab atas tugas dan kerugian harta pailit",
    },
    {
      key: "surat_pernyataan_siap_dihapus",
      label: "Surat pernyataan siap dihapus jika melanggar kode etik/peraturan",
    },
    {
      key: "surat_keterangan_sehat",
      label: "Surat keterangan sehat jasmani & rohani dari RS pemerintah",
    },
    { key: "skck", label: "Surat keterangan catatan kepolisian (SKCK)" },
    { key: "pas_foto", label: "Pas foto terbaru 4x6 cm, latar putih" },
    {
      key: "surat_keterangan_terdaftar_advokat",
      label: "Surat keterangan terdaftar sebagai advokat/akuntan publik",
    },
    {
      key: "ijazah_sarjana_hukum",
      label: "Fotokopi ijazah Sarjana Hukum/Ekonomi yang dilegalisir",
    },
  ];

  return (
    <div className="mt-5 mb-3 px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {/* Informasi Pemohon */}
        <Row>
          <Col xs="12">
            <Header label={"Informasi Pemohon"} fontSize="0.8rem" />
          </Col>
          <Col xs="12" md="6">
            <Section data={informasi_pemohon_left} />
          </Col>
          <Col xs="12" md="6">
            <Section data={informasi_pemohon_right} />
          </Col>
        </Row>
        {/* Alamat Kantor */}
        <Row>
          <Col xs="12">
            <Header fontSize="0.8rem" label={"Alamat Kantor"} />
          </Col>
          <Col xs="12" md="6">
            <Section data={alamat_kantor_left} />
          </Col>
          <Col xs="12" md="6">
            <Section data={alamat_kantor_right} />
          </Col>
        </Row>
        {/* Sertifikat Tanda Lulus Ujian Kurator dan Pengurus & Surat Rekomendasi Dari Organisasi Profesi Kurator dan Pengurus */}
        <Row>
          <Col xs="12" md="6">
            <Header
              fontSize="0.8rem"
              label={"Sertifikat Tanda Lulus Ujian Kurator dan Pengurus"}
            />
            <Section data={sertifikat_tanda_lulus} />
          </Col>
          <Col xs="12" md="6">
            <Header
              fontSize="0.8rem"
              label={
                "Surat Rekomendasi Dari Organisasi Profesi Kurator dan Pengurus"
              }
            />
            <Section data={surat_rekomendasi} />
          </Col>
        </Row>
        {/* Surat Pernyataan Jabatan */}
        <Row>
          <Col xs="12">
            <Header fontSize="0.8rem" label={"Surat Pernyataan Jabatan"} />
          </Col>
          <Col xs="12">
            <Section
              data={surat_pernyataan}
              widthLabel="w-75"
              widthValue="w-25"
            />
          </Col>
        </Row>
        {/* Surat Keterangan Sehat & Ijazah Pendidikan */}
        <Row>
          <Col xs="12" md="6">
            <Header fontSize="0.8rem" label={"Surat Keterangan Sehat"} />
            <Section
              data={surat_keterangan_sehat}
              widthLabel="w-75"
              widthValue="w-25"
            />
          </Col>
          <Col xs="12" md="6">
            <Header fontSize="0.8rem" label={"Ijazah Pendidikan"} />
            <Section data={ijazah} widthLabel="w-75" widthValue="w-25" />
          </Col>
        </Row>

        {/* Daftar Dokumen */}
        <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2 }}>
          <Typography fontSize="1rem" fontWeight="bold" mb={2}>
            Daftar Dokumen
          </Typography>

          {fileFields?.map(({ key, label }, index) => {
            const file = formik?.values?.[key];
            if (!file) return null; // Tidak render jika file tidak ada

            return (
              <Accordion
                key={key}
                defaultExpanded={index === 0}
                sx={{
                  borderRadius: 2,
                  mb: 1.5,
                  boxShadow: "none",
                  border: "1px solid #ddd",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontSize="0.9rem" fontWeight={500}>
                    {label}
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12}>
                      <FilePreview file={file} />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Detail;
