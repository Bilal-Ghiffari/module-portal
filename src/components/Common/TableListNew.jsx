import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box, TableHead } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import { LoadingWithMessage } from "./LoadingIndicator";
import { formatNumber } from "@/helpers/services/convert";
import PaginationMui from "./paginationMui";
import { useEffect } from "react";
import { ToastifyService } from "../Toastify/toastifyService";
import { useNavigate } from "react-router-dom";

const CheckboxValidasi = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className=""
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export const styleSticky = {
  position: "sticky",
  right: "0",
  zIndex: 1,
};

function descendingComparator(a, b, orderBy) {
  const valA = a?.[orderBy] ?? "";
  const valB = b?.[orderBy] ?? "";
  if (valB < valA) return -1;
  if (valB > valA) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function ColumnHead(props) {
  const {
    order,
    orderBy,
    column,
    parentColumn,
    onRequestSort,
    selectAll,
    onSelectAllChange,
    selectAllChecked,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {parentColumn ? parentColumn : null}
      <TableRow
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 3,
          backgroundColor: "#2A3042", // Sesuaikan warna agar tetap terlihat
        }}
        style={{ width: "100%" }}
      >
        {column?.map((headCell, index) => (
          <TableCell
            // sx={{ borderRight: 1, borderLeft: 1, borderTop: 1 }}
            className="text- fw-bold border-white fs-6"
            style={{
              //karena udah terlanjut dipake di banyak tempat, jadi handle buat matiin sticky nya aja
              ...(!headCell.isNotSticky &&
                index === column.length - 1 &&
                styleSticky),
              minWidth: headCell.minWidth,
              width: headCell.width,
              backgroundColor: "#E7E7E7",

              ...headCell.style,
            }}
            key={headCell.id}
            align={headCell.align || "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {selectAll && index === 0 ? (
              <div className="d-flex flex-row gap-2">
                <CheckboxValidasi
                  // checked={selectedIds.some((item) => item.id === row.id)}
                  checked={selectAllChecked}
                  onChange={(isChecked) => onSelectAllChange(isChecked)} // Kirim status checked terbaru
                />
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  className=""
                  onClick={createSortHandler(headCell.id)}
                  style={{ lineHeight: "16.5px", width: headCell.width }}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </div>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                className=""
                onClick={createSortHandler(headCell.id)}
                style={{ lineHeight: "16.5px", width: headCell.width }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row({ row, column, index, type, page, limit, url }) {
  // Ensure page and limit are numbers, fallback to 1 and 10 if undefined or invalid
  const validPage = Number(page) || 1;
  const validLimit = Number(limit) || 10;
  const navigate = useNavigate();
  const toastifyService = new ToastifyService();
  return (
    <React.Fragment>
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
        onClick={() => {
          if (url) {
            navigate(`${url}/${row.id || row.id_permohonan}`);
          } else {
            console.log("URL Tidak ada");
            // toastifyService.info("URL Tidak ada");
          }
        }}
        sx={{
          "&:hover": {
            backgroundColor: "#f3f4f6",
            cursor: "pointer",
          },
        }}
      >
        {column?.map((v, i) => (
          <TableCell
            key={i}
            align={v.align || "left"}
            style={{
              ...(!v.isNotSticky && i === column.length - 1 && styleSticky),
              ...v?.style,
            }}
            sx={{ borderBottom: "0.5px solid" }}
            className="border-secondary fs-6"
          >
            {v.cell ? (
              v.id === "no" ? (
                <span>{(validPage - 1) * validLimit + index + 1}</span>
              ) : (
                v.cell(row, index)
              )
            ) : v.id === "no" ? (
              <span>{(validPage - 1) * validLimit + index + 1}</span>
            ) : v.isNumber ? (
              formatNumber(row?.[v.id] ?? 0)
            ) : (
              row?.[v.id] ?? "-"
            )}
          </TableCell>
        ))}
      </TableRow>
    </React.Fragment>
  );
}

const TableListNew = ({
  data = [],
  column,
  totalData = 20,
  type,
  limit = 10,
  tableStyle,
  className,
  hidePagination,
  parentColumn,
  totalRow,
  isServerSide = false, // New prop to enable server-side pagination
  onPageChange, // Function to handle server-side page changes
  onLimitChange,
  loading = false,
  page = 1,
  setPage,
  selectAll = false,
  onSelectAllChange,
  selectAllChecked = false,
  url = "",
  minHeight = 0,
  ...rest
}) => {
  // Pagination
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [localPage, setLocalPage] = useState(1);
  const [localLimit, setLocalLimit] = useState(limit);
  const [localRaw, setLocalRaw] = useState([]);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    if (!isServerSide) {
      setLocalRaw(data || []);
      setLocalPage(1);
      setLocalData(data.slice(0, limit));
    }
  }, [data]);

  const changePageLocal = (tempPage) => {
    setLocalPage(tempPage);
    setLocalData(localRaw.slice((tempPage - 1) * limit, tempPage * limit));
  };

  const changeLimitLocal = (newLimit) => {
    setLocalLimit(newLimit);
    setLocalPage(1);
    setLocalData(localRaw.slice(0, newLimit));
  };

  // Sort data based on order and orderBy
  const sortedData = stableSort(data, getComparator(order, orderBy));
  // Current items based on pagination

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const EmptySection = () => {
    return (
      <TableRow>
        <TableCell colSpan={column?.length || 9} align="center">
          No data available
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box
      sx={{ width: "100%" }}
      className={className + ` bg-white rounded-3`}
      {...rest}
    >
      <TableContainer sx={{ maxHeight: 440, minHeight }} className="rounded-3">
        <Table
          sx={{ width: "100%", ...tableStyle }}
          aria-labelledby="tableTitle"
        >
          <ColumnHead
            column={column}
            type={type}
            order={order}
            orderBy={orderBy}
            parentColumn={parentColumn}
            onRequestSort={handleRequestSort}
            selectAll={selectAll}
            selectAllChecked={selectAllChecked}
            onSelectAllChange={onSelectAllChange}
          />
          {loading ? (
            <TableCell
              className="text-primary fw-bold"
              align="center"
              style={{ borderBottomWidth: 2 }}
              colSpan={Object.keys(column).length}
            >
              <LoadingWithMessage />
            </TableCell>
          ) : (
            <TableBody>
              {totalRow ? totalRow : null}

              {isServerSide ? (
                sortedData.length < 1 ? (
                  <EmptySection />
                ) : (
                  sortedData?.map((data, index) => (
                    <Row
                      key={index}
                      index={index}
                      row={data}
                      type={type}
                      column={column}
                      page={page}
                      limit={limit}
                      url={url}
                    />
                  ))
                )
              ) : data?.length < 1 ? (
                <EmptySection />
              ) : (
                // data?.map((data, index) => <Row key={index} index={index} row={data} type={type} column={column} page={page} />)
                localData?.map((data, index) => (
                  <Row
                    key={index}
                    index={index}
                    row={data}
                    type={type}
                    column={column}
                    page={localPage}
                    limit={limit}
                  />
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {hidePagination ? null : (
        <PaginationMui
          pageNow={isServerSide ? page : localPage}
          totalData={totalData}
          perPage={isServerSide ? limit : localLimit}
          setLimit={isServerSide ? onLimitChange : changeLimitLocal}
          setPage={isServerSide ? onPageChange : changePageLocal}
        />
      )}
    </Box>
  );
};

export default TableListNew;
