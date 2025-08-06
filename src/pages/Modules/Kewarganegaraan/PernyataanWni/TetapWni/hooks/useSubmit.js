import { useCallback } from "react";
import { STEP_FIELDS } from "../constants/steps";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { getFilledValues } from "../utils/formHelper";
import { validationSchemas } from "../Schemas";
import {
  errorMsg,
  successMsg,
  warningMsg,
} from "@/helpers/Notification/toastNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiSubmitTetapWni } from "../services/api";
import { removeCurrentPermohonanId } from "../../../hooks/useStorage";

export const useSubmit = (
  currentPermohonanId,
  patchPermohonan,
  processPayloadBasedOnTempatLahir
) => {
  const toastifyService = new ToastifyService();
  const navigate = useNavigate();
  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleSubmit = useCallback(
    async (
      activeStep,
      formik,
      validateAllSteps,
      setStepErrors,
      setIsSubmitting
    ) => {
      console.log("=== SUBMIT HANDLER ===");
      console.log("Active Step:", activeStep);
      console.log("Current Formik Values:", formik.values);

      // Only submit on step 4 (last step)
      if (activeStep !== 5) {
        console.log("❌ Not on final step, cannot submit");
        return;
      }

      try {
        console.log("🔍 Validating all steps before submission...");

        // Validate all steps
        const { hasErrors, allStepErrors } = await validateAllSteps(formik);

        console.log("Validation result:", { hasErrors, allStepErrors });

        if (hasErrors) {
          console.log("❌ Form has validation errors:", allStepErrors);

          // Set errors in formik and stepErrors
          setStepErrors(allStepErrors);

          const allFieldErrors = {};
          Object.values(allStepErrors).forEach((stepError) => {
            Object.assign(allFieldErrors, stepError);
          });

          formik.setErrors(allFieldErrors);

          // Mark all fields as touched
          const touchedFields = STEP_FIELDS.flat().reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {});
          formik.setTouched(touchedFields);

          warningMsg("Harap melengkapi formulir sebelum melakukan submit");
          return;
        }

        console.log("✅ All validation passed, proceeding with submission...");

        // Show confirmation dialog
        const shouldProceed = await toastifyService.confirmationCreate();
        if (!shouldProceed) {
          console.log("ℹ️ User cancelled submission");
          return;
        }

        setIsSubmitting(true);
        console.log("🚀 Submitting form...");

        // Prepare final payload
        const processedValues = processPayloadBasedOnTempatLahir(formik.values);
        console.log("Payload di proses", processedValues);
        const finalPayload = {
          id_permohonan: currentPermohonanId,
          status_permohonan: 1,
          status_aktivitas: 2,
        };

        console.log("Final submission payload:", finalPayload);

        const response = await apiSubmitTetapWni(finalPayload);

        console.log("✅ Submission response:", response);

        if (response && response.message === "Success") {
          successMsg("Berhasil Membuat Permohonan!, Mengalihkan...");
          setTimeout(() => {
            removeCurrentPermohonanId("tetapwni");
            setSuccessSubmit(true);

            // navigate("/kewarganegaraan/dashboard");
          }, 3000);
          setIsSubmitting(false);
        } else {
          throw new Error(response?.message || "Submission failed");
        }
      } catch (error) {
        console.error("❌ Submission error:", error);
        setIsSubmitting(false);

        if (error.response) {
          // API error
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan pada server";
          errorMsg(errorMessage);
        } else if (error.request) {
          // Network error
          errorMsg("Gagal terhubung ke server. Periksa koneksi internet.");
        } else {
          // Other error
          errorMsg(error.message || "Terjadi kesalahan tidak terduga");
        }
      } finally {
        setIsSubmitting(false);
        console.log("=== END SUBMIT HANDLER ===");
      }
    },
    [
      currentPermohonanId,
      patchPermohonan,
      processPayloadBasedOnTempatLahir,
      toastifyService,
      navigate,
    ]
  );

  return {
    handleSubmit,
    successSubmit,
  };
};
