import TableListNew from "@/components/Common/TableListNew";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { Checkbox, Box, TextField } from "@mui/material";
import { useState, useMemo } from "react";
import { getNotarisCol } from "./Columns";

const TableDynamic = ({
  data = [],
  total_count,
  formik,
  showSelect = true,
  label,
  fieldName,
  setEditOpen,
  setEditingIndex,
  setActiveEditLabel,
}) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();

  const handle = (type, index) => {
    switch (type) {
      case "edit":
        const itemToEdit = formik.values?.[fieldName]?.[index];
        if (itemToEdit) {
          setEditingIndex(index);
          setActiveEditLabel(label);
          setEditOpen(true);
        }
        break;
      case "delete":
        toastifyService.confirmationDelete().then((res) => {
          if (res) {
            const newData = formik.values?.[fieldName]
              .filter((_, idx) => idx !== index)
              .filter((item) => item !== null && item !== undefined);
            formik.setFieldValue(fieldName, newData);
          }
        });

        break;
      default:
        break;
    }
  };

  const configColumn = {
    "Data Notaris": getNotarisCol({ handle }),
  };
  const column = configColumn[label];

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

  // console.log("data", data);
  // console.log("filteredData", filteredData);
  // console.log("label", label);
  // console.log("column", column);

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
            {formik.values?.kegiatan_usaha?.length || 0}
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
          totalData={total_count || 0}
          column={column}
          isServerSide
          onPageChange={handlePageChange}
          limit={query.limit}
          page={query.page}
        />
      </Box>
    </>
  );
};

export default TableDynamic;
