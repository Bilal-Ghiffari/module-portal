import { Col } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { FIELD_OPTIONS } from "../../constants/options";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/components/Common/AutoComplete";

const InformasiPribadiSection = ({ formik }) => {
  const { pekerjaan, agama, negara } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Informasi Pribadi"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="nama_lengkap_pemohon"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="id_kewarganegaraan_asal_pemohon"
              placeholder="Pilih kewarganegaraan"
              options={negara.data}
              title="Kewarganegaraan asal"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="id_negara_lahir_pemohon"
              placeholder="negara tempat lahir"
              title="Tempat Lahir"
              options={negara.data}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="tgl_lahir_pemohon"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="jenis_kelamin_pemohon"
              placeholder="jenis kelamin"
              title="Jenis Kelamin"
              options={FIELD_OPTIONS.kelaminOption}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="agama_pemohon"
              placeholder="agama sesuai identitas"
              title="Agama"
              options={agama.data}
              required
            />
          </Col>
        </Row>
        <Row>
          <FormAutocomplete
            formik={formik}
            name="id_pekerjaan_pemohon"
            placeholder="pekerjaan saat ini"
            title="Pekerjaan"
            options={pekerjaan.data}
            required
          />
        </Row>
      </Box>
    </>
  );
};

export default InformasiPribadiSection;
