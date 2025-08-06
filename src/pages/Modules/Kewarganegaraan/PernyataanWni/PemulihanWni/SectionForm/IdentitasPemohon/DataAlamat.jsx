import { useEffect } from "react";
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
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DataAlamatSection = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const isDalamNegeri = values.tempatTinggalPemohon === "Dalam Negeri";

  useEffect(() => {
    if (values.tempatTinggalPemohon === "Dalam Negeri") {
      setFieldValue("negaraTinggalPemohon", "");
      setFieldValue("provinsi", "");
      setFieldValue("kabupatenKota", "");
    } else if (values.tempatTinggalPemohon === "Luar Negeri") {
      setFieldValue("negaraTinggalPemohon", "");
      setFieldValue("provinsi", "");
      setFieldValue("kabupatenKota", "");
    }
  }, [values.tempatTinggalPemohon, setFieldValue]);
  return (
    <>
      <FormHeader title={"Data Alamat"} />
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
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="negaraTinggalPemohon"
              title="Negara Tinggal"
              placeholder={"negara tinggal"}
              options={NEGARA_OPTIONS}
              required
              disabled={isDalamNegeri}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorHandphonePemohon"
              title="Nomor HP"
              placeholder={"Tulis nomor handphone aktif"}
              type="tel"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorTeleponPemohon"
              title="Nomor Telepon Rumah"
              type="tel"
              placeholder={"Tulis nomor telepon"}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="provinsi"
              title="Provinsi"
              placeholder={"provinsi domisili"}
              options={PROVINSI_OPTIONS}
              disabled={!isDalamNegeri}
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="kabkot"
              title="Kabupaten/Kota"
              placeholder={"kabupaten/kota domisili"}
              options={KABUPATEN_KOTA_OPTIONS}
              disabled={!isDalamNegeri}
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormInput
              formik={formik}
              name="emailPemohon"
              placeholder="Tulis alamat email aktif"
              title="Email"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="12">
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

export default DataAlamatSection;
