import { FormHeader, FormInput } from "@/components/Common/FormField";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DokPerjalananSection = ({ formik }) => {
  const { provinsi, negara } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Dokumen Perjalanan"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormInput
              formik={formik}
              title="Nomor Paspor RI"
              name={"no_paspor_ri_pemohon"}
              placeholder={"Tulis nomor paspor"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormAutocomplete
              formik={formik}
              title="Wilayah Terbit Paspor RI"
              name={"id_wilayah_paspor_ri_pemohon"}
              placeholder={"Tulis lokasi terbit paspor RI"}
              options={provinsi.data}
              isDisabled={provinsi.data.length === 0}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormInput
              formik={formik}
              title="Tanggal Kedaluwarsa Paspor"
              name={"tgl_exp_paspor_ri_pemohon"}
              placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
              type="date"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormInput
              formik={formik}
              title="Nomor Paspor Kebangsaan"
              name={"no_paspor_kebangsaan_pemohon"}
              placeholder={"Tulis nomor paspor"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormAutocomplete
              formik={formik}
              title="Wilayah Terbit Paspor Kebangsaan"
              name={"id_negara_paspor_kebangsaan_pemohon"}
              placeholder={"Tulis lokasi terbit paspor RI"}
              options={negara.data}
              isDisabled={negara.data.length === 0}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="4">
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
      </Box>
    </>
  );
};

export default DokPerjalananSection;
