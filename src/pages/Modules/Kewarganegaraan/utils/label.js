export const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return { bgColor: "#C8E6C9", textColor: "#2E7D32" };
    case 1:
      return { bgColor: "#BBDEFB", textColor: "#1565C0" };
    case 2:
      return { bgColor: "#FFF9C4", textColor: "#F9A825" };
    case 3:
      return { bgColor: "#FFCDD2", textColor: "#C62828" };
    case 4:
      return { bgColor: "#D1C4E9", textColor: "#6A1B9A" };
    default:
      return { bgColor: "#E0E0E0", textColor: "#424242" };
  }
};

export const statusLabel = (status) => {
  const labels = ["Sudah Bayar", "Dikirim", "Verifikasi", "Ditolak", "Revisi"];
  return labels[status] || "Tidak Diketahui";
};
