import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import TableListNew from "@/components/Common/TableListNew";
import { Chip } from "@mui/material";
import ActionComp from "./ActionComp";
import { postFormData } from "@/helpers/api_helper";
import { apiDeletePerseroanPerorangan } from "@/helpers/backend_helper";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { successMsg } from "@/helpers/Notification/toastNotification";
import { useNavigate } from "react-router-dom";
import { getStatusStyle, removeUnderscore } from "@/helpers/services/convert";

const SectionRiwayatPermohonan = ({ data, fetchData, setQuery, query }) => {
  const navigate = useNavigate();
  const toastifyService = new ToastifyService();
  const handle = (type, id) => {
    switch (type) {
      case "delete":
        toastifyService.confirmationDelete().then((res) => {
          if (res) {
            apiDeletePerseroanPerorangan(id)
              .then((res) => {
                successMsg(res.message);
                fetchData();
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        });

        break;
      case "update":
        navigate(`/perseroan/perorangan/pendaftaran`, {
          state: { id, type },
        });

        break;
      default:
        break;
    }
  };

  const columns = [
    { id: "no", label: "No" },
    { id: "nama_perseroan", label: "Nama Perseroan", width: "150px" },
    { id: "nama_lengkap", label: "Nama Pemilik", width: "150px" },
    { id: "no_permohonan", label: "No. Permohonan", width: "150px" },
    { id: "created_at", label: "Tanggal Permohonan", width: "80px" },
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

  return (
    <TableListNew
      url="/perseroan/perorangan/detail-permohonan"
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
