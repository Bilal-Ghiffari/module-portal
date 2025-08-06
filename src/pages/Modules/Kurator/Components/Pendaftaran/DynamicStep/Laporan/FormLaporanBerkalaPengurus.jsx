import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "@/components/Header";
import { Label } from "reactstrap";
import Checked from "@/components/Common/Checked";
const FormLaporanBerkalaPengurus = ({ formik, disabled }) => {
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
      {/* Keadaan Aset Debitor PKPU Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Keadaan Aset Debitor PKPU"} disabled={disabled} />
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
      {/* Rapat Pembahasan dan Pemungutan Suara atas Rencana Perdamaian Section */}
      <Row>
        <Col xs="12" md="12">
          <Header
            label={
              "Rapat Pembahasan dan Pemungutan Suara atas Rencana Perdamaian"
            }
            disabled={disabled}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Rapat Pembahasan dan Pemungutan Suara atas Rencana Perdamaian"
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
      {/* Sidang Permusyawaratan Majelis Hakim Section */}
      <Row>
        <Col xs="12" md="12">
          <Header
            label={"Sidang Permusyawaratan Majelis Hakim"}
            disabled={disabled}
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nama Majelis Hakim"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Sidang"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            placeholder="Nomor Keputusan Sidang"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Hasil Rencana Perdamaian Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Hasil Rencana Perdamaian"} disabled={disabled} />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Keputusan Sidang"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Rencana Perdamaian"
            readonly={disabled}
            required
            usePlaceholder
            isCurrency
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            placeholder="Hasil Rencana Perdamaian"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
    </>
  );
};

export default FormLaporanBerkalaPengurus;
