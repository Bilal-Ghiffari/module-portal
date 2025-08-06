import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col, Row } from "reactstrap";

const FormInformasiAlmarhum = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Almarhum / Almarhumah"} />

      <Row>
        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="nama_lengkap_almh"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="alias_almh"
            placeholder="Tulis nama alias"
            title="Alias"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="provinsi_almh"
            placeholder="Tulis provinsi"
            title="Provinsi"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kab_kota_almh"
            placeholder="Tulis kabupaten/kota"
            title="Kabupaten/Kota"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kec_almh"
            placeholder="Tulis kecamatan"
            title="Kecamatan"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kel_almh"
            placeholder="Tulis kelurahan"
            title="Kelurahan"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="rt_almh"
            placeholder="00"
            title="RT"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="rw_almh"
            placeholder="00"
            title="RW"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kode_pos_almh"
            placeholder="12345"
            title="Kode Pos"
            required
          />
        </Col>

        <Col md="12">
          <FormInput
            formik={formik}
            name="alamat_lengkap_almh"
            placeholder="Tulis alamat lengkap"
            title="Alamat Lengkap"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormInformasiAlmarhum;
