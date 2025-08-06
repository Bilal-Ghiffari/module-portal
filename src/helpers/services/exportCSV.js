import Papa from 'papaparse';

export const exportToCSV = ({data, customHeader, fields, fileName = 'data.csv', downloadFile, hideTitle, separator = ",",fileType = 'csv' }) => {
  // Menyusun data CSV dengan judul di baris pertama, header di baris kedua, dan data di baris ketiga dan seterusnya
  const csvData = [
    !hideTitle && [fileName.replace(`.${fileType}`, '')], // Baris judul
    !hideTitle & [],
    customHeader, // Baris header kustom
    ...data.map((item) => fields.map((field) => item[field]?.toString() || ''))
  ].filter(Boolean);

  // Gunakan PapaParse untuk mengonversi ke CSV
  const csv = Papa.unparse(csvData, { delimiter: separator });

  // Tentukan tipe MIME berdasarkan fileType
  const mimeType = fileType === 'txt' ? 'text/plain' : 'text/csv';
  const blob = new Blob([csv], { type: mimeType });
  if (downloadFile) {
    // Membuat URL objek untuk Blob
    const url = URL.createObjectURL(blob);
    // Membuat elemen <a> untuk download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Menambahkan elemen <a> ke DOM (sementara) dan memicu klik
    document.body.appendChild(link);
    link.click();

    // Membersihkan elemen <a> dari DOM
    document.body.removeChild(link);
  } else {
    // Mengembalikan objek Blob atau File
    return new File([blob], fileName, { type: 'text/csv' });
  }
};
