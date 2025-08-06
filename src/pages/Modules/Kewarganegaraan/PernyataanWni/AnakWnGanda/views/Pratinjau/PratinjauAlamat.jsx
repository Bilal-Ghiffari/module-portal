import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";

const PratinjauAlamat = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 4);
  };

  const isDalamNegeri = values.tempat_tinggal_pemohon === "Dalam Negeri";
  return (
    <>
      <FormHeaderWithButton
        title="Data Alamat Pemohon"
        buttonText={"Ubah"}
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col xs="12" md="6">
            {RowField("Tempat Tinggal", values.tempat_tinggal_pemohon)}
          </Col>
          {isDalamNegeri ? (
            <>
              <Col xs="12" md="6">
                {RowField("Provinsi Tinggal", values.prov_tinggal_pemohon_text)}
              </Col>
              <Col xs="12" md="6">
                {RowField(
                  "Kab/Kota Tinggal",
                  values.kab_kota_tinggal_pemohon_text
                )}
              </Col>
            </>
          ) : (
            <Col xs="12" md="6">
              {RowField("Negara Tinggal", values.negara_tinggal_pemohon_text)}
            </Col>
          )}
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("Alamat Tinggal", values.alamat_tinggal_pemohon)}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauAlamat;
