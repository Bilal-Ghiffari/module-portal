import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauPengangkatan = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  return (
    <>
      <FormHeaderWithButton
        title="Informasi Pengangkatan Anak"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">
            {RowField(
              "Nomor Dokumen Pengangkatan",
              values.no_dok_pengangkatan_anak
            )}
          </Col>
          <Col md="6">
            {RowField(
              "Tanggal Dokumen Pengangkatan",
              formatDateToIndonesian(values.tgl_dok_pengangkatan_anak)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauPengangkatan;
