import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiPasport = ({ formik }) => {
  const { negara } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Informasi Paspor Asing"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            name="no_paspor_asing_pemohon"
            placeholder="Tulis nomor paspor"
            title="Nomor Paspor Asing"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormAutocomplete
            formik={formik}
            name="id_wilayah_paspor_asing_pemohon"
            placeholder="lokasi terbit paspor asing"
            title="Wilayah Terbist Paspor Asing"
            options={negara.data}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="8" xl="6">
          <FormInput
            formik={formik}
            name="tgl_exp_paspor_asing_pemohon"
            placeholder="Masukkan tanggal kedaluwarsa paspor"
            title="Tanggal Kedaluwarsa Paspor Asing"
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiPasport;
