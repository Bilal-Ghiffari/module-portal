import { Col } from "reactstrap";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";

const PasanganSection = ({ formik }) => {
  return (
    <Col>
      <FormHeader title={"Informasi Data Pasangan"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_lengkap_pasangan"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              readonly={true}
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="no_hp_pasangan"
              title="Nomor HP"
              readonly={true}
              placeholder="!"
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="email_pasangan"
              title="Email"
              readonly={true}
              placeholder="!"
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_pasangan"
              title="Tanggal Lahir"
              readonly={true}
              placeholder="!"
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="agama_pasangan"
              title="Agama"
              readonly={true}
              placeholder="!"
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="negara_lahir_pasangan_text"
              title="Negara Lahir"
              readonly={true}
              placeholder="!"
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="6">
            <FormInput
              formik={formik}
              name="alamat_tinggal_pasangan"
              title="Alamat Tinggal"
              readonly={true}
              placeholder="!"
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="status_kawin_pasangan"
              title="Status Perkawinan"
              readonly={true}
              placeholder="!"
            />
          </Col>
        </Row>

        <FormHeader title={"Dokumen Perjalanan Pasangan"} />
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="no_paspor_asing_pasangan"
              title="Nomor Paspor Asing"
              readonly={true}
              placeholder="!"
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_exp_paspor_asing_pasangan"
              title="Tanggal Exp Paspor Asing"
              readonly={true}
              placeholder="!"
            />
          </Col>
        </Row>
      </Box>
    </Col>
  );
};

export default PasanganSection;
