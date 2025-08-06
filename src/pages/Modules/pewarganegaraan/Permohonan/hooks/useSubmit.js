import { useCallback } from "react";
import { STEP_FIELDS } from "../constants/steps";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { getFilledValues } from "../utils/formHelper";
import { validationSchemas } from "../schemas";
import {
  errorMsg,
  successMsg,
  warningMsg,
} from "@/helpers/Notification/toastNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiSubmitPermohonan } from "../services/api";

export const useSubmit = (
  currentPermohonanId,
  patchPermohonan,
  processPayloadBasedOnTempatLahir
) => {
  const toastifyService = new ToastifyService();
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

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

      setSubmitLoading(true);
      setIsSubmitting(true);

      try {
        const finalPayload = {
          id_permohonan: currentPermohonanId,
          status_permohonan: 1,
          status_aktivitas: 2,
        };

        console.log("Final submission payload:", finalPayload);

        const shouldSubmit = await toastifyService.customConfirmation(
          "Apakah anda yakin data anda sudah sesuai?"
        );

        // Submit to API
        if (shouldSubmit) {
          const response = await apiSubmitPermohonan(finalPayload);

          console.log("✅ Submission response:", response);

          if (response && response.message === "Success") {
            localStorage.removeItem("id_permohonan_pewarganegaraan");

            successMsg("Berhasil Membuat Permohonan! Redirecting...");

            setTimeout(() => {
              navigate("/pewarganegaraan/dashboard");
            }, 3000);
          } else {
            throw new Error(response?.message || "Submission failed");
          }
        }
      } catch (error) {
        console.error("❌ Submission error:", error);

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
        setSubmitLoading(false);
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
    submitLoading,
  };
};
