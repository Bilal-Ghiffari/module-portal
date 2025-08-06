import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const headCells = [
  // { id: 'aksi', label: 'Pilih', minWidth: 170 },
  { id: 'module_code', label: 'Kode Modul', minWidth: 170 },
  { id: 'module', label: 'Nama Modul', minWidth: 170 },
  { id: 'Akses', label: 'Hak Akses', minWidth: 170 },
  // { id: 'read', label: 'Read', minWidth: 170 },
  // { id: 'update', label: 'Update', minWidth: 170 },
  // { id: 'delete', label: 'Delete', minWidth: 170 },
];

export default function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="bg-primary text-white"
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}>
            <React.Fragment>{headCell.label}</React.Fragment>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
