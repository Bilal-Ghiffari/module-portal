export const KATEGORI_OBJEK = [
  {
    label: 'OBJEK BERSERIAL NOMOR',
    value: 'obyek_berseri_nomor',
  },
  {
    label: 'OBJEK TIDAK BERSERIAL NOMOR',
    value: 'obyek_tidak_berseri_nomor',
  },
];

export const SUB_OBJEK_BERSERIAL_NOMOR = [
  { value: 'KENDARAAN_RODA_DUA', label: 'Kendaraan Roda Dua' },
  { value: 'KENDARAAN_RODA_EMPAT', label: 'Kendaraan Roda Empat' },
  { value: 'ALAT_PERTANIAN', label: 'Alat Pertanian' },
  { value: 'ALAT_BERAT', label: 'Alat Berat' },
  { value: 'SAHAM', label: 'Saham' },
  { value: 'OBLIGASI', label: 'Obligasi' },
  { value: 'KENDARAAN_LAINNYA', label: 'Kendaraan Lainnya' },
];

export const SUB_OBJEK_TIDAK_BERSERIAL_NOMOR = [
  { value: 'HEWAN_TERNAK', label: 'Hewan Ternak' },
  { value: 'ASET_PERUSAHAAN', label: 'Aset Perusahaan' },
  { value: 'RUMAH_SUSUN', label: 'Rumah Susun' },
];

export const RENTANG_NOMINAL = [
  {
    value: '0-50000000',
    label: 'Sampai Rp 50.000.000',
    harga: '50.000',
  },
  {
    value: '50000001-100000000',
    label: 'Diatas Rp 50.000.000 Sampai Dengan Rp 100.000.000',
    harga: '10.0000',
  },
  {
    value: '100000001-250000000',
    label: 'Diatas Rp 100.000.000 Sampai Dengan Rp 250.000.000',
    harga: '20.0000',
  },
  {
    value: '250000001-500000000',
    label: 'Diatas Rp 250.000.000 Sampai Dengan Rp 500.000.000',
    harga: '45.0000',
  },
  {
    value: '500000001-1000000000',
    label: 'Diatas Rp 500.000.000 Sampai Dengan Rp 1.000.000.000',
    harga: '85.0000',
  },
  {
    value: '1000000001-100000000000',
    label: 'Diatas Rp 1.000.000.000 Sampai Dengan Rp 100.000.000.000',
    harga: '1.800.000',
  },
  {
    value: '100000000001-500000000000',
    label: 'Diatas Rp 100.000.000.000 Sampai Dengan Rp 500.000.000.000',
    harga: '3.500.000',
  },
  {
    value: '500000000001-1000000000000',
    label: 'Diatas Rp 500.000.000.000 Sampai Dengan Rp 1.000.000.000.000',
    harga: '6.800.000',
  },
  {
    value: '1000000000001-max',
    label: 'Diatas Rp 1.000.000.000.000',
    harga: '13.000.000',
  },
];

export const FORM_STEPS = [
  'Identitas Diri',
  'Identitas Suami/Istri',
  'Surat Permohonan',
  'Unggah Dokumen',
];

export const PEKERJAAN_OPTIONS = [
  { value: 'PNS', label: 'Pegawai Negeri Sipil' },
  { value: 'TNI/POLRI', label: 'TNI/POLRI' },
  { value: 'Karyawan Swasta', label: 'Karyawan Swasta' },
  { value: 'Wiraswasta', label: 'Wiraswasta' },
  { value: 'Pelajar/Mahasiswa', label: 'Pelajar/Mahasiswa' },
  { value: 'Ibu Rumah Tangga', label: 'Ibu Rumah Tangga' },
  { value: 'Pensiunan', label: 'Pensiunan' },
  { value: 'Lainnya', label: 'Lainnya' },
];

export const KEWARGANEGARAAN_OPTIONS = [
  { value: 'WNI', label: 'Warga Negara Indonesia' },
  { value: 'WNA', label: 'Warga Negara Asing' },
];

export const JENIS_KELAMIN_OPTIONS = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' },
];

// export const AGAMA_OPTIONS = [
//   { value: 'Islam', label: 'Islam' },
//   { value: 'Kristen', label: 'Kristen' },
//   { value: 'Katolik', label: 'Katolik' },
//   { value: 'Hindu', label: 'Hindu' },
//   { value: 'Buddha', label: 'Buddha' },
//   { value: 'Konghucu', label: 'Konghucu' },
//   { value: 'Lainnya', label: 'Lainnya' },
// ];

// export const STATUS_PERNIKAHAN_OPTIONS = [
//   { value: 'Belum Kawin', label: 'Belum Kawin' },
//   { value: 'Kawin', label: 'Kawin' },
//   { value: 'Cerai Hidup', label: 'Cerai Hidup' },
//   { value: 'Cerai Mati', label: 'Cerai Mati' },
// ];

// export const PROVINSI_OPTIONS = [
//   { value: 'Jawa Barat', label: 'Jawa Barat' },
//   { value: 'DKI Jakarta', label: 'DKI Jakarta' },
//   { value: 'Jawa Tengah', label: 'Jawa Tengah' },
// ];

// export const KABUPATEN_KOTA_OPTIONS = [
//   { value: 'Bekasi', label: 'Bekasi' },
//   { value: 'Bandung', label: 'Bandung' },
//   { value: 'Jakarta Pusat', label: 'Jakarta Pusat' },
// ];

// export const KECAMATAN_OPTIONS = [
//   { value: 'Bantar Gebang', label: 'Bantar Gebang' },
//   { value: 'Cikarang Barat', label: 'Cikarang Barat' },
//   { value: 'Tambun Selatan', label: 'Tambun Selatan' },
// ];

// export const KELURAHAN_OPTIONS = [
//   { value: 'Mustika Jaya', label: 'Mustika Jaya' },
//   { value: 'Pekayon Jaya', label: 'Pekayon Jaya' },
//   { value: 'Jati Asih', label: 'Jati Asih' },
// ];

export const JENIS_PENDAFTARAN_OPTIONS = [
  { value: 'Korporasi', label: 'Korporasi' },
  { value: 'Perseorangan', label: 'Perseorangan' },
];

export const JENIS_KORPORASI_OPTIONS = [
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Asing', label: 'Asing' },
  { value: 'Lainnya', label: 'Lainnya' },
];
