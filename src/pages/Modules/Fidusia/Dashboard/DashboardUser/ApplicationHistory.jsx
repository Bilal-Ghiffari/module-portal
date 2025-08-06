import CustomTablePewarganegaraan from "../components/Table";
import { Chip } from "@mui/material";
import { useDaftarPermohonan } from "./hooks/useDaftarPermohonan";
import { useState } from "react";
import { getStatusColor, statusLabel } from "../utils/label";

const SectionRiwayatPermohonan = ({ applications }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, loading, error, pagination } = useDaftarPermohonan({
    page,
    limit,
  });

  const mappedApplications =
    data?.map((item, index) => {
      const { bgColor, textColor } = getStatusColor(item.status_permohonan);
      return {
        no: (page - 1) * limit + index + 1,
        id_permohonan: item.id_permohonan,
        nama_lengkap_pemohon: item.nama_lengkap_pemohon,
        created_at: new Date(item.created_at).toLocaleDateString("id-ID"),
        status: statusLabel(item.status_permohonan),
        statusColor: bgColor,
        textColor: textColor,
      };
    }) || [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
  };

  const applicationColumns = [
    { id: "no", label: "No" },
    { id: "nama_lengkap_pemohon", label: "Nama Lengkap" },
    { id: "id_permohonan", label: "id_permohonan" },
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
            borderRadius: "4px",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      ),
    },
  ];

  return (
    <CustomTablePewarganegaraan
      data={mappedApplications}
      totalItems={pagination.totalData}
      currentPage={page}
      itemsPerPage={limit}
      title="Riwayat Permohonan"
      columns={applicationColumns}
      enableSearch={true}
      searchKeys={["nama_lengkap", "negara_asal"]}
      enablePagination={true}
      url="/pewarganegaraan/dashboard/detail-permohonan"
      emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      loading={loading}
    />
  );
};

export default SectionRiwayatPermohonan;
