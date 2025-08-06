export const transformData = (data, config = {}) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const {
      valueKey = "id",
      labelKey = "nama",
      lowercaseValue = false,
      useSameLabelAndValue = false,
    } = config;

    const label = item[labelKey];

    const value = useSameLabelAndValue
      ? label
      : lowercaseValue
      ? String(item[valueKey]).toLowerCase()
      : item[valueKey];

    return {
      label,
      value,
      raw: item, // optional: simpan data mentah
    };
  });
};
