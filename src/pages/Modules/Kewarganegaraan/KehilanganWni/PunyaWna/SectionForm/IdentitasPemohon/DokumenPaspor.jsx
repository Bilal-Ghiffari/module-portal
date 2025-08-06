import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiDokPaspor = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Paspor"} />
      <Row>
        {/* Paspor RI */}
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Nomor Paspor RI"
            name="nmrPasporRI"
            placeholder="Tulis nomor paspor RI"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            title="Wilayah Terbit Paspor RI"
            name="wlyTerbitPasporRI"
            placeholder="Tulis lokasi terbit paspor RI"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor RI"
            name="tglKedaluarsaPasporRi"
            type="date"
            placeholder="Masukkan tanggal kedaluwarsa paspor RI"
            required
          />
        </Col>
      </Row>

      <Row>
        {/* Paspor Asing */}
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Nomor Paspor Asing"
            name="nmrPasporAsing"
            placeholder="Tulis nomor paspor asing"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            title="Wilayah Terbit Paspor Asing"
            name="wlyTerbitPasporAsing"
            placeholder="Tulis lokasi terbit paspor asing"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="3">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor Asing"
            name="tglKedaluarsaPasporAsing"
            type="date"
            placeholder="Masukkan tanggal kedaluwarsa paspor asing"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiDokPaspor;
