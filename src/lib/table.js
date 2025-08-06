const styleHeader = {
  rows: {
    style: {
      minHeight: '30px',
      '&:nth-of-type(odd)': {
        backgroundColor: '#f3f3f3',
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#ffffff',
      },
    },
  },

  headCells: {
    style: {
      backgroundColor: '#2A3042',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '160px', // Coba menambahkan width yang lebih besar
      maxWidth: '160px', // Tambahkan maxWidth yang sama
    },
  },
  cells: {
    style: {
      padding: '8px 16px', // Atur padding untuk sel data
    },
  },
};

const styleStickyMui = {
  position: 'sticky',
  right: '0',
  borderBlock: '2px solid #0029a3',
  backgroundColor: '#efefef',
  minWidth: '6rem',
};

const sortDataTable = (data, orderBy, order) => {
  return [...data].sort((a, b) => {
    // Hilangkan karakter bintang (*) dari tahun
    const cleanA = typeof a[orderBy] === 'string' ? a[orderBy].replace(/\*/g, '') : a[orderBy] || 0; // Hilangkan semua bintang
    const cleanB = typeof b[orderBy] === 'string' ? b[orderBy].replace(/\*/g, '') : b[orderBy] || 0;

    // Ubah tahun menjadi angka agar bisa dibandingkan
    const aValue = isNaN(cleanA) ? cleanA : parseFloat(cleanA);
    const bValue = isNaN(cleanB) ? cleanB : parseFloat(cleanB);

    // Sorting berdasarkan urutan
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return order === 'asc' ? aValue - bValue : bValue - aValue;
  });
};

export { styleHeader, styleStickyMui, sortDataTable };
