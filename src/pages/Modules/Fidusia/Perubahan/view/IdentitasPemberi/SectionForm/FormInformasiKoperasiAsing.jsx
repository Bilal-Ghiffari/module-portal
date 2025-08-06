import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';
import RegionNested from '@/components/RegionNested';
import { Box } from '@mui/material';
import { Col, Row } from 'reactstrap';

const FormInformasiKoperasiAsing = ({ formik }) => {
  return (
    <>
      <FormHeader title="Informasi Pemberi Fidusia - Korporasi Asing" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.nama"
              title="Nama Pemberi"
              placeholder="Tulis nama lengkap"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.no_pengesahan"
              title="Nomor Pengesahan"
              placeholder="Nomor Pengesahan"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.no_tlpon"
              title="Nomor Telepon"
              placeholder="Nomor Telepon"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.email"
              title="Email"
              placeholder="Email"
              required
              type="email"
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="6">
            <RegionNested
              formik={formik}
              negaraKey="identity_pemberi.id_negara_asal"
              showNegara={true}
              showProvinsi={false}
              showKabupaten={false}
              showKecamatan={false}
              showKelurahan={false}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="6">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.nama_debitur"
              title="Nama Debitur"
              placeholder="Nama Debitur"
            />
          </Col>
        </Row>

        <p className="text-warning mt-2" style={{ fontSize: '0.85rem' }}>
          * Isi jika Nama Debitur bukan Pemberi Fidusia
        </p>
      </Box>
    </>
  );
};

export default FormInformasiKoperasiAsing;
