import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiDokSipil = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Dokumen Sipil"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomorAktaPemohon"
            title="Nomor Akta Lahir / Bukti Kelahiran Pemohon"
            placeholder={"Tulis nomor akta"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggalAktaPemohon"
            title="Tanggal Akta Lahir / Bukti Kelahiran Pemohon"
            placeholder={"Masukkan tanggal akta"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiDokSipil;
