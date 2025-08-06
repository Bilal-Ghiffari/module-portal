import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import {
  FormHeader,
  FormInputNested,
  FormSelect,
} from '@/components/Common/FormFieldNested';
import RegionNested from '@/components/RegionNested';

const FormPerseorangan = ({ formik, identityPenerima }) => {
  const kewarganegaraan = identityPenerima.kewarganegaraan?.toLowerCase();

  return (
    <>
      <FormHeader title="Informasi Penerima Fidusia - Perseorangan" />
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
            <FormSelect
              formik={formik}
              name="identity_penerima.jenis_kelamin"
              title="Jenis Kelamin"
              placeholder="jenis kelamin"
              options={[
                { label: 'Laki-laki', value: 'Laki-Laki' },
                { label: 'Perempuan', value: 'Perempuan' },
              ]}
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.email"
              title="Email"
              type="email"
              placeholder="Tulis email aktif"
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

          {kewarganegaraan === 'wna' && (
            <>
              <Col xs="12" md="6" lg="4" xl="3">
                <RegionNested
                  formik={formik}
                  negaraKey="identity_penerima.id_negara_asal"
                  showNegara={true}
                  showProvinsi={false}
                  showKabupaten={false}
                  showKecamatan={false}
                  showKelurahan={false}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="4" xl="3">
                <FormInputNested
                  formik={formik}
                  name="identity_penerima.no_paspor"
                  title="Nomor Paspor"
                  placeholder="Tulis nomor paspor"
                  required
                />
              </Col>
            </>
          )}

          {kewarganegaraan === 'wni' && (
            <>
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
                  name="identity_penerima.nik"
                  title="NIK"
                  placeholder="Tulis nomor NIK"
                  required
                />
              </Col>
            </>
          )}

          {/* <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.nama_debitur"
              title="Nama Debitur"
              placeholder="Tulis nama debitur"
              required
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

export default FormPerseorangan;
