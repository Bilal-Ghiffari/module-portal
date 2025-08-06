import { CustomButton } from '@/components/Common/Button';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { ArrowForward } from '@mui/icons-material';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';

import AHULoading from '@/components/Common/LoadingAHU';
import sleep from '@/utils/sleep';
import { useNavigate } from 'react-router-dom';
import {
  getInvalidField,
  setNestedTouched,
  validateCurrentStep,
} from '../helpers/formikHelpers';
import {
  STEP_FIELDS,
  getValidationSchemaForStep,
  initialValues,
  stepFormConfigs,
  validationSchemas,
} from './Config/formConfig';
import { useFetchFidusiaPendaftaran } from './hooks/useFetchFidusia';
import useFetchForStep from './hooks/useFetchForStep';
import OnBoardingPermohonan from './OnBoarding';
import IdentitasPemberi from './view/IdentitasPemberi';
import IdentitasPenerima from './view/IdentitasPenerima';
import InformasiJaminan from './view/InformasiJaminan';
import KonfirmasiDataDetail from './view/KonfirmasiData';
import ObyekJaminan from './view/ObyekJaminan';
import PembayaranPage from './view/Pembayaran';
// import SuccessPage from '../SuccessPage';

const fieldLabels = {
  // identity_pemberi: 'Identitas Pemberi',
  identity_penerima: 'Identitas Penerima',
  information_jaminan: 'Informasi Jaminan',
  object_jaminan: 'Objek Jaminan',
  payment: 'Pembayaran',
  perjanjia_pokok: 'Perjanjian Pokok',
};

