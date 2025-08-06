import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const FormInformasiDokumen = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Dokumen Kematian"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="jenis_dokumen_kematian"
            placeholder="Tulis jenis dokumen"
            title="Jenis Dokumen kematian"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="dikeluarkan_oleh"
            placeholder="Tulis pengeluaran"
            title="Dikeluarkan Oleh"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nomor_dokumen_kematian"
            placeholder="Tulis nomor dokumen kematian"
            title="Nomor Dokumen Kematian"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tgl_dokumen_kematian"
            placeholder="Tulis tanggal dokumen kematian"
            title="Tanggal Dokumen Kematian"
            type="date"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="provinsi_dokumen_kematian"
            placeholder="provinsi dokumen"
            title="Provinsi Dokumen Kematian"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="kab_kota_dokumen_kematian"
            placeholder="Kab/Kota dokumen"
            title="Kab/Kota Dokumen Kematian"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="kec_dokumen_kematian"
            placeholder="kecamatan dokumen"
            title="Kecamatan Dokumen Kematian"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="kel_dokumen_kematian"
            placeholder="kelurahan dokumen"
            title="Kelurahan Dokumen Kematian"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormInformasiDokumen;
