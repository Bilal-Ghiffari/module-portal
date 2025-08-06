import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSubmit = () => {
  const toastifyService = new ToastifyService();
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const submitPermohonan = async () => {
    setSubmitLoading(true);
    setIsSubmitting(true);

    try {
      console.log("=== SUBMIT HANDLER ===");
    } catch (error) {
      console.error("❌ Submission error:", error);
    } finally {
      setSubmitLoading(false);
      setIsSubmitting(false);
      console.log("=== END SUBMIT HANDLER ===");
    }
  };

  return {
    submitPermohonan,
    submitLoading,
  };
};
