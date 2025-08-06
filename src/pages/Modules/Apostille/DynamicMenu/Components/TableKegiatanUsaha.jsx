import TableListNew from "@/components/Common/TableListNew";
import { Box } from "@mui/material";
import { useState, useMemo } from "react";

const TableKegiatanUsaha = ({ data = [], column, query, setQuery }) => {
  const handlePageChange = (page) => {
    const newQuery = { ...query, page };
    setQuery(newQuery);
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
          data={data}
          totalData={data?.length}
          column={column}
          isServerSide
          onPageChange={handlePageChange}
          page={query?.page}
          limit={query?.limit}
        />
      </Box>
    </>
  );
};

export default TableKegiatanUsaha;
