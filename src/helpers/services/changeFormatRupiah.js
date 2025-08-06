export const handleChangeFormatRupiah = (event, validation, fieldName) => {
  const rawValue = event.target.value.replace(/\D/g, '');
  const formattedValue = new Intl.NumberFormat('id-ID').format(rawValue);
  validation.setFieldValue(fieldName, formattedValue);
};

export function formatRupiah(angka) {
  let rupiah = 'Rp' + angka?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return rupiah;
}
