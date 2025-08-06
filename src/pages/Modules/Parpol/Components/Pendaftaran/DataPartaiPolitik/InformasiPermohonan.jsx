import { FormInput } from "@/components/Common/FormField";
import FileUploadComponent from "@/components/Common/UploadFile";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Row, Col } from "reactstrap";

const InformasiPermohonan = ({ formik }) => {
  return (
    <Row>
      <Col xs="3" className="px-3">
        <FormInput
          formik={formik}
          name={"no_surat_permohonan"}
          type="text"
          placeholder="Nomor Surat Permohonan"
          required
        />
      </Col>
      <Col xs="3" className="px-3">
        <FormInput
          formik={formik}
          name={"tanggal_surat_permohonan"}
          type="date"
          placeholder="Tanggal Surat Permohonan"
          required
        />
      </Col>
      <Col xs="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={`bank`}
          data={[]}
          label="Nama Bank"
          required
        />
      </Col>
      <Col xs="3" className="px-3">
        <FormInput
          formik={formik}
          name={`no_rek_parpol`}
          type="number"
          placeholder="Nomor Rekening Partai Politik"
          required
        />
      </Col>

      <Col xs="6" className="px-3">
        <FileUploadComponent
          label="Surat Status Kantor"
          text="Pilih file Anda"
          name={`surat_status_kantor`}
          resFile={(file) => formik.setFieldValue(`surat_status_kantor`, file)}
          maxSizeMb={10}
          searchLatLon={false}
          validType="pdf"
          specified={true}
          required
          fieldValue={formik.values?.surat_status_kantor}
        />
      </Col>
      <Col xs="6" className="px-3">
        <FileUploadComponent
          label="Foto Buku Nomor Rekening"
          text="Pilih file Anda"
          name={`foto_buku_no_rekening`}
          resFile={(file) =>
            formik.setFieldValue(`foto_buku_no_rekening`, file)
          }
          maxSizeMb={10}
          searchLatLon={false}
          validType="pdf"
          specified={true}
          required
          fieldValue={formik.values?.foto_buku_no_rekening}
        />
      </Col>
      <Col xs="12" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={`status_kantor`}
          data={[]}
          label="Status Kantor"
          required
        />
      </Col>
    </Row>
  );
};

export default InformasiPermohonan;
