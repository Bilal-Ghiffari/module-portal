// hooks/usePostPermohonan.js - Fixed version
import { useState } from "react";
import axios from "axios";
import { apiPostPermohonan } from "../services/api";
import { generateRandomVoucherID } from "../utils/random";

export const usePostPermohonan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postPermohonan = async (data) => {
    console.log("🚀 usePostPermohonan - Starting POST request");
    console.log("Data to post:", data);

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const payload = {
        id_voucher: generateRandomVoucherID(),
        ...data,
      };
      console.log(payload);
      const apiResponse = await apiPostPermohonan(payload);
      console.log("✅ POST API Response:", apiResponse);
      console.log("Response status:", apiResponse.status);
      console.log("Response data:", apiResponse.data);
      let processedResponse;

      if (apiResponse.message === "Success") {
        processedResponse = apiResponse;
        localStorage.setItem(
          "id_permohonan_pewarganegaraan",
          JSON.stringify(apiResponse.data.id_permohonan)
        );
      }

      console.log("✅ Processed response:", processedResponse);
      setResponse(processedResponse);

      return processedResponse;
    } catch (err) {
      console.error("❌ POST Permohonan Error:", err);

      let errorDetails = {
        message: "Network error",
        status: null,
        data: null,
      };

      if (err.response) {
        // Server responded with error status
        console.error("API Error Response:", err.response);
        errorDetails = {
          message: err.response.data?.message || `HTTP ${err.response.status}`,
          status: err.response.status,
          data: err.response.data,
        };
      } else if (err.request) {
        // Network error
        console.error("Network Error:", err.request);
        errorDetails = {
          message: "Network connection failed",
          status: null,
          data: null,
        };
      } else {
        // Other error
        console.error("Unexpected Error:", err.message);
        errorDetails = {
          message: err.message,
          status: null,
          data: null,
        };
      }

      setError(errorDetails);

      // ✅ THROW ERROR WITH PROPER FORMAT
      const error = new Error(errorDetails.message);
      error.response = err.response;
      error.request = err.request;
      error.status = errorDetails.status;

      throw error;
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
