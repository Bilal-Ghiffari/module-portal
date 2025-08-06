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

const IdentitasPasangan = ({ formik }) => {
  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];

  const tempatLahirOptions = [
    { label: "Dalam Negeri", value: "Dalam Negeri" },
    { label: "Luar Negeri", value: "Luar Negeri" },
  ];
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <FormHeader title={"Informasi Data Pasangan"} />
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
              placeholder={"Tulis alamat email aktif"}
              title="Email"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorHpPasangan"
              title="Nomor HP"
              placeholder={"Tulis nomor handphone aktif"}
              type="tel"
              leftIcon={<BsPlus size={12} />}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="tempatLahirPasangan"
              placeholder="tempat lahir"
              options={countryOptions}
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
              name="statusKawinPasangan"
              placeholder="status perkawinan"
              title="Status Perkawinan"
              value={formik.values.statusKawinPasangan || "Kawin"}
              readonly
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="agamaPasangan"
              placeholder="agama sesuai identitas"
              options={AGAMA_OPTIONS}
              title="Agama"
              required
            />
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

export default IdentitasPasangan;
