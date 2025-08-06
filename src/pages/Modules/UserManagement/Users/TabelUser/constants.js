export const validateCards = [
  {
    title: 'TOTAL USER TERDAFTAR',
    text: '0',
    color: '#FF9F43',
    status: 1,
    iconClass: 'bx bx-user-pin',
  },
  {
    title: 'TOTAL USER AKTIVITAS',
    text: '0',
    color: '#009FBD',
    status: 2,
    iconClass: 'bx bxs-user-voice',
  },
  {
    title: 'TOTAL PENGUNJUNG',
    text: '0',
    color: '#2BC428',
    status: 3,
    iconClass: 'bx bx-user-check',
  },
  {
    title: 'TOTAL PENGUNJUNG SAAT INI',
    text: '0',
    color: '#F5004F',
    status: 4,
    iconClass: 'bx bxs-user-plus',
  },
];

export const optionStatus = [
  { value: 1, label: 'Aktif' },
  { value: 0, label: 'Tidak Aktif' },
];

export const columnsHeaders = [
  {
    id: 'fullname',
    name: 'NAMA',
    selector: (row) => row.fullname || '-',
    isText: true,
  },
  {
    id: 'username',
    name: 'USERNAME',
    selector: (row) => row.username || '-',
    isText: true,
  },
  {
    id: 'email',
    name: 'EMAIL',
    selector: (row) => row.email || '-',
  },
  {
    id: 'wilayah_prov_text',
    name: 'Wilayah Prov',
    selector: (row) => row.wilayah_prov_text || '-',
  },
  {
    id: 'wilayah_kab_text',
    name: 'Wilayah Kab',
    selector: (row) => row.wilayah_kab_text || '-',
  },
  {
    id: 'eselon_1_text',
    name: 'ESELON I',
    selector: (row) => row.eselon_1_text || '-',
  },
  {
    id: 'eselon_2_text',
    name: 'ESELON II',
    selector: (row) => row.eselon_2_text || '-',
  },
  {
    id: 'modules_code_text',
    name: 'MODUL',
    selector: (row) => row.modules_code_text || '-',
  },
  {
    id: 'roles_code_text',
    name: 'ROLE',
    selector: (row) => row.roles_code_text || '-',
  },
  {
    id: 'created_on',
    name: 'TANGGAL DIBUAT',
    selector: (row) => formatDateToIndonesian(row.created_on) || '-',
  },
  {
    id: 'created_by',
    name: 'DIBUAT OLEH',
    selector: (row) => row.created_by || '-',
    isText: true,
  },
  {
    id: 'updated_on',
    name: 'TANGGAL DIUBAH',
    selector: (row) => formatDateToIndonesian(row.updated_on) || '-',
  },
  {
    id: 'updated_by',
    name: 'DIUBAH OLEH',
    selector: (row) => row.updated_by || '-',
    isText: true,
  },
  {
    id: 'valid',
    name: 'STATUS',
    selector: (row) => (row.valid == 1 ? 'Aktif' : 'Tidak Aktif' || '-'),
  },
];
export const styleHeader = {
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
