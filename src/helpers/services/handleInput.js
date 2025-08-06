export const validateCoordinate = (value) => {
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(value);
};

export const formatToIndonesianCurrency = (input) => {
  const inputValue = input != null ? input.toString() : ''; // Menghindari null/undefined

  // Hapus semua karakter non-digit kecuali titik dan koma
  const cleanedValue = inputValue.replace(/[^0-9.,]/g, '');

  // Ganti koma dengan titik untuk mempermudah konversi
  const normalizedValue = cleanedValue.replace(',', '.');

  // Konversi ke angka
  const numericValue = parseFloat(normalizedValue);

  // Validasi bahwa nilai lebih besar dari 0
  if (isNaN(numericValue) || numericValue <= 0) {
    return ''; // Tidak menerima nilai 0 atau NaN
  }

  // Format angka dengan titik sebagai pemisah ribuan
  const formattedValue = numericValue.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formattedValue;
};

export const vldNumb2Comma = (value) => {
  const regex = /^(0|[1-9]\d*)(,\d{0,2})?$|^$/;
  return regex.test(value);
};
export const vldNumb1Comma = (value) => {
  const regex = /^(?!0(,0)?$)(\d*(,\d{0,1})?)?$/;
  return regex.test(value);
};
export const positiveNumb = (value) => {
  const regex = /^\d*$/;
  return regex.test(value);
};

export const formatCurrency = (value, showRp = false) => {
  const numberValue = String(value ?? "").replace(/\D/g, "");
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Number(numberValue) || 0);

  return showRp ? `Rp ${formatted}` : formatted;
};
