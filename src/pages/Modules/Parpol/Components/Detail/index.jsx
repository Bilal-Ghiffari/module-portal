import { Link } from "react-router-dom";
import Section from "./Section";
import "./style.css";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import dayjs from "dayjs";
import "dayjs/locale/id"; // jika ingin pakai bahasa Indonesia
import Header from "@/components/Header";
import FilePreview from "@/components/Common/FilePreview";
import { LogCard } from "@/components/Common/Notification/Activity";

dayjs.locale("id");
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Detail = ({ formik }) => {
  const informasi_pemohon = [
    { label: "Nama Lengkap", value: formik?.values?.nama_lengkap || "-" },
    { label: "NIK", value: formik?.values?.nik || "-" },
    { label: "Tempat Lahir", value: formik?.values?.tempat_lahir || "-" },
    { label: "Tanggal Lahir", value: formik?.values?.tanggal_lahir || "-" },
    { label: "Jenis Kelamin", value: formik?.values?.jenis_kelamin || "-" },
    {
      label: "Negara Tempat Tinggal",
      value: formik?.values?.negara_tempat_tinggal || "-",
    },
    { label: "Alamat", value: formik?.values?.alamat || "-" },
  ];
  const informasi_penerima_kuasa = [
    {
      label: "Nama Penerima Kuasa",
      value: formik?.values?.nama_penerima_kuasa || "-",
    },
    {
      label: "NIK Penerima Kuasa",
      value: formik?.values?.nik_penerima_kuasa || "-",
    },
  ];

  const steps = [
    {
      label: "Pendaftaran Permohonan",
      description: `Data permohonan telah diisi dan dikirim oleh pemohon.`,
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
    },
    {
      label: "Validasi Spesimen Pejabat",
      description: "Data permohonan telah diisi dan dikirim oleh pemohon.",
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
      data: [],
    },
    {
      label: "Verifikasi",
      description: `Berkas sedang dalam proses verifikasi dan persetujuan.`,
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
      data: [],
    },
    {
      label: "Pembayaran Voucher",
      description: `Voucher berhasil dibeli sebagai syarat awal pengajuan permohonan.`,
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
    },
  ];
  return (
    <div className="mt-5 mb-3 px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        <Row>
          <Col xs="12" md="6">
            <Header label={"Informasi Pemohon"} />
            <Section data={informasi_pemohon} />
          </Col>

          <Col xs="12" md="6" className="mb-2">
            <Header label={"File Identitas Pemohon"} />
            <FilePreview file={formik?.values?.file_identitas_pemohon} />
          </Col>
          <>
            {formik?.values?.tipe_pemohon == "orang_lain" && (
              <>
                <Col xs="12" md="12">
                  <Header label={"Informasi Surat Kuasa"} />
                  <Section data={informasi_penerima_kuasa} />
                </Col>
                <Col xs="12" md="6" className="mb-2">
                  <Header label={"File Surat Kuasa"} />
                  <FilePreview
                    file={formik?.values?.file_surat_kuasa_bermateri}
                  />
                </Col>
                <Col xs="12" md="6" className="mb-2">
                  <Header label={"File Identitas Penerima Surat Kuasa"} />
                  <FilePreview
                    file={formik?.values?.file_identitas_penerima_surat_kuasa}
                  />
                </Col>
              </>
            )}
          </>
        </Row>
        {formik?.values?.data_document
          .filter(
            (data) => data?.nama_document && data.nama_document.trim() !== ""
          )
          .map((data, index) => {
            const informasi_data_document = [
              {
                label: "Jenis Dokumen",
                value: data?.jenis_document || "-",
              },
              {
                label: "Nama Dokumen",
                value: data?.nama_document || "-",
              },
              {
                label: "Nama Pemilik Dokumen",
                value: data?.nama_pemilik_document || "-",
              },
              {
                label: "Tanggal Dokumen",
                value: data?.tanggal_document || "-",
              },
              {
                label: "Jumlah Dokumen",
                value: data?.jumlah_document || "-",
              },
              {
                label: "Nama Pejabat Publik",
                value: data?.nama_pejabat || "-",
              },
              {
                label: "Instansi Pejabat Publik",
                value: data?.negara_tempat_tinggal || "-",
              },
              { label: "Jabatan", value: data?.jabatan || "-" },
            ];
            return (
              <Accordion
                key={index}
                sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: "#EFF7FF" }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Dokumen {index + 1}: {data?.nama_document || "Tanpa Nama"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box mb={1}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Data Dokumen
                        </Typography>{" "}
                      </Box>
                      <Section data={informasi_data_document} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box mb={1}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Lampiran Dokumen
                        </Typography>{" "}
                      </Box>
                      {Array.isArray(data.lampiran_document) &&
                      data.lampiran_document.length > 0 ? (
                        <Grid container spacing={1}>
                          {data.lampiran_document.map((file, fileIndex) => (
                            <Grid
                              item
                              xs={12}
                              sm={data.lampiran_document.length > 1 ? 6 : 12}
                              key={fileIndex}
                            >
                              <Box
                                border={1}
                                borderColor="grey.300"
                                borderRadius={1}
                                p={1}
                                bgcolor="white"
                                boxShadow={1}
                              >
                                <FilePreview file={file} />
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontStyle="italic"
                        >
                          Tidak ada lampiran
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}

        <Row>
          {/* Aktifitas Permohonan */}
          <Col xs="12" md="12" className="mb-4">
            <LogCard logs={steps} title="Aktifitas Permohonan" activeStep={2} />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default Detail;
