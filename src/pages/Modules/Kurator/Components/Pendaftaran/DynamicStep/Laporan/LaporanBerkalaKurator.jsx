import { Col, Row } from "reactstrap";
import Header from "@/components/Header";
import Checked from "@/components/Common/Checked";
import { Label } from "reactstrap";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";

const LaporanBerkalaKurator = ({ formik, disabled }) => {
  return (
    <>
      {/* Jenis Laporan Berkala Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Jenis Laporan Berkala"} disabled={disabled} />
        </Col>
        <Col xs="12" md="12" lg="12" xl="12" className="px-3">
          <div
            className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-4 px-3"
            style={{
              backgroundColor: "#FEF7EE",
              fontSize: "12px",
              borderRadius: 5,
            }}
          >
            <CustomTooltipMui title="" arrow>
              <span className="d-flex align-items-center gap-1">
                <i
                  className="mdi mdi-information fw-bold"
                  style={{ color: "#FFA500", fontSize: "16px" }}
                />
                <p className="m-0 p-0">PERHATIAN</p>
              </span>
            </CustomTooltipMui>
            <div className="m-0 p-0 w-75">
              <ol className="mt-1 mb-2 ps-3">
                <li>Bagian A wajib diisi terlebih dahulu.</li>
                <li>
                  Setelah Bagian A diisi, Anda dapat melanjutkan mengisi bagian
                  lainnya.
                </li>
                <li>
                  Jika Bagian A telah diisi, Anda bisa langsung mengisi Bagian D
                  dan E.
                </li>
                <li>
                  Bagian B dan C tidak dapat diisi apabila Bagian D atau E sudah
                  terisi.
                </li>
                <li>
                  Bagian D dapat diisi lebih dari satu kali, selama Bagian E
                  belum diisi.
                </li>
              </ol>
            </div>
          </div>
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
              label="c. Keadaan Harta Pailit"
              value="c. Keadaan Harta Pailit"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="d. Detail Lelang (Pailit)"
              value="d. Detail Lelang (Pailit)"
              fieldName="jenis_laporan_berkala"
              formik={formik}
              type="radio"
            />
            <Checked
              label="e. Pemberesan"
              value="e. Pemberesan"
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

export default LaporanBerkalaKurator;
