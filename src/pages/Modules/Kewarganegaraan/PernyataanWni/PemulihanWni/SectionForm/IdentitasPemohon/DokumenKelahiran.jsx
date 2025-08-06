import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DokumenKelahiranSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Dokumen Kelahiran Anak"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomorAktaAnak"
            title="Nomor akta/Bukti kelahiran"
            placeholder={"Tulis nomor akta"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggalAktaAnak"
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

export default DokumenKelahiranSection;
