export const fragmentsData = [
  {
    title: "Total Permohonan",
    value: "4.680",
    color: "#60AAFA",
  },
  {
    title: "Total Belum Verifikasi",
    value: "4.680",
    color: "#F2933D",
  },
  {
    title: "Total Disetujui",
    value: "4.680",
    color: "#51B67D",
  },
  {
    title: "Total Ditolak",
    value: "4.680",
    color: "#EE7D7B",
  },
];

export const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [12000, 19000, 15000, 18000, 21000, 24000],
};

export const ordersData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [450, 620, 580, 700, 800, 950],
};

export const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  data: [65000, 59000, 80000, 81000, 56000, 75000, 90000],
};

export const userGrowthData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Okt",
    "Nov",
    "Des",
  ],
  datasets: [
    {
      label: "Disetujui",
      data: [50, 100, 150, 200, 150, 50, 100, 200, 100, 150, 300, 100],
      borderColor: "#1F7C4D",
      backgroundColor: "#fff",
      tension: 0.4,
    },
    {
      label: "Ditolak",
      data: [10, 20, 50, 60, 100, 50, 200, 150, 75, 90, 10, 100, 20],
      borderColor: "#CF3533",
      backgroundColor: "#FDF3F3",
      tension: 0.4,
    },
  ],
};

export const applications = [
  {
    no: "1",
    nama_lengkap: "Fauzi Iskandar Batubara",
    negara_asal: "Indonesia",
    tanggal_permohonan: "24-08-2024",
  },
  {
    no: "2",
    nama_lengkap: "Fauzi Iskandar Batubara",
    negara_asal: "Indonesia",
    tanggal_permohonan: "12-08-2024",
  },
  {
    no: "3",
    nama_lengkap: "Fauzi Iskandar Batubara",
    negara_asal: "Indonesia",
    tanggal_permohonan: "04-08-2024",
  },
  {
    no: "4",
    nama_lengkap: "Fauzi Iskandar Batubara",
    negara_asal: "Indonesia",
    tanggal_permohonan: "04-08-2024",
  },
];

export const applicationColumns = [
  { id: "no", label: "No" },
  { id: "nama_lengkap", label: "Nama Lengkap" },
  { id: "negara_asal", label: "Negara Asal" },
  { id: "tanggal_permohonan", label: "Tanggal Permohonan" },
];
