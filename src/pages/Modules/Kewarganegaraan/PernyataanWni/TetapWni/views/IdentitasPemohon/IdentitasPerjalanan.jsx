import { FormHeader, FormInput } from "@/components/Common/FormField";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const IdentitasPerjalanan = ({ formik }) => {
  const { negara, provinsi } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Dokumen Perjalanan"} />
      <Row>
        <Col xs="12" md="12" lg="4" xl="4">
          <FormInput
            formik={formik}
            title="Nomor Paspor RI"
            name={"no_paspor_ri_pemohon"}
            placeholder={"Tulis nomor paspor"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="4" xl="4">
          <FormAutocomplete
            formik={formik}
            title="Wilayah Terbit Paspor RI"
            name={"wilayah_paspor_ri_pemohon"}
            placeholder={"Tulis lokasi terbit paspor RI"}
            options={provinsi.data}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="4" xl="4">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor RI"
            name={"tgl_exp_paspor_ri_pemohon"}
            placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
            type="date"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12" lg="4" xl="4">
          <FormInput
            formik={formik}
            title="Nomor Paspor Kebangsaan"
            name={"no_paspor_kebangsaan_pemohon"}
            placeholder={"Tulis nomor paspor"}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="4" xl="4">
          <FormAutocomplete
            formik={formik}
            title="Wilayah Terbit Paspor Kebangsaan"
            name={"wilayah_paspor_kebangsaan_pemohon"}
            placeholder={"Indonesia"}
            options={negara.data}
            required
          />
        </Col>
        <Col xs="12" md="12" lg="4" xl="4">
          <FormInput
            formik={formik}
            title="Tanggal Kedaluwarsa Paspor Kebangsaan"
            name={"tgl_exp_paspor_kebangsaan_pemohon"}
            placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default IdentitasPerjalanan;
