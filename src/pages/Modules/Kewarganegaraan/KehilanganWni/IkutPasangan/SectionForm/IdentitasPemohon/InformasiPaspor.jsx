import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiPasporSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Paspor"} />
      <Row>
        <Col xs="12" md="12" lg="12" xl="4">
          <FormInput
            formik={formik}
            title="Nomor Paspor RI"
            name={"nomorPasporRI"}
            placeholder={"Tulis nomor paspor"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="4">
          <FormInput
            formik={formik}
            title="Wilayah Terbit Paspor RI"
            name={"wilayahTerbitPasporRI"}
            placeholder={"Tulis lokasi terbit paspor RI"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="4">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor RI"
            name={"tanggalKedaluarsaPaspor"}
            placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiPasporSection;
