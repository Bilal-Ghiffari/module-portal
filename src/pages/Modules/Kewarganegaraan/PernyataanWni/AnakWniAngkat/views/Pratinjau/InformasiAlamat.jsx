import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";

const PratinjauAlamat = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  return (
    <>
      <FormHeaderWithButton
        title="Informasi Alamat Pemohon"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">
            {RowField("Tinggal di", values.tempat_tinggal_pemohon)}
          </Col>
          <Col md="6">{RowField("Alamat", values.alamat_tinggal_pemohon)}</Col>
        </Row>
        {values.tempat_tinggal_pemohon === "Dalam Negeri" ? (
          <Row>
            <Col md="6">
              {RowField("Provinsi", values.provinsi_tinggal_pemohon_text)}
            </Col>
            <Col md="6">
              {RowField("Kab/Kota", values.kab_kota_tinggal_pemohon_text)}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md="6">
              {RowField("Negara Tinggal", values.negara_tinggal_pemohon_text)}
            </Col>
          </Row>
        )}
      </Box>
    </>
  );
};

export default PratinjauAlamat;
