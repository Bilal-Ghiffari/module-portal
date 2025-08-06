import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id"; // Gunakan locale Indonesia

dayjs.extend(utc);
dayjs.extend(timezone);

const parseToNumber = (data) => {
  if (!data) return 0; // Pastikan tidak null atau undefined
  return Number(data.replace(/\./g, ""));
};

const formatDateIndo = (dateString, timeZone = "Asia/Jakarta") => {
  return dayjs
    .tz(dateString, timeZone)
    .locale("id")
    .format("DD MMMM YYYY HH:mm [WIB]"); // WIB bisa diganti dengan WITA/WIT sesuai kebutuhan
};

const convertHexToRGB = (hex) => {
  // Hapus karakter hash (#) jika ada
  hex = hex.replace(/^#/, "");

  // Jika formatnya 3 karakter, ubah menjadi 6 karakter
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};

const formatNumber = (num) => {
  if (num === undefined || num === null || num === "") {
    return "";
  }
  const number = Number(num);

  if (isNaN(number)) {
    return "";
  }

  // Ensure number is a valid finite number
  if (!Number.isFinite(number)) {
    return "";
  }

  // Format the number with thousands separators
  return number.toLocaleString("id-ID");
};

const formatNumberWithComma = (value) => {
  if (value === null || value === undefined) return ""; // Default ke string kosong
  if (typeof value !== "string") value = String(value); // Convert ke string jika bukan string

  // Hilangkan karakter selain angka dan titik
  value = value.replace(/[^0-9.]/g, "");

  // Jika angka diakhiri dengan titik, tandai bahwa desimal kosong
  const endsWithDot = value.endsWith(".");

  // Pisahkan angka sebelum dan setelah titik desimal
  let [integerPart, decimalPart] = value.split(".");

  // Tambahkan separator ribuan (titik)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Gabungkan kembali angka
  if (endsWithDot) {
    return `${integerPart},`; // Pastikan desimal kosong tetap ada
  } else if (decimalPart !== undefined) {
    return `${integerPart},${decimalPart}`; // Jika ada angka desimal
  }

  return integerPart; // Jika tidak ada titik desimal
};

const formatNumberWith2NumberAfterComa = (value) => {
  if (value === null || value === undefined) return ""; // Default ke string kosong
  if (typeof value !== "string") value = String(value); // Convert ke string jika bukan string

  // Hilangkan karakter selain angka dan titik
  value = value.replace(/[^0-9.]/g, "");

  // Jika angka diakhiri dengan titik, tandai bahwa desimal kosong
  const endsWithDot = value.endsWith(".");

  // Pisahkan angka sebelum dan setelah titik desimal
  let [integerPart, decimalPart] = value.split(".");

  // Tambahkan separator ribuan (titik)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Jika ada desimal, pastikan hanya 2 angka di belakang koma
  if (decimalPart !== undefined) {
    decimalPart = decimalPart.slice(0, 2); // Batasi maksimal 2 angka desimal
    return `${integerPart},${decimalPart}`;
  }

  // Jika angka berakhir dengan titik, pastikan tetap ada koma
  if (endsWithDot) {
    return `${integerPart},`;
  }

  return integerPart;
};

function removeDots(value) {
  return value.replace(/\./g, "");
}

const convertToIndonesianFormat = (number) => {
  const hasDecimal = number % 1 !== 0;
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  }).format(number);
};

const convertDateYMD = (dt) => {
  if (!dt) return "";
  const d = new Date(dt);
  const timezoneOffset = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() - timezoneOffset);
  return d.toISOString().split("T")[0];
};
const convertDateDMY = (dt, delimiter = "-", useTimezoneOffset = true) => {
  if (!dt) return "";
  const d = new Date(dt);
  const timezoneOffset = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() - useTimezoneOffset ? timezoneOffset : 0);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, jadi tambahkan 1
  const year = d.getFullYear();

  return `${day}${delimiter}${month}${delimiter}${year}`;
};

const toLowerCapitalCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function filterEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
}

const convertToMB = (size) => {
  if (!size || size <= 0) return null; // Jangan tampilkan jika size 0, null, atau undefined

  return (size / (1024 * 1024)).toFixed(1) + " MB"; // Konversi ke MB dengan 1 desimal
};

