import React, { useState } from "react";
import {
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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastifyService } from "@/components/Toastify/toastifyService";

const CustomTableKewarganegaraan = ({
  title,
  columns,
  data = [],
  totalItems = 0,
  currentPage = 1,
  itemsPerPage = 10,
  enableSearch = true,
  searchPlaceholder = "Cari...",
  searchKeys = [],
  enablePagination = true,
  emptyMessage = "Tidak ada data yang ditemukan.",
  url = "",
  topBarAction,
  onPageChange,
  onSearch,
  loading = false,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();

  const handlePageChange = (event, newPage) => {
    onPageChange?.(newPage);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
              onChange={handleSearchChange}
              disabled={loading}
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

      <TableContainer
        sx={{
          border: "1px solid #E7E7E7",
          borderRadius: "8px",
          position: "relative",
          minHeight: 200, // Ensure consistent height during loading
        }}
      >
        {loading && (
          <Backdrop
            sx={{
              position: "absolute",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            open={loading}
          >
            <CircularProgress color="primary" />
            <Typography variant="body2" color="text.secondary">
              Memuat data...
            </Typography>
          </Backdrop>
        )}

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
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
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
                        console.log(url);
                        const isButton = event.target.closest("button");
                        if (isButton) return;
                        console.log(row);
                        if (url) {
                          navigate(`${url}/${row.id_permohonan}`);
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
                    {!loading && emptyMessage}
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
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            disabled={loading}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomTableKewarganegaraan;
