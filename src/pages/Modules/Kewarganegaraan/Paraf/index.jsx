import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import { dummyParaf } from "./dummy";
import { FormControlLabel } from "@mui/material";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsEye, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import IOSSwitch from "@/components/Common/Switch";
import { DriveFileRenameOutlineRounded, FilterList } from "@mui/icons-material";
import TambahDaftar from "./TambahDaftar";

const applicationColumns = (handleAction) => [
  { id: "no", label: "No" },
  { id: "jabatan", label: "Jabatan" },
  { id: "nama", label: "Nama" },
  { id: "tanggal_unggah", label: "Tanggal Unggah" },
  {
    id: "status",
    label: "Status",
    renderCell: (value, row) => (
      <FormControlLabel control={<IOSSwitch checked={row.status} readOnly />} />
    ),
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
          leftIcon={<BsEye />}
          bgColor="transparent"
          textColor="#1E3E8A"
          border="1px solid #E7E7E7"
          sx={{ padding: 0 }}
        />
        <CustomButton
          leftIcon={<DriveFileRenameOutlineRounded />}
          bgColor="transparent"
          textColor="#1F7C4D"
          border="1px solid #E7E7E7"
          sx={{ padding: 0 }}
        />
        <CustomButton
          leftIcon={<BsTrash />}
          bgColor="transparent"
          textColor="#CF3533"
          border="1px solid #E7E7E7"
          sx={{ padding: 0 }}
        />
      </div>
    ),
  },
];

const DaftarParafPage = () => {
  const navigate = useNavigate();

  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(`/pewarganegaraan/admin/verifikasi/${row.no}`);
    }
  };

  return (
    <Container className="page-content bg-white" fluid>
      <CustomTableDashboard
        data={dummyParaf}
        title="Daftar Paraf Verifikator"
        columns={applicationColumns(handleAction)}
        enableSearch={true}
        searchKeys={["name", "applicationNumber"]}
        emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
        topBarAction={
          <div className="d-flex align-items-center">
            <CustomButton
              text={"Filter"}
              textColor="#6D6D6D"
              bgColor="transparent"
              border="1px solid #E7E7E7"
              leftIcon={<FilterList size={15} />}
            />
            <TambahDaftar />
          </div>
        }
      />
    </Container>
  );
};

export default DaftarParafPage;
