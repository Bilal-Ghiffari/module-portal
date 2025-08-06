import { useState } from "react";

export function usePatchPermohonan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const patchPermohonan = async (data) => {
    console.log("Data Patch ==>>", data);
    setLoading(true);
    setError(null);
    try {
      console.log("Patch response", res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { patchPermohonan, loading, error, response };
}
