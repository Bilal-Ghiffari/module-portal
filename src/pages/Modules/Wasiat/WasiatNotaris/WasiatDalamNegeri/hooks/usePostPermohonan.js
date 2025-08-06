import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePostPermohonan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postPermohonan = async (data) => {
    console.log("DATA to Post", data);
    setLoading(true);
    try {
      const payload = {
        ...data,
      };
      setTimeout(() => {
        navigate("/wasiat/dashboard");
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    postPermohonan,
    loading,
    error,
    response,
  };
};
