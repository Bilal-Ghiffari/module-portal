import React, { useState, useMemo } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Pagination,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { Row } from "reactstrap";
import { Col } from "reactstrap";

const CustomTableDashboard = ({
  title,
  columns,
  data,
  enableSearch = true,
  searchPlaceholder = "Cari...",
  searchKeys = [],
  enablePagination = false,
  rowsPerPage = 10,
  emptyMessage = "Tidak ada data yang ditemukan.",
  url = "",
  topBarAction,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const toastifyService = new ToastifyService();

  // Filter data based on search term and specified search keys
  const filteredData = useMemo(() => {
    if (!searchTerm || searchKeys.length === 0) {
      return data;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) =>
        String(row[key]).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [data, searchTerm, searchKeys]);

  // Apply pagination to the filtered data
  const paginatedData = useMemo(() => {
    if (!enablePagination) {
      return filteredData;
    }
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, rowsPerPage, enablePagination]);

  const totalPages = useMemo(() => {
    return enablePagination ? Math.ceil(filteredData.length / rowsPerPage) : 1;
  }, [filteredData.length, rowsPerPage, enablePagination]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 3, border: "1px solid #E7E7E7", borderRadius: "8px" }}>
      {title && (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#202020",
            fontFamily: "Poppins",
          }}
        >
          {title}
        </Typography>
      )}

      <Divider sx={{ my: 2, color: "#E7E7E7" }} />

      {(enableSearch || topBarAction) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          {enableSearch && (
            <TextField
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9E9E9E" }} />
                  </InputAdornment>
                ),
                sx: {
                  height: 38,
                  width: 300,
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "#E7E7E7" },
                  "&:hover fieldset": { borderColor: "#E7E7E7" },
                  "&.Mui-focused fieldset": { borderColor: "#E7E7E7" },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins",
                  fontSize: "14px",
                },
              }}
            />
          )}

          {topBarAction && <Box>{topBarAction}</Box>}
        </Box>
      )}

      <TableContainer sx={{ border: "1px solid #E7E7E7", borderRadius: "8px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F7F7F7" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    color: "#5D5D5D",
                    lineHeight: "22px",
                    padding: 2,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#FAFAFA",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      onClick={(event) => {
                        // disable klik from child
                        const isButton = event.target.closest("button");
                        if (isButton) return;
                        // biar url nya dinamis, bisa dipake di modul lain
                        if (url) {
                          navigate(`${url}/${rowIndex}`);
                        } else {
                          toastifyService.info("URL Tidak ada");
                        }
                      }}
                      key={`${row.id || rowIndex}-${column.id}`}
                      align={column.align || "left"}
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        color: "#4F4F4F",
                      }}
                    >
                      {column.renderCell
                        ? column.renderCell(row[column.id], row)
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center", py: 4 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {enablePagination && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomTableDashboard;
