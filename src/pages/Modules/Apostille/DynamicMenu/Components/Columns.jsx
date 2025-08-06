import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Toggle from "@/components/Common/Toggle";
import { Chip } from "@mui/material";

export const getDaftarPermohonan = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "no_permohonan", label: "No. Permohonan", align: "left" },
  { id: "nama_pemohon", label: "Nama Pemohon", align: "left" },
  { id: "nama_dokumen", label: "Nama Dokumen", align: "left" },
  { id: "tipe_dokumen", label: "Tipe Dokumen", align: "left" },
  { id: "nama_pejabat", label: "Nama Pejabat", align: "left" },
  { id: "tanggal_permohonan", label: "Tanggal Permohonan", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Terverifikasi"}
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
        <CustomTooltipMui title="Detail" arrow>
          <div className="action-item d-flex align-items-center m-0 p-0">
            <i
              onClick={() => handle("detail", row.id)}
              className="mdi mdi-eye-outline fs-4"
            ></i>
          </div>
        </CustomTooltipMui>
        <CustomTooltipMui title="Riwayat" arrow>
          <div
            onClick={() => handle("riwayat", row.id)}
            className="action-item d-flex align-items-center m-0 p-0"
          >
            <i className="mdi mdi-menu fs-4"></i>
          </div>
        </CustomTooltipMui>
      </div>
    ),
  },
];
export const getDaftarSertifikat = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "no_transaksi", label: "No. Transaksi", align: "left" },
  { id: "no_voucher", label: "No. Voucher", align: "left" },
  { id: "nama_pemohon", label: "Nama Pemohon", align: "left" },
  { id: "no_sertifikat", label: "No. Sertifikat", align: "left" },
  { id: "tanggal_pembayaran", label: "Tanggal Pembayaran", align: "left" },
  {
    id: "status_pembayaran",
    label: "Status Pembayaran",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Sudah Bayar"}
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
        <CustomTooltipMui title="Detail" arrow>
          <div className="action-item d-flex align-items-center m-0 p-0">
            <i
              onClick={() => handle("detail", row.id)}
              className="mdi mdi-eye-outline fs-4"
            ></i>
          </div>
        </CustomTooltipMui>
      </div>
    ),
  },
];

export const getDaftarCetakSticker = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "no_pemohon", label: "No. Pemohon", align: "left" },
  { id: "nama_pemohon", label: "Nama Pemohon", align: "left" },
  { id: "nama_dokumen", label: "Nama Dokumen", align: "left" },
  { id: "jumlah_dokumen", label: "Jumlah Dokumen", align: "left" },
  { id: "nama_pejabat", label: "Nama Pejabat", align: "left" },
  { id: "tanggal_permohonan", label: "Tanggal Permohonan", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "100px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <CustomTooltipMui title="Detail" arrow>
          <div className="action-item d-flex align-items-center m-0 p-0">
            <i
              onClick={() => handle("detail", row.id)}
              className="mdi mdi-eye-outline fs-4"
            ></i>
          </div>
        </CustomTooltipMui>
      </div>
    ),
  },
];

export const getDetailPermohonan = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "no_transaksi", label: "No. Transaksi", align: "left" },
  { id: "no_voucher", label: "No. Voucher", align: "left" },
  { id: "no_legalisasi", label: "No. Legalisasi", align: "left" },
  {
    id: "status_cetak",
    label: "Status Cetak",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Sudah Bayar"}
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
  { id: "tanggal_cetak", label: "Tanggal Cetak", align: "left" },
  {
    id: "status_bayar",
    label: "Status Bayar",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Sudah Bayar"}
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
  { id: "tanggal_bayar", label: "Tanggal Bayar", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "100px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <CustomTooltipMui title="Detail" arrow>
          <div className="action-item d-flex align-items-center m-0 p-0">
            <i
              onClick={() => handle("detail", row.id)}
              className="mdi mdi-eye-outline fs-4"
            ></i>
          </div>
        </CustomTooltipMui>
      </div>
    ),
  },
];

export const getRiwayatPermohonan = () => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "tahap", label: "Tahap", align: "left" },
  { id: "petugas", label: "Petugas", align: "left" },
  { id: "keterangan", label: "Keterangan", align: "left" },
  { id: "waktu", label: "Waktu Aksi", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => (
      <Chip
        label={"Terverifikasi"}
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

export const getPetugasPermohonan = () => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "no_permohonan", label: "No. Permohonan", align: "left" },
  { id: "nama_pemohon", label: "Nama Pemohon", align: "left" },
  { id: "nama_dokumen", label: "Nama Dokumen", align: "left" },
  { id: "nama_pejabat", label: "Nama Pejabat", align: "left" },
  { id: "nama_petugas", label: "Nama Petugas", align: "left" },
  { id: "tanggal", label: "Tanggal", align: "left" },
];

