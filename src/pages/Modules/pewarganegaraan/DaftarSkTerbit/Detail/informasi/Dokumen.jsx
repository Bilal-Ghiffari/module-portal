import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import { Row, Col } from "reactstrap";

const DokumenSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Unggah Dokumen"} />
      <Row>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiAktaKelahiran"
            label="Kutipan akta atau surat bukti kelahiran pemohon yang dilegalisasi oleh pejabat berwenang atau Perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            readOnly
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiAktaPerkawinan"
            label="Kutipan akta/buku nikah/laporan atau surat keterangan perkawinan pemohon yang dilegalisasi oleh pejabat berwenang atau Perwakilan RI  *"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            readOnly
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporRi"
            label="Paspor RI atau KTP yang sudah diverifikasi oleh Perwakilan RI  *"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            readOnly
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="suratPejabatAsing"
            label="Surat dari pejabat negara asing yang menyatakan pemohon akan menjadi warga negara asing, diterjemahkan oleh penerjemah tersumpah  *"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            readOnly
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiPasporRi"
            label="Fotokopi paspor RI, dokumen sejenis paspor, atau surat lain yang membuktikan status WNI   * "
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            readOnly
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasfoto"
            label="Pas foto berwarna terbaru dari pemohon  *"
            acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            maxFileSizeMB={5}
            readOnly
          />
        </Col>
      </Row>
    </>
  );
};

export default DokumenSection;
