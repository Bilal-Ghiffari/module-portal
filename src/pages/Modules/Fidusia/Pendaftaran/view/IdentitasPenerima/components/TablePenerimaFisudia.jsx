import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

const TablePenerimaFisudia = ({ data = [], onEditRow, onDeleteRow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dataTable = data.map((item, idx) => ({
    no: idx + 1,
    ...item,
  }));

  const columns = [
    {
      id: 'no',
      label: 'No',
      align: 'center',
      // cell: (row, index) => console.log('index row', index, row),
      // cell: (row, index) => <span>{index + 1}</span>,
    },
    {
      id: 'nama',
      label: 'Nama',
      align: 'center',
    },
    {
      id: 'email',
      label: 'Email',
      align: 'center',
    },
    {
      id: 'no_tlpon',
      label: 'No Telepon',
      align: 'center',
    },

    {
      id: 'actions',
      label: 'Actions',
      align: 'end',
      cell: (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* <IconButton
            color="primary"
            onClick={() => onEditRow(row)}
            aria-label="edit"
            size="small"
          >
            <AiFillEdit />
          </IconButton> */}
          <IconButton
            color="secondary"
            onClick={() => onDeleteRow(row.id_tr_fds_identitas)}
            aria-label="delete"
            size="small"
          >
            <AiFillDelete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm) return dataTable;
    const lowerSearch = searchTerm.toLowerCase();
    return dataTable.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [dataTable, searchTerm]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: 2 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Cari..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: 2 }}
        />
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  <TableSortLabel>{column.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody key="table-body-penerima">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Data Tidak Ditemukan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tidak ada data yang sesuai dengan pencarian Anda. Silakan
                      tambahkan data baru.
                    </Typography>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddNew}
                      sx={{ marginTop: 2 }}
                    >
                      Tambah Data
                    </Button> */}
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    const cell = column.cell
                      ? column.cell(row)
                      : row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TablePenerimaFisudia;
