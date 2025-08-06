import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiDokPerkawinan = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Dokumen Perkawinan"} />
      <Row>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            title="Nomor Akta Perkawinan / Buku Nikah / Laporan Kawin"
            name={"nomorAktaPerkawinan"}
            placeholder={"Tulis nomor akta nikah"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            title="Tanggal Akta Perkawinan / Buku Nikah"
            name={"tanggalAktaPerkawinan"}
            placeholder={"Masukkan Tanggal Akta Perkawinan / Buku Nikah"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiDokPerkawinan;
