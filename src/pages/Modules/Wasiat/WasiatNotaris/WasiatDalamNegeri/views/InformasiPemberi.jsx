import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const FormPemberiWasiat = ({ formik }) => {
  const { pekerjaan } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Informasi Pemberi Wasiat"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nama_lengkap_pemberi"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="alias_pemberi"
            placeholder="Tulis alias"
            title="Dahulu Bernama/Alias"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nik_pemberi"
            placeholder="Tulis NIK"
            title="Nomor Induk Kependudukan (NIK)"
            type="number"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name="pekerjaan_pemberi"
            placeholder="pekerjaan/profesi saat ini"
            title="Pekerjaan/Profesi"
            options={pekerjaan.data}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tempat_lahir_pemberi"
            placeholder="Tulis tempat lahir"
            title="Tempat Lahir"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tgl_lahir_pemberi"
            placeholder="Tulis tanggal lahir"
            title="Tanggal Lahir"
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormPemberiWasiat;
