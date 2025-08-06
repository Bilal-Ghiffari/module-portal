import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row, Col } from "reactstrap";

const UnggahDokumenSection = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <FormHeader title={"Unggah Dokumen"} />
      <Row>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaKelahiran"
            label="Kutipan Akta Kelahiran atau surat bukti kelahiran lain yang dilegalisasi oleh pejabat yang mengeluarkan atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaPerkawinan"
            label="Kutipan Akta Perkawinan yang sudah dilegalisasi oleh pejabat atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaPerceraian"
            label="Kutipan Akta Perceraian atau akta kematian pasangan (bagi yang sudah cerai mati), dilegalisasi oleh pejabat atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiPasporRI"
            label="Fotokopi Paspor RI atau dokumen lain yang membuktikan pernah menjadi WNI, dilegalisasi oleh pejabat atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="suratNaturalisasiAsing"
            label="Surat Naturalisasi Asing (jika ada)"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasfoto"
            label="Pas foto terbaru ukuran 4x6 cm, berwarna, latar belakang merah, berpakaian rapi dan sopan."
            acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
      </Row>
    </Box>
  );
};

export default UnggahDokumenSection;
