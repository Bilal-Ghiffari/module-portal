import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiPengangkatan = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Informasi Pengangkatan Anak"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="8">
          <FormInput
            formik={formik}
            name="no_dok_pengangkatan_anak"
            placeholder="Tulis nomor penetapan"
            title="Nomor penetapan pengadilan negeri tentang pengangkatan anak"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="8" xl="8">
          <FormInput
            formik={formik}
            name="tgl_dok_pengangkatan_anak"
            placeholder="Masukkan tanggal penetapan"
            title="Tanggal Penetapan Pengadilan Negeri"
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiPengangkatan;
