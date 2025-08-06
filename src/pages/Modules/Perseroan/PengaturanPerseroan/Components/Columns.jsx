import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Toggle from "@/components/Common/Toggle";

export const getDaftarKBLICol = ({ formik }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "kategori", label: "Kategori", align: "left" },
  { id: "kode", label: "Kode KBLI", align: "left" },
  { id: "judul", label: "Judul KBLI", align: "left" },
  {
    id: "uraian",
    label: "Uraian KBLI",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.uraian} arrow>
        <span
          style={{
            display: "inline-block",
            wordWrap: "break-word",
            whiteSpace: "normal",
            maxWidth: "300px",
          }}
        >
          {row.uraian.slice(0, 100)}...
        </span>
      </CustomTooltipMui>
    ),
  },
  { id: "tanggal_unggah", label: "Tanggal Unggah", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "left",
    cell: (row, index) => (
      <div className="d-flex">
        <Toggle formik={formik} />
      </div>
    ),
  },
];
export const getDaftarBlacklistNamaPerseroanCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama", label: "Nama", align: "left" },
  {
    id: "keterangan",
    label: "Keterangan",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.keterangan} arrow>
        <span
          style={{
            display: "inline-block",
            maxWidth: "200px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {row.keterangan}
        </span>
      </CustomTooltipMui>
    ),
  },
  { id: "created_by", label: "Dibuat Oleh", align: "left" },

  { id: "created_on", label: "Dibuat Pada", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "200px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("detail")}
            className="mdi mdi-eye-outline fs-4"
          ></i>
        </div>
        <div
          onClick={() => handle("edit")}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-pencil fs-4"></i>
        </div>
        <div
          onClick={() => handle("delete")}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-trash-alt fs-4"></i>
        </div>
      </div>
    ),
  },
];

export const getDaftarBlacklistKataPerseroanCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "kata", label: "Kata", align: "left" },
  {
    id: "tipe",
    label: "Tipe",
    align: "left",
    cell: (row, index) => (
      <CustomTooltipMui title={row.tipe} arrow>
        <span
          style={{
            display: "inline-block",
            maxWidth: "200px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {row.tipe}
        </span>
      </CustomTooltipMui>
    ),
  },
  { id: "created_by", label: "Dibuat Oleh", align: "left" },
  { id: "created_on", label: "Dibuat Pada", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "200px",
    cell: (row, index) => (
      <div className="d-flex align-items-center gap-3">
        <div className="action-item d-flex align-items-center m-0 p-0">
          <i
            onClick={() => handle("detail")}
            className="mdi mdi-eye-outline fs-4"
          ></i>
        </div>
        <div
          onClick={() => handle("edit")}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-pencil fs-4"></i>
        </div>
        <div
          onClick={() => handle("delete")}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-trash-alt fs-4"></i>
        </div>
      </div>
    ),
  },
];
