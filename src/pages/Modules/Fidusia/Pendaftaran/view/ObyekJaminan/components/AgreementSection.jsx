import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckedConditional = ({ formik, fontSize, checked, onChange }) => {
  const handleChange = (event) => {
    // console.log('Checkbox Change Event:', event); // This should log whenever the checkbox is clicked
    const isChecked = event.target.checked;

    if (onChange) {
      // console.log('isChecked inside handleChange:', isChecked); // Log the value
      onChange(isChecked); // Trigger the parent onChange
    }

    // Update Formik field value
    formik.setFieldValue('object_jaminan.aggrement', isChecked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked} // Bind the checkbox to the `checked` state (use checked instead of value)
          onChange={handleChange} // Pass handleChange to onChange
          color="primary"
        />
      }
      label={
        <span style={{ fontSize: fontSize }}>
          Saya setuju dengan syarat & ketentuan
        </span>
      }
    />
  );
};

const AgreementSection = ({ formik, aggrement, onAggrementChange }) => {
  const [error, setError] = useState('');

  const handleCheckboxChange = (isChecked) => {
    onAggrementChange(isChecked); // Update the parent state
    setError(isChecked ? '' : 'Anda harus menyetujui syarat & ketentuan.'); // Error handling
  };

  return (
    <div style={{ marginLeft: '2rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <CheckedConditional
        formik={formik}
        fontSize="1rem"
        value="object_jaminan.aggrement"
        onChange={handleCheckboxChange}
      />

      {[
        'Seluruh data yang saya isi dalam permohonan Pendaftaran Jaminan Fidusia adalah benar dan menjadi tanggung jawab saya sebagai pemohon.',
        'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia tidak bertanggung jawab atas kebenaran materiil data yang diajukan, termasuk kesalahan pengisian.',
        'Data elektronik dan penyimpanan dokumen fisik sepenuhnya menjadi tanggung jawab Penerima Fidusia, kuasa, atau wakilnya.',
      ].map((text, index) => (
        <p key={index} style={{ marginLeft: '2rem' }}>
          {index + 1}. {text}
        </p>
      ))}
    </div>
  );
};

export default AgreementSection;
