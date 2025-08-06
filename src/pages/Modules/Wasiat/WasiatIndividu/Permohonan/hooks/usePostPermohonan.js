import { useState } from "react";

export const usePostPermohonan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postPermohonan = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
      };
    } catch (err) {
      console.err(err);
    } finally {
      setLoading(false);
      console.log("🏁 usePostPermohonan - Request completed");
    }
  };

  return {
    postPermohonan,
    loading,
    error,
    response,
  };
};
