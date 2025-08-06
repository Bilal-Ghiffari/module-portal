import { Box, TextField, Typography } from "@mui/material";
import TableKegiatanUsaha from "./Components/TableKegiatanUsaha";
import {
  getDaftarPermohonan,
  getDaftarSertifikat,
  getDaftarCetakSticker,
  getDetailPermohonan,
  getPetugasPermohonan,
} from "./Components/Columns";
import { useFormik } from "formik";
import { useState } from "react";
import { useMemo } from "react";
import PopupCRUD from "./Components/PopupCRUD";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { mockDropdown } from "../Dashboard/DashboardAdmin/mock";
import Header from "@/components/Header";
import Section from "../Components/Detail/Section";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import ButtonCustom from "@/components/Common/ButtonCustom";
export const dummy = [
  {
    id: 1,
    no_permohonan: "PRM-2024-001",
    nama_pemohon: "Budi Santoso",
    nama_dokumen: "Surat Kuasa Direksi",
    tipe_dokumen: "PDF",
    nama_pejabat: "Drs. Andi Wijaya, SH., MH.",
    tanggal_permohonan: "2024-06-20",
    status: "Terverifikasi",
    no_transaksi: "TRX-2024-8891",
    no_voucher: "VC-2024-555",
    no_sertifikat: "SR-2024-00123",
    tanggal_pembayaran: "2024-06-25",
    status_pembayaran: "Sudah Bayar",
    no_pemohon: "NP-2024-2233",
    jumlah_dokumen: "3/10",
    tahap: "Verifikasi Dokumen",
    petugas: "Admin AHU",
    keterangan: "Dokumen diterima dan diverifikasi",
    waktu: "2024-06-21 09:35",
  },
];

const DynamicMenu = ({ label = "" }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handle = (status, id) => {
    switch (status) {
      case "detail":
        if (label == "Daftar Cetak Sticker Legalisasi") {
          navigate(`/apostille/cetak-sticker/${id}`);
        } else if (label == "Daftar Cetak Sertifikat Apostille") {
          navigate(`/apostille/cetak-sertifikat/${id}`);
        } else if (label.includes("Detail Permohonan")) {
          setOpen(true);
        } else {
          navigate(`/apostille/detail-permohonan/${id}`);
        }
        break;
      case "riwayat":
        setStatus("riwayat");
        setOpen(true);
        break;
      case "delete":
        toastifyService.info("API belum tersedia");
        break;

      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      jenis_permohonan: "apostille",
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [label]);

  const configColumn = {
    "Daftar Permohonan": getDaftarPermohonan({ handle }),
    "Daftar Verifikasi": getDaftarPermohonan({ handle }),
    "Daftar Sertifikat": getDaftarSertifikat({ handle }),
    "Daftar Cetak Sticker Legalisasi": getDaftarCetakSticker({ handle }),
    "Daftar Cetak Sertifikat Apostille": getDaftarCetakSticker({ handle }),
    "Detail Permohonan Legalisasi": getDetailPermohonan({ handle }),
    "Detail Permohonan Apostille": getDetailPermohonan({ handle }),
    "Penugasan Permohonan": getPetugasPermohonan(),
  };
  const column = configColumn[label] || {};

  const filteredData = useMemo(() => {
    if (!searchTerm) return dummy;
    const lowerSearch = searchTerm.toLowerCase();
    return dummy.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [dummy, searchTerm]);

  const listLabels = [
    "Daftar Sertifikat",
    "Daftar Cetak Sticker Legalisasi",
    "Daftar Cetak Sertifikat Apostille",
    "Detail Permohonan Legalisasi",
    "Detail Permohonan Apostille",
    // "Penugasan Permohonan",
  ];

  const informasi_pemohon_left = [
    { label: "Nama Lengkap", value: formik?.values?.nama_lengkap || "-" },
    { label: "NIK", value: formik?.values?.nik || "-" },
    {
      label: "Jenis Dokumen",
      value: formik?.values?.jenis_dokumen || "-",
    },
    {
      label: "Singkatan Dokumen",
      value: formik?.values?.singkatan_dokumen || "-",
    },
  ];
  const informasi_pemohon_right = [
    {
      label: "Tipe Dokumen",
      value: formik?.values?.tipe_dokumen || "-",
    },
    {
      label: "Nama yang tertera di Dokumen",
      value: formik?.values?.tipe_dokumen || "-",
    },
    {
      label: "Nama Dokumen",
      value: formik?.values?.nama_dokumen || "-",
    },
    {
      label: "Tanggal Dokumen",
      value: formik?.values?.tanggal_dokumen || "-",
    },
  ];

  return (
    <div className="page-content">
      <Typography
        sx={{
          fontSize: "1.2rem",
          px: 0,
          fontFamily: "Poppins",
        }}
        className="fw-semibold mb-2 text-capitalize"
      >
        {label} {!listLabels.includes(label) && formik.values.jenis_permohonan}
      </Typography>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <TextField
          size="small"
          placeholder="Cari..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
        <div className="d-flex align-items-center gap-3">
          {!listLabels.includes(label) && (
            <DynamicDropdown
              formik={formik}
              fieldName={"jenis_permohonan"}
              data={mockDropdown}
              label="Layanan"
              required
            />
          )}
          {label == "Penugasan Permohonan" && (
            <div className="mt-2">
              <ButtonCustom
                onClick={() => setOpen(!open)}
                label="Tetapkan Petugas Baru"
              />
            </div>
          )}
          {/* <DatePicker
            text="Tanggal Awal"
            handleChange={(e) => { 
              const val = e.target.value;
              const formatted = val ? dayjs(val).format("YYYY-MM-DD") : "";
              formik.setFieldValue("start_date", formatted);
            }}
            value={formik.values?.start_date}
          />
          <DatePicker
            text="Tanggal Akhir"
            handleChange={(e) => {
              const val = e.target.value;
              const formatted = val ? dayjs(val).format("YYYY-MM-DD") : "";
              formik.setFieldValue("end_date", formatted);
            }}
            value={formik.values?.end_date}
          /> */}
          {/* {label == "Daftar Permohonan Apostille" && (
            <ButtonCustom
              onClick={() => {
                setOpen(!open);
                setStatus("Tambah");
              }}
              label="+ Tambah"
            />
          )} */}
        </div>
      </div>
      {label.includes("Detail Permohonan") && (
        <Box
          className="mb-2"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 2, // padding opsional
            backgroundColor: "#fff", // opsional
          }}
        >
          <Row>
            <Col xs="12">
              <Header label={"Informasi Formasi"} />
            </Col>
            <Col xs="12" md="6">
              <Section data={informasi_pemohon_left} />
            </Col>
            <Col xs="12" md="6">
              <Section data={informasi_pemohon_right} />
            </Col>
          </Row>
        </Box>
      )}
      <TableKegiatanUsaha data={filteredData} column={column} />
      <PopupCRUD setOpen={setOpen} open={open} status={status} label={label} />
    </div>
  );
};

export default DynamicMenu;
