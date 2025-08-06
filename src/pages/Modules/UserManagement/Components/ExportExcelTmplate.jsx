import React, { forwardRef, useImperativeHandle } from 'react';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

const ExportExcelTmplate = forwardRef((props, ref) => {
  const { name, header, data, format_excel = 'xlsx', customText = 'Export Excel', masterData } = props;

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
    const worksheet = workbook.addWorksheet('Sheet 1');
    const worksheet2 = workbook.addWorksheet('Master Data');
    // Add dynamic headers

    header
      .filter((o) => o.name?.toLowerCase() != 'aksi')
      .forEach((label, index) => {
        const startColIndex = 2 + index; // Increment by 1 to handle columns individually (start from column 'B')

        const startCol = getExcelColumnName(startColIndex); // Get the column name from the index
        const startCellRef = startCol + '8'; // Cell reference for the header (row 8)

        // Set a default min width (e.g., 20 characters width)
        worksheet.getColumn(startColIndex).width = 20;

        // Set value in the cell
        worksheet.getCell(startCellRef).value = label.name || label.label;

        const cell = worksheet.getCell(startCellRef);
        
        // Set the entire column format to text
        worksheet.getColumn(startColIndex).numFmt = '@'; // Set the format for the entire column to text

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

    // Common function to process data based on column references and value extractors
    const processData = (data, cellRefs) => {
      const objectKeys = Object.keys(data);

      objectKeys.forEach((el, idx) => {
        const temp_data = masterData[el];

        // Convert the initial cellRef to an index
        let startColIndex = cellRefs[idx].split('').reduce((acc, char) => {
          return acc * 26 + (char.charCodeAt(0) - 65 + 1);
        }, 0);

        // Adjust for zero-indexing
        startColIndex--;
        const startCol = getExcelColumnName(startColIndex + 2); // Get column name from index

        const targetColumns = ['C', 'E', 'G', 'I', 'K', 'M', 'O', 'Q', 'S', 'U'];
        const columnWidths = 40;

        targetColumns.forEach((col) => {
          const colIndex = col.charCodeAt(0) - 65 + 1; // Konversi kolom ke indeks (A=1, B=2, C=3, dst.)
          worksheet2.getColumn(colIndex).width = columnWidths; // Atur lebar kolom
        });

        const currentCellRefTitle = `${startCol}8`; // Calculate current cell reference
        worksheet2.getCell(currentCellRefTitle).value = el;
        const cellTitle = worksheet2.getCell(currentCellRefTitle);
        worksheet2.getRow(8).height = 25;

        // Apply font styling
        cellTitle.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };

        // Align the text to center
        cellTitle.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Add thick border to the header cellTitle
        cellTitle.border = {
          top: { style: 'thick' },
          left: { style: 'thick' },
          bottom: { style: 'thick' },
          right: { style: 'thick' }
        };

        // Set background color for the cellTitle
        cellTitle.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF3B82F6' } // Blue background color
        };

        temp_data?.forEach((rowData, rowIndex) => {
          const currentRowIndex = rowIndex + 9;

          const currentCellRef = `${startCol}${currentRowIndex}`; // Calculate current cell reference

          worksheet2.getCell(currentCellRef).value = rowData;

          // Apply styles to the cell
          worksheet2.getCell(currentCellRef).font = { name: 'Arial', size: 10 };
          worksheet2.getCell(currentCellRef).alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true
          };
          // worksheet2.getCell(currentCellRef).border = {
          //   top: { style: 'thin' },
          //   left: { style: 'thin' },
          //   bottom: { style: 'thin' },
          //   right: { style: 'thin' }
          // };
          worksheet2.getRow(currentRowIndex).height = 20;
        });
      });
    };

    const generateColumns = (headerLength) => {
      return Array.from({ length: headerLength }, (_, i) => String.fromCharCode(66 + i * 2)); // 66 = 'B'
    };

    processData(masterData, generateColumns(Object.keys(masterData).length));

    worksheet.getCell('B2').value = `${name}`;
    worksheet2.getCell('B2').value = 'Master Data';

    // Apply font styling to the about cells
    const about = ['B2', 'G2'];
    about.forEach((cellRef) => {
      const cell = worksheet.getCell(cellRef);
      cell.font = { name: 'Arial', size: 16, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });
    about.forEach((cellRef) => {
      const cell = worksheet2.getCell(cellRef);
      cell.font = { name: 'Arial', size: 16, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });

    // Generate an XLSX file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Save the file using FileSaver
    FileSaver.saveAs(blob, `${name}.${format_excel}`);
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

export default ExportExcelTmplate;
