import { Chip } from "@mui/material";
import CustomTableKewarganegaraan from "../components/Table";
import { useDaftarPermohonan } from "./hooks/useDaftarPermohonan";
import { useState } from "react";
import { getStatusColor, statusLabel } from "../utils/label";
import { CustomButton } from "@/components/Common/Button";
import { BsPencilSquare } from "react-icons/bs";

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
  // {
  //   id: "aksi",
  //   label: "Aksi",
  //   renderCell: () => (
  //     <CustomButton
  //       leftIcon={<BsPencilSquare />}
  //       bgColor="transparent"
  //       textColor="#FF9B2F"
  //       border="1px solid #E7E7E7"
  //       sx={{ padding: 0.5 }}
  //     />
  //   ),
  // },
];

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
        status: item.status_permohonan_text,
        statusColor: bgColor,
        textColor: textColor,
      };
    }) || [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <CustomTableKewarganegaraan
      data={mappedApplications}
      totalItems={pagination.totalData}
      currentPage={page}
      itemsPerPage={limit}
      title="Riwayat Permohonan"
      columns={applicationColumns}
      enableSearch={true}
      searchKeys={["name", "applicationNumber"]}
      enablePagination={true}
      url="/kewarganegaraan/dashboard/detail-permohonan"
      emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
      onPageChange={handlePageChange}
      loading={loading}
    />
  );
};

export default SectionRiwayatPermohonan;
