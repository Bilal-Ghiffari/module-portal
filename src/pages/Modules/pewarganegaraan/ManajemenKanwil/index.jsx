import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import { kanwilDummy } from "./dummy";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import DetailKanwil from "./DetailKanwil";
import EditKanwil from "./EditKanwil";

const applicationColumns = (handleAction) => [
  { id: "no", label: "No" },
  { id: "wilayah", label: "Wilayah" },
  { id: "username", label: "Username" },
  { id: "tanggal_pembuatan", label: "Tanggal Pembuatan" },
  { id: "tanggal_update", label: "Tanggal Update" },
  { id: "terakhir_login", label: "Terakhir Login" },
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
        <DetailKanwil />
        <EditKanwil />
      </div>
    ),
  },
];

const ManajemenKanwilPage = () => {
  const navigate = useNavigate();

  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(`/pewarganegaraan/admin/daftar-sk-terbit/${row.no}`);
    }
  };
  return (
    <Container className="page-content bg-white" fluid>
      <CustomTableDashboard
        data={kanwilDummy}
        title="Manajemen Kanwil"
        columns={applicationColumns(handleAction)}
        enableSearch={true}
        searchKeys={["name", "applicationNumber"]}
        enablePagination={true}
        rowsPerPage={5}
        emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
        topBarAction={
          <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
            <div className="d-flex flex-row align-items-center">
              <CustomButton
                text={"Tambah"}
                textColor="#fff"
                bgColor="#041662"
                leftIcon={<BsPlus fontSize={"15px"} />}
                sx={{ padding: 0.5 }}
              />
            </div>
          </div>
        }
      />
    </Container>
  );
};

export default ManajemenKanwilPage;
