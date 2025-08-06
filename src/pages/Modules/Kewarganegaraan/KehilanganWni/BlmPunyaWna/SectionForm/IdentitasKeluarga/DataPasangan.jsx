import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { AGAMA_OPTIONS } from "../../../Constant/master";

const InformasiPasanganSection = ({ formik }) => {
  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Pasangan"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapPasangan"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="kewarganegaraanPasangan"
              placeholder="kewarganegaraan"
              options={countryOptions}
              title="Kewarganegaraan"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="emailPasangan"
              title="Email"
              placeholder={"Tulis alamat email aktif"}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="nomorHpPasangan"
              title="Nomor HP"
              required
              type="number"
              leftIcon={<BsPlus />}
              placeholder={"Tulis nomor handphone aktif"}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tempatLahirPasangan"
              placeholder="Tulis tempat lahir"
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tanggalLahirPasangan"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamatTinggalPasangan"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="statusPerkawinanPasangan"
              placeholder="status perkawinan"
              title="Status Perkawinan"
              value={formik.values.statusPerkawinanPasangan || "Kawin"}
              readonly
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="agamaPasangan"
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

export default InformasiPasanganSection;
