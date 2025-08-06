import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { Box } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { FIELD_OPTIONS } from "../../constants/options";
import { useSelector } from "react-redux";

const InformasiAlamatSection = ({ formik }) => {
  const { values } = formik;

  const { provinsi, kotakab, kecamatan, desa, negara } = useSelector(
    (state) => state.master
  );
  return (
    <>
      <FormHeader title={"Informasi Alamat"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_provinsi_pemohon"
              title="Provinsi"
              options={provinsi.data}
              placeholder="Provinsi"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kab_kota_pemohon"
              title="Kabupaten/Kota"
              options={kotakab.data}
              placeholder={"Kabupaten/Kota"}
              isDisabled={!values.id_provinsi_pemohon}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kec_pemohon"
              title="Kecamatan"
              options={kecamatan.data}
              placeholder={"Kecamatan"}
              isDisabled={!values.id_kab_kota_pemohon}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_desa_kel_pemohon"
              title="Kelurahan"
              options={desa.data}
              placeholder={"Kelurahan"}
              isDisabled={!values.id_kec_pemohon}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="4" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="no_telp_pemohon"
              placeholder="Tulis nomor hp aktif"
              title="Nomor HP"
              required
              leftIcon={<BsPlus />}
              type="text"
            />
          </Col>
          <Col xs="12" md="4" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="email_pemohon"
              placeholder="Tulis alamat email aktif"
              title="Email"
              required
            />
          </Col>
          <Col xs="12" md="4" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rt"
              placeholder="RT"
              title="RT"
              maxLength="3"
              required
              type="text"
            />
          </Col>
          <Col xs="12" md="4" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rw"
              placeholder="RW"
              title="RW"
              maxLength="3"
              required
              type="text"
            />
          </Col>
          <Col xs="12" md="4" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="kode_pos"
              placeholder="Kode Pos"
              title="Kode Pos"
              maxLength="5"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamat_pemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat Rumah"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAlamatSection;
