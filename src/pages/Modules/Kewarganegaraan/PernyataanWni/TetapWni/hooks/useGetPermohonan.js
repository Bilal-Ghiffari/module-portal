import { useEffect, useState } from "react";
import { apiGetTetapWni } from "../services/api";

export function useGetPermohonan(id, activeStep, enabled = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const step1 = activeStep === 1;
  const step3 = activeStep === 3;

  const canGetDraft = step1 || step3;

  useEffect(() => {
    if (!enabled || !id || !canGetDraft) return;

    const fetchData = async () => {
      console.log("API GET RUN");
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetTetapWni(id);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, enabled, activeStep]);

  return { data, loading, error };
}
