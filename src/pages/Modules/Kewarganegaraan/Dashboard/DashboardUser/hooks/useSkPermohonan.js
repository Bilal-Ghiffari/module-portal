import { useEffect, useState } from "react";
import { apiGetSkPermohonan } from "../../services/api";

export const useSkPermohonan = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetSkPermohonan({ id_permohonan: id });
        setData(res?.data || null);
      } catch (err) {
        if (err.response?.status === 404) {
          setData(null);
        } else if (err.name !== "AbortError") {
          setError(err);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  return {
    data,
    loading,
    error,
  };
};
