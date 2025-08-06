import { useState } from "react";
import { generateRandomVoucherID } from "../utils/random";
import { apiPatchTetapWni } from "../services/api";
import { getCurrentPermohonanId } from "../../../hooks/useStorage";

export function usePatchPermohonan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const id_permohonan = getCurrentPermohonanId("tetapwni");

  const patchPermohonan = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const id_voucher = generateRandomVoucherID();
      const payload = {
        id_voucher,
        id_permohonan,
        ...data,
      };
      const res = await apiPatchTetapWni(payload);
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
