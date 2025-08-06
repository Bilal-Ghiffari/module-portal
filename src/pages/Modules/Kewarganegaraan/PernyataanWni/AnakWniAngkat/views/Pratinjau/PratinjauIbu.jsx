import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const PratinjauInformasiIbu = ({ formik, setActiveStep }) => {
  const { values } = formik;

  const handleChange = () => {
    setActiveStep((prev) => prev - 3);
  };

  const isDalamNegeri = values.tempat_lahir_ibu === "Dalam Negeri";

  return (
    <>
      <FormHeaderWithButton
        title="Informasi Data Ibu"
        buttonText="Ubah"
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col md="6">{RowField("Nama Lengkap", values.nama_lengkap_ibu)}</Col>
          <Col md="6">
            {RowField("Status Perkawinan", values.status_kawin_ibu)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Email", values.email_ibu)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {RowField("Kewarganegaraan Asal", values.kwn_asal_ibu_text)}
          </Col>
          <Col md="6">
            {RowField("Alamat Tinggal", values.alamat_tinggal_ibu)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{RowField("Tempat Lahir", values.tempat_lahir_ibu)}</Col>
          <Col md="6">
            {RowField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_ibu)
            )}
          </Col>
        </Row>
        <Row>
          {isDalamNegeri ? (
            <>
              <Col md="6">
                {RowField(
                  "Provinsi Tempat Lahir",
                  values.provinsi_lahir_ibu_text
                )}
              </Col>
              <Col md="6">
                {RowField(
                  "Kab/Kota Tempat Lahir",
                  values.kab_kota_lahir_ibu_text
                )}
              </Col>
            </>
          ) : (
            <Col md="6">
              {RowField("Negara Tempat Lahir", values.negara_lahir_ibu_text)}
            </Col>
          )}
        </Row>
      </Box>
    </>
  );
};

export default PratinjauInformasiIbu;
