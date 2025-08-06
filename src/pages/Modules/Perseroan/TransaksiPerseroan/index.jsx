import { TextField, Typography } from "@mui/material";
import TableKegiatanUsaha from "./Components/TableKegiatanUsaha";
import {
  getDaftarLaporanKeuanganCol,
  getDaftarStatusPerseroanCol,
  getDaftarTransaksiPP,
  getDaftarUserPP,
  getRiwayatLaporanKeuanganCol,
  getRiwayatStatusPerseroanCol,
} from "./Components/Columns";
import { useFormik } from "formik";
import { useState } from "react";
import { useMemo } from "react";
import ButtonCustom from "../Perorangan/Components/ButtonCustom";
import PopupCRUD from "./Components/PopupCRUD";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import DatePicker from "@/components/Common/DatePicker";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const dummy = [
  {
    id: 1,
    nama_perseroan: "PT Sukses Selalu",
    nama_pemilik: "Budi Santoso",
    no_sertifikat: "SR-2024-00123",
    kota: "Jakarta",
    modal: "Rp 1.000.000.000",
    data_bo: "Data BO Contoh",
    email: "budi@example.com",
    npwp: "12.345.678.9-012.345",
    tanggal_lahir: "1985-06-15",
    tanggal_transaksi: "1985-06-15",
    jumlah_ptp: 5,
    periode: "2024-Q1",
    no_transaksi: "TRX-987654",
    sumber: "Manual",
    pemohon: "Budi Santoso",
    no_voucher: "VC-2024-555",
    alasan_perubahan: "Perubahan modal dan alamat kantor",
    status: "Aktif",
  },
];

const TransaksiPerseroan = ({ label = "" }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handle = (status, id) => {
    switch (status) {
      case "detail":
        if (label == "Daftar Status Perseroan") {
          navigate(
            `/perseroan/perorangan/transaksi-perseroan/daftar-status-pp/detail/${id}`
          );
        } else if (label == "Daftar Laporan Keuangan") {
          navigate(
            `/perseroan/perorangan/transaksi-perseroan/daftar-laporan-keuangan/detail/${id}`
          );
        } else {
          toastifyService.info("API Belum tersedia");
        }

        break;
      case "edit":
        setStatus("edit");
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
      status: false,
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [label]);

  const configColumn = {
    "Daftar Transaksi Perseroan Perorangan": getDaftarTransaksiPP({ handle }),
    "Daftar User Perseroan": getDaftarUserPP({ handle }),
    "Daftar Laporan Keuangan": getDaftarLaporanKeuanganCol({ handle }),
    "Riwayat Transaksi Laporan Keuangan PP": getRiwayatLaporanKeuanganCol({
      handle,
    }),
    "Daftar Status Perseroan": getDaftarStatusPerseroanCol({ handle }),
    "Riwayat Status PP": getRiwayatStatusPerseroanCol({ handle }),
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

  return (
    <div className="page-content">
      <Typography
        sx={{
          fontSize: "1.2rem",
          px: 0,
          fontFamily: "Poppins",
        }}
        className="fw-semibold mb-2"
      >
        {label}
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
          <DatePicker
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
          />
          {label == "Daftar Status Perseroan" && (
            <ButtonCustom
              onClick={() => {
                setOpen(!open);
                setStatus("Tambah");
              }}
              label="+ Tambah"
            />
          )}
        </div>
      </div>
      <TableKegiatanUsaha data={filteredData} column={column} />
      <PopupCRUD setOpen={setOpen} open={open} status={status} label={label} />
    </div>
  );
};

export default TransaksiPerseroan;
