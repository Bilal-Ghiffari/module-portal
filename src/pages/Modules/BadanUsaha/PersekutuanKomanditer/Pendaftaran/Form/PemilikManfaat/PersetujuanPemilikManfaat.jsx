import { ErrorMessage } from "formik";
import { Input } from "reactstrap";

const PersetujuanPemilikManfaat = ({
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
        <span className="fw-medium fs-5">Pemilik Manfaat</span>
      </div>

      <div>
        Pemilik manfaat adalah orang perseorangan yang memiliki kewenangan untuk
        menunjuk atau memberhentikan direksi, dewan komisaris, pengurus,
        pembina, atau pengawas suatu korporasi; memiliki kendali atas korporasi;
        berhak atas atau menerima manfaat dari korporasi, baik secara langsung
        maupun tidak langsung; merupakan pemilik sesungguhnya dari dana
        korporasi; dan/atau memenuhi kriteria lain sesuai ketentuan dalam
        Peraturan Presiden ini.
      </div>

      <div className="d-flex justify-content-center">
        <section style={{ height: "596px", width: "890px" }}>
          <iframe
            src="/assets/file/Perpres-Nomor-13-Tahun-2018.pdf"
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </section>
      </div>

      <div className="d-flex gap-2">
        <div>
          <Input
            type="checkbox"
            name="setuju"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.setuju}
          />
        </div>
        <div>
          <span>
            Saya mengerti dan memahami, atas Peraturan Presiden nomor 13 tahun
            2018 tentang Prinsip Mengenali Pemilik Manfaat dari korporasi Dalam
            Rangka Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang dan
            Tindak Pidana Pendanaan Terorisme.
          </span>
          <ErrorMessage name="setuju" component="div" className="text-danger" />
        </div>
      </div>
    </section>
  );
};

export default PersetujuanPemilikManfaat;
