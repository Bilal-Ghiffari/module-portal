export const mockDropdown = [
  { label: "Legalisasi", value: "legalisasi" },
  { label: "Apostille", value: "apostille" },
];
export const mockTable = [
  {
    id: 1,
    nama_lengkap: "Fauzi Iskandar Batubara",
    tanggal_permohonan: "24-09-2024",
  },
  {
    id: 2,
    nama_lengkap: "Fauzi Iskandar Batubara",
    tanggal_permohonan: "24-09-2024",
  },
  {
    id: 3,
    nama_lengkap: "Fauzi Iskandar Batubara",
    tanggal_permohonan: "24-09-2024",
  },
  {
    id: 4,
    nama_lengkap: "Fauzi Iskandar Batubara",
    tanggal_permohonan: "24-09-2024",
  },
  {
    id: 5,
    nama_lengkap: "Fauzi Iskandar Batubara",
    tanggal_permohonan: "24-09-2024",
  },
];

export const getColumn = () => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_lengkap", label: "Nama Lengkap", align: "left" },
  {
    id: "tanggal_permohonan",
    label: "Tanggal Permohonan",
    align: "left",
  },
];

export const dummyDataKBLI = [
  { label: "januari", value: 1200, rawValue: 10 },
  { label: "februari", value: 1500, rawValue: 12 },
  { label: "maret", value: 1100, rawValue: 9 },
  { label: "april", value: 1800, rawValue: 15 },
  { label: "mei", value: 1700, rawValue: 14 },
  { label: "juni", value: 1600, rawValue: 13 },
  { label: "juli", value: 1900, rawValue: 16 },
  { label: "agustus", value: 2000, rawValue: 17 },
  { label: "september", value: 1400, rawValue: 11 },
  { label: "oktober", value: 2100, rawValue: 18 },
  { label: "november", value: 2200, rawValue: 19 },
  { label: "desember", value: 2300, rawValue: 20 },
];
