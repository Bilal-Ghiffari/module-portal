import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import TableListNew from "@/components/Common/TableListNew";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import {
  formatTanggal,
  getStatusStyle,
  removeUnderscore,
} from "@/helpers/services/convert";
import ActionComp from "@/pages/Modules/Perseroan/Perorangan/Dashboard/DashboardUser/Components/ActionComp";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { apiDeleteistApostillePermohonanRiwayat } from "@/helpers/backend_helper";

dayjs.locale("id");
const SectionRiwayatPermohonan = ({ data, fetchData, setQuery, query }) => {
  const navigate = useNavigate();
  const toastifyService = new ToastifyService();
  const handle = (type, id) => {
    switch (type) {
      case "delete":
        toastifyService.confirmationDelete().then((res) => {
          if (res) {
            apiDeleteistApostillePermohonanRiwayat(id)
              .then((res) => {
                console.log("res");
                fetchData(query);
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        });

        break;
      case "update":
        navigate(`/apostille/pendaftaran`, {
          state: { id, type },
        });

        break;
      default:
        break;
    }
  };

  const columns = [
    { id: "no", label: "No" },
    { id: "fullname_pemohon", label: "Nama Pemohon", width: "150px" },
    {
      id: "jenis_permohonan",
      label: "Jenis Permohonan",
      cell: (row, index) => {
        return (
          <p className="m-0 p-0">{removeUnderscore(row.jenis_permohonan)}</p>
        );
      },
    },
    { id: "id_jenis_dokumen", label: "Jenis Dokumen" },
    { id: "jenis_layanan", label: "Jenis Layanan" },
    {
      id: "created_at",
      label: "Tanggal Permohonan",
      width: "120px",
      cell: (row, index) => {
        return <p className="m-0 p-0">{formatTanggal(row.created_at)} </p>;
      },
    },
    {
      id: "status_permohonan",
      label: "Status",
      cell: (row, index) => {
        const { backgroundColor, color } = getStatusStyle(
          row.status_permohonan
        );

        return (
          <Chip
            label={removeUnderscore(row.status_permohonan)}
            size="small"
            style={{
              backgroundColor,
            }}
            sx={{
              fontWeight: 500,
              fontFamily: "Poppins",
              fontSize: "12px",
              color,
              width: "180px",
              textTransform: "capitalize",
            }}
          />
        );
      },
    },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      cell: (row, index) => <ActionComp handle={handle} row={row} />,
      isNotSticky: true,
    },
  ];

  const handlePageChange = (page) => {
    const newQuery = { ...query, page };
    setQuery(newQuery);
  };

  console.log("data", data.data);

  return (
    <TableListNew
      url="/apostille/detail-permohonan"
      data={data?.data}
      totalData={data?.total_count}
      column={columns}
      isServerSide
      onPageChange={handlePageChange}
      page={query?.page}
      limit={query?.limit}
    />
  );
};

export default SectionRiwayatPermohonan;
