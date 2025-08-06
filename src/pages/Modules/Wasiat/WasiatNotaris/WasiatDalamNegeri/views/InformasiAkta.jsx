import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const FormAktaWasiat = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Akta Wasiat"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="jenis_akta"
            placeholder="Tulis jenis akta"
            title="Jenis Akta"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nomor_akta"
            placeholder="Tulis nomor akta wasiat"
            title="Nomor Akta Wasiat"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tgl_akta"
            placeholder="Tulis tanggal akta"
            title="Tanggal Akta Wasiat"
            type="date"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="no_repertorium"
            placeholder="Tulis nomor Repertorium"
            title="Nomor Repertorium"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormAktaWasiat;
