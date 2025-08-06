import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { Row } from "reactstrap";
import { Col } from "reactstrap";

const UnggahDokumenSection = ({ formik }) => {
  const { values, setFieldTouched, setFieldValue } = formik;

  // setFieldTouched : formik menyentuh ulang field fotokopiAktaPerkawinan
  // setFieldTouched : formik menyentuh ulang field fotokopiAktaPerceraian

  const isKawin = values.statusPerkawinan === "Kawin";
  const isCerai =
    values.statusPerkawinan === "Cerai Hidup" ||
    values.statusPerkawinan === "Cerai Mati";

  useEffect(() => {
    if (isKawin) {
      setFieldTouched("fotokopiAktaPerkawinan", true, false);
    } else {
      setFieldValue("fotokopiAktaPerkawinan", null);
    }

    if (isCerai) {
      setFieldTouched("fotokopiAktaPerceraian", true, false);
    } else {
      setFieldValue("fotokopiAktaPerceraian", null);
    }
  }, [values.statusPerkawinan]);

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
            label="Fotokopi kutipan akta lahir/bukti kelahiran orang yang mengajukan surat pernyataan yang disahkan oleh pejabat atau perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        {isKawin && (
          <Col lg="12" xl="12">
            <FormUploadFile
              formik={formik}
              name="fotokopiAktaPerkawinan"
              label="Fotokopi akta perkawinan/buku nikah yang dilegalisasi oleh perwakilan RI"
              acceptedFileTypes={["application/pdf"]}
              maxFileSizeMB={5}
              required
            />
          </Col>
        )}
        {isCerai && (
          <Col lg="12" xl="12">
            <FormUploadFile
              formik={formik}
              name="fotokopiAktaPerceraian"
              label="Fotokopi kutipan akta perceraian, atau kutipan akta kematian suami/istri pemohon yang dilegalisasi oleh perwakilan RI"
              acceptedFileTypes={["application/pdf"]}
              maxFileSizeMB={5}
              required
            />
          </Col>
        )}
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiDokumenPerjalanan"
            label="Fotokopi dokumen perjalanan Republik Indonesia atau Kartu Tanda Penduduk yang sudah diverifikasi oleh perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="suratKeteranganPejabatAsing"
            label="Surat keterangan dari pejabat negara asing bahwa dengan kehilangan Kewarganegaraan Republik Indonesia pemohon akan menjadi warga negara asing"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasfoto"
            label="Pas foto Pemohon terbaru berwarna dengan; ukuran 4x6 cm (empat kali enam sentimeter) sebanyak 6 (enam) lembar"
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
