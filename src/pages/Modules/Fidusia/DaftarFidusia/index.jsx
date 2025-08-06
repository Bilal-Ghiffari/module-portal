import AHULoading from '@/components/Common/LoadingAHU';
import FidusiaMaster from '@/services/fidusia/Fidusia';
import {
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ActionPopover from './ActionPopover';
import RenderPDFViewer from './components/RenderPDFViewer';

const DaftarFidusiaPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  // const [data, setData] = useState([
  //   {
  //     id_pendaftaran: 10,
  //     id_notaris: 1910,
  //     jenis_transaksi: 'pendaftaran',
  //     nama_pemberi: 'fafa',
  //     alamat_pemberi: 'blaaaaa',
  //     nama_penerima: 'fasf',
  //     alamat_penerima: 'blaaaa',
  //     nomor_sertifikat: 'EX/FIDUSIA/PENDAFTARAN/10/2025',
  //     tgl_terbit: '2025-07-29',
  //     no_akta: '222222',
  //     nama_notaris: ' Maria Susanti, SH.',
  //     wilayah_notaris: 'DKI Jakarta',
  //     nilai_jaminan: 10000000,
  //     tgl_terbit: '2025-07-29',
  //     tgl_jatuh_tempo: '2025-07-29',
  //     jangka_waktu_perjanjian: 12,
  //     nilai_penjaminan: 10000000,
  //   },
  // ]);
  const [totalData, setTotalData] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [showPDF, setShowPDF] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [actionType, setActionType] = useState(null); // Track which component to show

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await FidusiaMaster.getDaftarFidusia({
        page,
        limit: rowsPerPage,
        search: searchTerm,
      });
      setData(response.data);
      setTotalData(response.pagination.totalData); // Use the total number of data from the API
    } catch (error) {
      console.error('Fetching data failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchTerm]);

  const handleOpenPopover = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleActionClick = (action, record) => {
    setActionType(action); // Set the action type
    setShowDialog(true); // Open the dialog for detailed view
    handleClosePopover(); // Close the popover
    setCurrentRow(record);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentRow(null); // Reset the current row
    setActionType(null); // Reset action type
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDownload = async () => {
    try {
      const response = await FidusiaMaster.downloadDaftarFidusia();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'daftar_fidusia.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (loading) return <AHULoading />;

  // console.log('currentRow depan', currentRow);

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: '100%' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 500, color: '#262626' }}
      >
        Daftar Fidusia
      </Typography>

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
            '& .MuiOutlinedInput-root': { height: 40 },
            '& .MuiInputBase-input': { height: 40, padding: '0 14px' },
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
            onClick={() => console.log('Filter clicked')}
            sx={{ borderRadius: 2, height: 40, minWidth: 'auto' }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ borderRadius: 2, height: 40, minWidth: 'auto' }}
          >
            Download
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>No. Sertifikat</TableCell>
              <TableCell>Pemberi Fidusia</TableCell>
              <TableCell>Penerima Fidusia</TableCell>
              <TableCell>Jenis Fidusia</TableCell>
              <TableCell>Kantor Wilayah</TableCell>
              <TableCell>Notaris</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow hover key={row.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>{' '}
                {/* Correctly handle row number */}
                <TableCell>{row.nomor_sertifikat}</TableCell>
                <TableCell>{row.nama_pemberi}</TableCell>
                <TableCell>{row.nama_penerima}</TableCell>
                <TableCell>{row.jenis_transaksi}</TableCell>
                <TableCell>{row.wilayah_notaris}</TableCell>
                <TableCell>{row.nama_notaris}</TableCell>
                <TableCell>{row.tgl_terbit}</TableCell>
                <TableCell align="center">
                  <Stack spacing={1}>
                    <IconButton
                      onClick={(event) => handleOpenPopover(event, row)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ActionPopover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClosePopover}
          onActionClick={handleActionClick}
          currentRow={currentRow}
        />
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(totalData / rowsPerPage)} // Use total data instead
          page={page}
          onChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
        sx={{ overflow: 'auto' }}
      >
        <DialogTitle>{`${
          actionType
            ? actionType.charAt(0).toUpperCase() + actionType.slice(1)
            : 'Details'
        }`}</DialogTitle>
        <DialogContent>
          {/* {renderActionComponent()} */}
          <RenderPDFViewer actionType={actionType} currentRow={currentRow} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DaftarFidusiaPage;
