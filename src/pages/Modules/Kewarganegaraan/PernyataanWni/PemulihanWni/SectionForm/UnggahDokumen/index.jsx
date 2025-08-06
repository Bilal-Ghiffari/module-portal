import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { Col } from "reactstrap";

const UnggahDokumenSection = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <FormHeader title={"Upload Dokumen"} />
      <Row>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiAktaKelahiran"
            label="Fotokopi akta kelahiran atau surat bukti kelahiran lain yang dilegalisasi oleh pejabat yang mengeluarkan atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiPasporRI"
            label="Fotokopi paspor RI atau dokumen lain yang membuktikan pernah menjadi WNI, dilegalisasi oleh pejabat atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiKtp"
            label="Fotokopi KTP atau surat identitas kependudukan yang sudah diverifikasi oleh perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiAktaNikah"
            label="Fotokopi akta nikah yang sudah dilegalisasi oleh pejabat atau perwakilan RI *"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiAktaCerai"
            label="Fotokopi akta cerai atau akta kematian pasangan (bagi yang sudah kawin/cerai), dilegalisasi oleh pejabat atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiAktaKelahiranAnak"
            label="Fotokopi akta kelahiran anak (belum 18 tahun dan belum menikah), dilegalisasi oleh pejabat atau perwakilan RI (jika memiliki anak)"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="suratPernyataanKesetiaan"
            label="Surat pernyataan kesetiaan pada NKRI, Pancasila, UUD 1945, dan kesediaan menjalankan kewajiban sebagai WNI."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="suratPernyataanMelepaskan"
            label="Surat pernyataan melepaskan kewarganegaraan asing, disetujui oleh pejabat negara asing atau perwakilan resmi."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="daftarRiwayatHidup"
            label="Daftar riwayat hidup pemohon."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasFoto"
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
