import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";
import { FormHeaderWithButton } from "@/components/Common/FormField";

const PratinjauAnak = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  return (
    <>
      <FormHeaderWithButton
        title="Informasi Pemohon"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col xs="12" md="6">
            {RowField("Nama Lengkap", values.nama_lengkap_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField("Email", values.email_pemohon)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("Jenis Kelamin", values.jenis_kelamin_pemohon)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("Tempat Lahir", values.tempat_lahir_pemohon_text)}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_pemohon)
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("Tempat Tinggal", values.tempat_tinggal_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField("Alamat Tinggal", values.alamat_tinggal_pemohon)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField(
              "No. Dokumen Pengangkatan Anak",
              values.no_dok_pengangkatan_anak
            )}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Tanggal Dokumen Pengangkatan Anak",
              formatDateToIndonesian(values.tgl_dok_pengangkatan_anak)
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("No. Paspor Asing", values.no_paspor_asing_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Tanggal Exp. Paspor Asing",
              formatDateToIndonesian(values.tgl_exp_paspor_asing_pemohon)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauAnak;
