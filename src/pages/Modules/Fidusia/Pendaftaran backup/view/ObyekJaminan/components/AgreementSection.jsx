import Checked from '@/components/Common/Checked';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

const AgreementSection = ({ formik, value }) => {
  return (
    <Box>
      {formik.errors?.object_jaminan?.agreement && (
        <Typography variant="body2" color="error">
          {formik.errors.object_jaminan.agreement}
        </Typography>
      )}
      <Checked
        // fontSize="0.95rem"
        // label="Saya telah membaca, mengerti dan menyetujui syarat dan ketentuan penggunaan nama perseroan."
        value="1"
        fieldName={`object_jaminan.agreement`}
        formik={formik}
      />

      {[
        'Seluruh data yang saya isi dalam permohonan Pendaftaran Jaminan Fidusia adalah benar dan menjadi tanggung jawab saya sebagai pemohon.',
        'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia tidak bertanggung jawab atas kebenaran materiil data yang diajukan, termasuk kesalahan pengisian.',
        'Data elektronik dan penyimpanan dokumen fisik sepenuhnya menjadi tanggung jawab Penerima Fidusia, kuasa, atau wakilnya.',
      ].map((text, index) => (
        <Typography key={index} variant="body2" sx={{ marginLeft: 4 }}>
          {index + 1}. {text}
        </Typography>
      ))}
    </Box>
  );
};

export default AgreementSection;
