import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Toggle from "@/components/Common/Toggle";
import { Chip } from "@mui/material";

export const getDaftarTransaksiPP = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_perseroan", label: "Nama Perseroan", align: "left" },
  { id: "nama_pemilik", label: "Nama Pemilik", align: "left" },
  { id: "no_sertifikat", label: "No. Sertifikat Terakhir", align: "left" },
  { id: "kota", label: "Kota", align: "left" },
  {
    id: "modal",
    label: "Modal",
    align: "left",
    cell: (row, index) => (
      <div className="d-flex">
        <p className="m-0 p-0">{row.modal}</p>
      </div>
    ),
  },
  { id: "data_bo", label: "Data BO", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "100px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("detail")}
            className="mdi mdi-eye-outline fs-4"
          ></i>
        </div>
        <div
          onClick={() => handle("edit")}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-pencil fs-4"></i>
        </div>
        <div
          onClick={() => handle("delete")}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-trash-alt fs-4"></i>
        </div>
      </div>
    ),
  },
];
export const getDaftarUserPP = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_pemilik", label: "Nama Pemilik", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "npwp", label: "NPWP", align: "left" },
  { id: "tanggal_lahir", label: "Tanggal Lahir", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Aktif"}
        size="small"
        style={{
          backgroundColor: "#D8F3E0",
        }}
        sx={{
          width: "100px",
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "#1F7C4D",
        }}
      />
    ),
  },
  { id: "jumlah_ptp", label: "Jumlah PTP", align: "left" },
];

export const getDaftarLaporanKeuanganCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_perseroan", label: "Nama Perseroan", align: "left" },
  { id: "nama_pemilik", label: "Nama Pemilik", align: "left" },
  { id: "kota", label: "Kota", align: "left" },
  { id: "periode", label: "Periode", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "200px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("detail", row.id)}
            className="mdi mdi-eye-outline fs-4"
          ></i>
        </div>
      </div>
    ),
  },
];
export const getRiwayatLaporanKeuanganCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_perseroan", label: "Nama Perseroan", align: "left" },
  { id: "nama_pemilik", label: "Nama Pemilik", align: "left" },
  { id: "kota", label: "Kota", align: "left" },
  { id: "tanggal_transaksi", label: "Tanggal Transaksi", align: "left" },
  { id: "periode", label: "Periode", align: "left" },
  { id: "status", label: "Status", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "200px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("detail", row.id)}
            className="mdi mdi-eye-outline fs-4"
          ></i>
        </div>
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("download", row.id)}
            className="bx bx-download fs-4"
          ></i>
        </div>
      </div>
    ),
  },
];

export const getDaftarStatusPerseroanCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_perseroan", label: "Nama Perseroan", align: "left" },
  { id: "nama_pemilik", label: "Nama Pemilik", align: "left" },
  { id: "no_transaksi", label: "No. Transaksi", align: "left" },
  { id: "no_sertifikat", label: "No. Sertifikat Terakhir", align: "left" },
  { id: "sumber", label: "Sumber", align: "left" },
  { id: "pemohon", label: "Pemohon", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Aktif"}
        size="small"
        style={{
          backgroundColor: "#D8F3E0",
        }}
        sx={{
          width: "100px",
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "#1F7C4D",
        }}
      />
    ),
  },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "100px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("detail", row.id)}
            className="mdi mdi-eye-outline fs-4"
          ></i>
        </div>
        <div
          onClick={() => handle("edit", row.id)}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-pencil fs-4"></i>
        </div>
        <div
          onClick={() => handle("delete", row.id)}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-trash-alt fs-4"></i>
        </div>
      </div>
    ),
  },
];
export const getRiwayatStatusPerseroanCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_perseroan", label: "Nama Perseroan", align: "left" },
  { id: "nama_pemilik", label: "Nama Pemilik", align: "left" },
  { id: "pemohon", label: "Pemohon", align: "left" },
  { id: "sumber", label: "Sumber", align: "left" },
  {
    id: "alasan_perubahan",
    label: "Alasan Perubahan",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.alasan_perubahan} arrow>
        <span
          style={{
            display: "inline-block",
            maxWidth: "200px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {row.alasan_perubahan}
        </span>
      </CustomTooltipMui>
    ),
  },
  { id: "no_voucher", label: "No. Voucher", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Aktif"}
        size="small"
        style={{
          backgroundColor: "#D8F3E0",
        }}
        sx={{
          width: "100px",
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "#1F7C4D",
        }}
      />
    ),
  },
];
