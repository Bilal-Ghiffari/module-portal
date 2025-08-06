import { formatRupiah } from '@/helpers/services/changeFormatRupiah';
import { numberToWords } from '@/utils/currencyIDR';
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
} from '@mui/material';
import { useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

const TableInformasiPerjanjianPokok = ({
  data = [],
  formik,
  onEditRow,
  onDeleteRow,
  calculateNominalRupiah,
}) => {
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
    },
    { id: 'kurs', label: 'KURS', align: 'center' },
    {
      id: 'nilai_nominal',
      label: 'Nominal',
      align: 'center',
      cell: (row) => (
        <TextField
          variant="outlined"
          size="small"
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            const updatedData = data.map((item) =>
              item.id === row.id
                ? {
                    ...item,
                    nilai_nominal: value,
                    nilai_nominal_rupiah: calculateNominalRupiah(
                      item.kurs,
                      value
                    ),
                  }
                : item
            );
            formik.setFieldValue(
              'information_jaminan.perjanjian_pokok',
              updatedData
            );
          }}
          value={row.nilai_nominal}
          type="number"
        />
      ),
    },
    {
      id: 'nilai_nominal_rupiah',
      label: 'Nominal Rupiah',
      align: 'center',
      cell: (row) => {
        const nilai_nominal_rupiah =
          row.nilai_nominal_rupiah !== undefined
            ? row.nilai_nominal_rupiah
            : calculateNominalRupiah(row.kurs, row.nilai_nominal);

        return formatRupiah(nilai_nominal_rupiah);
      },
    },
    {
      id: 'terbilang_nominal',
      label: 'Sebutan',
      align: 'center',
      cell: (row) => {
        const nominalValue =
          row.nilai_nominal_rupiah !== undefined
            ? row.nilai_nominal_rupiah
            : calculateNominalRupiah(row.kurs, row.nilai_nominal);
        return numberToWords(nominalValue) + ' Rupiah'; // Convert and append 'Rupiah'
      },
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
            onClick={() => onDeleteRow(row.id)}
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
          <TableBody>
            {filteredData.map((row) => (
              <TableRow hover key={row.id}>
                {columns.map((column) => {
                  const cell = column.cell ? column.cell(row) : row[column.id];
                  // console.log('cell', cell);
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableInformasiPerjanjianPokok;
