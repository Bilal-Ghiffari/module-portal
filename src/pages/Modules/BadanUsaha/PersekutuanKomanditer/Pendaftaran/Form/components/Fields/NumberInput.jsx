import { Input } from "reactstrap";
import { ErrorMessage } from "formik";

export const NumberInput = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  col = 2,
  type = "number",
  maxLength,
}) => (
  <div className={`col-${col} d-flex flex-column gap-1`}>
    <label className="fw-medium">
      {label} <span className="text-danger">*</span>
    </label>
    <Input
      name={name}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={`Tulis ${label}`}
      style={{ padding: "12px 16px", borderRadius: "8px" }}
    />
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);
