import { useFormik } from "formik";
import { validationSchemas } from "./schemas";
import { useState } from "react";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { initialValues } from "./initialValue";
import { useEffect } from "react";
import { STEP_FIELDS } from "./constants/steps";
import OnBoardingPendaftaran from "./OnBoarding";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

import { CustomButton } from "@/components/Common/Button";
import { ArrowForward } from "@mui/icons-material";
import IdentitasPemohon from "./SectionForm/IdentitasPemohon";
import IdentitasPasangan from "./SectionForm/IdentitasPasangan";
import SuratPermohonan from "./SectionForm/SuratPermohonan";
import UnggahDokumenSection from "./SectionForm/UnggahDokumen";

export default function FormPemulihanWni({ label = "Formulir Permohonan" }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [stepErrors, setStepErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const toastifyService = new ToastifyService();
  const isStepSkipped = (step) => skipped.has(step);

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      console.log("🚀 ~ Pendaftaran ~ values:", values);
      toastifyService.confirmationCreate().then((res) => {
        if (res) {
          const payload = { ...values };
          console.log("payload", payload);
          toastifyService.customWarningMsg("API Belum tersedia");
        }
      });
    },
  });

  useEffect(() => {
    setActiveStep(0);
    formik.resetForm();
    setStepErrors({});
    setCompletedSteps(new Set());
  }, [label]);

  const validateCurrentStep = async () => {
    const currentSchema = validationSchemas[activeStep];
    const currentStepFields = STEP_FIELDS[activeStep];

    if (!currentSchema) return { isValid: true, errors: {} };

    const newTouched = { ...formik.touched };
    console.log(newTouched);
    currentStepFields.forEach((field) => {
      newTouched[field] = true;
    });

    formik.setTouched(newTouched);

    // Trigger Formik validation
    const errors = await formik.validateForm();
    console.log("🚀 ~ validateCurrentStep ~ errors:", errors);

    // Filter only errors for current step
    const stepErrors = {};
    currentStepFields.forEach((field) => {
      if (errors[field]) {
        stepErrors[field] = errors[field];
      }
    });

    if (Object.keys(stepErrors).length > 0) {
      // Set errors so they appear in the UI
      formik.setErrors({
        ...formik.errors,
        ...stepErrors,
      });
      return { isValid: false, errors: stepErrors };
    } else {
      // Optionally clear current step errors
      const clearedErrors = { ...formik.errors };
      currentStepFields.forEach((field) => {
        delete clearedErrors[field];
      });
      formik.setErrors(clearedErrors);
      return { isValid: true, errors: {} };
    }
  };

  const handleNext = async () => {
    const validation = await validateCurrentStep();
    if (validation.isValid) {
      // Remove step from errors
      const newStepErrors = { ...stepErrors };
      delete newStepErrors[activeStep];
      setStepErrors(newStepErrors);

      // Mark step as completed
      setCompletedSteps((prev) => new Set([...prev, activeStep]));

      // Move to next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.delete(activeStep);
        return newSkipped;
      });
    } else {
      // Store step errors for visual indicators
      setStepErrors((prev) => ({
        ...prev,
        [activeStep]: validation.errors,
      }));
    }
  };

  const handleSubmit = async (status) => {
    // Validate all steps before submit
    let hasErrors = false;
    const allStepErrors = {};

    for (let i = 0; i < STEP_FIELDS.length; i++) {
      const stepSchema = validationSchemas[i];
      const stepFieldsList = STEP_FIELDS[i];

      if (!stepSchema) continue;

      try {
        const stepValues = stepFieldsList.reduce((acc, field) => {
          acc[field] = formik.values[field];
          return acc;
        }, {});

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

    console.log(allStepErrors);

    if (!hasErrors) {
      formik.setFieldValue("status", status);
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
        "Terdapat kesalahan pada form. Mohon periksa kembali."
      );

      // // Move to first step with errors
      const firstErrorStep = Object.keys(allStepErrors)[1];
      if (firstErrorStep) {
        setActiveStep(parseInt(firstErrorStep));
      }
    }
  };

  const allSteps = [
    {
      id: "1",
      label: "Boarding",
      component: (
        <OnBoardingPendaftaran
          formik={formik}
          setActiveStep={setActiveStep}
          label={label}
        />
      ),
    },
    {
      id: "2",
      label: "Identitas Pemohon",
      stepNumber: "Langkah 1",
      component: <IdentitasPemohon formik={formik} />,
    },
    {
      id: "3",
      label: "Identitas Suami/Istri",
      stepNumber: "Langkah 2",
      component: <IdentitasPasangan formik={formik} />,
    },
    {
      id: "4",
      label: "Surat Permohonan",
      stepNumber: "Langkah 3",
      component: <SuratPermohonan formik={formik} />,
    },
    {
      id: "5",
      label: "Unggah Dokumen",
      stepNumber: "Langkah 4",
      component: <UnggahDokumenSection formik={formik} />,
    },
  ];

  const stepsConfig = {
    "Formulir Permohonan": ["1", "2", "3", "4", "5"],
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
  };

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      {/* Page title */}
      {visibleStepperSteps.length > 0 && stepperActiveStep >= 0 && (
        <h3
          className=" mb-4"
          style={{ fontWeight: 500, fontSize: 24, color: "#262626" }}
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
            "& .MuiStepConnector-root": {
              top: 10,
              left: "calc(-50% + 16px)",
              right: "calc(50% + 16px)",
            },
            "& .MuiStepConnector-line": {
              borderTopStyle: "dashed",
              borderTopWidth: 2,
              color: "#E7E7E7",
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
                        borderRadius: "50%",
                        border: "1px solid #E7E7E7",
                        backgroundColor:
                          active || completed ? "#041662" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: active || completed ? "#fff" : "#041662",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {index + 1}
                    </div>
                  )}
                >
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#888888",
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
        <Box>{stepsResult[activeStep]?.component || "Unknown step"}</Box>
        {activeStep >= 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              pt: 2,
              px: 2,
            }}
          >
            <CustomButton
              text={"Kembali"}
              bgColor="transparent"
              border="1px solid #E7E7E7"
              textColor="#041662"
              disabled={activeStep === 0}
              onClick={handleBack}
            />
            <CustomButton
              text={"Draft"}
              bgColor="#f97316"
              border="1px solid #E7E7E7"
              textColor="#fff"
              hoverColor="#ea580c"
              disabled={activeStep === 0}
              onClick={() => handleSubmit("draf")}
            />
            <CustomButton
              onClick={() => {
                if (activeStep === stepsResult.length - 1) {
                  handleSubmit("submit");
                } else {
                  handleNext();
                }
              }}
              text={
                activeStep === stepsResult.length - 1
                  ? "Selesai"
                  : "Selanjutnya"
              }
              rightIcon={<ArrowForward fontSize="14" />}
            />
          </Box>
        )}
      </>
    </Box>
  );
}
