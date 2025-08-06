import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Toggle from "@/components/Common/Toggle";
import { Chip } from "@mui/material";
import { capitalizeTheFirstLetterOfEachWord, getStatusStyle } from "@/helpers/services/convert";
import { Link } from "react-router-dom";

export const getDaftarTransaksi = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "no_transaksi", label: "No. Transaksi", align: "left" },
  { id: "nama_pemohon", label: "Nama Pemohon", align: "left" },
  { id: "kabupaten_pemohon", label: "Kabupaten Pemohon", align: "left" },
  { id: "jenis_permohonan", label: "Jenis Permohonan", align: "left" },
  { id: "tanggal_permohonan", label: "Tanggal", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => {
      const { backgroundColor, color } = getStatusStyle(row.status);

      return (
        <Chip
          label={row.status}
          size="small"
          style={{
            backgroundColor,
          }}
          sx={{
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "12px",
            color,
            width: "150px",
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
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <CustomTooltipMui title="Detail" arrow>
          <div className="action-item d-flex align-items-center m-0 p-0">
            <i
              onClick={() => handle("detail", row.id)}
              className="mdi mdi-eye-outline fs-4"
            ></i>
          </div>
        </CustomTooltipMui>
      </div>
    ),
  },
];

export const getDaftarLaporan = ({
  toggleActionMenu,
  actionRowId,
  type,
  handleLaporanPengakhiran,
}) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_putusan", label: "Nama Putusan", align: "left" },
  { id: "nama_debitor", label: "Nama Debitor", align: "left" },
  {
    id: "tanggal_putusan_pailit",
    label: "Tanggal Putusan Pailit",
    align: "left",
  },
  { id: "tanggal_pengakhiran", label: "Tanggal Pengakhiran", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => {
      const { backgroundColor, color } = getStatusStyle(row.status);

      return (
        <Chip
          label={row.status}
          size="small"
          style={{
            backgroundColor,
          }}
          sx={{
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "12px",
            color,
            width: "150px",
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
    width: "200px",
    cell: (row, index) => {
      return (
        <div className="d-flex justify-content-between fa-lg text-muted position-relative">
          <i
            onClick={(e) => {
              e.stopPropagation();
              toggleActionMenu(row.id, e);
            }}
            className="dripicons-gear fs-4"
            style={{ cursor: "pointer" }}
          ></i>
          {actionRowId === row.id && (
            <div
              className={`action-menu position-absolute bg-white rounded-3 shadow-sm ${
                actionRowId === row.id ? "active" : ""
              }`}
              style={{ left: "30px", zIndex: 1000 }}
            >
              <Link
                to={`/kurator/riwayat-laporan-${type}`}
                className="action-item d-flex align-items-center"
              >
                <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
                  Riwayat Laporan
                </p>
              </Link>
              <Link
                to={`/kurator/ganti-${type}`}
                className="action-item d-flex align-items-center"
              >
                <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2 text-capitalize">
                  Ganti {type}
                </p>
              </Link>
              <Link
                to={`/kurator/laporan-berkala-${type}`}
                className="action-item d-flex align-items-center"
              >
                <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
                  Laporan Berkala
                </p>
              </Link>
              <div
                onClick={() =>
                  handleLaporanPengakhiran(
                    `Laporan Pengakhiran ${capitalizeTheFirstLetterOfEachWord(
                      type
                    )}`
                  )
                }
                className="action-item d-flex align-items-center"
              >
                <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
                  Laporan Pengakhiran
                </p>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
];

export const getRiwayatLaporan = ({ toggleActionMenu, actionRowId }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "transaksi_laporan", label: "Transaksi Laporan", align: "left" },
  { id: "data_laporan", label: "Data Laporan Berkala", align: "left" },
  {
    id: "tanggal_laporan",
    label: "Tanggal Laporan",
    align: "left",
  },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "200px",
    cell: (row, index) => {
      return (
        <div className="d-flex justify-content-between fa-lg text-muted position-relative">
          <i
            onClick={(e) => {
              e.stopPropagation();
              toggleActionMenu(row.id, e);
            }}
            className="dripicons-gear fs-4"
            style={{ cursor: "pointer" }}
          ></i>
          {actionRowId === row.id && (
            <div
              className={`action-menu position-absolute bg-white rounded-3 shadow-sm ${
                actionRowId === row.id ? "active" : ""
              }`}
              style={{ left: "30px", zIndex: 1000 }}
            >
              <Link to={"#"} className="action-item d-flex align-items-center">
                <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
                  Lihat Detail
                </p>
              </Link>
              <Link to={"#"} className="action-item d-flex align-items-center">
                <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
                  Cetak
                </p>
              </Link>
            </div>
          )}
        </div>
      );
    },
  },
];

export const getPengurusCol = ({ toggleActionMenu, actionRowId }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama", label: "Nama", align: "left" },
  { id: "nik", label: "NIK", align: "left" },
  {
    id: "alamat",
    label: "Alamat",
    align: "left",
  },
];
