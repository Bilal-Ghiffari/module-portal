import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const FormAlamatPemberi = ({ formik }) => {
  const { provinsi, kotakab, kecamatan, desa } = useSelector(
    (state) => state.master
  );
  const { values } = formik;

  return (
    <>
      <FormHeader title={"Informasi Alamat Pemberi Wasiat"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name="id_provinsi_pemberi"
            placeholder="provinsi"
            title="Provinsi"
            required
            options={provinsi.data}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name="id_kab_kota_pemberi"
            placeholder="Kab/Kota"
            title="Kab/Kota"
            required
            options={kotakab.data}
            isDisabled={!values.id_provinsi_pemberi}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name="id_kec_pemberi"
            placeholder="Kecamatan"
            title="Kecamatan"
            required
            options={kecamatan.data}
            isDisabled={!values.id_kab_kota_pemberi}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name="id_kel_pemberi"
            placeholder="kelurahan"
            title="Kelurahan"
            required
            options={desa.data}
            isDisabled={!values.id_kec_pemberi}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="no_hp_pemberi"
            placeholder="Tulis nomor handphone"
            title="No HP"
            required
            leftIcon={<BsPlus />}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="email_pemberi"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="rt_pemberi"
            placeholder="RT"
            title="RT"
            type="number"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="rw_pemberi"
            placeholder="RW"
            title="RW"
            type="number"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="kode_pos_pemberi"
            placeholder="Kode Pos"
            title="Kode Pos"
            type="number"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            name="alamat_pemberi"
            placeholder="Alamat Lengkap"
            title="Alamat Lengkap"
            required
            type="textarea"
          />
        </Col>
      </Row>
    </>
  );
};

export default FormAlamatPemberi;
