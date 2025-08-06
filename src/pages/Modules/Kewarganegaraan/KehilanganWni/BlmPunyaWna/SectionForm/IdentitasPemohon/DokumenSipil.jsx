import { FormHeader, FormInput } from "@/components/Common/FormField";
import { useEffect } from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiDokSipil = ({ formik }) => {
  const { values } = formik;
  const isKawin = values.statusPerkawinan === "Kawin";

  useEffect(() => {
    if (!isKawin) {
      formik.setFieldValue("nmrAktaPerkawinanPemohon", "");
      formik.setFieldValue("tAktaPerkawinanPemohon", null);
      formik.setFieldTouched("nmrAktaPerkawinanPemohon", false, false);
      formik.setFieldTouched("tAktaPerkawinanPemohon", false, false);
    }
  }, [isKawin, formik.setFieldValue]);
  return (
    <>
      <FormHeader title={"Informasi Dokumen Sipil"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nmrAktaLahirPemohon"
            title="Nomor Akta Lahir / Bukti Kelahiran Pemohon"
            placeholder={"Tulis nomor akta Kelahiran"}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tAktaLahirPemohon"
            title="Tanggal Akta Lahir / Bukti Kelahiran Pemohon"
            placeholder={"Masukkan tanggal akta kelahiran"}
            type="date"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nmrAktaPerkawinanPemohon"
            title="Nomor Akta Perkawinan / Bukti"
            placeholder={"Tulis nomor akta Kelahiran"}
            disabled={!isKawin}
            required={isKawin}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tAktaPerkawinanPemohon"
            title="Tanggal Akta Perkawinan / Bukti"
            placeholder={"Masukkan tanggal akta kelahiran"}
            type="date"
            disabled={!isKawin}
            required={isKawin}
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiDokSipil;
