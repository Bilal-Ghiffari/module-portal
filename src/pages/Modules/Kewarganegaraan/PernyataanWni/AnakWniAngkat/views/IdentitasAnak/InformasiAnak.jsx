import { FormHeader, FormInput } from "@/components/Common/FormField";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { JENIS_KELAMIN_OPTIONS } from "../../../Constant/master";

const InformasiAnakSection = ({ formik }) => {
  const { negara } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Informasi Anak"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            name="nama_lengkap_pemohon"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormAutocomplete
            formik={formik}
            name="jenis_kelamin_pemohon"
            placeholder="Jenis Kelamin"
            options={JENIS_KELAMIN_OPTIONS}
            title="Jenis Kelamin"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormAutocomplete
            formik={formik}
            name="id_tempat_lahir_pemohon"
            placeholder="Tulis tempat lahir"
            title="Tempat Lahir"
            options={negara.data}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            name="tgl_lahir_pemohon"
            placeholder="Masukkan tanggal lahir"
            title="Tanggal Lahir"
            required
            type="date"
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            name="email_pemohon"
            placeholder="Tulis email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormAutocomplete
            formik={formik}
            name="id_kwn_asal_pemohon"
            placeholder="kewarganegaraan"
            options={negara.data}
            title="Kewarganegaraan"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiAnakSection;
