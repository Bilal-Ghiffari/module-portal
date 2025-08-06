import React, { forwardRef, useImperativeHandle } from 'react';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { formatToIndonesianCurrency } from '@/helpers/services/handleInput';
import { formatDateToIndonesianMinute } from '@/helpers/services/changeTimeIndo';

//labelSheet = Buat custom banyaknya dan nama sheet
//multiHeader = dipakai berbarengan dengan labelSheet untuk dinamis header dari masing masing sheet
const ExportExcelDatis = forwardRef((props, ref) => {
  const { name, header, setFile, isHide, data, format_excel = 'xlsx', customText = 'Export Excel', hideLastUpdate, addonsDownload, labelSheet = ['Sheet1'], multiHeader } = props;

  //Dinamis Column Name
  const getExcelColumnName = (colIndex) => {
    let columnName = '';
    let dividend = colIndex;
    let modulo;

    while (dividend > 0) {
      modulo = (dividend - 1) % 26;
      columnName = String.fromCharCode(65 + modulo) + columnName;
      dividend = Math.floor((dividend - modulo) / 26);
    }

    return columnName;
  };

  const downloadExcel = async (datas) => {
    const workbook = new ExcelJS.Workbook();

    //buat dinamis sheet nya lebih dari 1
    labelSheet.forEach((el, index) => {
      const headerUsed = multiHeader ? multiHeader[index] : header;
      const rmvHeaderAksi = headerUsed?.filter((o) => o.id != 'action');
      
      const worksheet = workbook.addWorksheet(el);
      // Add dynamic headers

      rmvHeaderAksi.forEach((label, index) => {
        const startColIndex = 2 + index; // Increment by 1 to handle columns individually (start from column 'B')

        const startCol = getExcelColumnName(startColIndex); // Get the column name from the index
        const startCellRef = startCol + '8'; // Cell reference for the header (row 8)

        // Set a default min width (e.g., 20 characters width)
        worksheet.getColumn(startColIndex).width = 20;

        // Set value in the cell
        worksheet.getCell(startCellRef).value = label.label || label.name;

        const cell = worksheet.getCell(startCellRef);

        // Apply font styling
        cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };

        // Align the text to center
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Add thick border to the header cell
        cell.border = {
          top: { style: 'thick' },
          left: { style: 'thick' },
          bottom: { style: 'thick' },
          right: { style: 'thick' }
        };

        // Set background color for the cell
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF3B82F6' } // Blue background color
        };
      });

      const today = new Date();
      const formattedDate = formatDateToIndonesianMinute(today);

      // Common function to process data based on column references and value extractors
      const processData = (data, cellRefs, valueExtractor) => {
        //Find Index No Kusuka, buat cek tipe unduh di excel
        const findText = rmvHeaderAksi.reduce((result, item, index) => {
          if (item.isText || item.id === 'no_kusuka') {
            result.push(index);
          }
          return result;
        }, []);

        const dataArray = Array.isArray(datas) ? datas : Array.isArray(data) ? data : [];
        dataArray?.forEach((rowData, rowIndex) => {
          //Check ada properties dan berbentuk array atau tidak
          const temp_data = rowData?.properties ? rowData?.properties : rowData;

          const values = valueExtractor(temp_data).map((value) => value);

          cellRefs.forEach((cellRef, cellIndex) => {
            const currentRowIndex = rowIndex + 9; // Start from row 10

            // Convert the initial cellRef to an index
            let startColIndex = cellRef.split('').reduce((acc, char) => {
              return acc * 26 + (char.charCodeAt(0) - 65 + 1);
            }, 0);

            // Adjust for zero-indexing
            startColIndex--;

            const startCol = getExcelColumnName(startColIndex + 1); // Get column name from index
            const currentCellRef = `${startCol}${currentRowIndex}`; // Calculate current cell reference

            // Set the cell value, checking if the value is numeric
            const cellValue = values[cellIndex];

            // Check if the value should be treated as a number
            //Case Khusus, semua no_kusuka dibuat text
            if (!isNaN(cellValue) && !isNaN(parseFloat(cellValue)) && !findText.includes(cellIndex)) {
              worksheet.getCell(currentCellRef).value = parseFloat(cellValue);
              if (Number.isInteger(parseFloat(cellValue))) {
                worksheet.getCell(currentCellRef).numFmt = '0'; // No decimal places
              } else {
                worksheet.getCell(currentCellRef).numFmt = '0.00'; // Show 2 decimal places for non-integers
              }
            } else {
              worksheet.getCell(currentCellRef).value = cellValue;
            }

            // Apply styles to the cell
            worksheet.getCell(currentCellRef).font = { name: 'Arial', size: 10 };
            worksheet.getCell(currentCellRef).alignment = {
              vertical: 'middle',
              horizontal: 'center',
              wrapText: true
            };
            worksheet.getCell(currentCellRef).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
            worksheet.getRow(currentRowIndex).height = 20;
          });
        });
      };

      const formatToIndonesianCurrency = (value) => {
        if (!value) return 'Rp0';
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(value);
      };

      const getDataFromRow = (rowData) => {
        return rmvHeaderAksi.map((h) => {
          const value = rowData[h.id ? h.id : h.propertyKey];

          if (h.id === 'lat_x') {
            // Format lat/long output
            const latitude = rowData.lat_x || '-';
            const longitude = rowData.long_y || '-';
            return `Lat: ${latitude}, Long: ${longitude}`;
          }

          if (h.id === 'lat_bast_kpb_penerima' || h.id === 'long_bast_kpb_penerima') {
            // Format lat/long output
            const latitude = rowData.lat_bast_kpb_penerima || '-';
            const longitude = rowData.long_bast_kpb_penerima || '-';
            return `Lat: ${latitude}, Long: ${longitude}`;
          }

          if (h.id === 'file_bast_kpb_penerima' && Array.isArray(rowData?.spesifikasi)) {
            const realisasi_volume = rowData?.file_bast_kpb_penerima?.orig_name;
            return realisasi_volume;
          }

          if (h.id === 'jumlah_bantuan_diterima' && Array.isArray(rowData?.spesifikasi)) {
            const realisasi_volume = rowData.spesifikasi ? rowData.spesifikasi.reduce((total, item) => total + (Number(item.realisasi_volume) || 0), 0) : 0;

            return realisasi_volume;
          }

          if (h.id === 'nilai_satuan' && Array.isArray(rowData?.spesifikasi)) {
            const hargaSatuan = rowData.spesifikasi ? rowData.spesifikasi.reduce((total, item) => total + (Number(item.harga_satuan) || 0), 0) : 0;

            return formatToIndonesianCurrency(hargaSatuan);
          }

          if (h.id === 'nilai_perolehan_bast_kpb_penerima' && Array.isArray(rowData?.spesifikasi)) {
            const totalNilai = rowData?.spesifikasi?.reduce((sum, item) => sum + (item.realisasi_volume || 0) * (item.harga_satuan || 0), 0) || 0;
            return formatToIndonesianCurrency(totalNilai);
          }

          return value;
        });
      };

      const generateColumns = (headerLength) => {
        return Array.from({ length: headerLength }, (_, i) => String.fromCharCode(66 + i)); // 66 = 'B'
      };

      processData(datas || [], generateColumns(rmvHeaderAksi.length), getDataFromRow);

      worksheet.getCell('B2').value = `${name}`;

      // Apply font styling to the title cells
      const title = worksheet.getCell('B2');
      title.font = { name: 'Arial', size: 14, bold: true };
      title.alignment = { vertical: 'middle', horizontal: 'left' };

      if (!hideLastUpdate) {
        worksheet.getCell('G1').value = 'Sumber: https://portaldata.kkp.go.id';
        worksheet.getCell('G2').value = `Waktu Unduh : ${formattedDate}`;
      }

      const watermark = ['G1', 'G2'];
      watermark.forEach((cellRef) => {
        const cell = worksheet.getCell(cellRef);
        cell.font = { name: 'Arial', size: 12, bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });

      //addons
      if (addonsDownload) {
        worksheet.mergeCells('B6:D6');
        worksheet.getCell('B6').value = {
          richText: addonsDownload
        };
        // Aktifkan wrapText agar multiline terlihat
        worksheet.getCell('B6').alignment = { wrapText: true };
        // Set row height agar teks tidak terpotong setelah merge
        worksheet.getRow(6).height = (addonsDownload.length / 2) * 20;
      }
    });

    // Generate an XLSX file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    if (isHide) {
      // untuk data insight (dikirim ke email)
      const fileName = `${name}.${format_excel}`;
      const file = new File([blob], fileName, {
        type: blob.type,
        lastModified: new Date().getTime()
      });
      setFile(file);
    } else {
      // Save the file using FileSaver
      FileSaver.saveAs(blob, `${name}.${format_excel}`);
    }
  };

  useImperativeHandle(ref, () => ({
    downloadExcel
  }));

  return (
    <button onClick={() => downloadExcel(data)} className="btn btn-success">
      {customText}
    </button>
  );
});

export default ExportExcelDatis;
