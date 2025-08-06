import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';

const FormKoperasiInformasiKoperasiID = ({ formik, identityPenerima }) => {
  const jenisKorporasi = identityPenerima.id_jenis_korporasi;

  return (
    <>
      <FormHeader title="Informasi Penerima Fidusia - Koperasi ID" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.nama"
              title="Nama Pemberi"
              placeholder="Tulis nama lengkap"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.npwp"
              title="NPWP"
              placeholder="Tulis nomor NPWP"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.email"
              title="Email"
              type="email"
              placeholder="Tulis alamat email aktif"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.no_tlpon"
              title="Nomor Telepon"
              placeholder="Tulis nomor handphone aktif"
              required
            />
          </Col>

          {jenisKorporasi === 3 && (
            <Col xs="12" md="6" lg="4" xl="3">
              <FormInputNested
                formik={formik}
                name="identity_penerima.no_pengesahan"
                title="No Pengesahan"
                placeholder="Tulis nomor Pengesahan"
              />
            </Col>
          )}
          {jenisKorporasi !== 3 && (
            <Col xs="12" md="6" lg="4" xl="3">
              <FormInputNested
                formik={formik}
                name="identity_penerima.no_sk"
                title="No. SK"
                placeholder="Tulis nomor SK"
              />
            </Col>
          )}

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.nama_kantor"
              title="Nama Kantor Cabang"
              placeholder="Tulis nama kantor cabang"
            />
          </Col>

          {/* <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.nama_debitur"
              title="Nama Debitur"
              placeholder="Tulis nama debitur"
            />
          </Col> */}
        </Row>
        <p className="text-warning mt-2" style={{ fontSize: '0.85rem' }}>
          * Isi jika Nama Debitur bukan Pemberi Fidusia
        </p>
      </Box>
    </>
  );
};

export default FormKoperasiInformasiKoperasiID;
