import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import { Chip } from "@mui/material";

const SectionRiwayatPermohonan = ({ applications }) => {
  const applicationColumns = [
    { id: "no", label: "No" },
    { id: "name", label: "Nama Lengkap" },
    { id: "applicationNumber", label: "No. Permohonan" },
    { id: "date", label: "Tanggal Permohonan" },
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

  return (
    <CustomTableDashboard
      data={applications}
      title="Riwayat Permohonan"
      columns={applicationColumns}
      enableSearch={true}
      searchKeys={["name", "applicationNumber"]} // Specify which keys to search
      enablePagination={true} // Enable pagination
      rowsPerPage={5} // Set 5 rows per page
      emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
    />
  );
};

export default SectionRiwayatPermohonan;
