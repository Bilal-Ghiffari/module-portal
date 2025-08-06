import { Col, Row } from "reactstrap";
import Checked from "@/components/Common/Checked";
import { Label } from "reactstrap";
import Header from "@/components/Header";

const LaporanBerkalaPengurus = ({ formik, disabled }) => {
  return (
    <>
      {/* Jenis Laporan Berkala Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Jenis Laporan Berkala"} disabled={disabled} />
        </Col>
        <Col xs="12" className="px-3">
          <Label className="mb-0" style={{ fontSize: "12px" }}>
            Silahkan pilih laporan berkala yang ingin dibuat/diupdate
            <span className="text-danger">*</span>
          </Label>
          <div
            className="d-flex flex-column gap-2 mt-2"
            style={{ padding: "0px 22px" }}
          >
            <Checked
              label="a. Detail Rapat Kreditor Pertama"
              value="a. Detail Rapat Kreditor Pertama"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="b. Detail Rapat Verifikasi Piutang"
              value="b. Detail Rapat Verifikasi Piutang"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="c. Keadaan Asset Debitor PKPU"
              value="c. Keadaan Asset Debitor PKPU"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="d. Rapat Pembahasan dan Pemungutan Suara atas Rencana Perdamaian"
              value="d. Rapat Pembahasan dan Pemungutan Suara atas Rencana Perdamaian"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="e. Sidang Permusyawaratan Majelis Hakim"
              value="e. Sidang Permusyawaratan Majelis Hakim"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="f. Hasil Rencana Perdamaian"
              value="f. Hasil Rencana Perdamaian"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LaporanBerkalaPengurus;
