import { FormHeader } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "../../../components/Listing";
import LineDashed from "@/components/Common/Line/Dashed";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauPemohon = ({ formik }) => {
  const { values } = formik;

  return (
    <>
      <FormHeader title="Informasi Pemohon" buttonText="Ubah" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        {/* Informasi Pribadi */}
        <Row>
          <Col md="6">
            {RowField("Nama Lengkap", values.nama_lengkap_pemohon)}
          </Col>
          <Col md="6">
            {RowField(
              "Kewarganegaraan",
              values.kewarganegaraan_asal_pemohon_text
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Tempat Lahir", values.negara_lahir_pemohon_text)}
          </Col>
          <Col md="6">
            {RowField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_pemohon)
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Jenis Kelamin", values.jenis_kelamin_pemohon)}
          </Col>
          <Col md="6">{RowField("Agama", values.agama_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Pekerjaan", values.pekerjaan_pemohon_text)}
          </Col>
        </Row>

        <LineDashed />

        {/* Informasi Alamat */}
        <Row>
          <Col md="6">{RowField("Provinsi", values.provinsi_pemohon_text)}</Col>
          <Col md="6">
            {RowField("Kabupaten/Kota", values.kab_kota_pemohon_text)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kecamatan", values.kec_pemohon_text)}</Col>
          <Col md="6">
            {RowField("Kelurahan", values.desa_kel_pemohon_text)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Nomor HP", values.no_telp_pemohon)}</Col>
          <Col md="6">{RowField("Email", values.email_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("RT", values.rt)}</Col>
          <Col md="6">{RowField("RW", values.rw)}</Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Kode Pos", values.kode_pos)}</Col>
          <Col md="6">{RowField("Alamat Rumah", values.alamat_pemohon)}</Col>
        </Row>

        <LineDashed />

        {/* Informasi Pernikahan */}
        <Row>
          <Col md="6">{RowField("Status Perkawinan", values.status_kawin)}</Col>
          <Col md="6">
            {RowField(
              "Tanggal Pernikahan",
              formatDateToIndonesian(values.tgl_kawin)
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Nomor Buku Nikah", values.no_buku_nikah)}</Col>
          <Col md="6">{RowField("Nomor SKIM", values.no_skim)}</Col>
        </Row>

        {/* Tempat Tinggal */}
        <Row>
          <Col md="6"></Col>
          <Col md="6">{RowField("Alamat Tinggal", values.alamat_pemohon)}</Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauPemohon;
