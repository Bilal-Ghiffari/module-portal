import {
  FormHeader,
  FormInputNested,
  FormDatePickerNested,
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
  // Calculate today's date and 30 days ago dynamically
  const today = new Date();
  const maxDate = today.toISOString().split('T')[0]; // Today's date (max date)
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 30); // 30 days ago
  const minDateStr = minDate.toISOString().split('T')[0]; // 30 days ago (min date)

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
          {/* <FormDatePickerNested
            formik={formik}
            name="information_jaminan.tgl_akta"
            title="Tanggal Akta"
            type="date"
            placeholder="Pilih tanggal akta"
            required
          /> */}
          <FormDatePickerNested
            formik={formik}
            type="date"
            name="information_jaminan.tgl_akta"
            title="Tanggal Akta"
            placeholder="Pilih tanggal akta"
            required
            minDate={minDateStr} // Pass the min date (30 days ago)
            maxDate={maxDate} // Pass today's date
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
