import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import { dataVerifikasi } from "./dummy";
import { Chip } from "@mui/material";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsDownload, BsEye, BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FilterList } from "@mui/icons-material";

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

const label = [
  { id: 1, label: "Belum Proses", color: "#B0B0B0" },
  { id: 2, label: "Diterima", color: "#2E9860" },
  { id: 3, label: "Ditolak", color: "#E45957" },
];

const ListPermohonanPage = () => {
  const navigate = useNavigate();

  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(`/pewarganegaraan/admin/verifikasi/${row.no}`);
    }
  };
  return (
    <Container className="page-content bg-white" fluid>
      <CustomTableDashboard
        data={dataVerifikasi}
        title="List Permohonan"
        columns={applicationColumns(handleAction)}
        enableSearch={true}
        searchKeys={["name", "applicationNumber"]}
        enablePagination={true}
        rowsPerPage={5}
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
    </Container>
  );
};

export default ListPermohonanPage;
