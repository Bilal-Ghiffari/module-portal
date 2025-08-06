import { Col, Row } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import {
  JENIS_KELAMIN_OPTIONS,
  PEKERJAAN_OPTIONS,
} from "../../../Constant/master";
import { STATUS_PERNIKAHAN_OPTIONS } from "@/pages/Modules/Pewarganegaraan/Constants/master";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";

const IdentitasDiriSection = ({ formik }) => {
  const { agama, negara, provinsi, kotakab, pekerjaan, statusKawin } =
    useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Informasi Pribadi"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_lengkap_pemohon"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nik_pemohon"
              placeholder="Tulis NIK/NIT"
              title="NIK/NIT"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_pemohon"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_negara_lahir_pemohon"
              placeholder="Negara Kelahiran"
              title="Negara Kelahiran"
              options={negara.data}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="jenis_kelamin_pemohon"
              placeholder="Jenis Kelamin"
              options={JENIS_KELAMIN_OPTIONS}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="status_kawin_pemohon"
              placeholder="Status Perkawinan"
              title="Status Perkawinan"
              required
              readonly
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kewarganegaraan_asal_pemohon"
              placeholder="Indonesia"
              options={[{ value: 76, label: "Indonesia" }]}
              title="Kewarganegaraan Asal"
              required
              readonly
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_pekerjaan_pemohon"
              placeholder="Jenis pekerjaan saat ini"
              options={pekerjaan.data}
              title="Pekerjaan"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_provinsi_pemohon"
              placeholder="Pilih Provinsi"
              title="Provinsi Kelahiran"
              options={provinsi.data}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kab_kota_pemohon"
              placeholder="Pilih Kabupaten/Kota"
              title="Kabupaten/Kota Kelahiran"
              options={kotakab.data}
              required
              isDisabled={!formik.values.id_provinsi_pemohon}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default IdentitasDiriSection;
