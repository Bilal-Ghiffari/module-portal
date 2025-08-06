import { FormHeader } from "@/components/Common/FormField";
import { RowField } from "@/pages/Modules/Wasiat/components/Listing";
import { Box } from "@mui/material";
import { Row, Col } from "reactstrap";

const PreviewInformasi = ({ formik }) => {
  const { values } = formik;

  return (
    <>
      {/* Informasi Pemohon */}
      <FormHeader title="Informasi Pemohon" buttonText="Ubah" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3 mb-4">
        <Row>
          <Col md="6">
            {RowField("Nama Lengkap", values.nama_lengkap_pemohon)}
          </Col>
          <Col md="6">{RowField("Nomor HP", values.nomor_hp_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Email", values.email_pemohon)}</Col>
          <Col md="6">{RowField("Alamat", values.alamat_lengkap_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("RT", values.rt_pemohon)}</Col>
          <Col md="6">{RowField("RW", values.rw_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kode Pos", values.kode_pos_pemohon)}</Col>
          <Col md="6">{RowField("Kelurahan", values.kel_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kecamatan", values.kec_pemohon)}</Col>
          <Col md="6">{RowField("Kab/Kota", values.kab_kota_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Provinsi", values.provinsi_pemohon)}</Col>
          <Col md="6"></Col>
        </Row>
      </Box>

      {/* Informasi Almarhum/Almarhumah */}
      <FormHeader title="Informasi Almarhum/Almarhumah" buttonText="Ubah" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3 mb-4">
        <Row>
          <Col md="6">{RowField("Nama Lengkap", values.nama_lengkap_almh)}</Col>
          <Col md="6">{RowField("Alias", values.alias_almh)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Alamat", values.alamat_lengkap_almh)}</Col>
          <Col md="6">{RowField("RT", values.rt_almh)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("RW", values.rw_almh)}</Col>
          <Col md="6">{RowField("Kode Pos", values.kode_pos_almh)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kelurahan", values.kel_almh)}</Col>
          <Col md="6">{RowField("Kecamatan", values.kec_almh)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kab/Kota", values.kab_kota_almh)}</Col>
          <Col md="6">{RowField("Provinsi", values.provinsi_almh)}</Col>
        </Row>
      </Box>

      {/* Informasi Kematian */}
      <FormHeader title="Informasi Kematian" buttonText="Ubah" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3 mb-4">
        <Row>
          <Col md="6">{RowField("Tanggal Kematian", values.tgl_kematian)}</Col>
          <Col md="6">
            {RowField("Tempat Kematian", values.tempat_kematian)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Alamat", values.alamat_lengkap_kematian)}</Col>
          <Col md="6">
            {RowField("Kota Negara", values.kota_negara_kematian)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Negara", values.negara_kematian)}</Col>
          <Col md="6">{RowField("Kab/Kota", values.kab_kota_kematian)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Provinsi", values.provinsi_kematian)}</Col>
          <Col md="6"></Col>
        </Row>
      </Box>

      {/* Informasi Dokumen Kematian */}
      <FormHeader title="Informasi Dokumen Kematian" buttonText="Ubah" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3 mb-4">
        <Row>
          <Col md="6">
            {RowField("Jenis Dokumen", values.jenis_dokumen_kematian)}
          </Col>
          <Col md="6">
            {RowField("Dikeluarkan Oleh", values.dikeluarkan_oleh)}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Nomor Dokumen", values.nomor_dokumen_kematian)}
          </Col>
          <Col md="6">
            {RowField("Tanggal Dokumen", values.tgl_dokumen_kematian)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kelurahan", values.kel_dokumen_kematian)}</Col>
          <Col md="6">{RowField("Kecamatan", values.kec_dokumen_kematian)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Kab/Kota", values.kab_kota_dokumen_kematian)}
          </Col>
          <Col md="6">
            {RowField("Provinsi", values.provinsi_dokumen_kematian)}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PreviewInformasi;
