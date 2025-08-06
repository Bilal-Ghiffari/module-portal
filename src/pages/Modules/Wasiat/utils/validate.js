export const isValueFilled = (value) => {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    !(Array.isArray(value) && value.length === 0) &&
    !(
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    )
  );
};
export const getFilledValues = (values, fields) => {
  return fields.reduce((acc, field) => {
    const value = values[field];
    if (isValueFilled(value)) {
      acc[field] = value;
    }
    return acc;
  }, {});
};
