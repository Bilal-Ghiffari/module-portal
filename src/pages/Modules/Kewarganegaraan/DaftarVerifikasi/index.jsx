import { categoryFilter, dataVerifikasi } from "./dummy";
import { Chip } from "@mui/material";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsDownload, BsEye, BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FilterList } from "@mui/icons-material";
import FilterSection from "../Dashboard/components/views/FilterSection";
import CustomTableKewarganegaraan from "../Dashboard/components/Table";
import { useState } from "react";
import { useDaftarVerifikasi } from "./hooks/useDaftarVerifikasi";

const applicationColumns = (handleAction) => [
  { id: "no", label: "No" },
  { id: "noPermohonan", label: "No Permohonan" },
  { id: "namaPemohon", label: "Nama Pemohon" },
  { id: "jenisPemohon", label: "Jenis Pemohon" },
  { id: "wilayahPermohon", label: "Wilayah Pemohon" },
  { id: "tanggalPemohon", label: "Tanggal Pemohon" },
  {
    id: "verifikasi",
    label: "Verifikasi",
    renderCell: (verifikasiArray, row) => (
      <div style={{ display: "flex", gap: 4 }}>
        {verifikasiArray.map((v, index) => (
          <Chip
            key={index}
            size="small"
            label={v.step}
            style={{
              backgroundColor: v.color,
              color: "white",
              height: 20,
              minWidth: 20,
              borderRadius: "50%",
              padding: 0,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "aksi",
    label: "Aksi",
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

const label = [
  { id: 1, label: "Belum Proses", color: "#B0B0B0" },
  { id: 2, label: "Diterima", color: "#2E9860" },
  { id: 3, label: "Ditolak", color: "#E45957" },
];

const ListPermohonanPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { data, loading, error, pagination } = useDaftarVerifikasi({
    page: page,
    limit: limit,
  });

  const mapApiDataToTable = (apiData) => {
    if (!apiData) return [];

    const rawData = Array.isArray(apiData) ? apiData : [apiData];

    return rawData.map((item, index) => ({
      id: item.id_permohonan,
      no: index + 1,
      noPermohonan: item.id_permohonan,
      namaPemohon: item.nama_lengkap_pemohon,
      jenisPemohon: item.email_pemohon,
      wilayahPermohon: item.kab_kota_pemohon_text || item.provinsi_pemohon_text,
      tanggalPemohon: new Date(item.tgl_lahir_pemohon)
        .toISOString()
        .split("T")[0],
      verifikasi: generateVerificationSteps(item.status_aktivitas),
    }));
  };

  const generateVerificationSteps = (status) => {
    const totalSteps = 7;

    return Array.from({ length: totalSteps }).map((_, i) => {
      let color = "#B0B0B0";
      if (i + 1 < status) color = "#2E9860";
      else if (i + 1 === status) color = "#2E9860";
      return { step: i + 1, color };
    });
  };

  console.log(data);
  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(
        `/kewarganegaraan/daftar-verifikasi/detail-verifikasi/${row.id}`
      );
    }
  };

  return (
    <Container className="page-content bg-white px-4" fluid>
      <div className="my-2">
        <FilterSection data={categoryFilter} />
      </div>
      <div className="my-2">
        <CustomTableKewarganegaraan
          data={mapApiDataToTable(data)}
          title="Daftar Verifikasi"
          columns={applicationColumns(handleAction)}
          enableSearch={true}
          searchKeys={["name", "applicationNumber"]}
          enablePagination={true}
          rowsPerPage={5}
          loading={loading}
          url="/kewarganegaraan/daftar-verifikasi/detail-verifikasi"
          emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
          topBarAction={
            <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
              <div className="d-flex flex-row align-items-center border border-1 rounded-2 p-1">
                {label.map((l) => (
                  <div
                    key={l.id}
                    className="p-1 d-flex align-items-center"
                    style={{ gap: 8 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: l.color,
                      }}
                    />
                    <span style={{ fontSize: 14 }}>{l.label}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-row align-items-center">
                <CustomButton
                  text={"Filter"}
                  textColor="#6D6D6D"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  leftIcon={<FilterList size={15} />}
                />
                <CustomButton
                  text={"Download"}
                  textColor="#6D6D6D"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  leftIcon={<BsDownload size={15} />}
                />
                <CustomButton
                  text={"Tambah"}
                  textColor="#6D6D6D"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  leftIcon={<BsPlus size={15} />}
                />
              </div>
            </div>
          }
        />
      </div>
    </Container>
  );
};

export default ListPermohonanPage;
