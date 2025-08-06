import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Col, Row } from "reactstrap";
import { FIELD_OPTIONS } from "../../constants/options";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/components/Common/AutoComplete";

const InformasiPasanganSection = ({ formik }) => {
  const { values, setFieldValue, touched, errors } = formik;
  const isDalamNegeri = values.tempat_lahir_pasangan === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_pasangan === "Luar Negeri";
  const prevTempatLahir = useRef();

  const { agama, negara, provinsi, kotakabPsgn, pekerjaan } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    if (prevTempatLahir.current !== values.tempat_lahir_pasangan) {
      if (values.tempat_lahir_pasangan === "Dalam Negeri") {
        setFieldValue("id_negara_lahir_pasangan", "");
      } else if (values.tempat_lahir_pasangan === "Luar Negeri") {
        setFieldValue("id_provinsi_lahir_pasangan", "");
        setFieldValue("id_kab_kota_lahir_pasangan", "");
      }

      prevTempatLahir.current = values.tempat_lahir_pasangan;
    }
  }, [values.tempat_lahir_pasangan, setFieldValue, errors, touched, formik]);

  useEffect(() => {
    if (!values.id_kewarganegaraan_pasangan) {
      setFieldValue("id_kewarganegaraan_pasangan", 76);
    }
  }, [setFieldValue, values.id_kewarganegaraan_pasangan]);

  return (
    <>
      <FormHeader title="Informasi Pasangan" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_pasangan"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="nik_pasangan"
              placeholder="Tulis NIK pasangan"
              title="NIK"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="jenis_kelamin_pasangan"
              placeholder="Pilih jenis kelamin"
              options={FIELD_OPTIONS.genderOption}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="agama_pasangan"
              placeholder="agama sesuai identitas"
              options={agama.data}
              title="Agama"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_pasangan"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="id_kewarganegaraan_pasangan"
              placeholder="Pilih kewarganegaraan"
              value={"Indonesia"}
              title="Kewarganegaraan Asal"
              readonly
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="no_telp_pasangan"
              title="Nomor HP"
              type="number"
              leftIcon={<BsPlus />}
              placeholder="Tulis nomor handphone aktif"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="email_pasangan"
              title="Email"
              placeholder="Tulis alamat email aktif"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="tempat_lahir_pasangan"
              placeholder="Tulis tempat lahir"
              options={FIELD_OPTIONS.bornOption}
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_pekerjaan_pasangan"
              placeholder="Tulis pekerjaan"
              options={pekerjaan.data}
              title="Pekerjaan"
              required
            />
          </Col>

          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_provinsi_lahir_pasangan"
              placeholder="Tulis provinsi"
              options={provinsi.data}
              title="Provinsi"
              required={isDalamNegeri}
              isDisabled={isLuarNegeri}
            />
          </Col>

          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kab_kota_lahir_pasangan"
              placeholder="Tulis kabupaten/kota"
              options={kotakabPsgn.data}
              title="Kab/Kota"
              required={isDalamNegeri}
              isDisabled={isLuarNegeri || !values.id_provinsi_lahir_pasangan}
            />
          </Col>

          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_negara_lahir_pasangan"
              placeholder="Tulis negara domisili"
              options={negara.data}
              title="Negara"
              required
              isDisabled={isDalamNegeri}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiPasanganSection;