export default function FormPendaftaranFidusia({
  label = 'Permohonan Pendaftaran Fidusia',
}) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [stepErrors, setStepErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const toastifyService = new ToastifyService();
  const isStepSkipped = (step) => skipped.has(step);
  const [loading, setLoading] = useState(false);

  const [agreementChecked, setAgreementChecked] = useState(false);

  const id_pendaftaran = localStorage.getItem('id_pendaftaran');
  const fetchStepData = useFetchForStep(id_pendaftaran || undefined);

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
    initialValues: initialValues,
    validationSchema: () => {
      return getValidationSchemaForStep(activeStep);
    },
    onSubmit: (values) => {
      console.log('🚀 ~ Pendaftaran ~ values:', values);

      toastifyService.confirmationCreate().then((res) => {
        if (res) {
          const payload = { ...values };
          navigate('/fidusia/success', {
            state: {
              newEntry: payload,
            },
            replace: true,
          });
          localStorage.removeItem('id_pendaftaran');
          sleep(2000);
          // toastifyService.customWarningMsg('API Belum tersedia');
        }
      });
    },
  });

  const [dataSource, setDataSource] = useState({});

  const onDataChange = useCallback((data) => {
    // console.log('Data diterima di onDataChange parent:', data);
    setDataSource(data);
  }, []);

  const {
    loading: loadingDetail,
    data: fetchData,
    error,
    onFetchLoadFidusiaPendaftaran,
  } = useFetchFidusiaPendaftaran(formik, { onDataChange });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await onFetchLoadFidusiaPendaftaran();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onFetchLoadFidusiaPendaftaran]);

  // console.log('dataaaaaaa', dataSource);

  const handleUpdateData = (updatedData) => {
    setDataSource(updatedData);
  };

  useEffect(() => {
    setActiveStep(0);
    // formik.resetForm();
    setStepErrors({});
    setCompletedSteps(new Set());
  }, [label]);

  const handleAggremment = (aggrement) => {
    // console.log('checkedd parent', aggrement);
    setAgreementChecked(aggrement);
  };

  const handleNext = async () => {
    try {
      setLoading(true);

      // Retrieve active step fields and data
      const activeStepFields = STEP_FIELDS[activeStep];
      const {
        identity_pemberi,
        identity_penerima,
        information_jaminan,
        object_jaminan,
      } = dataSource;

      // Handle agreement check for specific steps
      if (activeStep === 4 && !agreementChecked) {
        toastifyService.customWarningMsg('Agreement must be checked!');
        return;
      }

      // Validate fields for the current step
      const invalidField = getInvalidField(activeStepFields, {
        identity_pemberi,
        identity_penerima,
        information_jaminan,
        object_jaminan,
      });

      console.log('first invalidField', invalidField);
      if (invalidField) {
        const fieldLabel = fieldLabels[invalidField] || invalidField;
        toastifyService.customWarningMsg(
          `Data ${fieldLabel} harus diisi terlebih dahulu!`
        );
        return;
      }
      console.log('suekkk>>>');

      // Validate the current step using Formik and the active schema
      const validationResult = await validateCurrentStep(
        formik,
        activeStep,
        validationSchemas,
        STEP_FIELDS
      );
      console.log('first validationResult', validationResult);

      if (validationResult.ignored) {
        console.log('validationResult.ignored', validationResult);
        await handleStepSkip();
        return;
      }

      if (validationResult.isValid) {
        await handleValidStep();
      } else {
        setStepErrors((prev) => ({
          ...prev,
          [activeStep]: validationResult.errors,
        }));
        setNestedTouched(formik, validationResult.errors);
      }
    } catch (error) {
      console.error('Error during step validation:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handles a step transition when the validation is ignored
  const handleStepSkip = async () => {
    await sleep(1000);
    const newStepErrors = { ...stepErrors };
    delete newStepErrors[activeStep];
    setStepErrors(newStepErrors);

    setCompletedSteps((prev) => new Set([...prev, activeStep]));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.delete(activeStep);
      return newSkipped;
    });
  };

  // Handles the valid case, which performs data fetching and moves to the next step
  const handleValidStep = async () => {
    // console.log('fetching validateStep');
    const responseStep = await fetchStepData(
      activeStep,
      formik,
      stepFormConfigs
    );

    // console.log('responseStep', responseStep);

    if (responseStep) {
      let idPendaftaran =
        responseStep.data?.id_pendaftaran ||
        localStorage.getItem('id_pendaftaran');
      if (idPendaftaran) {
        localStorage.setItem('id_pendaftaran', JSON.stringify(idPendaftaran));
      }

      const newStepErrors = { ...stepErrors };
      delete newStepErrors[activeStep];
      setStepErrors(newStepErrors);

      setCompletedSteps((prev) => new Set([...prev, activeStep]));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.delete(activeStep);
        return newSkipped;
      });
    }
  };

  const handleSubmit = async (status) => {
    // Validate all steps before submit
    let hasErrors = false;
    const allStepErrors = {};

    for (let i = 0; i < STEP_FIELDS.length; i++) {
      if (i === 2) continue; //lewati identity_penerima.

      const stepSchema = validationSchemas[i];
      const stepFieldsList = STEP_FIELDS[i];

      if (!stepSchema) continue;

      try {
        const stepValues = stepFieldsList.reduce((acc, field) => {
          acc[field] = formik.values[field];
          return acc;
        }, {});

        // console.log('stepValues', stepValues);

        await stepSchema.validate(stepValues, { abortEarly: false });
      } catch (error) {
        hasErrors = true;
        const fieldErrors = {};
        if (error.inner) {
          error.inner.forEach((err) => {
            fieldErrors[err.path] = err.message;
          });
        }
        allStepErrors[i] = fieldErrors;
      }
    }

    console.log('allStepErrors', allStepErrors);

    if (!hasErrors) {
      formik.setFieldValue('status', status);
      formik.submitForm();
    } else {
      setStepErrors(allStepErrors);

      // Set all field errors to formik
      const allFieldErrors = {};
      Object.values(allStepErrors).forEach((stepError) => {
        Object.assign(allFieldErrors, stepError);
      });

      formik.setErrors(allFieldErrors);

      // Mark all fields as touched
      const allFields = STEP_FIELDS.flat();
      const touchedFields = allFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {});

      formik.setTouched(touchedFields);

      toastifyService.customWarningMsg(
        'Terdapat kesalahan pada form. Mohon periksa kembali.'
      );

      const firstErrorStep = Object.keys(allStepErrors)[1];
      if (firstErrorStep) {
        setActiveStep(parseInt(firstErrorStep));
      }
    }
  };

  const allSteps = [
    {
      id: '1',
      label: 'Boarding',
      component: (
        <OnBoardingPermohonan
          formik={formik}
          setActiveStep={setActiveStep}
          label={label}
        />
      ),
    },
    {
      id: '2',
      label: 'Identitas Pemberi',
      stepNumber: 'Langkah 1',
      component: <IdentitasPemberi formik={formik} />,
    },
    {
      id: '3',
      label: 'Identitas Penerima',
      stepNumber: 'Langkah 2',
      component: (
        <IdentitasPenerima
          formik={formik}
          dataSource={dataSource}
          onUpdateData={handleUpdateData}
        />
      ),
    },
    {
      id: '4',
      label: 'Informasi Jaminan',
      stepNumber: 'Langkah 3',
      component: (
        <InformasiJaminan
          formik={formik}
          dataSource={dataSource}
          onUpdateData={handleUpdateData}
        />
      ),
    },
    {
      id: '5',
      label: 'Obyek Jaminan',
      stepNumber: 'Langkah 4',
      component: (
        <ObyekJaminan
          formik={formik}
          dataSource={dataSource}
          onUpdateData={handleUpdateData}
          aggrement={agreementChecked}
          onAggrementChange={handleAggremment}
        />
      ),
    },
    {
      id: '6',
      label: 'Konfirmasi Data',
      stepNumber: 'Langkah 5',
      component: (
        <KonfirmasiDataDetail formik={formik} setActiveStep={setActiveStep} />
      ),
    },
    {
      id: '7',
      label: 'Pembayaran',
      stepNumber: 'Langkah 6',
      component: <PembayaranPage formik={formik} />,
    },
  ];

  const stepsConfig = {
    'Permohonan Pendaftaran Fidusia': ['1', '2', '3', '4', '5', '6', '7'],
  };

  const activeStepIds = stepsConfig[label] || [];
  const stepsResult = allSteps.filter((step) =>
    activeStepIds.includes(step.id)
  );

  const visibleStepperSteps = stepsResult.filter((s) => s.stepNumber);
  const stepperActiveStep = visibleStepperSteps.findIndex(
    (s) => s.id === stepsResult[activeStep]?.id
  );

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 5) return handleAggremment(false);
  };

  if (loadingDetail || loading) {
    return <AHULoading open={loadingDetail || loading} />;
  }

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: '100%' }}>
      {/* Page title */}
      {visibleStepperSteps.length > 0 && stepperActiveStep >= 0 && (
        <h3
          className=" mb-4"
          style={{ fontWeight: 500, fontSize: 24, color: '#262626' }}
        >
          Formulir Pendaftaran
        </h3>
      )}
      {/* Stepper */}
      {visibleStepperSteps.length > 0 && stepperActiveStep >= 0 && (
        <Stepper
          activeStep={stepperActiveStep}
          alternativeLabel
          // connector={<CustomStepConnector />}
          sx={{
            '& .MuiStepConnector-root': {
              top: 10,
              left: 'calc(-50% + 16px)',
              right: 'calc(50% + 16px)',
            },
            '& .MuiStepConnector-line': {
              borderTopStyle: 'dashed',
              borderTopWidth: 2,
              color: '#E7E7E7',
            },
          }}
        >
          {visibleStepperSteps.map((step, index) => {
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.id}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: '1px solid #E7E7E7',
                        backgroundColor:
                          active || completed ? '#041662' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: active || completed ? '#fff' : '#041662',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {index + 1}
                    </div>
                  )}
                >
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                      color: '#888888',
                    }}
                  >
                    {step.label}
                  </span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {/* Step content */}
      <>
        <div className="mt-5 mb-3 px-2">
          <Box
            sx={{ border: '1px solid #E7E7E7', borderRadius: 5, padding: 2 }}
          >
            {stepsResult[activeStep]?.component || 'Unknown step'}

            {activeStep >= 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  pt: 2,
                  px: 2,
                }}
              >
                <CustomButton
                  text={'Kembali'}
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  textColor="#041662"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                />
                <CustomButton
                  text={'Simpan Draft'}
                  bgColor="#f97316"
                  border="1px solid #E7E7E7"
                  textColor="#fff"
                  hoverColor="#ea580c"
                  disabled={activeStep === 0}
                  onClick={() => handleSubmit('draf')}
                />
                <CustomButton
                  loading={loading}
                  onClick={() => {
                    if (activeStep === stepsResult.length - 1) {
                      handleSubmit('submit');
                    } else {
                      handleNext();
                    }
                  }}
                  text={
                    activeStep === stepsResult.length - 1
                      ? 'Selesai'
                      : 'Selanjutnya'
                  }
                  rightIcon={<ArrowForward fontSize="14" />}
                />
              </Box>
            )}
          </Box>
        </div>
      </>
    </Box>
  );
}
