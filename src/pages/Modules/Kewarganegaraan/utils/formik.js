import { object, string, number, date, mixed, array } from "yup";

export const nameValidator = (field = "Nama") =>
  string()
    .trim()
    .min(2, `${field} minimal 2 karakter`)
    .max(100, `${field} maksimal 100 karakter`)
    .matches(
      /^[A-Za-zÀ-ÿ' -]+$/,
      `${field} hanya boleh berisi huruf, apostrof (') dan tanda hubung (-)`
    )
    .required(`${field} wajib diisi`);

// nama_lengkap_pemohon: nameValidator("Nama lengkap"),
// nama_lengkap_ayah: nameValidator("Nama lengkap ayah"),

export const requiredIf = (field, isValue, message) =>
  string().when(field, {
    is: isValue,
    then: (schema) => schema.required(message),
    otherwise: (schema) => schema.notRequired(),
  });

// id_prov_tinggal_pemohon: requiredIf("tempat_tinggal_pemohon", "Dalam Negeri", "Provinsi wajib diisi"),
