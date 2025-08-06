import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import MessageBox from "@/components/Common/MessageBox";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Row, Col } from "reactstrap";

const UnggahDokumenSection = ({ formik }) => {
  const { values, setFieldTouched, setFieldValue } = formik;

  const isKawin = values.statusPerkawinan === "Kawin";

  useEffect(() => {
    if (isKawin) {
      setFieldTouched("fotokopiAktaPerkawinan", true, false);
    } else {
      setFieldValue("fotokopiAktaPerkawinan", null);
    }
  }, [values.statusPerkawinan]);
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
            name="fotokopiAktaKelahiran"
            label="Kutipan akta atau surat bukti kelahiran pemohon yang dilegalisasi oleh pejabat berwenang atau Perwakilan RI"
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
              label="Kutipan akta/buku nikah/laporan atau surat keterangan perkawinan pemohon yang dilegalisasi oleh pejabat berwenang atau Perwakilan RI  *"
              acceptedFileTypes={["application/pdf"]}
              maxFileSizeMB={5}
              required
            />
          </Col>
        )}
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporRi"
            label="Paspor RI atau KTP yang sudah diverifikasi oleh Perwakilan RI  *"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="suratPejabatAsing"
            label="Surat dari pejabat negara asing yang menyatakan pemohon akan menjadi warga negara asing, diterjemahkan oleh penerjemah tersumpah  *"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="fotokopiPasporRi"
            label="Fotokopi paspor RI, dokumen sejenis paspor, atau surat lain yang membuktikan status WNI   * "
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasfoto"
            label="Pas foto berwarna terbaru dari pemohon  *"
            acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
      </Row>
      <MessageBox type="warning">
        <Typography>
          Semua dokumen yang perlu untuk dilegalisir harus dilakukan sebelum
          Anda mendaftar secara online. Verifikator tidak akan menerima dokumen
          legalisir yang dilakukan setelah Anda mendaftar online.
          <br />
          <br />
          Anda harus mengirimkan dokumen-dokumen di atas beserta dokumen yang
          Anda cetak dan tanda tangani kepada: Subdirektorat Notariat,
          Direktorat Perdata, Direktorat Jenderal Administrasi Hukum Umum,
          Kementerian Hukum dan HAM RI, EX Gedung Sentra Mulia, Jl. HR. Rasuna
          Said Kav x-6/8 Lantai 3 dan 6, Kuningan, Jakarta Selatan, Kode Pos
          12940. Selambat-lambatnya 7 hari setelah Anda memasukkan permohonan
          ini.
        </Typography>
      </MessageBox>
    </Box>
  );
};

export default UnggahDokumenSection;
