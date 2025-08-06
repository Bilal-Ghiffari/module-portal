import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import { FormHeader, FormSelect } from '@/components/Common/FormFieldNested';

const JenisPemberiFidusia = ({
  formik,
  identityPemberi,
  optionJenisKorporasi,
  optionsubJenisKorporasi,
  optionJenisBadanHukum,
}) => {
  const jenisPendaftar = identityPemberi.jenis_pendaftaran;
  const idJenisKorporasi = identityPemberi.id_jenis_korporasi;

  return (
    <>
      <FormHeader title="Jenis Pemberi Fidusia" />
      <Box className="form-horizontal">
        <Row>
          {/* Jenis Pendaftaran selalu ditampilkan */}
          <Col xs="12" md="6" lg="6" xl="6">
            <FormSelect
              formik={formik}
              name="identity_pemberi.jenis_pendaftaran"
              title="Jenis Pendaftaran"
              placeholder="jenis pendaftaran"
              options={[
                { label: 'Korporasi', value: 'kooperasi' },
                { label: 'Perseorangan', value: 'perseorangan' },
              ]}
              required
            />
          </Col>

          {/* Jika KORPORASI */}
          {jenisPendaftar === 'kooperasi' && (
            <>
              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={{
                    ...formik,
                    setFieldValue: (field, value) => {
                      formik.setFieldValue(field, Number(value));
                    },
                  }}
                  name="identity_pemberi.id_jenis_korporasi"
                  title="Jenis Korporasi"
                  placeholder="jenis korporasi"
                  options={optionJenisKorporasi}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_pemberi.sub_jenis_korporasi"
                  title="Jenis Sub Korporasi"
                  placeholder="sub korporasi"
                  options={optionsubJenisKorporasi}
                />
              </Col>

              {idJenisKorporasi !== 2 && (
                <Col xs="12" md="6" lg="6" xl="6">
                  <FormSelect
                    formik={{
                      ...formik,
                      setFieldValue: (field, value) => {
                        formik.setFieldValue(field, Number(value));
                      },
                    }}
                    name="identity_pemberi.id_badan_hukum"
                    title="Jenis Badan Hukum"
                    placeholder="jenis badan hukum"
                    options={optionJenisBadanHukum}
                    required
                  />
                </Col>
              )}
            </>
          )}

          {/* Jika PERSEORANGAN */}
          {jenisPendaftar === 'perseorangan' && (
            <>
              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_pemberi.kewarganegaraan"
                  title="Kewarganegaraan"
                  placeholder="kewarganegaraan"
                  options={[
                    { label: 'WNI', value: 'WNI' },
                    { label: 'WNA', value: 'WNA' },
                  ]}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_pemberi.jenis_penggunaan"
                  title="Jenis Penggunaan"
                  placeholder="jenis penggunaan"
                  options={[
                    { label: 'Produktif', value: 'Produktif' },
                    { label: 'Konsumtif', value: 'Konsumtif' },
                  ]}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_pemberi.pengguna_produktif"
                  title="Jenis Sub Penggunaan"
                  placeholder="(Opsional)"
                  options={[
                    { label: 'Usaha Mikro', value: 'usaha_mikro' },
                    { label: 'Usaha Kecil', value: 'usaha_kecil' },
                    { label: 'Usaha Menengah', value: 'usaha_menengah' },
                    { label: 'Usaha Lainnya', value: 'usaha_lainnya' },
                  ]}
                />
              </Col>
            </>
          )}
        </Row>
      </Box>
    </>
  );
};

export default JenisPemberiFidusia;
