import { TextField, Typography } from "@mui/material";
import {
  getDaftarBlacklistKataPerseroanCol,
  getDaftarBlacklistNamaPerseroanCol,
  getDaftarKBLICol,
} from "./Components/Columns";
import { useFormik } from "formik";
import { useState } from "react";
import { useMemo } from "react";
import ButtonCustom from "../Perorangan/Components/ButtonCustom";
import PopupCRUD from "./Components/PopupCRUD";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useEffect } from "react";
import { apiGetKBLI } from "@/helpers/backend_helper";
import TableListNew from "@/components/Common/TableListNew";


const PengaturanPerseroan = ({ label = "" }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();
  const [status, setStatus] = useState("");
  const [tableData, setTableData] = useState({
    data: [],
    total_count: 0,
  });
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    fetchData(label);
  }, [label]);

  const fetchData = (label) => {
    switch (label) {
      case "Daftar KBLI":
        toastifyService.showLoading();
        apiGetKBLI(query)
          .then((res) => {
            setTableData({
              data: res.data,
              total_count: res.total,
            });
          })
          .catch((err) => {
            console.log("err", err);
          })
          .finally(() => {
            toastifyService.close();
          });
        break;

      default:
        setTableData({
          data: [],
          total_count: 0,
        });
        break;
    }
  };

  const handle = (status) => {
    switch (status) {
      case "detail":
        toastifyService.info("API belum tersedia");
        break;
      case "edit":
        setStatus("edit");
        setOpen(true);
        break;
      case "delete":
        toastifyService.info("API belum tersedia");
        break;

      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      status: false,
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const configColumn = {
    "Daftar KBLI": getDaftarKBLICol({ formik }),
    "Daftar Blacklist Nama Perseroan": getDaftarBlacklistNamaPerseroanCol({
      handle,
    }),
    "Daftar Blacklist Kata Perseroan": getDaftarBlacklistKataPerseroanCol({
      handle,
    }),
  };
  const column = configColumn[label] || {};

  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData?.data;
    const lowerSearch = searchTerm.toLowerCase();
    return tableData?.data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [tableData?.data, searchTerm]);

  const handlePageChange = (page) => {
    setQuery((prev) => ({ ...prev, page }));
    fetchData(label);
  };

  return (
    <div className="page-content">
      <Typography
        sx={{
          fontSize: "1.2rem",
          px: 0,
          fontFamily: "Poppins",
        }}
        className="fw-semibold mb-2"
      >
        {label}
      </Typography>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <TextField
          size="small"
          placeholder="Cari..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
        {label !== "Daftar KBLI" && (
          <ButtonCustom onClick={() => setOpen(!open)} label="+ Tambah" />
        )}{" "}
      </div>
      <TableListNew
        data={filteredData}
        totalData={tableData?.total_count || 0}
        column={column}
        isServerSide
        onPageChange={handlePageChange}
        page={query.page}
        limit={query.limit}
      />
      <PopupCRUD setOpen={setOpen} open={open} status={status} label={label} />
    </div>
  );
};

export default PengaturanPerseroan;
