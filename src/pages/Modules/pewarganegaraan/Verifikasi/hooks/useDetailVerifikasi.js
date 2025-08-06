import { useEffect, useState } from "react";
import { apiGetDetailPermohonan } from "../services/api";

export function useDetailVerifikasi(id, enabled = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!enabled || !id) return;

    const fetchData = async () => {
      console.log("API RUN");
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetDetailPermohonan(id);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, enabled]);

  return { data, loading, error };
}
