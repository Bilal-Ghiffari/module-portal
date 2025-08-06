import React, { forwardRef, useImperativeHandle } from 'react';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

const ExportExcelWithSubHeader = forwardRef((props, ref) => {
  const { name, header, setFile, isHide, groupMapHeader, subMapHeader } = props;

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

  // Group Headers
  const createGroupAndSubHeaders = (header) => {

    // Initialize empty group headers and sub headers
    const groupHeaders = [];
    let currentGroup = '';
    let groupSpan = 0;

    // jangan lupa tambahin prefix
    header.forEach((col, idx) => {
      if (col.prefix) {
        // Extract the group prefix from `id`
        const groupPrefix = col.prefix;

        // If new group detected
        if (groupPrefix !== currentGroup) {
          if (currentGroup) {
            // Push the previous group header with the accumulated span
            groupHeaders.push({ label: groupMapHeader[currentGroup] || currentGroup, span: groupSpan });
          }
          // Reset the group span and set the new current group
          currentGroup = groupPrefix;
          groupSpan = 1;
        } else {
          // Increment the span for the current group
          groupSpan++;
        }

        // If it's the last column, push the final group header
        if (idx === header.length - 1) {
          groupHeaders.push({ label: groupMapHeader[currentGroup] || currentGroup, span: groupSpan });
        }
      }
    });

    return groupHeaders;
  };

  const downloadExcel = async (datas) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    worksheet.getCell('B2').value = `${name}`;
    worksheet.getCell('G2').value = `Terakhir update : ${formattedDate}`;

    // Apply font styling to the about cells
    const about = ['B2', 'G2'];
    about.forEach((cellRef) => {
      const cell = worksheet.getCell(cellRef);
      cell.font = { name: 'Arial', size: 16, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });

    // Example of how to use it
    const groupHeaders = createGroupAndSubHeaders(header);
    let subHeaders = [];
    groupHeaders.forEach((_) => {
      subMapHeader.forEach(item => 
        subHeaders.push({ label: item })
      )
    });

    // worksheet.mergeCells('B8:B9'); // Assuming WPP is in column B

    // // Set the merged cell value and style for WPP
    // worksheet.getCell('B8').value = 'WPP'; // Set the merged header label
    // worksheet.getCell('B8').font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
    // worksheet.getCell('B8').alignment = { vertical: 'middle', horizontal: 'center' };
    // worksheet.getCell('B8').fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FF3B82F6' },
    // };
    // worksheet.getCell('B8').border = {
    //   top: { style: 'medium' },
    //   left: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   right: { style: 'medium' },
    // };


    let currentCol = 2;
    const headerStartCols = [];

    header.filter(o => !o.prefix).forEach((header) => {
      const startCol = getExcelColumnName(currentCol);
      worksheet.mergeCells(`${startCol}8:${startCol}9`);
      
      headerStartCols.push({ col: currentCol, name: header.name });

      worksheet.getCell(`${startCol}8`).value = header.name;
      worksheet.getCell(`${startCol}8`).font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getCell(`${startCol}8`).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(`${startCol}8`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' },
      };
      worksheet.getCell(`${startCol}8`).border = {
        top: { style: 'medium' },
        left: { style: 'medium' },
        bottom: { style: 'medium' },
        right: { style: 'medium' },
      };
      currentCol += 1;
    });


    // Define column widths based on your needs (optional)
    const columnWidths = [20, ...header.map(o=> Math.ceil(o.width / 6))];
    columnWidths.forEach((width, idx) => (worksheet.getColumn(idx + 1).width = width));

    // Merge cells for group headers
    let groupStartCol = headerStartCols.at(-1)?.col + 1 || 3;
    groupHeaders.forEach((header) => {
      const startCol = getExcelColumnName(groupStartCol);
      const endCol = getExcelColumnName(groupStartCol + header.span - 1);
      worksheet.mergeCells(`${startCol}8:${endCol}8`);
      worksheet.getCell(`${startCol}8`).value = header.label;
      worksheet.getCell(`${startCol}8`).font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getCell(`${startCol}8`).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(`${startCol}8`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' },
      };
      worksheet.getCell(`${startCol}8`).border = {
        top: { style: 'medium' },
        left: { style: 'medium' },
        bottom: { style: 'medium' },
        right: { style: 'medium' },
      };
      groupStartCol += header.span;
    });

    // Add sub-headers
    let subHeaderStartCol = headerStartCols.at(-1)?.col + 1 || 3;
    subHeaders.forEach((header, idx) => {
      const cellRef = `${getExcelColumnName(idx + subHeaderStartCol)}9`;
      worksheet.getCell(cellRef).value = header.label;
      worksheet.getCell(cellRef).font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getCell(cellRef).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(cellRef).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' },
      };
      worksheet.getCell(cellRef).border = {
        top: { style: 'medium' },
        left: { style: 'medium' },
        bottom: { style: 'medium' },
        right: { style: 'medium' },
      };
    });

    // Populate data rows (starting from row 3)
    datas?.forEach((rowData, rowIndex) => {
      header.forEach((column, colIndex) => {
        const cellRef = `${getExcelColumnName(colIndex + 2)}${rowIndex + 10}`;
        // worksheet.getCell(cellRef).value = rowData[column.id];
        // worksheet.getCell(cellRef).alignment = { vertical: 'middle', horizontal: 'center' };
        if (!isNaN(rowData[column.id]) && !isNaN(parseFloat(rowData[column.id]))) {
          worksheet.getCell(cellRef).value = parseFloat(rowData[column.id]);
          // Check if the value is an integer or a decimal number
          if (Number.isInteger(parseFloat(rowData[column.id]))) {
            worksheet.getCell(cellRef).numFmt = '0'; // No decimal places
          } else {
            worksheet.getCell(cellRef).numFmt = '0.00'; // Show 2 decimal places for non-integers
          }
        } else {
          worksheet.getCell(cellRef).value = rowData[column.id];
        }

        // Apply styles to the cell
        worksheet.getCell(cellRef).font = { name: 'Arial', size: 10 };
        worksheet.getCell(cellRef).alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        };
        worksheet.getCell(cellRef).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        worksheet.getRow(rowIndex + 10).height = 20;
      });
    });

    // Save and download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    if (isHide) {
      // untuk data insight (dikirim ke email)
      const fileName = `${name}.xlsx`;
      const file = new File([blob], fileName, {
        type: blob.type,
        lastModified: new Date().getTime(),
      });
      setFile(file);
    } else {
      // Save the file using FileSaver
      FileSaver.saveAs(blob, `${name}.xlsx`);
    }
  };

  useImperativeHandle(ref, () => ({
    downloadExcel,
  }));

  return (
    <button onClick={downloadExcel} className="btn btn-success">
      Export Excel
    </button>
  );
});

export default ExportExcelWithSubHeader;
