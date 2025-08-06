import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauAyah = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 3);
  };

  const isDalamNegeri = values.tempat_lahir_ayah === "Dalam Negeri";

  return (
    <>
      <FormHeaderWithButton
        title="Informasi Data Ayah"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">{RowField("Nama Lengkap", values.nama_lengkap_ayah)}</Col>
          <Col md="6">
            {RowField("Status Perkawinan", values.status_kawin_ayah)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Email", values.email_ayah)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Kewarganegaraan Asal", values.kwn_asal_ayah_text)}
          </Col>
          <Col md="6">
            {RowField("Alamat Tinggal", values.alamat_tinggal_ayah)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Tempat Lahir", values.tempat_lahir_ayah)}</Col>
          <Col md="6">
            {RowField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_ayah)
            )}
          </Col>
        </Row>
        <Row>
          {isDalamNegeri ? (
            <>
              <Col md="6">
                {RowField(
                  "Provinsi Tempat Lahir",
                  values.provinsi_lahir_ayah_text
                )}
              </Col>
              <Col md="6">
                {RowField(
                  "Kab/Kota Tempat Lahir",
                  values.kab_kota_lahir_ayah_text
                )}
              </Col>
            </>
          ) : (
            <Col md="6">
              {RowField("Negara Tempat Lahir", values.negara_lahir_ayah_text)}
            </Col>
          )}
        </Row>
      </Box>
    </>
  );
};

export default PratinjauAyah;
