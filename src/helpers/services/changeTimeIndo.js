// Fungsi untuk memformat tanggal ke format Indonesia
export function formatDateToIndonesian(date) {
  if (date) {
    const changeDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return changeDate.toLocaleDateString('id-ID', options);
  }
  return '-';
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // Menggunakan format Inggris (untuk bulan singkat)
}

export function formatDateToIndonesianMinute(date) {
  const changeDate = new Date(date);

  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Format 24 jam
  };

  const formattedDate = changeDate.toLocaleDateString('id-ID', optionsDate);
  const formattedTime = changeDate.toLocaleTimeString('id-ID', optionsTime).replace(/\./g, ':'); // Mengganti titik dengan titik dua

  return `${formattedDate}, ${formattedTime}`;
}
