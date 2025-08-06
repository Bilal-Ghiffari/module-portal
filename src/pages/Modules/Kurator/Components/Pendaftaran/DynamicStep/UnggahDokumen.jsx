import { Col, Row } from "reactstrap";
import Header from "../../../../Fidusia/Header";
import FileUploadComponent from "@/components/Common/UploadFile";
import Checked from "@/components/Common/Checked";

const UnggahDokumen = ({ formik, disabled }) => {
  return (
    <>
      {/* Unggah Dokumen Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Unggah Dokumen"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat permohonan pendaftaran yang ditujukan kepada Direktur Jenderal"
            text="Pilih file Anda"
            name="surat_permohonan_pendaftaran"
            resFile={(file) =>
              formik.setFieldValue("surat_permohonan_pendaftaran", file)
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_permohonan_pendaftaran}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Fotokopi Kartu Tanda Penduduk (KTP) yang masih berlaku"
            text="Pilih file Anda"
            name="ktp"
            resFile={(file) => formik.setFieldValue("ktp", file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.ktp}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Fotokopi Nomor Pokok Wajib Pajak (NPWP) yang telah dilegalisir"
            text="Pilih file Anda"
            name="file_npwp"
            resFile={(file) => formik.setFieldValue("file_npwp", file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.file_npwp}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Sertifikat kelulusan ujian Kurator dan Pengurus yang dikeluarkan oleh Komite Bersama"
            text="Pilih file Anda"
            name="sertifikat_kelulusan_ujian_kurator"
            resFile={(file) =>
              formik.setFieldValue("sertifikat_kelulusan_ujian_kurator", file)
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.sertifikat_kelulusan_ujian_kurator}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat rekomendasi terbaru dari Organisasi Profesi Kurator dan Pengurus"
            text="Pilih file Anda"
            name="surat_rekomendasi"
            resFile={(file) => formik.setFieldValue("surat_rekomendasi", file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_rekomendasi}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan tidak merangkap jabatan"
            text="Pilih file Anda"
            name="surat_pernyataan_tidak_rangkap_jabatan"
            resFile={(file) =>
              formik.setFieldValue(
                "surat_pernyataan_tidak_rangkap_jabatan",
                file
              )
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_pernyataan_tidak_rangkap_jabatan}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan bersedia membuka rekening untuk setiap perkara kepailitan atas nama debitur pailit"
            text="Pilih file Anda"
            name="surat_pernyataan_bersedia_membuka_rekening"
            resFile={(file) =>
              formik.setFieldValue(
                "surat_pernyataan_bersedia_membuka_rekening",
                file
              )
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={
              formik.values.surat_pernyataan_bersedia_membuka_rekening
            }
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan tidak sedang dalam keadaan pailit"
            text="Pilih file Anda"
            name="surat_pernyataan_tidak_sedang_dalam_pailit"
            resFile={(file) =>
              formik.setFieldValue(
                "surat_pernyataan_tidak_sedang_dalam_pailit",
                file
              )
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={
              formik.values.surat_pernyataan_tidak_sedang_dalam_pailit
            }
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan tidak pernah menjadi direksi/komisaris yang menyebabkan pailit"
            text="Pilih file Anda"
            name="surat_pernyataan_tidak_menjadi_direksi"
            resFile={(file) =>
              formik.setFieldValue(
                "surat_pernyataan_tidak_menjadi_direksi",
                file
              )
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_pernyataan_tidak_menjadi_direksi}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan tidak pernah dihukum atas tindak pidana dengan ancaman ≥5 tahun berdasarkan putusan yang berkekuatan hukum tetap"
            text="Pilih file Anda"
            name="surat_pernyataan_tidak_pernah_dihukum"
            resFile={(file) =>
              formik.setFieldValue(
                "surat_pernyataan_tidak_pernah_dihukum",
                file
              )
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_pernyataan_tidak_pernah_dihukum}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan siap bertanggung jawab atas tugas dan kerugian harta pailit"
            text="Pilih file Anda"
            name="surat_pernyataan_tidak_siap_bertanggung_jawab"
            resFile={(file) =>
              formik.setFieldValue(
                "surat_pernyataan_tidak_siap_bertanggung_jawab",
                file
              )
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={
              formik.values.surat_pernyataan_tidak_siap_bertanggung_jawab
            }
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat pernyataan siap dihapus jika melanggar kode etik/peraturan"
            text="Pilih file Anda"
            name="surat_pernyataan_siap_dihapus"
            resFile={(file) =>
              formik.setFieldValue("surat_pernyataan_siap_dihapus", file)
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_pernyataan_siap_dihapus}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat keterangan sehat jasmani & rohani dari RS pemerintah"
            text="Pilih file Anda"
            name="surat_keterangan_sehat"
            resFile={(file) =>
              formik.setFieldValue("surat_keterangan_sehat", file)
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_keterangan_sehat}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat keterangan catatan kepolisian (SKCK)"
            text="Pilih file Anda"
            name="skck"
            resFile={(file) => formik.setFieldValue("skck", file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.skck}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Pas foto terbaru 4x6 cm, latar putih"
            text="Pilih file Anda"
            name="pas_foto"
            resFile={(file) => formik.setFieldValue("pas_foto", file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.pas_foto}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat keterangan terdaftar sebagai advokat/akuntan publik"
            text="Pilih file Anda"
            name="surat_keterangan_terdaftar_advokat"
            resFile={(file) =>
              formik.setFieldValue("surat_keterangan_terdaftar_advokat", file)
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.surat_keterangan_terdaftar_advokat}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Fotokopi ijazah Sarjana Hukum/Ekonomi yang dilegalisir"
            text="Pilih file Anda"
            name="ijazah_sarjana_hukum"
            resFile={(file) =>
              formik.setFieldValue("ijazah_sarjana_hukum", file)
            }
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.ijazah_sarjana_hukum}
          />
        </Col>
        <Col xs="12" className="px-4">
          <Checked
            label={`Saya bertanggung jawab penuh terhadap kebenaran dokumen persyaratan yang disampaikan`}
            value="1"
            fieldName={`rules_1`}
            formik={formik}
          />
        </Col>
      </Row>
    </>
  );
};

export default UnggahDokumen;
