import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import {
  AGAMA_OPTIONS,
  TEMPAT_TINGGAL_OPTIONS,
} from "../../../Constant/master";

const InformasiAyahSection = ({ formik }) => {
  const perkawinanOptions = [
    { value: "Kawin", label: "Kawin" },
    { value: "Belum Kawin", label: "Belum Kawin" },
    { value: "Cerai Hidup", label: "Cerai Hidup" },
    { value: "Cerai Mati", label: "Cerai Mati" },
  ];
  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Ayah"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapAyah"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="kewarganegaraanAyah"
              placeholder="kewarganegaraan"
              options={countryOptions}
              title="Kewarganegaraan"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="emailAyah"
              title="Email"
              placeholder={"Tulis alamat email aktif"}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="nomorHpAyah"
              title="Nomor HP"
              placeholder={"Tulis nomor handphone aktif"}
              required
              type="number"
              leftIcon={<BsPlus />}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="tempatLahirAyah"
              placeholder="Tulis tempat lahir"
              title="Tempat Lahir"
              options={TEMPAT_TINGGAL_OPTIONS}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tanggalLahirAyah"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamatTinggalAyah"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="statusPerkawinanAyah"
              placeholder="status perkawinan"
              options={perkawinanOptions}
              title="Status Perkawinan"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="agamaAyah"
              placeholder="Agama sesuai identitas"
              options={AGAMA_OPTIONS}
              title="Agama"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAyahSection;
