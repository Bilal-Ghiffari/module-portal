import { Col } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";

import {
  JENIS_KELAMIN_OPTIONS,
  PEKERJAAN_OPTIONS,
} from "../../../Constant/master";
import { BsPlus } from "react-icons/bs";

const InformasiPribadiSection = ({ formik }) => {
  const perkawinanOptions = [
    { value: "Kawin", label: "Kawin" },
    { value: "Belum Kawin", label: "Belum Kawin" },
    { value: "Cerai Hidup", label: "Cerai Hidup" },
    { value: "Cerai Mati", label: "Cerai Mati" },
  ];

  const kelaminOptions = JENIS_KELAMIN_OPTIONS || [
    { label: "Laki-laki", value: "Laki-laki" },
    { label: "Perempuan", value: "Perempuan" },
  ];

  const countryOptions = [
    { label: "Amerika Serikat", value: "Amerika Serikat" },
    { label: "Belgia", value: "Belgia" },
    { label: "Taiwan", value: "Taiwan" },
    { label: "Jepang", value: "Jepang" },
  ];

  return (
    <>
      <FormHeader title={"Informasi Pribadi"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapPemohon"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="niknit"
              placeholder={"Tulis NIK/NIT"}
              title="NIK/NIT"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="jenisKelaminPemohon"
              placeholder="Pilih Jenis Kelamin"
              options={kelaminOptions}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="statusPerkawinan"
              placeholder="Pilih Status Perkawinan"
              options={perkawinanOptions}
              title="Status Perkawinan"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tempatLahirPemohon"
              placeholder="Tulis tempat lahir"
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tanggalLahirPemohon"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>

          <Col xs="12" md="12" lg="6" xl="6">
            <FormSelect
              formik={formik}
              name="kewarganegaraanAsing"
              placeholder="Pilih kewarganegaraan asing"
              options={countryOptions}
              title="Kewarganegaraan Asing"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorHandphonePemohon"
              placeholder="Nomor handphone aktif"
              title="Nomor HP"
              leftIcon={<BsPlus />}
              type="tel"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorTeleponPemohon"
              placeholder="Nomor telepon aktif"
              title="Nomor Telepon"
              type="tel"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="emailPemohon"
              title="Email"
              placeholder={"Tulis alamat email aktif"}
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="pekerjaanPemohon"
              placeholder="Pilih pekerjaan atau profesi saat ini"
              options={PEKERJAAN_OPTIONS}
              title="Pekerjaan"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiPribadiSection;
