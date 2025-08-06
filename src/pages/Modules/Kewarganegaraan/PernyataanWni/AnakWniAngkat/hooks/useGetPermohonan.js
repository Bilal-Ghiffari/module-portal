import { useEffect, useState } from "react";
import { apiGetAnakAngkat } from "../services/api";
import { warningMsg } from "@/helpers/Notification/toastNotification";

export function useGetPermohonan(id, activeStep, enabled = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // console.log("ACTIVE STEP", activeStep);
  const canGetDraft = activeStep === 3 || activeStep === 1 || activeStep === 5;
  useEffect(() => {
    if (!enabled || !id || !canGetDraft) return;
    // console.log("API GET RUN");
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetAnakAngkat(id);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // }, [id, enabled, activeStep]);
  }, [id, enabled, activeStep]);

  return { data, loading, error };
}
