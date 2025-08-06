import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiFile = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Upload Dokumen"} />
      <Row>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="surat_pemohonan"
            label="Surat Permohonan"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="dok_catatan_sipil"
            label="Sertifikat/Akta/Surat Kematian dari Catatan Sipil atau pejabat berwenang beserta fotokopi legalisir"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="surat_ganti_nama"
            label="Surat Ganti Nama (jika pernah melakukan perubahan nama)"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="akta_kelahiran"
            label="Akta Kelahiran"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="akta_perkawinan"
            label="Akta Perkawinan"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiFile;
