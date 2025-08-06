import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "../../../../Fidusia/Header";
const InformasiDokumen = ({ formik, disabled }) => {
  return (
    <>
      {/* Informasi Dokumen Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Informasi Dokumen"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Sertifikat"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Sertifikat"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Surat Rekomendasi Dari Organisasi Profesi Kurator dan Pengurus Section */}
      <Row>
        <Col xs="12" md="12">
          <Header
            label={
              "Surat Rekomendasi Dari Organisasi Profesi Kurator dan Pengurus"
            }
            disabled={disabled}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Surat"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Surat Pernyataan Jabatan Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Surat Pernyataan Jabatan"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat pernyataan tidak rangkap jabatan"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat pernyataan bersedia memintakan harta pribadi dengan pemisahan"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal surat pernyataan bersedia dihapus dari daftar jika melanggar kode etik atau ketentuan hukum"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal surat pernyataan tidak pernah menjadi Direksi/Komisaris yang menyebabkan perseroan pailit"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal surat pernyataan tidak pernah dihukum atas pidana ≥5 tahun dengan putusan tetap"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal surat pernyataan siap menjalankan tugas dengan itikad baik dan bertanggung jawab atas kerugian debitor"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat pernyataan tidak sedang dalam keadaan pailit"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Surat Keterangan Sehat Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Surat Keterangan Sehat"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder=" Nomor Surat keterangan sehat jasmani dan rohani dari rumah sakit pemerintah"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat keterangan sehat jasmani dan rohani dari Rumah Sakit Pemerintah"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            name={"rumah_sakit"}
            type="text"
            placeholder="Rumah Sakit / Puskesmas"
            readonly={disabled}
            required
          />
        </Col>
      </Row>
      {/* Ijazah Pendidikan Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Ijazah Pendidikan"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Ijazah S1 Hukum atau Ekonomi yang sudah dilegalisir perguruan tinggi"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Ijazah S1 Hukum atau Ekonomi yang sudah dilegalisir perguruan tinggi"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Surat Keterangan Terdaftar sebagai Advokat/Akuntan Publik Section */}
      <Row>
        <Col xs="12" md="12">
          <Header
            label={"Surat Keterangan Terdaftar sebagai Advokat/Akuntan Publik"}
            disabled={disabled}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Surat Keterangan Terdaftar sebagai Advokat/Akuntan Publik"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat Keterangan Terdaftar sebagai Advokat/Akuntan Publik"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Surat Keterangan Pengalaman Kerja Paling Sedikit 3 tahun di Kantor Advokat/Konsultan Hukum"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiDokumen;
