import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauPaspor = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  return (
    <>
      <FormHeaderWithButton
        title="Informasi Paspor Asing"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">
            {RowField("Nomor Paspor", values.no_paspor_asing_pemohon)}
          </Col>
          <Col md="6">
            {RowField(
              "Wilayah Penerbit Paspor",
              values.wilayah_paspor_asing_pemohon_text
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField(
              "Tanggal Expired Paspor",
              formatDateToIndonesian(values.tgl_exp_paspor_asing_pemohon)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauPaspor;
