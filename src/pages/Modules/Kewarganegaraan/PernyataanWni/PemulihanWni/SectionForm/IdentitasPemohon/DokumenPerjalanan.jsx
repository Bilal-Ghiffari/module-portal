import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DokumenPerjalanSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Dokumen Perjalanan"} />
      <Row>
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Nomor Paspor RI"
            name={"nomorPasporRI"}
            placeholder={"Tulis nomor paspor"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            title="Wilayah Terbit Paspor RI"
            name={"wilayahTerbitPasporRI"}
            placeholder={"Tulis lokasi terbit paspor RI"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor"
            name={"tanggalKedaluarsaPaspor"}
            placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
            type="date"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Nomor Paspor Kebangsaan"
            name={"nomorPasporKebangsaan"}
            placeholder={"Tulis nomor paspor"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Wilayah Terbit Paspor Kebangsaan"
            name={"wilayahTerbitPasporKebangsaan"}
            placeholder={"Tulis lokasi terbit paspor RI"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor Kebangsaan"
            name={"tanggalKedaluarsaPasporKebangsaan"}
            placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default DokumenPerjalanSection;
