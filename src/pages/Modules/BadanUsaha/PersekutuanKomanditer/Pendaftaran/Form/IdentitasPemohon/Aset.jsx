import { ErrorMessage } from "formik";
import { InputGroupText } from "reactstrap";
import { InputGroup } from "reactstrap";
import { Input } from "reactstrap";

const Aset = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const formatRupiah = (value) => {
    if (!value || isNaN(value)) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const parseRupiah = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  return (
    <section className="d-flex flex-column gap-3">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Aset</span>
      </div>

      <div className="row g-3">
        {/* Aset */}
        <div className="col d-flex flex-column gap-1">
          <label className="fw-medium">
            Nilai Aset <span style={{ color: "red" }}>*</span>
          </label>
          <InputGroup style={{ borderRadius: "8px" }}>
            <InputGroupText>Rp</InputGroupText>
            <Input
              name="nilaiAset"
              value={formatRupiah(values.nilaiAset)}
              // onChange={handleChange}
              onChange={(e) => {
                const raw = parseRupiah(e.target.value);
                if (raw === "") {
                  setFieldValue("nilaiAset", "");
                } else {
                  setFieldValue("nilaiAset", parseFloat(raw));
                }
              }}
              onBlur={handleBlur}
              placeholder="Tulis Jumlah Harga"
              style={{ padding: "12px 16px" }}
            />
          </InputGroup>
          <ErrorMessage
            name="nilaiAset"
            component="div"
            className="text-danger"
          />
        </div>
      </div>
    </section>
  );
};

export default Aset;
