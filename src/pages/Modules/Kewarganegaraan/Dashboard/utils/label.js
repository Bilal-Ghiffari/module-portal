export const getStatusColor = (status) => {
  switch (status) {
    case 0: // Sudah Bayar
      return { bgColor: "#E6F4EA", textColor: "#2E7D32" };
    case 1: // Dikirim
      return { bgColor: "#E3F2FD", textColor: "#1565C0" };
    case 2: // Verifikasi
      return { bgColor: "#FFF8E1", textColor: "#F9A825" };
    case 3: // Ditolak
      return { bgColor: "#FFEBEE", textColor: "#C62828" };
    case 4: // Revisi
      return { bgColor: "#F3E5F5", textColor: "#6A1B9A" };
    default:
      return { bgColor: "#041662", textColor: "#fff" };
  }
};

export const statusLabel = (status) => {
  const labels = ["Sudah Bayar", "Dikirim", "Verifikasi", "Ditolak", "Revisi"];
  return labels[status] || "Tidak Diketahui";
};
