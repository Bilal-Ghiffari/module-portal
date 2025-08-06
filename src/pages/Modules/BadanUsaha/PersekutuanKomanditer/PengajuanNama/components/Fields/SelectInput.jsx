import { Input } from "reactstrap";
import { ErrorMessage } from "formik";

export const SelectInput = ({
  name,
  label,
  value,
  options,
  onChange,
  onBlur,
  col = 3,
  isRequired = false,
  optionValue = "id",
  optionLabel = "nama",
}) => (
  <div className={`col-${col} d-flex flex-column gap-1`}>
    <label className="fw-medium">
      {label} <span className="text-danger">*</span>
    </label>
    <Input
      name={name}
      type="select"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{ padding: "12px 16px", borderRadius: "8px" }}
    >
      {!isRequired && <option value="">Pilih {label}</option>}
      {options?.map((item, idx) => (
        <option key={idx} value={item[optionValue]}>
          {item[optionLabel]}
        </option>
      ))}
    </Input>
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);
