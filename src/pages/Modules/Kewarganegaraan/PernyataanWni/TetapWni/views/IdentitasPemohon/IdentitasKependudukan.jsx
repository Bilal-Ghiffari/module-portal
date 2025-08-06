import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const IdentitasKependudukan = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Dokumen Kependudukan"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="no_akta_lahir_pemohon"
            title="Nomor akta/Bukti kelahiran"
            placeholder={"Tulis nomor akta"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tgl_akta_lahir_pemohon"
            title="Tanggal akta/Bukti kelahiran"
            placeholder={"Masukkan tanggal akta"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default IdentitasKependudukan;
