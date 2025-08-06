import { ErrorMessage } from "formik";
import { Input } from "reactstrap";

const InformasiPemohon = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <section className="d-flex flex-column gap-3">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Informasi Pemohon</span>
      </div>

      <div className="row g-3">
        <div className="col-6 d-flex flex-column gap-1">
          <label className="fw-medium">
            Nama Pemohon <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="namaPemohon"
            value={values.namaPemohon}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Nama Lengkap"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage name="namaPemohon" component="div" className="text-danger" />
        </div>

        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Email Pemohon <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Email Pemohon"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>

        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Nomor Telepon <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="telepon"
            value={values.telepon}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Nomor Telepon Aktif"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage
            name="telepon"
            component="div"
            className="text-danger"
          />
        </div>
      </div>
    </section>
  );
};

export default InformasiPemohon;
