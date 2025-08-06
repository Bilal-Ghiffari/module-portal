import {
  imageValidation,
  pdfValidation,
  conditionalPdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";

export const validationSchemas = {
  // Step 0: Pengisian Voucher
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),

  // Step 1: Identitas Pemohon
  1: object({
    // Informasi Pribadi Pemohon
    namaLengkapPemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap wajib diisi"),
    jenisKelaminPemohon: string().required("Jenis kelamin wajib diisi"),
    noHpPemohon: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .required("Nomor handphone wajib diisi"),
    noTelpPemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor telepon wajib diisi"),
    tmpLahirPemohon: string()
      .min(2, "Tempat lahir minimal 2 karakter")
      .max(50, "Tempat lahir maksimal 50 karakter")
      .required("Tempat lahir wajib diisi"),
    tglLahirPemohon: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    emailPemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    pekerjaanPemohon: string()
      .min(2, "Pekerjaan minimal 2 karakter")
      .max(50, "Pekerjaan maksimal 50 karakter")
      .required("Pekerjaan wajib diisi"),
    niknitPemohon: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .required("NIK wajib diisi"),
    statusPerkawinan: string()
      .oneOf(["Kawin"], "Status perkawinan tidak valid")
      .notRequired(),
    alasanPemohon: string()
      .oneOf(["Karena perkawinan"], "Alasan pemohon tidak valid")
      .notRequired(),

    // Data Alamat Pemohon
    alamatTglIndoPemohon: string()
      .min(5, "Alamat minimal 5 karakter")
      .max(120, "Alamat maksimal 120 karakter")
      .required("Alamat tinggal di Indonesia wajib diisi"),
    alamatTglAsgPemohon: string()
      .min(5, "Alamat minimal 5 karakter")
      .max(120, "Alamat maksimal 120 karakter")
      .required("Alamat tinggal di Luar Negeri wajib diisi"),
    negaraPemohon: string().required("Negara tempat tinggal wajib diisi"),

    // Informasi Dokumen Sipil
    nomorAktaLahir: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta lahir wajib diisi"),
    tanggalAktaLahir: date().required("Tanggal akta lahir wajib diisi"),
    nomorAktaPerkawinan: string()
      .matches(
        /^[A-Za-z0-9./-]+$/,
        "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
      )
      .required("Nomor akta perkawinan wajib diisi"),
    tanggalAktaPerkawinan: date().required(
      "Tanggal akta perkawinan wajib diisi"
    ),

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

  // Step 2: Identitas Suami / Istri (Pasangan)
  2: object({
    namaLengkapPasangan: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap pasangan wajib diisi"),
    kewarganegaraanPasangan: string().required(
      "Kewarganegaraan pasangan wajib diisi"
    ),
    emailPasangan: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    nomorHpPasangan: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor handphone wajib diisi"),
    tempatLahirPasangan: string()
      .min(2, "Tempat lahir minimal 2 karakter")
      .max(50, "Tempat lahir maksimal 50 karakter")
      .required("Tempat lahir pasangan wajib diisi"),
    tanggalLahirPasangan: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir pasangan wajib diisi"),
    alamatTinggalPasangan: string().required(
      "Alamat rumah pasangan wajib diisi"
    ),
    statusKawinPasangan: string().oneOf(["Kawin"]).notRequired(),
    agamaPasangan: string().required("Agama wajib diisi sesuai identitas"),
  }),

  // Step 3: Surat Permohonan
  3: object({
    suratPermohonan: string().required(
      "Anda harus menyetujui terlebih dahulu surat permohonan"
    ),
  }),

  // Step 4: Unggah Dokumen
  4: object({
    kutipanAktaKelahiran: pdfValidation,
    kutipanAktaPerkawinan: pdfValidation,
    kutipanAktaPerceraian: pdfValidation,
    fotokopiPasporRI: pdfValidation,
    suratNaturalisasiAsing: pdfValidation,
    pasfoto: imageValidation,
  }),
};
