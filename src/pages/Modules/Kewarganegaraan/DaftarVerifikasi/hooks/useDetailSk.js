import { useEffect, useState } from "react";
import { apiGetDetailSk } from "../services/api";

export function useDetailSuratKeterangan(id_permohonan, enabled = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!enabled || !id_permohonan) return;

    const fetchData = async () => {
      console.log("API RUN");
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetDetailSk(id_permohonan);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_permohonan, enabled]);

  return { data, loading, error };
}
