import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';
import { DynamicDropdownNested } from '@/components/DynamicDropdownNested';
import { Alert, Snackbar } from '@mui/material';
import { Col, Row } from 'reactstrap';

const AktaNotarisForm = ({
  formik,
  notarisOptions,
  errorMessage,
  onCloseError,
}) => {
  return (
    <>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={onCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={onCloseError} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <FormHeader title="Akta Notaris Jaminan Fidusia" />
      <div className="alert alert-warning small" role="alert">
        <strong>PERHATIAN</strong> <br />
        PP 21 TAHUN 2015 TENTANG TATA CARA PENDAFTARAN JAMINAN FIDUSIA DAN BIAYA
        PEMBUATAN AKTA JAMINAN FIDUSIA Pasal 4.
        <br />
        Permohonan pendaftaran Jaminan Fidusia sebagaimana dimaksud dalam Pasal
        3 diajukan dalam jangka waktu paling lama 30 (tiga puluh) hari terhitung
        sejak tanggal pembuatan akta Jaminan Fidusia.
      </div>

      <Row>
        <Col md="4">
          <FormInputNested
            formik={formik}
            name="information_jaminan.nomor_akta_notaris"
            title="Nomor Akta"
            placeholder="Tulis nomor akta"
            required
          />
        </Col>
        <Col md="4">
          <FormInputNested
            formik={formik}
            name="information_jaminan.tgl_akta"
            title="Tanggal Akta"
            type="date"
            placeholder="Pilih tanggal akta"
            required
          />
        </Col>
        <Col md="4">
          <DynamicDropdownNested
            formik={{
              ...formik,
              setFieldValue: (field, value) => {
                formik.setFieldValue(field, Number(value));
              },
            }}
            fieldName="information_jaminan.id_notaris"
            data={notarisOptions}
            label="Nama Notaris / Kedudukan"
            required
            onChange={(field) => {
              formik.setFieldValue(
                information_jaminan.id_notaris,
                Number(field?.value)
              );
              formik.setFieldValue(
                `${information_jaminan.id_notaris}_nama_notaris`,
                field?.label
              );
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default AktaNotarisForm;
