import * as Yup from "yup";
export const couponSchema = Yup.object().shape({
  jumlahPembelian: Yup.number()
    .typeError("Harus berupa angka")
    .required("Jumlah pembelian wajib diisi")
    .min(1, "Jumlah pembelian minimal 1"),
  subLayanan: Yup.string().required("Sub layanan wajib dipilih"),
});
