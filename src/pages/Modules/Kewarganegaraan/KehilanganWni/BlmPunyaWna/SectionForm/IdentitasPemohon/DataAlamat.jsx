import {
  KABUPATEN_KOTA_OPTIONS,
  KECAMATAN_OPTIONS,
  KELURAHAN_OPTIONS,
  PROVINSI_OPTIONS,
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
              name="alamatRumah"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat Rumah"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="provinsiPemohon"
              placeholder={"provinsi"}
              title="Provinsi"
              options={PROVINSI_OPTIONS}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="kabkotPemohon"
              title="Kabupaten/Kota"
              options={KABUPATEN_KOTA_OPTIONS}
              placeholder={"Kabupaten/Kota"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="kecPemohon"
              title="Kecamatan"
              options={KECAMATAN_OPTIONS}
              placeholder={"Kecamatan"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="kelPemohon"
              title="Kelurahan"
              options={KELURAHAN_OPTIONS}
              placeholder={"Kelurahan"}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="4" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rtPemohon"
              placeholder="RT"
              title="RT"
              maxLength="3"
              required
            />
          </Col>
          <Col xs="12" md="4" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rwPemohon"
              placeholder="RW"
              title="RW"
              maxLength="3"
              required
            />
          </Col>
          <Col xs="12" md="4" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="kodePosPemohon"
              placeholder="Kode Pos"
              title="Kode Pos"
              maxLength="5"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAlamatSection;
