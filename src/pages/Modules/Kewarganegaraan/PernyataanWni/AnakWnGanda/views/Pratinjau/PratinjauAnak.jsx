import { Box, Typography } from "@mui/material";
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
        buttonText={"Ubah"}
        onButtonClick={handleChange}
      />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <Row>
          <Col xs="12" md="6">
            {RowField("Nama Lengkap", values.nama_lengkap_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField("NIK/NIT", values.nik_pemohon)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("No HP", values.no_hp_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField("No Telepon Rumah", values.no_telp_pemohon)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField(
              "Jenis Kelamin",
              values.jenis_kelamin_pemohon?.label ||
                values.jenis_kelamin_pemohon
            )}
          </Col>
          <Col xs="12" md="6">
            {RowField(
              "Status Perkawinan",
              values.status_kawin_pemohon?.label || values.status_kawin_pemohon
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("Email", values.email_pemohon)}
          </Col>
          <Col xs="12" md="6">
            {RowField("Pekerjaan", values.pekerjaan_pemohon_text)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            {RowField("Tempat Lahir", values.tempat_lahir_pemohon)}
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
            {RowField("Kewarganegaraan Kelahiran", "Indonesia")}
          </Col>
          <Col xs="12" md="6">
            {RowField("Kewarganegaraan Asing", values.kwn_asing_pemohon_text)}
          </Col>
        </Row>

        {values.tempat_lahir_pemohon === "Dalam Negeri" ? (
          <Row>
            <Col xs="12" md="6">
              {RowField(
                "Provinsi Kelahiran",
                values.provinsi_lahir_pemohon_text
              )}
            </Col>
            <Col xs="12" md="6">
              {RowField(
                "Kab/Kota Kelahiran",
                values.kab_kota_lahir_pemohon_text
              )}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs="12" md="6">
              {RowField("Negara Kelahiran", values.negara_lahir_pemohon_text)}
            </Col>
          </Row>
        )}
      </Box>
    </>
  );
};

export default PratinjauAnak;
