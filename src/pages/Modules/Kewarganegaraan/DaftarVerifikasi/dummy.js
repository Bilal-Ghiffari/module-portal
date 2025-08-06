export const dataVerifikasi = [
  {
    no: 1,
    noPermohonan: "PER-001/2025",
    namaPemohon: "Ahmad Fauzi",
    jenisPemohon: "ahmad.fauzi@example.com",
    wilayahPermohon: "Indonesia",
    tanggalPemohon: "1990-05-12",
    verifikasi: [
      { step: 1, color: "#2E9860" },
      { step: 2, color: "#B0B0B0" },
      { step: 3, color: "#B0B0B0" },
      { step: 4, color: "#B0B0B0" },
      { step: 5, color: "#B0B0B0" },
    ],
  },
  {
    no: 2,
    noPermohonan: "PER-002/2025",
    namaPemohon: "Maria Lopez",
    jenisPemohon: "maria.lopez@example.com",
    wilayahPermohon: "Indonesia",
    tanggalPemohon: "1985-08-24",
    verifikasi: [
      { step: 1, color: "#2E9860" },
      { step: 2, color: "#B0B0B0" },
      { step: 3, color: "#B0B0B0" },
      { step: 4, color: "#B0B0B0" },
      { step: 5, color: "#B0B0B0" },
    ],
  },
  {
    no: 3,
    noPermohonan: "PER-003/2025",
    namaPemohon: "John Smith",
    jenisPemohon: "john.smith@example.com",
    wilayahPermohon: "Indonesia",
    tanggalPemohon: "1992-11-03",
    verifikasi: [
      { step: 1, color: "#E45957" },
      { step: 2, color: "#B0B0B0" },
      { step: 3, color: "#B0B0B0" },
      { step: 4, color: "#B0B0B0" },
      { step: 5, color: "#B0B0B0" },
    ],
  },
];

export const categoryFilter = [
  {
    text: "Pernyataan WNI",
    children: [
      {
        text: "Tetap WNI",
        color: "#2E9860",
      },
      {
        text: "Pemulihan WNI",
        color: "#E45957",
      },
      {
        text: "Anak dengan WNI ganda",
        color: "#B0B0B0",
      },
      {
        text: "Naturalisasi Anak Angkat",
        color: "#6D6D6D",
      },
    ],
  },
  {
    text: "Kehilangan WNI",
    children: [
      {
        text: "Kemauan Sendiri",
        color: "#2E9860",
      },
      {
        text: "Memiliki WNA",
        color: "#E45957",
      },
      {
        text: "Belum Memiliki WNA",
        color: "#B0B0B0",
      },
      {
        text: "Mengikuti suami/istri",
        color: "#6D6D6D",
      },
    ],
  },
];
