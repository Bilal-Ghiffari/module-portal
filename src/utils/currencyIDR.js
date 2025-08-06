export const formatRupiah = (nominal) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal);
};

export const numberToWords = (number) => {
  const units = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
  ];
  const teens = [
    'sepuluh',
    'sebelas',
    'dua belas',
    'tiga belas',
    'empat belas',
    'lima belas',
    'enam belas',
    'tujuh belas',
    'delapan belas',
    'sembilan belas',
  ];
  const tens = [
    '',
    '',
    'dua puluh',
    'tiga puluh',
    'empat puluh',
    'lima puluh',
    'enam puluh',
    'tujuh puluh',
    'delapan puluh',
    'sembilan puluh',
  ];
  const scales = ['', 'ribu', 'juta', 'miliar', 'triliun'];

  if (number === 0) return 'nol';

  const convertChunk = (n) => {
    if (n === 0) return '';

    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      const ten = Math.floor(n / 10);
      const unit = n % 10;
      return unit !== 0 ? tens[ten] + ' ' + units[unit] : tens[ten];
    }

    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return (
      (hundred === 1 ? 'seratus' : units[hundred] + ' ratus') +
      (rest > 0 ? ' ' + convertChunk(rest) : '')
    );
  };

  const convertNumber = (num) => {
    if (num === 0) return '';

    let result = '';
    let scaleIndex = 0;

    while (num > 0) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        const chunkWords = convertChunk(chunk);
        result =
          chunkWords +
          (scaleIndex > 0 ? ' ' + scales[scaleIndex] : '') +
          (result ? ' ' + result : '');
      }
      num = Math.floor(num / 1000);
      scaleIndex++;
    }

    return result.trim();
  };

  return convertNumber(Math.floor(number)) + ' Rupiah';
};

export const calculateNominalRupiah = (kurs, nominal, exchangeRates) => {
  // Ekstrak label/value dari objek kurs jika diperlukan
  const kursValue = kurs?.value || kurs;

  // Validasi input
  if (!nominal || !kursValue || !exchangeRates) {
    console.error('Input tidak valid untuk konversi');
    return 0;
  }

  // Tambahkan validasi tipe
  if (typeof nominal !== 'number') {
    console.warn('Nominal bukan angka, mengkonversi...');
    nominal = Number(nominal);
  }

  // Validasi nominal
  if (isNaN(nominal)) {
    console.error('Nominal tidak valid');
    return 0;
  }

  // Jika kurs adalah IDR, langsung gunakan nominal
  if (kursValue === 'IDR') {
    return Number(nominal);
  }

  // Pastikan kurs ada di rates
  if (!exchangeRates[kursValue]) {
    console.error(`Kurs ${kursValue} tidak ditemukan`);
    return 0;
  }

  // Konversi dengan metode cross-rate
  try {
    // Dapatkan rate ke IDR
    const rateToIDR = 1 / exchangeRates[kursValue];

    // Hitung nominal rupiah
    const nominalRupiah = nominal * rateToIDR;

    // Format nominal rupiah dengan pembulatan
    const formattedNominalRupiah = Math.round(nominalRupiah);

    return formattedNominalRupiah;
  } catch (error) {
    console.error('Kesalahan dalam konversi:', error);
    return 0;
  }
};
