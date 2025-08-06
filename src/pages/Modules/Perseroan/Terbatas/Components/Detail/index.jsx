import { Link } from "react-router-dom";
import Section from "./Section";
import "./style.css";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import TableKegiatanUsaha from "../Pendaftaran/TableDynamic";
import { formatCurrency } from "@/helpers/services/handleInput";
import { Box } from "@mui/material";
import { LogCard } from "@/components/Common/Notification/Activity";
import dayjs from "dayjs";
import "dayjs/locale/id"; // jika ingin pakai bahasa Indonesia
import Header from "@/components/Header";
dayjs.locale("id");

const formik = {
  values: {
    voucher: "VOUCHER123",
    rules_1: "1",
    rules_2: "1",
    nama_perseroan: "PT ZAINUL",
    email: "thobazainul@gmail.com",
    provinsi_kantor: "32",
    kabupaten_kantor: "3204",
    kecamatan_kantor: "320416",
    kelurahan_kantor: "3204162004",
    alamat_kantor:
      "Jl. Kp. Babakan Kel. Telajung Kec. Cikarang Barat Kab. Bekasi Timur. Jawa Barat",
    no_telp_kantor: "088298813114",
    kode_pos_kantor: "17530",
    rt_kantor: "2",
    rw_kantor: "2",
    total_modal_usaha: "5000000000",
    kegiatan_usaha: [
      {
        id: 1,
        kode: "1234",
        judul: "Judul KBLI A",
        uraian: "Uraian singkat A",
      },
      {
        id: 2,
        kode: "5678",
        judul: "Judul KBLI B",
        uraian: "Uraian singkat B",
      },
      {
        id: 3,
        kode: "9012",
        judul: "Judul KBLI C",
        uraian: "Uraian singkat C",
      },
    ],
    provinsi_pemilik: "32",
    kabupaten_pemilik: "3204",
    kecamatan_pemilik: "320416",
    kelurahan_pemilik: "3204162004",
    alamat_pemilik:
      "Jl. Kp. Babakan Kel. Telajung Kec. Cikarang Barat Kab. Bekasi Timur. Jawa Barat",
    kode_pos_pemilik: "17530",
    rt_pemilik: "2",
    rw_pemilik: "2",
    nama_lengkap: "Thoba Zainul Basyar",
    no_telp: "088298813114",
    nik: "22222",
    tempat_lahir: "bekasi",
    tanggal_lahir: "2025-07-07",
    npwp: "1234",
    rules_10: "1",
    rules_11: "1",
    rules_3: "",
    rules_4: "",
    rules_5: "",
    rules_6: "",
    rules_7: "",
    rules_8: "",
    rules_9: "",
    status: "submit",
    no_telp_pemilik: "088298813114",
  },
};
const Detail = ({ formik }) => {
  const informasi_perseroan = [
    { label: "Nama Perseroan", value: formik?.values?.nama_perseroan || "-" },
    { label: "Email", value: formik?.values?.email || "-" },
    { label: "Nomor Telepon", value: formik?.values?.no_telp_kantor || "-" },
    { label: "Provinsi", value: formik?.values?.provinsi_kantor || "-" },
    { label: "Kabupaten/Kota", value: formik?.values?.kabupaten_kantor || "-" },
  ];

  const alamat_perseroan = [
    { label: "Kecamatan", value: formik?.values?.kecamatan_kantor || "-" },
    { label: "Kelurahan", value: formik?.values?.kelurahan_kantor || "-" },
    { label: "RT", value: formik?.values?.rt_kantor || "-" },
    { label: "RW", value: formik?.values?.rw_kantor || "-" },
    { label: "Kode POS", value: formik?.values?.kode_pos_kantor || "-" },
    { label: "Alamat", value: formik?.values?.alamat_kantor || "-" },
  ];

  const informasi_pemilik_usaha = [
    { label: "Nama Lengkap", value: formik?.values?.nama_lengkap || "-" },
    { label: "NIK", value: formik?.values?.nik || "-" },
    { label: "NPWP", value: formik?.values?.npwp || "-" },
    { label: "Jabatan", value: formik?.values?.jabatan || "-" },
    { label: "Nomor Telepon", value: formik?.values?.no_telp || "-" },
    { label: "Tempat Lahir", value: formik?.values?.tempat_lahir || "-" },
    { label: "Tanggal Lahir", value: formik?.values?.tanggal_lahir || "-" },
  ];

  const alamat_pemilik_usaha = [
    { label: "Provinsi", value: formik?.values?.provinsi_pemilik || "-" },
    {
      label: "Kabupaten/Kota",
      value: formik?.values?.kabupaten_pemilik || "-",
    },
    { label: "Kecamatan", value: formik?.values?.kecamatan_pemilik || "-" },
    { label: "Kelurahan", value: formik?.values?.kelurahan_pemilik || "-" },
    { label: "RT", value: formik?.values?.rt_pemilik || "-" },
    { label: "RW", value: formik?.values?.rw_pemilik || "-" },
    { label: "Kode POS", value: formik?.values?.kode_pos_pemilik || "-" },
    { label: "Alamat", value: formik?.values?.alamat_pemilik || "-" },
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
    <div className="mt-5 mb-3 px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        <Row>
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
                    formik?.values?.total_modal_usaha || "0"
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
              data={formik?.values?.kegiatan_usaha}
              formik={formik}
              showSelect={false}
            />
          </Col>

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
