import { Col } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { PEKERJAAN_OPTIONS } from "../../../Constant/master";
import { BsPlus } from "react-icons/bs";

const InformasiPribadiSection = ({ formik }) => {
  const kelaminOptions = [
    { label: "Laki-laki", value: "Laki-laki" },
    { label: "Perempuan", value: "Perempuan" },
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
            <FormSelect
              formik={formik}
              name="jenisKelaminPemohon"
              placeholder="Jenis Kelamin"
              options={kelaminOptions}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name={"noHpPemohon"}
              placeholder={"Tulis nomor handphone aktif"}
              title="Nomor HP"
              leftIcon={<BsPlus />}
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name={"noTelpPemohon"}
              placeholder={"Tulis nomor telepon"}
              title="Nomor Telepon"
              type="number"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tmpLahirPemohon"
              placeholder="Tulis tempat lahir"
              title="Tempat Lahir"
              type="textarea"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tglLahirPemohon"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="emailPemohon"
              placeholder="Tulis alamat email aktif"
              title="Email"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="pekerjaanPemohon"
              placeholder="pekerjaan atau profesi saat ini"
              options={PEKERJAAN_OPTIONS}
              title="Pekerjaan"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="niknitPemohon"
              placeholder={"Tulis NIK/NIT"}
              title="NIK / NIT"
              type="number"
              required
            />
          </Col>

          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="statusPerkawinan"
              title="Status Perkawinan"
              required
              value={formik.values.statusPerkawinan || "Kawin"}
              readonly
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="alasanPemohon"
              placeholder="Alasan Permohonan"
              title="Alasan Permohonan"
              required
              readonly
              value={formik.values.alasanPemohon || "Karena perkawinan"}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiPribadiSection;
