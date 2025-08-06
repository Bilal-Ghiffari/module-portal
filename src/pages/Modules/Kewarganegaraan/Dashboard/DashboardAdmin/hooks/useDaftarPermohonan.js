import { useEffect, useState } from "react";
import { apiGetDaftarPermohonan } from "../../services/api";

const defaultPagination = {
  currentPage: 1,
  totalPage: 1,
  totalData: 0,
};

export const useDaftarPermohonan = (params = { page: 1, limit: 10 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(defaultPagination);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiGetDaftarPermohonan(params, {
          signal: controller.signal,
        });
        setData(res?.data || []);
        setPagination(res?.pagination || defaultPagination);
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
  }, [params.page, params.limit]);

  return {
    data,
    loading,
    error,
    pagination,
    totalItems: pagination.totalData,
  };
};
