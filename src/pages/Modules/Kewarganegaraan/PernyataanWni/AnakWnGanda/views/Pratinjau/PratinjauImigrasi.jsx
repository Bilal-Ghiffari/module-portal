import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauDokImigrasi = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  return (
    <>
      <FormHeaderWithButton
        title="Dokumen Keimigrasian"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col xs="12" md="6">
            {RowField(
              "Nomor Dokumen Keimigrasian",
              values.no_dok_keimigrasian_pemohon
            )}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Tanggal Dokumen Keimigrasian",
              formatDateToIndonesian(values.tgl_dok_keimigrasian_pemohon)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauDokImigrasi;
