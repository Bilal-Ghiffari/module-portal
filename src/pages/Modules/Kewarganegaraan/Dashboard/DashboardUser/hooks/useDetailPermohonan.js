import { useEffect, useState } from "react";
import { apiGetDetailPermohonan } from "../../services/api";

export const useDetailPermohonan = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetDetailPermohonan(id);
        console.log(res);
        setData(res?.data || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
