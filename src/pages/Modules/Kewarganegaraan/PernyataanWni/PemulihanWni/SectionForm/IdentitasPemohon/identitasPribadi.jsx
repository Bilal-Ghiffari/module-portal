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
  STATUS_PERNIKAHAN_OPTIONS,
} from "../../../Constant/master";

const InformasiPribadiSection = ({ formik }) => {
  const perkawinanOptions = [
    { value: "Cerai Hidup", label: "Cerai Hidup" },
    { value: "Cerai Mati", label: "Cerai Mati" },
  ];

  const kelaminOptions = [
    { label: "Laki-laki", value: "Laki-laki" },
    { label: "Perempuan", value: "Perempuan" },
  ];

  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Pribadi"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapPemohon"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="niknit"
              placeholder={"Tulis NIK/NIT"}
              title="NIK/NIT"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="kewarganegaraan"
              title="Kewarganegaraan Indonesia"
              required
              value={formik.values.kewarganegaraan || "Indonesia"}
              readonly
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="kewarganegaraanAsing"
              placeholder="kewarganegaraan asing"
              options={countryOptions}
              title="Kewarganegaraan Asing"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="jenisKelaminPemohon"
              placeholder="Jenis Kelamin"
              options={kelaminOptions}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="statusPerkawinan"
              placeholder="status perkawinan"
              options={perkawinanOptions}
              title="Status Perkawinan "
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormSelect
              formik={formik}
              name="pekerjaanPemohon"
              placeholder="pekerjaan atau profesi saat ini"
              options={PEKERJAAN_OPTIONS}
              title="Pekerjaan "
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tempatLahirPemohon"
              placeholder="Tulis tempat lahir"
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tanggalLahirPemohon"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alasanPemohon"
              placeholder="Alasan Permohonan"
              title="Alasan Permohonan"
              required
              readonly
              value={formik.values.alasanPemohon || "Putusnya perkawinan"}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorAktaPemohon"
              title="Nomor akta/Bukti kelahiran"
              placeholder={"Tulis nomor akta"}
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tanggalAktaPemohon"
              title="Tanggal akta/Bukti kelahiran"
              placeholder={"Masukkan tanggal akta"}
              type="date"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiPribadiSection;
