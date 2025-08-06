import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import {
  FormHeader,
  FormInputNested,
  FormSelect,
} from '@/components/Common/FormFieldNested';
import RegionNested from '@/components/RegionNested';

const FormPerseorangan = ({ formik, identityPemberi }) => {
  const kewarganegaraan = identityPemberi.kewarganegaraan?.toLowerCase();

  return (
    <>
      <FormHeader title="Informasi Pemberi Fidusia - Perseorangan" />
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
            <FormSelect
              formik={formik}
              name="identity_pemberi.jenis_kelamin"
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
              name="identity_pemberi.email"
              title="Email"
              type="email"
              placeholder="Tulis email aktif"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.no_tlpon"
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
                  negaraKey="identity_pemberi.id_negara_asal"
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
                  name="identity_pemberi.no_paspor"
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
                  name="identity_pemberi.npwp"
                  title="NPWP"
                  placeholder="Tulis nomor NPWP"
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="4" xl="3">
                <FormInputNested
                  formik={formik}
                  name="identity_pemberi.nik"
                  title="NIK"
                  placeholder="Tulis nomor NIK"
                  required
                />
              </Col>
            </>
          )}

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.nama_debitur"
              title="Nama Debitur"
              placeholder="Tulis nama debitur"
              // required
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

export default FormPerseorangan;
