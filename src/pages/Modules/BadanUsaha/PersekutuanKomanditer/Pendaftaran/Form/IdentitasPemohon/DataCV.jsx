import { ErrorMessage } from "formik";
import { Input } from "reactstrap";
import { NumberInput } from "../components/Fields/NumberInput";

const DataCV = ({ values, handleChange, handleBlur, setFieldValue }) => {
  return (
    <section className="d-flex flex-column gap-3">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Data CV</span>
      </div>

      <div className="row g-3">
        {/* Nama CV */}
        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Nama CV (tanpa awalan CV) <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="namaCV"
            value={values.namaCV}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Nama Lengkap"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage name="namaCV" component="div" className="text-danger" />
        </div>

        {/* Singkatan CV */}
        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Singkatan CV <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="singkatanCV"
            value={values.singkatanCV}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Nama Singkatan"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage
            name="singkatanCV"
            component="div"
            className="text-danger"
          />
        </div>

        {/* NPWP */}
        <NumberInput
          name="npwpCV"
          label="Nomor NPWP"
          value={values.npwpCV}
          onChange={handleChange}
          onBlur={handleBlur}
          col={6}
          type="text"
          maxLength={16}
        />

        {/* Nomor Telepon */}
        <div className="col d-flex flex-column gap-1">
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

        {/* Email */}
        <div className="col d-flex flex-column gap-1">
          <label className="fw-medium">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Email"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>

        {/* Jangka Waktu */}
        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Jangka Waktu <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="jangkaWaktu"
            type="select"
            value={values.jangkaWaktu}
            onChange={(e) => {
              handleChange(e);
              // Kosongkan batas jika pilihannya UNLIMITED
              if (e.target.value === "UNLIMITED") {
                setFieldValue("batasJangkaWaktu", "");
              }
            }}
            onBlur={handleBlur}
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          >
            <option value="">Pilih Jangka Waktu</option>
            <option value="LIMITED">Terbatas</option>
            <option value="UNLIMITED">Tidak Terbatas</option>
          </Input>
          <ErrorMessage
            name="jangkaWaktu"
            component="div"
            className="text-danger"
          />
        </div>

        {/* Batas Jangka Waktu */}
        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Batas Jangka Waktu <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="batasJangkaWaktu"
            type="number"
            value={values.batasJangkaWaktu}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={values.jangkaWaktu !== "LIMITED"}
            placeholder="Tulis Batas Jangka Waktu"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage
            name="batasJangkaWaktu"
            component="div"
            className="text-danger"
          />
        </div>
      </div>
    </section>
  );
};

export default DataCV;
