import { Col, Row } from "reactstrap";
import Header from "../../../../Fidusia/Header";
import FileUploadComponent from "@/components/Common/UploadFile";
import Checked from "@/components/Common/Checked";
import { formatPlaceholder } from "@/components/Common/FormField";

const FormulirPermohonan = ({ formik, disabled }) => {
  const uploadFields = [
    {
      label:
        "Surat Permohonan Perpanjangan Kurator dan Pengurus yang ditujukan kepada Direktur Jenderal",
    },
    {
      label: "Fotokopi Kartu Tanda Penduduk (KTP) yang masih berlaku",
    },
    {
      label:
        "Tanda Keanggotaan Organisasi Profesi Kurator atau Pengurus yang ditetapkan oleh Organisasi Profesi",
    },
    {
      label:
        "Sertifikat Pelatihan Kurator atau Pengurus yang dikeluarkan oleh Komite Bersama",
    },
    {
      label:
        "Surat rekomendasi terbaru dari Organisasi Profesi Kurator dan Pengurus",
    },
    {
      label: "Pas foto terbaru 4x6 cm dengan latar belakang berwarna putih",
    },
  ];

  return (
    <>
      {/* Unggah Dokumen Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Unggah Dokumen"} disabled={disabled} />
        </Col>

        {uploadFields.map(({ label }) => (
          <Col xs="12" className="px-3" key={label}>
            <FileUploadComponent
              key={formatPlaceholder(label)}
              label={label}
              text="Pilih file Anda"
              name={formatPlaceholder(label)}
              resFile={(file) =>
                formik.setFieldValue(formatPlaceholder(label), file)
              }
              maxSizeMb={10}
              searchLatLon={false}
              validType="pdf"
              specified={true}
              required
              fieldValue={formik.values[formatPlaceholder(label)]}
            />
          </Col>
        ))}
        {/* 
        <Col xs="6" className="px-3">
          <FileUploadComponent
            label="Surat Permohonan Perpanjangan Kurator dan Pengurus yang ditujukan kepada Direktur Jenderal"
            text="Pilih file Anda"
            name={fieldKey}
            resFile={(file) => formik.setFieldValue(fieldKey, file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values[fieldKey]} // konsisten
          />
        </Col> */}

        <Col xs="12" className="px-4">
          <Checked
            label={`Saya bertanggung jawab penuh terhadap kebenaran dokumen persyaratan yang disampaikan`}
            value="1"
            fieldName={`rules_2`}
            formik={formik}
          />
        </Col>
      </Row>
    </>
  );
};

export default FormulirPermohonan;
