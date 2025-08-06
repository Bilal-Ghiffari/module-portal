import { useCallback } from "react";
import { STEP_FIELDS } from "../constants/steps";
import { ToastifyService } from "@/components/Toastify/toastifyService";

export const useNavigation = (
  currentPermohonanId,
  postPermohonan,
  patchPermohonan,
  processPayloadBased
) => {
  const toastifyService = new ToastifyService();

  const handleNext = useCallback(
    async (
      activeStep,
      setActiveStep,
      setStepErrors,
      setCompletedSteps,
      setSkipped,
      validateCurrentStep,
      formik
    ) => {
      const validation = await validateCurrentStep(activeStep, formik);
      const currentStepFields = STEP_FIELDS[activeStep];

      if (!validation.isValid) {
        console.log("validation current step", validation);
        toastifyService.customWarningMsg(
          "harap melengkapi formulir sebelum ke langkah selanjutnya."
        );
        return;
      }

      // Remove step from error and mark as completed
      setStepErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[activeStep];
        return newErrors;
      });

      setCompletedSteps((prev) => new Set([...prev, activeStep]));

      // Step 3 (Surat Permohonan) - Skip API call
      const isStep3SuratPermohonan = activeStep === 3;
      const isStep4Upload = activeStep === 4;
      const isStep5Pratinjau = activeStep === 5;

      if (isStep3SuratPermohonan) {
        console.log(
          "📝 Step 3 (Surat Permohonan): Skipping API call, moving to next step"
        );
        setActiveStep((prev) => prev + 1);
        setSkipped((prev) => {
          const newSkipped = new Set(prev);
          newSkipped.delete(activeStep);
          return newSkipped;
        });
        return;
      }

      if (isStep4Upload) {
        console.log("📎 Step 4 (Upload): step, preparing for submission");
        setActiveStep((prev) => prev + 1);
        setSkipped((prev) => {
          const newSkipped = new Set(prev);
          newSkipped.delete(activeStep);
          return newSkipped;
        });
        return;
      }

      if (isStep5Pratinjau) {
        console.log(
          "📎 Step 5 (pratinjau): Final step, preparing for submission"
        );
        setActiveStep((prev) => prev + 1);
        setSkipped((prev) => {
          const newSkipped = new Set(prev);
          newSkipped.delete(activeStep);
          return newSkipped;
        });
        return;
      }

      // For other steps, proceed with API call
      const dataToSave = currentStepFields.reduce((acc, field) => {
        acc[field] = formik.values[field];
        return acc;
      }, {});

      console.log("dataToSave", dataToSave);

      try {
        const processedData = processPayloadBased(dataToSave);
        let response;
        if (!currentPermohonanId) {
          console.log("Process data to API POST ===>>>", processedData);
          response = await postPermohonan(processedData);
        } else {
          console.log("Process data to API PATCH ===>>>", processedData);
          response = await patchPermohonan(processedData, currentPermohonanId);
        }

        setActiveStep((prev) => prev + 1);
        setSkipped((prev) => {
          const newSkipped = new Set(prev);
          newSkipped.delete(activeStep);
          return newSkipped;
        });
      } catch (error) {
        console.error("API Error:", error);
        toastifyService.customWarningMsg(
          "Gagal menyimpan data. Silakan coba lagi."
        );
      }
    },
    [
      currentPermohonanId,
      postPermohonan,
      patchPermohonan,
      processPayloadBased,
      toastifyService,
    ]
  );

  const handleBack = useCallback(
    async (activeStep, setActiveStep, resetForm) => {
      if (activeStep === 1) {
        const shouldProceed = await toastifyService.customConfirmation(
          "Keluar pada formulir akan menghapus semua riwayat pengisian, harap simpan di draft jika akan melanjutkan nanti"
        );

        if (shouldProceed) {
          resetForm();
        }
      } else {
        setActiveStep((prev) => prev - 1);
      }
    },
    [toastifyService]
  );

  return {
    handleNext,
    handleBack,
  };
};
