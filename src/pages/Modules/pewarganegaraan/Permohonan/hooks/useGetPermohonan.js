import { useEffect, useState } from "react";
import { apiGetPermohonan } from "../services/api";
export function useGetPermohonan(id, activeStep, enabled = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const canGetDraft = activeStep === 3 || activeStep === 1;

  useEffect(() => {
    if (!enabled || !id || !canGetDraft) return;

    const fetchData = async () => {
      console.log("API RUN");
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetPermohonan(id);
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
