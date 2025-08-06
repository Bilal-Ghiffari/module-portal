import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Toggle from "@/components/Common/Toggle";
import { Chip } from "@mui/material";

export const getValidasiCol = () => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "Nomor Permohonan", label: "Nomor Permohonan", align: "left" },
  {
    id: "Jenis Dokumen",
    label: "Jenis Dokumen",
    align: "left",
  },
  { id: "Nama Dokumen", label: "Nama Dokumen", align: "left" },
  {
    id: "Nama Pemilik Dokumen",
    label: "Nama Pemilik Dokumen",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.nama_pemilik_document} arrow>
        <span
          style={{
            display: "inline-block",
            maxWidth: "200px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {row.nama_pemilik_document}
        </span>
      </CustomTooltipMui>
    ),
  },
  { id: "Nama Pejabat", label: "Nama Pejabat", align: "left" },
  {
    id: "Jabatan",
    label: "Jabatan",
    align: "left",
  },
  {
    id: "Lembaga",
    label: "Lembaga",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.lembaga} arrow>
        <span
          style={{
            display: "inline-block",
            maxWidth: "200px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {row.lembaga}
        </span>
      </CustomTooltipMui>
    ),
  },
  {
    id: "Aksi",
    label: "Aksi",
    align: "left",
  },
];

export const getVerifikasiCol = () => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  {
    id: "Tipe Dokumen",
    label: "Tipe Dokumen",
    align: "left",
  },
  {
    id: "Jenis Dokumen",
    label: "Jenis Dokumen",
    align: "left",
  },
  { id: "Nama Dokumen", label: "Nama Dokumen", align: "left" },
  {
    id: "Nama Pemilik Dokumen",
    label: "Nama Pemilik Dokumen",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.nama_pemilik_document} arrow>
        <span
          style={{
            display: "inline-block",
            maxWidth: "200px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {row.nama_pemilik_document}
        </span>
      </CustomTooltipMui>
    ),
  },
  { id: "Nomor Dokumen", label: "Nomor Dokumen", align: "left" },
  { id: "Jumlah Dokumen", label: "Jumlah Dokumen", align: "left" },
  { id: "Tanggal Dokumen", label: "Tanggal Dokumen", align: "left" },
  {
    id: "Status",
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
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "#1F7C4D",
          width: "120px",
        }}
      />
    ),
  },
];
