import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const FormLokasiPengadilanWasiat = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Lokasi & Pengadilan"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="negara_pembuatan"
            placeholder="Tulis negara pembuatan"
            title="Dibuat di Negara"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="kota_pembuatan"
            placeholder="Tulis kota pembuatan"
            title="Kota"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="kota_kantor_perwakilan"
            placeholder="Tulis kantor perwakilan"
            title="Kota Kantor Perwakilan Indonesia"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nama_kantor_perwakilan"
            placeholder="Tulis nama kantor perwakilan"
            title="Nama Kantor Perwakilan Indonesia"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nomor_penetapan_pengadilan"
            placeholder="Tulis nomor penetapan"
            title="Nomor Penetapan Pengadilan"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tanggal_penetapan_pengadilan"
            placeholder="tanggal penetapan"
            title="Tanggal Penetapan Pengadilan"
            type="date"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggal_pengesahan_perwakilan"
            placeholder="tanggal pengesahan"
            title="Tanggal Pengesahan dari kantor perwakilan RI"
            type="date"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nama_pemohon_pengadilan"
            placeholder="Tulis nama pemohon"
            title="Nama Pemohon Penetapan Pengadilan"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nama_pengadilan_negeri"
            placeholder="Tulis nama pengadilan"
            title="Nama Pengadilan Negeri"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormLokasiPengadilanWasiat;
