import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const IdentitasPerkawinan = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Dokumen Perkawinan"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            title="Nomor Akta Perkawinan / Buku Nikah / Laporan Kawin"
            name={"no_akta_kawin_pemohon"}
            placeholder={"Tulis nomor akta perkawinan"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            title="Tanggal Akta Perkawinan / Buku Nikah"
            name={"tgl_akta_kawin_pemohon"}
            placeholder={"Masukkan tanggal akta perkawinan"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};
export default IdentitasPerkawinan;
