import get from "lodash/get";

const Checked = ({
  label,
  value,
  fontSize = "12px",
  fieldName,
  formik,
  type = "checkbox",
  isMulti = false, // default: single value
  onChange,
}) => {
  const currentValue = get(formik.values, fieldName);
  const isChecked = isMulti
    ? Array.isArray(currentValue) && currentValue.includes(value)
    : currentValue === value;

  const handleChange = (e) => {
    if (type === "checkbox" && isMulti) {
      // multi: add/remove value in array
      let newValue = Array.isArray(currentValue) ? [...currentValue] : [];
      if (e.target.checked) {
        newValue.push(value);
      } else {
        newValue = newValue.filter((v) => v !== value);
      }
      formik.setFieldValue(fieldName, newValue);
    } else {
      // single value: behave like radio or single checkbox
      if (e.target.checked) {
        formik.setFieldValue(fieldName, value);
      } else {
        formik.setFieldValue(fieldName, "");
      }
    }
  };

  return (
    <div className="form-check d-flex gap-2 m-0 p-0">
      <input
        className="form-check-input"
        type={type}
        id={`${fieldName}_${value}`}
        name={fieldName}
        value={value}
        defaultChecked={isChecked}
        onChange={onChange ? onChange : handleChange}
        onBlur={formik?.handleBlur}
        style={{
          cursor: "pointer",
          width: fontSize,
          height: fontSize,
          boxShadow: "none",
          border: "1px solid #333",
          borderRadius: "4px",
        }}
      />
      {label && (
        <label
          className="form-check-label"
          htmlFor={`${fieldName}_${value}`}
          style={{
            fontSize,
            fontWeight: 400,
            fontFamily: "Poppins",
            cursor: "pointer",
          }}
        >
          {label}
          {get(formik?.touched, fieldName) &&
            get(formik?.errors, fieldName) && (
              <p className="text-danger m-0">
                {get(formik?.errors, fieldName)}
              </p>
            )}
        </label>
      )}
    </div>
  );
};

export default Checked;
