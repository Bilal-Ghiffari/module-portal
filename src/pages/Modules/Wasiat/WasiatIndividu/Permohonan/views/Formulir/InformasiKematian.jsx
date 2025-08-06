import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col, Row } from "reactstrap";

const TEMPAT_KEMATIAN_OPTIONS = [
  { value: "Dalam Negeri", label: "Dalam Negeri" },
  { value: "Luar Negeri", label: "Luar Negeri" },
];

const FormInformasiKematian = ({ formik }) => {
  const { values } = formik;
  const isDalamNegeri = values.tempat_kematian === "Dalam Negeri";
  const isLuarNegeri = values.tempat_kematian === "Luar Negeri";

  return (
    <>
      <FormHeader title={"Informasi Kematian"} />

      <Row>
        <Col md="6" lg="4">
          <FormInput
            formik={formik}
            name="tgl_kematian"
            placeholder="Tanggal kematian"
            title="Tanggal Kematian"
            type="date"
            required
          />
        </Col>

        <Col md="6" lg="4">
          <FormAutocomplete
            formik={formik}
            name="tempat_kematian"
            placeholder="Tulis tempat meninggal"
            title="Tempat Meninggal"
            options={TEMPAT_KEMATIAN_OPTIONS}
            required
          />
        </Col>

        {isDalamNegeri && (
          <>
            <Col md="6" lg="4">
              <FormInput
                formik={formik}
                name="provinsi_kematian"
                placeholder="Tulis provinsi"
                title="Provinsi"
                required
              />
            </Col>

            <Col md="6" lg="4">
              <FormInput
                formik={formik}
                name="kab_kota_kematian"
                placeholder="Tulis kabupaten/kota"
                title="Kabupaten/Kota"
                required
              />
            </Col>
          </>
        )}

        {isLuarNegeri && (
          <>
            <Col md="6" lg="4">
              <FormInput
                formik={formik}
                name="negara_kematian"
                placeholder="Tulis negara"
                title="Negara"
                required
              />
            </Col>

            <Col md="6" lg="4">
              <FormInput
                formik={formik}
                name="kota_negara_kematian"
                placeholder="Tulis kota negara"
                title="Kota di Negara"
                required
              />
            </Col>
          </>
        )}

        <Col md="12" lg="12" xl="6">
          <FormInput
            formik={formik}
            name="alamat_lengkap_kematian"
            placeholder="Tulis alamat lengkap"
            title="Alamat Lengkap"
            type="textarea"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormInformasiKematian;
