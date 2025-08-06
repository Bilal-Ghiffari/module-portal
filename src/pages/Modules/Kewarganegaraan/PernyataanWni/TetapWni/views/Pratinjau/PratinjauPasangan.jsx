import { FormHeader } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { Box } from "@mui/material";
import { Row, Col } from "reactstrap";

const PratinjauFormPasangan = ({ formik }) => {
  const { values } = formik;

  const previewField = (label, value) => RowField(label, value || "-");

  return (
    <>
      <FormHeader title="Informasi Pasangan" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">
            {previewField("Nama Lengkap", values.nama_lengkap_pasangan)}
          </Col>
          <Col md="6">
            {previewField(
              "Kewarganegaraan",
              values.kewarganegaraan_pasangan_text
            )}
          </Col>
        </Row>

        <Row>
          <Col md="6">{previewField("Email", values.email_pasangan)}</Col>
          <Col md="6">{previewField("Nomor HP", values.no_hp_pasangan)}</Col>
        </Row>

        <Row>
          <Col md="6">
            {previewField(
              "Negara Tempat Lahir",
              values.negara_lahir_pasangan_text
            )}
          </Col>
          <Col md="6">
            {previewField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_pasangan)
            )}
          </Col>
        </Row>

        <Row>
          <Col md="6">
            {previewField("Alamat Tinggal", values.alamat_tinggal_pasangan)}
          </Col>
        </Row>

        <Row>
          <Col md="6">
            {previewField("Status Perkawinan", values.status_kawin_pasangan)}
          </Col>
          <Col md="6">{previewField("Agama", values.agama_pasangan)}</Col>
        </Row>

        <Row>
          <Col md="6">
            {previewField(
              "Nomor Paspor Asing",
              values.no_paspor_asing_pasangan
            )}
          </Col>
          <Col md="6">
            {previewField(
              "Tanggal Kedaluarsa Paspor",
              formatDateToIndonesian(values.tgl_exp_paspor_asing_pasangan)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauFormPasangan;
