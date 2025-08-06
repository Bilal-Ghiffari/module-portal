import { useState } from "react";
import { apiPatchPermohonan } from "../services/api";
import { getCurrentPermohonanId } from "./useLocalStorage";
import { generateRandomVoucherID } from "../utils/random";

export function usePatchPermohonan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const id_permohonan = getCurrentPermohonanId();

  const patchPermohonan = async (data) => {
    console.log("Data Patch", data);
    setLoading(true);
    setError(null);
    try {
      const id_voucher = generateRandomVoucherID();
      const res = await apiPatchPermohonan({
        id_voucher,
        id_permohonan,
        ...data,
      });
      console.log("Patch response", res);
      setResponse(res);
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
