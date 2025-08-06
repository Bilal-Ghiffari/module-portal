import { Col } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { BsPlus } from "react-icons/bs";

const PasanganSection = ({ formik }) => {
  return (
    <>
      <Col>
        <FormHeader title={"Informasi Data Pasangan WNI"} />
        <Box className="form-horizontal">
          <Row>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="namaLenkapPasangan"
                placeholder="Tulis nama lengkap"
                title="Nama Lengkap"
                readonly={true}
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="nikPasangan"
                title="NIK"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="nomorHpPasangan"
                title="Nomor HP"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="emailPasangan"
                title="Email"
                readonly={true}
                placeholder="!"
              />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="tanggalLahirPasangan"
                title="Tanggal Lahir"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="pekerjaanPasangan"
                title="Pekerjaan"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="kewarganegaraanPasangan"
                title="kewarganegaraan"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="jenisKelaminPasangan"
                title="Jenis Kelamin"
                readonly={true}
                placeholder="!"
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="agamaPasangan"
                title="Agama Pasangan"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="negaraLahirPasangan"
                title="Negara"
                readonly={true}
                placeholder="!"
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="kabupatenPasangan"
                title="kabupaten/Kota"
                readonly={true}
                placeholder="!"
              />
            </Col>
            <Col xs="12" md="12" lg="6" xl="3">
              <FormInput
                formik={formik}
                name="provinsiPasangan"
                title="Provinsi"
                readonly={true}
                placeholder="!"
              />
            </Col>
          </Row>
        </Box>
      </Col>
    </>
  );
};

export default PasanganSection;
