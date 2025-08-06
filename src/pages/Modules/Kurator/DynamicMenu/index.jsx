import { Box, TextField, Typography } from "@mui/material";
import TableKegiatanUsaha from "./Components/TableKegiatanUsaha";
import {
  getDaftarTransaksi,
  getDaftarLaporan,
  getRiwayatLaporan,
  getPengurusCol,
} from "./Components/Columns";
import { useFormik } from "formik";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "@/components/Common/ButtonCustom";
import DatePicker from "@/components/Common/DatePicker";
import dayjs from "dayjs";
import PopupCRUD from "./Components/PopupCRUD";

export const dummy = [
  {
    id: 1,
    no_transaksi: "TRX-2024-001",
    nama_pemohon: "Andi Wijaya",
    kabupaten_pemohon: "Kota Bandung",
    jenis_permohonan: "Permohonan Pailit",
    tanggal_permohonan: "2024-07-15",
    nama_putusan: "Putusan PN Jakarta Pusat",
    nama_debitor: "PT Maju Mundur",
    tanggal_putusan_pailit: "2024-06-01",
    tanggal_pengakhiran: "2024-07-01",
    transaksi_laporan: "Laporan Mingguan Kurator",
    data_laporan: "Rincian laporan pengelolaan harta debitor",
    tanggal_laporan: "2024-07-25",
    nama: "Andi Wijaya",
    nik: "3275012401990001",
    alamat: "Jl. Asia Afrika No. 10, Bandung",
    status: "Disetujui",
  },
];

const DynamicMenu = ({ label = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [actionRowId, setActionRowId] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const toggleActionMenu = (rowId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActionRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  const handle = (status, id) => {
    switch (status) {
      case "detail":
        navigate(`/kurator/detail/${id}`);
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

  const handleAdd = () => {
    setType(null);
    switch (label) {
      case "Daftar Laporan Kurator":
        navigate(`/kurator/tambah-laporan-kurator`);
        break;
      case "Daftar Laporan Pengurus":
        navigate(`/kurator/tambah-laporan-pengurus`);
        break;
      case "Riwayat Pelaporan Kurator":
      case "Ganti Kurator":
      case "Riwayat Pelaporan Pengurus":
      case "Ganti Pengurus":
        setOpen(true);

      default:
        break;
    }
  };

  const handleLaporanPengakhiran = (type) => {
    setType(type);
    switch (type) {
      case "Laporan Pengakhiran Kurator":
        setOpen(true);
      case "Laporan Pengakhiran Pengurus":
        setOpen(true);

      default:
        break;
    }
  };

  const configColumn = {
    "Daftar Transaksi": getDaftarTransaksi({ handle }),
    "Daftar Laporan Kurator": getDaftarLaporan({
      toggleActionMenu,
      actionRowId,
      type: "kurator",
      handleLaporanPengakhiran,
    }),
    "Daftar Laporan Pengurus": getDaftarLaporan({
      toggleActionMenu,
      actionRowId,
      type: "pengurus",
      handleLaporanPengakhiran,
    }),
    "Riwayat Pelaporan Kurator": getRiwayatLaporan({
      toggleActionMenu,
      actionRowId,
    }),
    "Ganti Kurator": getPengurusCol({
      toggleActionMenu,
      actionRowId,
    }),
    "Riwayat Pelaporan Pengurus": getRiwayatLaporan({
      toggleActionMenu,
      actionRowId,
    }),
    "Ganti Pengurus": getPengurusCol({
      toggleActionMenu,
      actionRowId,
    }),
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

  const labelList = [
    "Daftar Laporan Kurator",
    "Daftar Laporan Pengurus",
    // "Riwayat Pelaporan Kurator",
    "Ganti Kurator",
    // "Riwayat Pelaporan Pengurus",
    "Ganti Pengurus",
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
          {label == "Daftar Transaksi" && (
            <>
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
            </>
          )}
          {labelList.includes(label) && (
            <div className="mt-1">
              <ButtonCustom onClick={handleAdd} label="Tambah" />
            </div>
          )}
        </div>
      </div>
      <TableKegiatanUsaha data={filteredData} column={column} />
      <PopupCRUD setOpen={setOpen} open={open} label={label} type={type} />
    </div>
  );
};

export default DynamicMenu;
