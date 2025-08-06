import { useEffect, useState } from "react";
import { apiGetAnakWnGanda } from "../services/api";

export function useGetPermohonan(id, activeStep, enabled = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // console.log("ACTIVE STEP", activeStep);
  const canGetDraft = !(
    activeStep === 3 ||
    activeStep === 5 ||
    activeStep === 1
  );
  useEffect(() => {
    if (!enabled || !id || canGetDraft) return;
    console.log("API GET RUN", activeStep);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetAnakWnGanda(id);
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
