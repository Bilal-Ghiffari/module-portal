import { useState } from "react";
import { getCurrentPermohonanId } from "../../../hooks/useStorage";
import { generateRandomVoucherID } from "../../../utils/random";
import { apiPatchAnakWnGanda } from "../services/api";

export function usePatchPermohonan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const id_permohonan = getCurrentPermohonanId("anakwnganda");

  const patchPermohonan = async (data) => {
    console.log("Data Patch ==>>", data);
    setLoading(true);
    setError(null);
    try {
      const id_voucher = generateRandomVoucherID();
      console.log({
        id_voucher,
        id_permohonan,
        ...data,
      });
      const res = await apiPatchAnakWnGanda({
        id_voucher,
        id_permohonan,
        ...data,
        no_telp_pemohon: data.no_telp_pemohon ?? "",
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
