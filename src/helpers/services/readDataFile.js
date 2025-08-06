import ExcelJS from 'exceljs';

export const readDataExcel = async (file) => {
  if (!file) return;

  const rows = [];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = e.target.result; // Buffer dari file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer); // Memuat file Excel ke workbook

        const worksheet = workbook.worksheets[0]; // Ambil lembar kerja pertama

        // Iterasi setiap baris di worksheet
        worksheet.eachRow((row, rowNumber) => {
          rows.push(row.values); // Simpan setiap baris ke array
        });

        resolve(rows); // Selesaikan Promise dengan data
      } catch (error) {
        reject(error); // Tangani error
      }
    };

    reader.onerror = (error) => {
      reject(error); // Tangani error FileReader
    };

    reader.readAsArrayBuffer(file); // Membaca file sebagai ArrayBuffer
  });
};
