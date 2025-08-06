import TableListNew from "@/components/Common/TableListNew";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import { Checkbox, Box, TextField } from "@mui/material";
import { useState, useMemo } from "react";

const TableKegiatanUsaha = ({
  data = [],
  total_count,
  formik,
  showSelect = true,
}) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (row, index) => {
    const current = formik.values.kegiatan_usaha || [];
    const exists = current.some((item) => item.index === index);

    const newSelected = exists
      ? current.filter((item) => item.index !== index)
      : [...current, { ...row, index }];

    // Hapus id_kbli dan index dari setiap item sebelum simpan ke formik
    const cleaned = newSelected.map(({ id_kbli, index, ...rest }) => rest);

    formik.setFieldValue("kegiatan_usaha", cleaned);
  };

  const column = [
    ...(showSelect
      ? [
          {
            id: "pilih",
            label: "Pilih",
            width: "5%",
            cell: (row, index) => (
              <Checkbox
                color="primary"
                checked={formik.values?.kegiatan_usaha?.some(
                  (item) => item.judul === row.judul
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(row, index);
                }}
              />
            ),
          },
        ]
      : []),
    // {
    //   id: "no",
    //   label: "No",
    //   width: "5%",
    //   align: "left",
    //   cell: (row, index) => <span>{index + 1}</span>,
    // },
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
    console.log("page", page);
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
          page={query.page}
          limit={query.limit}
        />
      </Box>
    </>
  );
};

export default TableKegiatanUsaha;
