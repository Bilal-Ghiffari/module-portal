import {
  imageValidation,
  pdfValidation,
  conditionalPdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";

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
    // Informasi Pribadi
    namaLengkapPemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        nameRegex,
        "Nama lengkap hanya boleh mengandung huruf, spasi, apostrof ('), dan tanda hubung (-)"
      )
      .required("Nama lengkap wajib diisi"),
    jenisKelaminPemohon: string().required("Jenis kelamin wajib diisi"),
    niknit: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .required("NIK wajib diisi"),
    statusPerkawinan: string().required("Status perkawinan wajib diisi"),
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
    kewarganegaraan: string().required("Kewarganegaraan wajib diisi"),
    kewarganegaraanAsing: string().required(
      "Kewarganegaraan asing wajib diisi"
    ),
    nomorHandphonePemohon: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .max(15, "Nomor handphone maksimal 15 karakter")
      .required("Nomor handphone wajib diisi"),
    nomorTeleponPemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor telepon wajib diisi"),
    alasanPemohon: string().required("Alasan permohonan wajib diisi"),
    emailPemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    pekerjaanPemohon: string()
      .min(2, "Pekerjaan minimal 2 karakter")
      .max(50, "Pekerjaan maksimal 50 karakter")
      .required("Pekerjaan wajib diisi"),
    noSkNaturalisasi: string().required("Nomor SK Naturalisasi wajib diisi"),

    // Data Alamat
    tempatTinggalPemohon: string().required("Tempat tinggal wajib diisi"),
    negaraTinggalPemohon: string().when("tempatTinggalPemohon", {
      is: "Luar Negeri",
      then: (schema) => schema.required("Negara tinggal wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    provinsiPemohon: string().when("tempatTinggalPemohon", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Provinsi wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kabkotPemohon: string().when("tempatTinggalPemohon", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Kabupaten atau kota wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalPemohon: string()
      .min(5, "Alamat minimal 5 karakter")
      .max(120, "Alamat maksimal 120 karakter")
      .required("Alamat rumah wajib diisi"),

    // Dokumen Sipil
    nomorAktaPemohon: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta lahir wajib diisi"),
    tanggalAktaPemohon: date().required("Tanggal akta lahir wajib diisi"), // Diasumsikan ini adalah tanggal akta lahir

    // Informasi Perkawinan
    nomorAktaPerkawinan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(
            /^[A-Za-z0-9./-]+$/,
            "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
          )
          .required("Nomor akta perkawinan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tanggalAktaPerkawinan: date().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema.nullable().required("Tanggal akta perkawinan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // Informasi Paspor
    nomorPasporRI: string()
      .matches(
        /^[A-Za-z0-9]{9}$/,
        "Nomor Paspor RI harus 9 karakter, hanya huruf dan angka"
      )
      .required("Nomor Paspor RI wajib diisi"),
    wilayahTerbitPasporRI: string()
      .min(2, "Wilayah terbit paspor minimal 2 karakter")
      .max(50, "Wilayah terbit paspor maksimal 50 karakter")
      .required("Wilayah terbit paspor wajib diisi"),
    tanggalKedaluarsaPaspor: date().required(
      "Tanggal kedaluwarsa paspor wajib diisi"
    ),
  }),

  // Step 2: Identitas Ortu & Pasangan
  2: object({
    // Informasi data Ibu
    namaLengkapIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Nama lengkap minimal 2 karakter")
          .max(100, "Nama lengkap maksimal 100 karakter")
          .required("Nama lengkap Ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kewarganegaraanIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Kewarganegaraan Ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emailIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema.email("Email tidak valid").required("Email wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHpIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Nomor handphone harus angka")
          .max(15, "Nomor handphone maksimal 15 karakter")

          .required("Nomor handphone wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tempatLahirIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Tempat lahir minimal 2 karakter")
          .max(50, "Tempat lahir maksimal 50 karakter")
          .required("Tempat lahir Ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),

    tanggalLahirIbu: date().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
          .nullable()
          .required("Tanggal lahir Ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Alamat rumah Ibu wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    statusPerkawinanIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Status perkawinan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    agamaIbu: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Agama wajib diisi sesuai identitas"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // Informasi data Ayah
    namaLengkapAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Nama lengkap minimal 2 karakter")
          .max(100, "Nama lengkap maksimal 100 karakter")
          .required("Nama lengkap Ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kewarganegaraanAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Kewarganegaraan Ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emailAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema.email("Email tidak valid").required("Email wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHpAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Nomor handphone harus angka")
          .max(15, "Nomor handphone maksimal 15 karakter")

          .required("Nomor handphone wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tempatLahirAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Tempat lahir minimal 2 karakter")
          .max(50, "Tempat lahir maksimal 50 karakter")
          .required("Tempat lahir Ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tanggalLahirAyah: date().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
          .nullable()
          .required("Tanggal lahir Ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Alamat rumah Ayah wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    statusPerkawinanAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Status perkawinan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    agamaAyah: string().when("statusPerkawinan", {
      is: (val) => NOT_KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Agama wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // Informasi data Pasangan
    namaLengkapPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Nama lengkap minimal 2 karakter")
          .max(100, "Nama lengkap maksimal 100 karakter")
          .required("Nama lengkap pasangan wajib diisi"),
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
        schema.email("Email tidak valid").required("Email wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHpPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Nomor telepon harus angka")
          .max(15, "Nomor handphone maksimal 15 karakter")
          .required("Nomor handphone wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tempatLahirPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .min(2, "Tempat lahir minimal 2 karakter")
          .max(50, "Tempat lahir maksimal 50 karakter")
          .required("Tempat lahir pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tanggalLahirPasangan: date().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) =>
        schema
          .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
          .nullable()
          .required("Tanggal lahir pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTinggalPasangan: string().when("statusPerkawinan", {
      is: (val) => KAWIN_REQUIRED.includes(val),
      then: (schema) => schema.required("Alamat rumah pasangan wajib diisi"),
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
      then: (schema) => schema.required("Agama wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),

  // Step 3: Surat Permohonan
  3: object({
    suratPermohonan: string().required(
      "Anda harus menyetujui surat permohonan"
    ),
  }),

  // Step 4: Unggah Dokumen
  4: object({
    // Belum kawin
    fotokopiAktaKelahiran: pdfValidation,
    // Kawin
    fotokopiAktaPerkawinan: conditionalPdfValidation(
      "statusPerkawinan",
      "Kawin",
      "Fotokopi Akta Perkawinan wajib diunggah"
    ),
    // Cerai hidup atau mati
    fotokopiAktaPerceraian: conditionalPdfValidation(
      "statusPerkawinan",
      ["Cerai Hidup", "Cerai Mati"],
      "Fotokopi Akta Perceraian wajib diunggah"
    ),
    // Belum kawin
    fotokopiDokumenPerjalanan: pdfValidation,
    suratKeteranganPejabatAsing: pdfValidation,
    pasfoto: imageValidation,
  }),
};
