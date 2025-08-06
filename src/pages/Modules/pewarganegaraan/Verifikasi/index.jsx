import { Chip } from "@mui/material";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDaftarVerifikasi } from "./hooks/useDaftarVerifikasi";
import CustomTablePewarganegaraan from "../Dashboard/components/Table";
import { useState } from "react";

const applicationColumns = (handleAction) => [
  { id: "no", label: "No" },
  { id: "noRekomendasi", label: "Nomor Rekomendasi" },
  { id: "namaLengkap", label: "Nama Lengkap" },
  { id: "emailPemohon", label: "Email Pemohon" },
  { id: "tanggalLahir", label: "Tanggal Lahir" },
  { id: "negaraAsal", label: "Negara Asal" },
  {
    id: "verifikasi",
    label: "Verifikasi",
    renderCell: (statusAktivitas) => {
      const totalSteps = 5;

      return (
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= statusAktivitas;

            return (
              <Chip
                key={index}
                size="small"
                label={stepNumber}
                style={{
                  backgroundColor: isActive ? "#2E9860" : "#B0B0B0",
                  color: "white",
                  height: 20,
                  minWidth: 20,
                  borderRadius: "50%",
                  padding: 0,
                }}
              />
            );
          })}
        </div>
      );
    },
  },
  {
    id: "action",
    label: "Action",
    renderCell: (value, row) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "8px",
          width: "auto",
        }}
      >
        <CustomButton
          text={"Lihat Detail"}
          leftIcon={<BsEye />}
          bgColor="transparent"
          textColor="#1E3E8A"
          border="1px solid #E7E7E7"
          sx={{ padding: 0.5 }}
          onClick={() => handleAction("detail", row)}
        />
      </div>
    ),
  },
];

const VerifikasiPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { data, loading, error, pagination } = useDaftarVerifikasi({
    page: page,
    limit: limit,
  });

  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(`/pewarganegaraan/admin/verifikasi/${row.id}`);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
  };

  const mappedData = data?.map((item, index) => ({
    id: item.id_permohonan,
    no: index + 1,
    noRekomendasi: item.no_skim,
    namaLengkap: item.nama_lengkap_pemohon,
    emailPemohon: item.email_pemohon || "-",
    tanggalLahir: item.tgl_lahir_pemohon,
    negaraAsal: item.kewarganegaraan_asal_pemohon_text,
    verifikasi: item.status_aktivitas,
  }));

  const label = [
    { id: 1, label: "Belum Proses", color: "#B0B0B0" },
    { id: 2, label: "Diterima", color: "#2E9860" },
    { id: 3, label: "Ditolak", color: "#E45957" },
  ];

  return (
    <Container className="page-content bg-white" fluid>
      <CustomTablePewarganegaraan
        data={mappedData}
        totalItems={pagination.totalData}
        currentPage={page}
        itemsPerPage={limit}
        title="Riwayat Permohonan"
        columns={applicationColumns(handleAction)}
        enableSearch={true}
        searchKeys={["nama_lengkap", "negara_asal"]}
        enablePagination={true}
        url="/pewarganegaraan/dashboard/detail-permohonan"
        emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        loading={loading}
      />
    </Container>
  );
};

export default VerifikasiPage;
