export const mockDropdown = [{ label: "Pendirian", value: "pendirian" }];
export const mockTable = [
  { id: 1, provinsi: "Jawa Barat", jumlah_perseroan: "24.568" },
  { id: 2, provinsi: "Jawa Tengah", jumlah_perseroan: "19.324" },
  { id: 3, provinsi: "Jawa Timur", jumlah_perseroan: "21.876" },
  { id: 4, provinsi: "DKI Jakarta", jumlah_perseroan: "35.102" },
  { id: 5, provinsi: "Banten", jumlah_perseroan: "12.457" },


];

export const getColumn = () => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "provinsi", label: "Provinsi", align: "left" },
  {
    id: "jumlah_perseroan",
    label: "Jumlah Perseroan",
    align: "left",
    cell: (row, index) => (
      <div className="d-flex">
        <p>{row.jumlah_perseroan}</p>
      </div>
    ),
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
export const dummyDataPembubaran = [
  { label: "Keputusan Pemegang Saham", value: 1200 },
  { label: "Akta Pendirian Berakhir", value: 900 },
  { label: "Penetapan Pengadilan", value: 750 },
  { label: "Pailit, harta tak cukup", value: 600 },
  { label: "Pailit, insolvensi", value: 500 },
  { label: "Izin Usaha Dicabut", value: 500 },
];


export const dummyTop5KBLI = [
  { label: "Pertanian Gandum", value: 2500 },
  { label: "Pertanian Kacang Hijau", value: 2100 },
  { label: "Pertanian Aneka Kacang Holtikultura", value: 1800 },
  { label: "Pertanian Biji-bijian Penghasil Minyak Makan", value: 1500 },
  { label: "Pertanian Biji-bijian Penghasil Bukan Minyak Makan", value: 1300 },
];
