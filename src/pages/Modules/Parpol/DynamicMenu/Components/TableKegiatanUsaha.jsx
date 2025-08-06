import TableListNew from "@/components/Common/TableListNew";
import { Box } from "@mui/material";
import { useState, useMemo } from "react";

const TableKegiatanUsaha = ({ data = [], column }) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");

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

export default TableKegiatanUsaha;
