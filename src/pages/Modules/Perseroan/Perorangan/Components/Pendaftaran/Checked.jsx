const Checked = ({ label, fontSize = "12px" }) => {
  return (
    <div className="form-check d-flex gap-2 m-0 p-0">
      <input
        className="form-check-input"
        type="checkbox"
        id={label}
        // name={name}
        // checked={formik.values.checked}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        style={{
          cursor: "pointer",
          width: fontSize,
          height: fontSize,
          boxShadow: "none",
        }}
      />
      <label
        className="form-check-label"
        htmlFor={label}
        style={{
          fontSize: fontSize,
          fontWeight: 400,
          fontFamily: "Poppins",
          cursor: "pointer",
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default Checked;
