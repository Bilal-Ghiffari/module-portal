import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DokumenSipilSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Dokumen Sipil"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomorAktaLahir"
            title="Nomor Akta Lahir / Bukti Kelahiran Pemohon"
            placeholder={"Tulis nomor akta"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggalAktaLahir"
            title="Tanggal Akta Lahir / Bukti Kelahiran Pemohon"
            placeholder={"Masukkan tanggal akta"}
            type="date"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomorAktaPerkawinan"
            title="Nomor Akta Perkawinan / Buku Nikah / Laporan Kawin"
            placeholder={"Tulis nomor akta perkawinan"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggalAktaPerkawinan"
            title="Tanggal Akta Perkawinan / Buku Nikah"
            placeholder={"Masukkan tanggal akta perkawinan"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default DokumenSipilSection;
