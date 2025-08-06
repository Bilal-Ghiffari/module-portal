import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DataAnakSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Data Anak"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapAnak"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>

          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="emailAnak"
              title="Email"
              placeholder={"Tulis alamat email aktif"}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tempatLahirAnak"
              placeholder="Tulis tempat lahir"
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tanggalLahirAnak"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamatTinggalAnak"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default DataAnakSection;
