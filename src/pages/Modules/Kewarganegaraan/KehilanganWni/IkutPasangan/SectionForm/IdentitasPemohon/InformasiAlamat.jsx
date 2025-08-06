import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { NEGARA_OPTIONS } from "../../../Constant/master";

const DataAlamatSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Alamat"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="4">
            <FormInput
              formik={formik}
              name="alamatTglIndoPemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat Tempat Tinggal di Indonesia"
              type="textarea"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="4">
            <FormInput
              formik={formik}
              name="alamatTglAsgPemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat Tempat Tinggal di Luar Negri"
              type="textarea"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="4">
            <FormSelect
              formik={formik}
              name="negaraPemohon"
              placeholder="Pilih negara"
              options={NEGARA_OPTIONS}
              title="Negara"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default DataAlamatSection;
