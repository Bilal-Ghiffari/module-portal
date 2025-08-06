import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "@/components/Header";
import { Label } from "reactstrap";
import Checked from "@/components/Common/Checked";
const FormLaporanBerkalaKurator = ({ formik, disabled }) => {
  return (
    <>
      {/* Detail Rapat Kreditor Pertama Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Detail Rapat Kreditor Pertama"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Rapat Kreditor Pertama"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Jumlah Kreditor Sementara"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="12" className="px-3">
          <FormInput
            formik={formik}
            placeholder="Hal Lain-lain"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Detail Rapat Verifikasi Piutang Section */}
      <Row>
        <Col xs="12" md="12">
          <Header
            label={"Detail Rapat Verifikasi Piutang"}
            disabled={disabled}
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Rapat Verifikasi Piutang"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Jumlah Kreditor Tetap"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Jumlah Tagihan Terverifikasi"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="12" className="px-3">
          <FormInput
            formik={formik}
            placeholder="Hal Lain-lain"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Keadaan Harta Pailit Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Keadaan Harta Pailit"} disabled={disabled} />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Jumlah Harga Bergerak"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Jumlah Harga Tak Bergerak"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Kelangsungan Usaha Debitur"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Penetapan Hakim"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Penetapan Hakim"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Detail Lelang Pailit Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Detail Lelang Pailit"} disabled={disabled} />
        </Col>
        <Col xs="12" className="px-3 mb-2">
          <Label className="mb-0" style={{ fontSize: "12px" }}>
            Rincian Lelang
            <span className="text-danger">*</span>
          </Label>
          <div
            className="d-flex align-items-center gap-5 mt-1"
            style={{ padding: "0px 22px" }}
          >
            <Checked
              label="Terjual"
              value="Terjual"
              fieldName="rincian_lelang"
              formik={formik}
              type="radio"
            />
            <Checked
              label="Tidak Terjual"
              value="Tidak Terjual"
              fieldName="rincian_lelang"
              formik={formik}
              type="radio"
            />
          </div>
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Rincian"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Lain-lain"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        {/* Pemberesan Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Pemberesan"} disabled={disabled} />
          </Col>
          <Col xs="6" className="px-3">
            <FormInput
              formik={formik}
              type="date"
              placeholder="Tanggal Pelaksanaan Pembagian"
              readonly={disabled}
              required
              usePlaceholder
            />
          </Col>
          <Col xs="6" className="px-3">
            <FormInput
              formik={formik}
              type="text"
              placeholder="Jumlah nominal yang telah dibayarkan kepada kreditor"
              readonly={disabled}
              required
              usePlaceholder
              isCurrency
            />
          </Col>
          <Col xs="12" className="px-3">
            <FormInput
              formik={formik}
              placeholder="Hal Lain-lain"
              readonly={disabled}
              required
              usePlaceholder
            />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default FormLaporanBerkalaKurator;
