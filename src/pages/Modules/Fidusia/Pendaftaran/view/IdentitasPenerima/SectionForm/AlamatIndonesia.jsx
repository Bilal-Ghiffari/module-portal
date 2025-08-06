import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';
import RegionNested from '@/components/RegionNested';
import { Box } from '@mui/material';
import { Col, Row } from 'reactstrap';

const AlamatIndonesia = ({ formik, disabled = false }) => {
  return (
    <>
      <FormHeader title="Alamat Penerima Fidusia" />
      <Box className="form-horizontal">
        <Row>
          <RegionNested
            formik={formik}
            disabled={disabled}
            provinsiKey="identity_penerima.id_provinsi"
            kabupatenKey="identity_penerima.id_kabupaten"
            kecamatanKey="identity_penerima.id_kecamatan"
            kelurahanKey="identity_penerima.id_kelurahan"
            showNegara={false}
            required
          />
        </Row>
        <Row>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInputNested
              formik={formik}
              name="identity_penerima.rt"
              title="RT"
              placeholder="Tulis nomor RT"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInputNested
              formik={formik}
              name="identity_penerima.rw"
              title="RW"
              placeholder="Tulis nomor RW"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInputNested
              formik={formik}
              name="identity_penerima.kode_pos"
              title="Kode Pos"
              placeholder="Tulis kode pos"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInputNested
              formik={formik}
              name="identity_penerima.alamat"
              title="Alamat Lengkap"
              placeholder="Tulis alamat lengkap"
              type="textarea"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default AlamatIndonesia;
