import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col, Row } from "reactstrap";

const FormInformasiPemohon = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Pemohon"} />

      <Row>
        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="nama_lengkap_pemohon"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="nomor_hp_pemohon"
            placeholder="62xxxxxxxxxxx"
            title="Nomor HP"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="email_pemohon"
            placeholder="contoh@email.com"
            title="Email"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="provinsi_pemohon"
            placeholder="Tulis provinsi"
            title="Provinsi"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kab_kota_pemohon"
            placeholder="Tulis kabupaten/kota"
            title="Kabupaten/Kota"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kec_pemohon"
            placeholder="Tulis kecamatan"
            title="Kecamatan"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kel_pemohon"
            placeholder="Tulis kelurahan"
            title="Kelurahan"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="rt_pemohon"
            placeholder="00"
            title="RT"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="rw_pemohon"
            placeholder="00"
            title="RW"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="kode_pos_pemohon"
            placeholder="12345"
            title="Kode Pos"
            required
          />
        </Col>

        <Col md="12" lg="8">
          <FormInput
            formik={formik}
            name="alamat_lengkap_pemohon"
            placeholder="Tulis alamat lengkap"
            title="Alamat Lengkap"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormInformasiPemohon;
