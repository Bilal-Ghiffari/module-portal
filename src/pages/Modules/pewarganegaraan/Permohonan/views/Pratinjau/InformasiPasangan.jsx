import { FormHeader } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row, Col } from "reactstrap";
import { RowField } from "../../../components/Listing";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauPasangan = ({ formik }) => {
  const { values } = formik;

  return (
    <>
      <FormHeader title="Informasi Pasangan" buttonText="Ubah" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">{RowField("Nama Lengkap", values.nama_pasangan)}</Col>
          <Col md="6">{RowField("NIK", values.nik_pasangan)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Jenis Kelamin", values.jenis_kelamin_pasangan)}
          </Col>
          <Col md="6">{RowField("Agama", values.agama_pasangan)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_pasangan)
            )}
          </Col>
          <Col md="6">
            {RowField("Kewarganegaraan", values.kewarganegaraan_pasangan_text)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Nomor HP", values.no_telp_pasangan)}</Col>
          <Col md="6">{RowField("Email", values.email_pasangan)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Tempat Lahir", values.tempat_lahir_pasangan)}
          </Col>
          <Col md="6">
            {RowField("Pekerjaan", values.pekerjaan_pasangan_text)}
          </Col>
        </Row>
        {/* Tempat lahir berdasarkan pilihan */}
        <Row>
          <Col md="6">
            {RowField("Provinsi Lahir", values.provinsi_lahir_pasangan_text)}
          </Col>
          <Col md="6">
            {RowField("Kab/Kota Lahir", values.kab_kota_lahir_pasangan_text)}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Negara Lahir", values.negara_lahir_pasangan_text)}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauPasangan;
