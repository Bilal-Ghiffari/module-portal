import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const headCells = [
  { id: 'module_code', label: 'Kode Modul', minWidth: 170 },
  { id: 'module', label: 'Nama Modul', minWidth: 170 },
  { id: 'permission', label: 'Hak Akses', minWidth: 170 },
];

export default function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ backgroundColor: '#2A3042', color: 'white' }}
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
