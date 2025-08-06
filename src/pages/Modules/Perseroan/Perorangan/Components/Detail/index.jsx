import { Link } from "react-router-dom";
import Header from "../Header";
import Section from "./Section";
import "./style.css";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import TableKegiatanUsaha from "../Pendaftaran/TableKegiatanUsaha";
import { formatCurrency } from "@/helpers/services/handleInput";
import { LogCard } from "@/components/Common/Notification/Activity";
import dayjs from "dayjs";
import "dayjs/locale/id"; // jika ingin pakai bahasa Indonesia
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
import Surat from "../Pendaftaran/SuratPermohonan/Surat";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useEffect } from "react";
import {
  apiGetListByIdPerseroanPerorangan,
  apiGetSertifikatPerseroanPerorangan,
} from "@/helpers/backend_helper";
import { useParams } from "react-router-dom";
const Detail = ({ formik, isDetail = false }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const toastifyService = new ToastifyService();

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = () => {
    toastifyService.showLoading();
    apiGetListByIdPerseroanPerorangan(id)
      .then((res) => {
        setData(res);
        apiGetSertifikatPerseroanPerorangan(id).then((resSertifikat) => {
          setData((prev) => ({
            ...prev,
            sertifikat: resSertifikat,
          }));
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        toastifyService.close(); // panggil fungsinya
      });
  };

  const sourceData =
    data && Object.keys(data).length > 0 ? data : formik?.values || {};
  console.log("sourceData", sourceData);
  const informasi_perseroan = [
    { label: "Nama Perseroan", value: sourceData.nama_perseroan || "-" },
    { label: "Email", value: sourceData.email || "-" },
    { label: "Nomor Telepon", value: sourceData.no_telp_kantor || "-" },
    { label: "Provinsi", value: sourceData.provinsi_kantor_nama || "-" },
    { label: "Kabupaten/Kota", value: sourceData.kabupaten_kantor_nama || "-" },
  ];

  const alamat_perseroan = [
    { label: "Kecamatan", value: sourceData.kecamatan_kantor_nama || "-" },
    { label: "Kelurahan", value: sourceData.kelurahan_kantor_nama || "-" },
    {
      label: "RT / RW",
      value: `${sourceData.rt_kantor || "-"} / ${sourceData.rw_kantor || "-"}`,
    },
    { label: "Kode POS", value: sourceData.kode_pos_kantor || "-" },
    { label: "Alamat", value: sourceData.alamat_kantor || "-" },
  ];

  const tempatLahir = sourceData.tempat_lahir;

  const informasi_pemilik_usaha = [
    { label: "Nama Lengkap", value: sourceData.nama_lengkap || "-" },
    { label: "NIK", value: sourceData.nik || "-" },
    { label: "NPWP", value: sourceData.npwp || "-" },
    { label: "Jabatan", value: sourceData.jabatan || "-" },
    { label: "Nomor Telepon", value: sourceData.no_telp || "-" },
    { label: "Tempat Lahir", value: tempatLahir || "-" },
    { label: "Tanggal Lahir", value: sourceData.tanggal_lahir || "-" },

    ...(tempatLahir === "dalam_negeri"
      ? [
          {
            label: "Provinsi Tempat Lahir",
            value: sourceData.pemilik_provinsi_lahir_nama || "-",
          },
          {
            label: "Kabupaten/Kota Tempat Lahir",
            value: sourceData.pemilik_kab_kota_lahir_nama || "-",
          },
        ]
      : []),

    ...(tempatLahir === "luar_negeri"
      ? [
          {
            label: "Negara Lahir",
            value: sourceData.pemilik_negara_lahir_nama || "-",
          },
        ]
      : []),
  ];

  const alamat_pemilik_usaha = [
    { label: "Provinsi", value: sourceData.provinsi_pemilik_nama || "-" },
    {
      label: "Kabupaten/Kota",
      value: sourceData.kabupaten_pemilik_nama || "-",
    },
    { label: "Kecamatan", value: sourceData.kecamatan_pemilik_nama || "-" },
    { label: "Kelurahan", value: sourceData.kelurahan_pemilik_nama || "-" },
    {
      label: "RT / RW",
      value: `${sourceData.rt_pemilik || "-"} / ${
        sourceData.rw_pemilik || "-"
      }`,
    },
    { label: "Kode POS", value: sourceData.kode_pos_pemilik || "-" },
    { label: "Alamat", value: sourceData.alamat_pemilik || "-" },
  ];

  const steps = [
    {
      label: "Pembelian Voucher",
      description: `Voucher berhasil dibeli sebagai syarat awal pengajuan permohonan.`,
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
    },
    {
      label: "Pendaftaran Permohonan",
      description: "Data permohonan telah diisi dan dikirim oleh pemohon.",
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
    },
    {
      label: "Sertifikat Pendirian Perseroan Perorangan Terbit",
      description: `Sertifikat pendirian telah diterbitkan dan siap diunduh oleh pemohon.`,
      time: `${dayjs().format("D MMMM YYYY, HH.mm")} WIB`,
    },
  ];

  return (
    <div className={`mb-3 px-2 ${isDetail ? "mt-5" : "mt-0"}`}>
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        <Row>
          {/* Sertifikat */}
          {isDetail && (
            <Col xs="12">
              <Accordion
                defaultExpanded
                sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: "#EFF7FF" }}
                >
                  <Typography className="text-primary" fontWeight={600}>
                    Sertifikat Pendirian
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {sourceData?.sertifikat ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box mb={1}>
                          <PDFViewer
                            width="100%"
                            height="500px%"
                            className="mb-4"
                          >
                            <Surat data={sourceData?.sertifikat} />
                          </PDFViewer>
                          <PDFDownloadLink
                            document={<Surat data={sourceData?.sertifikat} />}
                            fileName="Sertifikat Pendirian - PT AJI FARMA SANTOSO.pdf" // 👈 custom filename
                            className="bg-primary"
                            style={{
                              padding: 8,
                              marginTop: "100px",
                              color: "#fff",
                              borderRadius: 4,
                              textDecoration: "none",
                              fontSize: 12,
                            }}
                          >
                            {({ loading }) =>
                              loading
                                ? "Mempersiapkan dokumen..."
                                : "Download Sertifikat"
                            }
                          </PDFDownloadLink>
                        </Box>
                      </Grid>
                    </Grid>
                  ) : (
                    <p>Memuat sertifikat</p>
                  )}
                </AccordionDetails>
              </Accordion>
            </Col>
          )}
          <Col xs="12" md="12">
            <Header label={"Informasi Perseroan"} />
          </Col>
          <Col xs="12" md="6">
            <Section data={informasi_perseroan} />
          </Col>
          <Col xs="12" md="6">
            <Section data={alamat_perseroan} />
          </Col>

          <Col xs="12" md="12">
            <Header label={"Modal Usaha"} />
            <Section
              data={[
                {
                  label: "Modal Usaha",
                  value: `Rp${formatCurrency(
                    sourceData?.total_modal_usaha || "0"
                  )}`,
                },
              ]}
            />
          </Col>
          <Col xs="12" md="6">
            <Header label={"Informasi Pemilik Usaha"} />
            <Section data={informasi_pemilik_usaha} />
          </Col>
          <Col xs="12" md="6">
            <Header label={"Alamat Pemilik Usaha"} />
            <Section data={alamat_pemilik_usaha} />
          </Col>
          <Col xs="12" md="12">
            <Header label={"Kegiatan Usaha"} />
            <TableKegiatanUsaha
              data={sourceData?.kegiatan_usaha}
              total_count={sourceData?.kegiatan_usaha?.length}
              formik={formik}
              showSelect={false}
            />
          </Col>

          {/* Aktifitas Permohonan */}
          <Col xs="12" md="12" className="mb-4">
            <LogCard logs={steps} title="Aktifitas Permohonan" activeStep={2} isDetail/>
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default Detail;
