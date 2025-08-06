import TableListNew from "@/components/Common/TableListNew";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { Checkbox, Box, TextField } from "@mui/material";
import { useState, useMemo } from "react";

const TableDataDocument = ({
  data = [],
  formik,
  showSelect = true,
  setOpen,
  setDataDocuments,
}) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();

  const handleCheckboxChange = (row) => {
    const current = formik.values.data_document || [];
    const exists = current.some((item) => item.id === row.id);
    let newSelected = exists
      ? current.filter((item) => item.id !== row.id)
      : [...current, row];

    formik.setFieldValue("data_document", newSelected);
  };

  const handle = (type, index) => {
    switch (type) {
      case "edit":
        setDataDocuments([index]);
        setOpen(true);
        break;
      case "delete":
        toastifyService.confirmationDelete().then((res) => {
          if (res) {
            const newData = formik.values.data_document
              .filter((_, idx) => idx !== index)
              .filter((item) => item !== null && item !== undefined);
            formik.setFieldValue("data_document", newData);
          }
        });

        break;
      default:
        break;
    }
  };

  const column = [
    ...(showSelect
      ? [
          {
            id: "pilih",
            label: "Pilih",
            width: "5%",
            cell: (row) => (
              <Checkbox
                color="primary"
                checked={formik.values?.data_dokumen?.some(
                  (item) => item.id === row.id
                )}
                onChange={() => handleCheckboxChange(row)}
              />
            ),
          },
        ]
      : []),

    {
      id: "tipe_dokumen",
      label: "Tipe Dokumen",
      align: "left",
    },
    {
      id: "nama_dokumen",
      label: "Nama Dokumen",
      align: "left",
    },
    {
      id: "nama_tercantum",
      label: "Nama Tercantum",
      align: "left",
    },
    {
      id: "nomor_dokumen",
      label: "Nomor Dokumen",
      align: "left",
    },
    {
      id: "jumlah_halaman",
      label: "Jumlah Dokumen",
      align: "left",
    },
    {
      id: "tanggal_dokumen",
      label: "Tanggal Dokumen",
      align: "left",
    },
    {
      id: "nama_pejabat",
      label: "Nama Pejabat",
      align: "left",
    },
    { id: "jabatan_pejabat", label: "Jabatan", align: "left" },
    { id: "instansi", label: "Instansi", align: "left", width: "180px" },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      isNotSticky:true,
      cell: (row, index) => (
        <div className="d-flex align-items-center gap-3">
          <div
            onClick={() => handle("edit", index)}
            className="action-item d-flex align-items-center m-0 p-0"
          >
            <i className="bx bx-pencil fs-4"></i>
          </div>
          <div
            onClick={() => handle("delete", index)}
            className="action-item d-flex align-items-center m-0 p-0"
          >
            <i className="bx bx-trash-alt fs-4"></i>
          </div>
        </div>
      ),
    },
  ];

  // ✅ Filter data pakai searchTerm (case-insensitive)
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [data, searchTerm]);

  const handlePageChange = (page) => {
    setQuery((prev) => ({ ...prev, page }));
    // fetchData if needed
  };

  return (
    <>
      {showSelect && (
        <div className="px-2 d-flex align-items-center justify-content-between">
          <TextField
            size="small"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            className="w-50"
          />
          <Box sx={{ mb: 2 }}>
            <strong>Selected:</strong>{" "}
            {formik.values?.data_document?.length || 0}
          </Box>
        </div>
      )}

      <Box
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <TableListNew
          data={filteredData}
          totalData={filteredData.length}
          column={column}
          isServerSide
          onPageChange={handlePageChange}
          limit={query.limit}
        />
      </Box>
    </>
  );
};

export default TableDataDocument;
