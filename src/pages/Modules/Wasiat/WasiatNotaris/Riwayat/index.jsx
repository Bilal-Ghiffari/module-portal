import { dataPelaporan } from "./dummy";
import { Container } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FilterList } from "@mui/icons-material";
import CustomTableWasiat from "../../components/Table";

const pelaporanColumns = (handleAction) => [
  { id: "no", label: "No" },
  { id: "tanggalPelaporan", label: "Tanggal Pelaporan" },
  { id: "jenisPelaporan", label: "Jenis Pelaporan" },
  { id: "namaPemberi", label: "Nama Pemberi" },
  { id: "nomorAkta", label: "Nomor Akta" },
  { id: "tanggalAkta", label: "Tanggal Akta" },
  { id: "reportorium", label: "Reportorium" },
  { id: "jenisAkta", label: "Jenis Akta" },
  { id: "jenisWasiat", label: "Jenis Wasiat" },
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

const ListPermohonanPage = () => {
  const navigate = useNavigate();

  const handleAction = (type, row) => {
    if (type === "detail") {
      navigate(`/wasiat/riwayat/${row.no}`);
    }
  };

  return (
    <Container className="page-content bg-white px-4" fluid>
      <div className="my-2">
        <CustomTableWasiat
          data={dataPelaporan}
          title="Riwayat Laporan"
          columns={pelaporanColumns(handleAction)}
          enableSearch={true}
          searchKeys={["namaPemberi"]}
          enablePagination={true}
          rowsPerPage={5}
          emptyMessage="Tidak ada laporan yang cocok dengan pencarian Anda."
          topBarAction={
            <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
              <div className="d-flex flex-row align-items-center">
                <CustomButton
                  text={"Filter"}
                  textColor="#6D6D6D"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  leftIcon={<FilterList size={15} />}
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
