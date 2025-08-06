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
  const tempatTinggal = formik.values.tempatTinggalPemohon;

  useEffect(() => {
    if (tempatTinggal === "Dalam Negeri") {
      formik.setFieldValue("tempatTinggalPemohon", "");
    } else if (tempatTinggal === "Luar Negeri") {
      formik.setFieldValue("provinsiPemohon", "");
      formik.setFieldValue("kabkotPemohon", "");
    }
  }, [tempatTinggal, formik.setFieldValue]);

  return (
    <>
      <FormHeader title={"Informasi Alamat"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="tempatTinggalPemohon"
              title="Tempat tinggal"
              placeholder={"tempat tinggal"}
              options={TEMPAT_TINGGAL_OPTIONS}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="provinsiPemohon"
              placeholder="provinsi domisili saat ini"
              title="Provinsi"
              options={PROVINSI_OPTIONS}
              disabled={tempatTinggal !== "Dalam Negeri"}
              required={tempatTinggal === "Dalam Negeri"}
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="kabkotPemohon"
              placeholder="kabupaten / kota domisili saat ini"
              title="Provinsi"
              options={KABUPATEN_KOTA_OPTIONS}
              disabled={tempatTinggal !== "Dalam Negeri"}
              required={tempatTinggal === "Dalam Negeri"}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="negaraTinggalPemohon"
              title="Negara Tinggal"
              placeholder={"negara tinggal"}
              options={NEGARA_OPTIONS}
              disabled={tempatTinggal !== "Luar Negeri"}
              required={tempatTinggal === "Luar Negeri"}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamatTinggalPemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAlamatSection;
