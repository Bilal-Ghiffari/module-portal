import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Checked from "@/components/Common/Checked";
import TablePerseroan from "./TablePerseroan";

const DaftarPerseroan = ({ formik }) => {
  // Data contoh
  const perseroanList = [
    { no: 1, nama: "Mitra Hijau Berkarya", status: "Terverifikasi" },
    { no: 2, nama: "Mitra Hijau Mandiri", status: "Ditolak" },
    { no: 3, nama: "Mitra Hijau Nusantara", status: "Menunggu" },
  ];

  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row className="w-100" style={{ padding: "0px 50px" }}>
          <Col xs="12">
            <h4 className="fw-bold" style={{ color: "#041662" }}>
              Nama Perseroan : {formik.values.nama_perseroan || ""}
            </h4>
            <hr className="mt-0 mb-3" />
          </Col>

          <Col xs="12" className="mb-3">
            <p
              className="mb-0"
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                maxWidth: "800px",
              }}
            >
              Nama perseroan yang Anda pilih adalah: “
              {formik.values.nama_perseroan}”. Silahkan periksa kembali nama
              tersebut sebelum melanjutkan proses.
            </p>
            <p
              className="mt-4"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              Harap diperhatikan: nama yang Anda ajukan memiliki kemiripan
              dengan nama-nama perseroan berikut:
            </p>
          </Col>

          {/* Table */}
          <Col xs="12" className="mb-4">
            <TablePerseroan data={perseroanList} />
          </Col>

          <Col xs="12" className="d-flex flex-column gap-2 px-4">
            <Checked
              fontSize="0.95rem"
              label="Saya menyatakan apabila nama yang digunakan bertentangan dengan peraturan perundang-undangan, maka saya bersedia mengganti nama tersebut atau pendaftaran badan hukum yang menggunakan nama tersebut dapat dibatalkan oleh Menteri."
              value="1"
              fieldName={`rules_1`}
              formik={formik}
            />
            <Checked
              fontSize="0.95rem"
              label="Biaya PNBP yang sudah digunakan tidak dapat diminta kembali."
              value="1"
              fieldName={`rules_2`}
              formik={formik}
            />
            <Checked
              fontSize="0.95rem"
              label="Saya yakin dengan nama yang saya gunakan dan saya mengetahui tidak dapat mengubah nama setelah tahapan ini."
              value="1"
              fieldName={`rules_3`}
              formik={formik}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DaftarPerseroan;
