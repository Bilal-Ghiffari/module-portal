import React, { useState, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import PaymentMethodSection from './PaymentMethodSection';
import VoucherPaymentSection from './VoucherPaymentSection';
import PaymentSuccess from './PaymentSucces';

// Definisikan tipe untuk props jika menggunakan TypeScript

const PaymentSection = ({ formik, onHandleClose, onHandlePayment }) => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  // console.log('selectMethod PaymentSection', selectedMethod);

  const handleNext = useCallback(async () => {
    try {
      switch (step) {
        case 1:
          // Validasi pemilihan metode pembayaran
          if (!selectedMethod) {
            console.warn('Pilih metode pembayaran terlebih dahulu');
            return;
          }
          setStep(2);
          break;
        case 2:
          // Lanjutkan ke step selanjutnya
          setStep(3);
          break;

        case 3:
          // Validasi form secara menyeluruh
          const errors = await formik.validateForm();

          // Periksa apakah form valid
          if (Object.keys(errors).length === 0) {
            // Set semua field sebagai tersentuh untuk menampilkan error jika ada
            formik.setTouched(
              Object.keys(formik.initialValues).reduce((touched, key) => {
                touched[key] = true;
                return touched;
              }, {})
            );

            // Lanjutkan ke step selanjutnya
            setStep(3);
          } else {
            // Tampilkan error pada form
            formik.setTouched(
              Object.keys(errors).reduce((touched, key) => {
                touched[key] = true;
                return touched;
              }, {})
            );
          }
          break;

        default:
          console.warn('Invalid step');
      }
    } catch (error) {
      console.error('Error in form validation:', error);
    }
  }, [step, selectedMethod, formik]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  }, [step]);

  return (
    <>
      {step === 1 && (
        <PaymentMethodSection
          formik={formik}
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
      )}

      {step === 2 && (
        <VoucherPaymentSection
          selectedMethod={selectedMethod}
          onNext={handleNext}
          formik={formik}
        />
      )}

      {step === 3 && (
        <PaymentSuccess
          formik={formik}
          bankName={`Bank ${selectedMethod}`}
          onBackToHome={onHandleClose}
          onHandlePayment={onHandlePayment}
        />
      )}

      {/* Tampilkan navigasi hanya di step 1 dan 2 */}
      {step !== 3 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              borderColor: '#1A237E',
              color: '#1A237E',
            }}
            disabled={step === 1}
          >
            Kembali
          </Button>

          <Button
            variant="contained"
            disabled={selectedMethod !== '' ? false : true}
            sx={{
              backgroundColor: '#1A237E',
              '&:hover': { backgroundColor: '#283593' },
            }}
            onClick={handleNext}
          >
            {step === 1 ? 'Selanjutnya' : 'Konfirmasi Pembayaran'}
          </Button>
        </Box>
      )}
    </>
  );
};

export default PaymentSection;