const checkNumeric = (value) => {
  return /^-?\d+(\.\d+)?$/.test(value);
};

const formatUnderscore = (str) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const transformData = (data, mapping = {}) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const transformed = {};
    for (const [targetKey, sourceKey] of Object.entries(mapping)) {
      transformed[targetKey] = item[sourceKey];
    }
    return transformed;
  });
};

const extractErrors = (errors) => {
  const errorMessages = [];

  const traverseErrors = (errorObj) => {
    if (typeof errorObj === "string") {
      errorMessages.push(errorObj);
    } else if (Array.isArray(errorObj)) {
      errorObj.forEach(traverseErrors);
    } else if (typeof errorObj === "object" && errorObj !== null) {
      Object.values(errorObj).forEach(traverseErrors);
    }
  };

  traverseErrors(errors);
  return errorMessages.length ? errorMessages.join("<br/>") : null;
};

const removeWord = (text, wordToRemove) => {
  if (typeof text !== "string" || typeof wordToRemove !== "string") return text;

  // Buat regex: ^ -> hanya di awal, \s* -> menghapus spasi setelah kata
  const regex = new RegExp(`^${wordToRemove}\\s*`, "i");
  return text.replace(regex, "");
};
const capitalizeTheFirstLetterOfEachWord = (words) => {
  var separateWord = words?.toLowerCase().split(" ");
  for (var i = 0; i < separateWord?.length; i++) {
    separateWord[i] =
      separateWord[i]?.charAt(0).toUpperCase() + separateWord[i]?.substring(1);
  }
  return separateWord?.join(" ");
};

const filterValidDocuments = (documents) => {
  if (!Array.isArray(documents)) return [];
  return documents.filter((doc) => {
    const values = Object.values(doc || {});
    return values.some((v) => {
      if (Array.isArray(v)) return false; // abaikan array
      if (typeof v === "string") return v.trim() !== "";
      if (typeof v === "number") return v !== 0;
      return v != null;
    });
  });
};

const getStatusStyle = (status) => {
  const cleanStatus = status?.toLowerCase().replace(/_/g, " ");

  switch (cleanStatus) {
    case "sk dan sertifikat terbit":
    case "laporan berkala":
    case "disetujui":
    case "terverifikasi":
      return {
        backgroundColor: "#DFF5E1", // hijau muda
        color: "#2E7D32", // hijau gelap
        keterangan: "Berhasil / Selesai",
      };

    case "revisi":
    case "draft":
      return {
        backgroundColor: "#FFF8E1", // kuning muda
        color: "#F57C00", // oranye
        keterangan: "Draft",
      };

    case "ditolak":
      return {
        backgroundColor: "#FFE0E0", // merah muda
        color: "#D32F2F", // merah gelap
        keterangan: "Ditolak",
      };

    case "dikirim":
      return {
        backgroundColor: "#E3F2FD", // biru muda
        color: "#1976D2", // biru terang
        keterangan: "Perlu Revisi",
      };

    default:
      return {
        backgroundColor: "#E0E0E0", // abu-abu
        color: "#424242", // abu-abu gelap
        keterangan: "Status Tidak Diketahui",
      };
  }
};

const removeUnderscore = (text) => {
  if (!text) return "";
  return text.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatTanggal = (tanggal, format = "D MMMM YYYY", locale = "id") => {
  return dayjs(tanggal).locale(locale).format(format);
};

export {
  filterValidDocuments,
  removeWord,
  capitalizeTheFirstLetterOfEachWord,
  formatUnderscore,
  checkNumeric,
  convertToMB,
  convertToIndonesianFormat,
  convertHexToRGB,
  formatNumber,
  formatNumberWithComma,
  formatNumberWith2NumberAfterComa,
  removeDots,
  convertDateYMD,
  convertDateDMY,
  toLowerCapitalCase,
  filterEmptyValues,
  formatDateIndo,
  parseToNumber,
  transformData,
  extractErrors,
  getStatusStyle,
  removeUnderscore,
  formatTanggal,
};
