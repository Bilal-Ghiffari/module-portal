import {
  imageValidation,
  pdfValidation,
  conditionalPdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, date, mixed } from "yup";

const nameRegex = /^[A-Za-z\s'-]+$/;
const NOT_KAWIN_REQUIRED = ["Belum Kawin", "Cerai Hidup", "Cerai Mati"];
const KAWIN_REQUIRED = ["Kawin"];

export const validationSchemas = {
  // Step 0: Pengisian Voucher
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),

  // Step 1: Identitas Pemohon
  1: object({
    namaLengkapPemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        nameRegex,
        "Nama hanya boleh huruf, spasi, apostrof ('), dan tanda hubung (-)"
      )
      .required("Nama lengkap wajib diisi"),
    jenisKelaminPemohon: string().required("Jenis kelamin wajib diisi"),
    nomorHandphonePemohon: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .max(15, "Nomor handphone maksimal 15 karakter")
      .required("Nomor handphone wajib diisi"),
    nomorTeleponPemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor telepon wajib diisi"),
    tempatLahirPemohon: string()
      .min(2, "Tempat lahir minimal 2 karakter")
      .max(50, "Tempat lahir maksimal 50 karakter")
      .required("Tempat lahir wajib diisi"),
    tanggalLahirPemohon: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi")
      .test(
        "is-adult",
        "Pemohon harus berusia minimal 18 tahun",
        function (value) {
          if (!value) return false;
          const today = new Date();
          const birthDate = new Date(value);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age >= 18;
        }
      ),
    emailPemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    pekerjaanPemohon: string()
      .min(2, "Pekerjaan minimal 2 karakter")
      .max(50, "Pekerjaan maksimal 50 karakter")
      .required("Pekerjaan wajib diisi"),
    niknit: string()
      .matches(/^[0-9]{16}$/, "NIK/NIT harus terdiri dari 16 digit angka")
      .required("NIK/NIT wajib diisi"),
    statusPerkawinan: string().required("Status perkawinan wajib diisi"),
    kewarganegaraanAsing: string().required(
      "Kewarganegaraan asing wajib diisi"
    ),
    tempatTglIndoPemohon: string().required(
      "Tempat tinggal di Indonesia wajib diisi"
    ),
    tempatTglLnPemohon: string().required(
      "Tempat tinggal luar negeri wajib diisi"
    ),
    negaraPemohon: string().required("Negara wajib diisi"),

    // Dokumen Sipil
    nmrAktaLahirPemohon: string()
      .matches(/^[A-Za-z0-9\/-]+$/, "Format nomor akta tidak valid")
      .required("Nomor akta lahir wajib diisi"),
    tAktaLahirPemohon: date().required("Tanggal akta lahir wajib diisi"),
    nmrAktaPerkawinanPemohon: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(
            /^[A-Za-z0-9./-]+$/,
            "Format nomor akta hanya huruf, angka, '.', '/' atau '-'"
          )
          .required("Nomor akta perkawinan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tAktaPerkawinanPemohon: date().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema.nullable().required("Tanggal akta perkawinan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nmrPasporRI: string()
      .matches(/^[A-Za-z0-9]{9}$/, "Nomor Paspor RI harus 9 karakter")
      .required("Nomor paspor RI wajib diisi"),
    wlyTerbitPasporRI: string().required(
      "Wilayah terbit paspor RI wajib diisi"
    ),
    tglKedaluarsaPasporRi: date().required(
      "Tanggal kedaluwarsa paspor RI wajib diisi"
    ),
    nmrPasporAsing: string().required("Nomor paspor asing wajib diisi"),
    wlyTerbitPasporAsing: string().required(
      "Wilayah terbit paspor asing wajib diisi"
    ),
    tglKedaluarsaPasporAsing: date().required(
      "Tanggal kedaluwarsa paspor asing wajib diisi"
    ),
  }),

  // Step 2: Identitas Orang Tua / Pasangan
  2: object({
    // ===================== IBU =====================
    namaLengkapIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Nama lengkap minimal 2 karakter")
          .max(100, "Nama lengkap maksimal 100 karakter")
          .required("Nama lengkap ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kewarganegaraanIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Kewarganegaraan ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emailIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .email("Format email tidak valid")
          .required("Email ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHpIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Nomor handphone harus angka")
          .max(15, "Nomor HP maksimal 15 karakter")
          .required("Nomor HP ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tempatLahirIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Tempat lahir ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tanggalLahirIbu: date().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .nullable()
          .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
          .required("Tanggal lahir ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Alamat tinggal ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    statusPerkawinanIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Status perkawinan ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    agamaIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Agama ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // ===================== AYAH =====================
    namaLengkapAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Nama lengkap minimal 2 karakter")
          .max(100, "Nama lengkap maksimal 100 karakter")
          .required("Nama lengkap ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kewarganegaraanAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Kewarganegaraan ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emailAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .email("Format email tidak valid")
          .required("Email ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHpAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Nomor handphone harus angka")
          .max(15, "Nomor HP maksimal 15 karakter")
          .required("Nomor HP ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tempatLahirAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Tempat lahir ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tanggalLahirAyah: date().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .nullable()
          .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
          .required("Tanggal lahir ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Alamat tinggal ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    statusPerkawinanAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Status perkawinan ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    agamaAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Agama ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // ===================== PASANGAN =====================
    namaLengkapPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Nama lengkap pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kewarganegaraanPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Kewarganegaraan pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emailPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .email("Format email tidak valid")
          .required("Email pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHpPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Nomor handphone harus angka")
          .max(15, "Nomor HP maksimal 15 karakter")
          .required("Nomor HP pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tempatLahirPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Tempat lahir pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tanggalLahirPasangan: date().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .nullable()
          .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
          .required("Tanggal lahir pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Alamat tinggal pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    statusPerkawinanPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .oneOf(["Kawin"], "Status perkawinan pasangan harus 'Kawin'")
          .required("Status perkawinan pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    agamaPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Agama pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),

  // Step 3: Surat Permohonan
  3: object({
    suratPermohonan: string().required("Surat permohonan wajib disetujui"),
  }),

  // Step 4: Unggah Dokumen
  4: object({
    fotokopiAktaKelahiran: pdfValidation,
    fotokopiAktaPerkawinan: conditionalPdfValidation(
      "statusPerkawinan",
      "Kawin",
      "Fotokopi Akta Perkawinan wajib diunggah"
    ),
    dokumenPerjalanRi: pdfValidation,
    suratPjbtAsing: pdfValidation,
    pasporAsing: pdfValidation,
    buktiPengemPaspor: pdfValidation,
    pasfoto: imageValidation,
  }),
};
