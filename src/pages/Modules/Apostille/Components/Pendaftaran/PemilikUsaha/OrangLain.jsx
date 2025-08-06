import { FormInput } from "@/components/Common/FormField";
import FileUploadComponent from "@/components/Common/UploadFile";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Row, Col } from "reactstrap";
import { dummyJenisKelamin } from "../../mock";
import { postFormData, postLayananFormData } from "@/helpers/api_helper";
import { renderFileUpload } from "@/components/Common/UploadFileWithAPI";
import Header from "@/components/Header";

const OrangLain = ({ formik, disabled, dropdown }) => {
  return (
    <Row>
      <Col xs="12" md="12" lg="12" className="px-3">
        <Header label={"Informasi Penerima Kuasa"} />
      </Col>
      <Col xs="12" md="12" lg="12" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="nama_penerima_kuasa"
          placeholder="Nama Penerima Kuasa"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="nik_penerima_kuasa"
          type="text"
          placeholder="NIK Penerima Kuasa"
          readonly={disabled}
          required
        />
      </Col>

      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="email_penerima_kuasa"
          type="email"
          placeholder="Email Penerima Kuasa"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="no_hp_penerima_kuasa"
          type="tel"
          placeholder="No Telp Penerima Kuasa"
          readonly={disabled}
          required
        />
      </Col>

      <Col xs="12" md="6" lg="4" xl="4" className="px-3">
        <FormInput
          formik={formik}
          name="alamat_penerima_kuasa"
          type="text"
          placeholder="Alamat Penerima Kuasa"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="4" className="px-3">
        {renderFileUpload(
          "File Identitas Penerima Surat Kuasa",
          "ktp_penerima_kuasa",
          formik
        )}
      </Col>

      <Col xs="12" md="6" lg="4" xl="4" className="px-3">
        {renderFileUpload("File Surat Kuasa Bermaterai", "surat_kuasa", formik)}
      </Col>
    </Row>
  );
};

export default OrangLain;
