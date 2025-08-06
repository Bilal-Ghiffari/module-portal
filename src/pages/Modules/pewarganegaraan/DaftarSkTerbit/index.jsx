import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import { daftarSkDummy } from "./dummy";
import { Chip } from "@mui/material";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsDownload, BsEye, BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FilterList } from "@mui/icons-material";
import { FaFilePdf } from "react-icons/fa";

const applicationColumns = (handleAction) => [
  { id: "no", label: "No" },
  { id: "no_tanggal_keputusan", label: "No Tanggal Keputusan" },
  { id: "no_permohonan", label: "No Permohonanan" },
  { id: "nama_pemohon", label: "Nama Pemohon" },
  { id: "negara_asal", label: "Negara Asal" },
  { id: "provinsi", label: "Provinsi" },
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
          text={""}
          leftIcon={<BsEye />}
          bgColor="transparent"
          textColor="#1E3E8A"
          border="1px solid #E7E7E7"
          sx={{ padding: 0 }}
          onClick={() => handleAction("detail", row)}
        />
        <CustomButton
          text={"Surat Keputusan"}
          leftIcon={<FaFilePdf />}
          bgColor="transparent"
          textColor="#1E3E8A"
          border="1px solid #E7E7E7"
          sx={{ padding: 0 }}
          onClick={() => handleAction("detail", row)}
        />
      </div>
    ),
  },
];

const DaftarSkTerbitPage = () => {
  const navigate = useNavigate();

  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(`/pewarganegaraan/admin/daftar-sk-terbit/${row.no}`);
    }
  };
  return (
    <Container className="page-content bg-white" fluid>
      <CustomTableDashboard
        data={daftarSkDummy}
        title="Daftar SK terbit"
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
                text={"Filter"}
                textColor="#6D6D6D"
                bgColor="transparent"
                border="1px solid #E7E7E7"
                leftIcon={<FilterList fontSize="10px" />}
                sx={{ padding: 0.5 }}
              />
              <CustomButton
                text={"Download"}
                textColor="#6D6D6D"
                bgColor="transparent"
                border="1px solid #E7E7E7"
                leftIcon={<BsDownload fontSize={"10px"} />}
                sx={{ padding: 0.5 }}
              />
            </div>
          </div>
        }
      />
    </Container>
  );
};

export default DaftarSkTerbitPage;
