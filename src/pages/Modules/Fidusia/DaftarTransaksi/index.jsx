import { CheckCircle, PictureAsPdfOutlined } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

// Mock service for transactions
const TransactionService = {
  getTransactions() {
    return [
      {
        id: 1,
        pemberiFidusia: 'Fauzi Batubara',
        penerimaFidusia: 'Edwin Calisto',
        jenisTransaksi: 'Pendaftaran',
        tanggal: '24-09-2024',
        status: 'Belum Bayar',
      },
      {
        id: 2,
        pemberiFidusia: 'Fauzi Batubara',
        penerimaFidusia: 'Edwin Calisto',
        jenisTransaksi: 'Perubahan',
        tanggal: '24-09-2024',
        status: 'Sudah Bayar',
      },
      {
        id: 3,
        pemberiFidusia: 'Ahmad Rifai',
        penerimaFidusia: 'Budi Santoso',
        jenisTransaksi: 'Pendaftaran',
        tanggal: '25-09-2024',
        status: 'Belum Bayar',
      },
      {
        id: 4,
        pemberiFidusia: 'Siti Nurhaliza',
        penerimaFidusia: 'Rini Ekawati',
        jenisTransaksi: 'Perubahan',
        tanggal: '26-09-2024',
        status: 'Sudah Bayar',
      },
      // Add more transactions as needed
    ];
  },
};

const DaftarTransaksi = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch Transactions
  const transactions = useMemo(() => TransactionService.getTransactions(), []);

  // Filtering and Pagination Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      Object.values(transaction).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [transactions, searchTerm]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTransactions, page, rowsPerPage]);

  // Selection Handlers
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredTransactions.map((t) => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Action Handlers
  const handleFilter = () => {
    // Implement filter logic
    console.log('Filter clicked');
  };

  const handleDownload = () => {
    // Implement download logic
    console.log('Download clicked');
  };

  const handleProceed = () => {
    // Implement proceed logic with selected transactions
    const selectedTransactions = transactions.filter((t) =>
      selectedRows.includes(t.id)
    );

    // Example modal or confirmationø
    const message = selectedTransactions
      .map((t) => `${t.pemberiFidusia} - ${t.jenisTransaksi}`)
      .join('\n');

    alert(`Lanjutkan transaksi:\n${message}`);
  };

  const handlePrintInvoice = (transaction) => {
    // Implement print invoice logic
    alert(`Cetak Tagihan untuk ${transaction.pemberiFidusia}`);
  };

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: '100%' }}>
      {/* Search and Action Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mr: 2,
            '& .MuiOutlinedInput-root': {
              height: 40,
            },
            '& .MuiInputBase-input': {
              height: 40,
              padding: '0 14px',
              boxSizing: 'border-box',
            },
          }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilter}
            sx={{
              borderRadius: 2,
              height: 40,
              minWidth: 'auto',
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{
              borderRadius: 2,
              height: 40,
              minWidth: 'auto',
            }}
          >
            Download
          </Button>
        </Box>
      </Box>

      {/* Transaction Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light gray background
              // Optional: add border bottom
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < filteredTransactions.length
                  }
                  checked={
                    filteredTransactions.length > 0 &&
                    selectedRows.length === filteredTransactions.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Pemberi Fidusia</TableCell>
              <TableCell>Penerima Fidusia</TableCell>
              <TableCell>Jenis Transaksi</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                hover
                selected={selectedRows.includes(transaction.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(transaction.id)}
                    onChange={() => handleRowSelect(transaction.id)}
                  />
                </TableCell>
                <TableCell>{transaction.pemberiFidusia}</TableCell>
                <TableCell>{transaction.penerimaFidusia}</TableCell>
                <TableCell>{transaction.jenisTransaksi}</TableCell>
                <TableCell>{transaction.tanggal}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      color: 'white',
                      bgcolor:
                        transaction.status === 'Sudah Bayar'
                          ? 'success.main'
                          : 'warning.main',
                      fontSize: '0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    {transaction.status}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<PictureAsPdfOutlined />}
                    variant="outlined"
                    color="primary"
                    onClick={() => handlePrintInvoice(transaction)}
                    sx={{ textTransform: 'none' }}
                  >
                    Cetak Tagihan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRows.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mb: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(76, 175, 80, 0.1)', // Light green background
              color: 'text.primary',
              px: 3,
              py: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              maxWidth: 800, // Limit width
              width: '90%', // Responsive width
              boxShadow: 'none',
              border: '1px solid rgba(76, 175, 80, 0.3)', // Subtle border
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircle
                sx={{
                  color: 'success.main',
                  fontSize: 24,
                }}
              />
              <Typography variant="body1">
                {selectedRows.length} transaksi telah dipilih. Klik Lanjutkan
                untuk menyelesaikan pembayaran
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceed}
              sx={{
                textTransform: 'none',
                borderRadius: 1,
              }}
            >
              Lanjutkan
            </Button>
          </Box>
        </Box>
      )}

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        <Pagination
          count={Math.ceil(filteredTransactions.length / rowsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default DaftarTransaksi;
