import TableListNew from '@/components/Common/TableListNew';
import { Checkbox, Box, TextField } from '@mui/material';
import { useState, useMemo } from 'react';

const TableDataDocument = ({ data = [], formik, showSelect = true }) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (row) => {
    const current = formik.values.data_document || [];
    const exists = current.some((item) => item.id === row.id);
    let newSelected = exists
      ? current.filter((item) => item.id !== row.id)
      : [...current, row];

    formik.setFieldValue('data_document', newSelected);
  };

  const column = [
    ...(showSelect
      ? [
          {
            id: 'pilih',
            label: 'Pilih',
            width: '5%',
            cell: (row) => (
              <Checkbox
                color="primary"
                checked={formik.values?.data_document?.some(
                  (item) => item.id === row.id
                )}
                onChange={() => handleCheckboxChange(row)}
              />
            ),
          },
        ]
      : []),

    { id: 'tipe_document', label: 'Tipe Dokumen', align: 'left' },
    { id: 'nama_document', label: 'Nama Dokumen', align: 'left' },
    {
      id: 'nama_pemilik_document',
      label: 'Nama Pemilik Dokumen',
      align: 'left',
    },
    { id: 'nomor_document', label: 'Nomor Dokumen', align: 'left' },
    { id: 'jumlah_document', label: 'Jumlah Dokumen', align: 'left' },
    { id: 'tanggal_document', label: 'Tanggal Dokumen', align: 'left' },
    { id: 'nama_pejabat', label: 'Nama Pejabat', align: 'left' },
    { id: 'jabatan', label: 'Jabatan', align: 'left' },
    { id: 'lembaga', label: 'Lembaga', align: 'left' },
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
            <strong>Selected:</strong>{' '}
            {formik.values?.data_document?.length || 0}
          </Box>
        </div>
      )}

      <Box
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
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

export default TableDataDocument;
