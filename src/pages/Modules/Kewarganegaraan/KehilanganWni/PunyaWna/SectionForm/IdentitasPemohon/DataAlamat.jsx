import {
  KABUPATEN_KOTA_OPTIONS,
  NEGARA_OPTIONS,
  PROVINSI_OPTIONS,
  TEMPAT_TINGGAL_OPTIONS,
} from "../../../Constant/master";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiAlamatSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Alamat"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="tempatTglIndoPemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal Indonesia"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="tempatTglLnPemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal Luar Negeri"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>

          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="negaraPemohon"
              title="Negara Tinggal"
              placeholder={"negara tinggal"}
              options={NEGARA_OPTIONS}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAlamatSection;
