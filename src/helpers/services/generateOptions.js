export const generateYearOpt = (start, end) => {
  let yearGenerated = [];

  if (start > end) {
    // Loop dari besar ke kecil
    for (let year = start; year >= end; year--) {
      yearGenerated.push({ value: year, label: year });
    }
  } else {
    // Loop dari kecil ke besar
    for (let year = start; year <= end; year++) {
      yearGenerated.push({ value: year, label: year });
    }
  }

  return yearGenerated;
};

export const generateMonthOpt = () => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return months.map((month, index) => ({
    value: index + 1,
    label: month,
  }));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('userSession'))?.user_detail || {};
};

export const toLowerCapitalCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
