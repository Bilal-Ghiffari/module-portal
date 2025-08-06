import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauDokPerjalanan = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  return (
    <>
      <FormHeaderWithButton
        title="Dokumen Perjalanan"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col xs="12" md="6">
            {RowField("Nomor Paspor RI", values.no_paspor_ri_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Wilayah Terbit Paspor RI",
              values.wilayah_paspor_ri_pemohon_text
            )}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Tanggal Kedaluwarsa Paspor RI",
              formatDateToIndonesian(values.tgl_exp_paspor_ri_pemohon)
            )}
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            {RowField(
              "Nomor Paspor Kebangsaan",
              values.no_paspor_kebangsaan_pemohon
            )}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Wilayah Terbit Paspor Kebangsaan",
              values.negara_paspor_kebangsaan_pemohon_text
            )}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Tanggal Kedaluwarsa Paspor Kebangsaan",
              formatDateToIndonesian(values.tgl_exp_paspor_kebangsaan_pemohon)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauDokPerjalanan;
