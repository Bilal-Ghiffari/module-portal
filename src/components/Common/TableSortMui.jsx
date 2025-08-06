import React from 'react';
import { TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const SortableTableCell = ({
  item,
  orderBy,
  order,
  handleRequestSort,
  rowSpan = 1,
  colSpan = 1,
  align = 'center',
}) => {
  return (
    <TableCell
      size="small"
      sx={{
        minWidth: item.width,
        margin: 0,
        padding: 0.5,
        fontSize: '0.8rem',
        backgroundColor: '#2A3042',
      }}
      key={item.id}
      rowSpan={rowSpan}
      colSpan={colSpan}
      className="text-white border border-secondary-subtle px-2"
      align={align}
      sortDirection={orderBy === item.id ? order : false}>
      <TableSortLabel
        active={orderBy === item.id}
        direction={orderBy === item.id ? order : 'asc'}
        className="text-white"
        onClick={() => handleRequestSort(item.id)}
        sx={{
          '& .MuiTableSortLabel-icon': {
            color: 'white !important', // Warna panah tetap putih
          },
          '&.Mui-active': {
            color: 'white', // Warna teks saat aktif tetap putih
            '& .MuiTableSortLabel-icon': {
              color: 'white !important', // Pastikan panah tetap putih saat aktif
            },
          },
        }}>
        <p className="lh-1 mb-0">{item.name}</p>
        {orderBy === item.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

export default SortableTableCell;
