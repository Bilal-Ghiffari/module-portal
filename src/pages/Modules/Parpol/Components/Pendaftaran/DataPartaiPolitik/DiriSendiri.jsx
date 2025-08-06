import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Row, Col } from "reactstrap";
import FileUploadComponent from "@/components/Common/UploadFile";
import { dummyJenisKelamin, dummyNegaraTempatTinggal } from "../../mock";

const DiriSendiri = ({ formik, disabled }) => {
  return (
    <Row>
      <Col xs="12" md="12" lg="12" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="nama_lengkap"
          placeholder="Nama Lengkap"
          readonly={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="nik"
          type="text"
          placeholder="NIK"
          readonly={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="email"
          type="email"
          placeholder="Email"
          readonly={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="no_telp"
          type="tel"
          placeholder="Nomor Telepon"
          readonly={disabled}
        />
      </Col>

      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="tempat_lahir"
          placeholder="Tempat Lahir"
          readonly={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="tanggal_lahir"
          type="date"
          placeholder="Tanggal Lahir"
          readonly={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="6" className="px-3">
        <FormInput
          formik={formik}
          name="alamat"
          type="text"
          placeholder="Alamat"
          readonly={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={"jenis_kelamin"}
          data={dummyJenisKelamin}
          label="Jenis Kelamin"
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={"negara_tempat_tinggal"}
          data={dummyNegaraTempatTinggal}
          label="Negara Tempat Tinggal "
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="6" className="px-3">
        <FileUploadComponent
          label="File Identitas Pemohon"
          text="Pilih file Anda"
          name="file_identitas_pemohon"
          resFile={(file) =>
            formik.setFieldValue("file_identitas_pemohon", file)
          }
          maxSizeMb={10}
          searchLatLon={false}
          validType="pdf"
          specified={true}
          required
          fieldValue={formik.values.file_identitas_pemohon}
        />
      </Col>
    </Row>
  );
};

export default DiriSendiri;
