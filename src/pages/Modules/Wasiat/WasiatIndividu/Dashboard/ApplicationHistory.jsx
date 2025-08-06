import { Chip } from "@mui/material";
import CustomTableWasiat from "../../components/Table";

const applicationColumns = [
  { id: "no", label: "No" },
  { id: "nama_lengkap_pemohon", label: "Nama Lengkap" },
  { id: "created_at", label: "Tanggal Permohonan" },
  {
    id: "status",
    label: "Status",
    renderCell: (status, row) => (
      <Chip
        label={status}
        size="small"
        style={{
          backgroundColor: row.statusColor,
        }}
        sx={{
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "12px",
          color: row.textColor,
        }}
      />
    ),
  },
];

const SectionRiwayatPermohonan = () => {
  return (
    <CustomTableWasiat
      data={[]}
      totalItems={20}
      currentPage={1}
      itemsPerPage={5}
      title="Riwayat Permohonan"
      columns={applicationColumns}
      enableSearch={true}
      searchKeys={["name", "applicationNumber"]}
      enablePagination={true}
      emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
    />
  );
};

export default SectionRiwayatPermohonan;
