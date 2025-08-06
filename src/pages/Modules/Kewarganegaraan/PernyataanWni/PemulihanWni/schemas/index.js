import {
  imageValidation,
  pdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";

export const validationSchemas = {
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),

  1: object({
    // data pribadi
    namaLengkapPemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap wajib diisi"),
    niknit: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .required("NIK wajib diisi"),
    kewarganegaraan: string().oneOf(
      ["Indonesia"],
      "kewarganegaraan tidak dapat diubah"
    ),
    kewarganegaraanAsing: string().required(
      "Kewarganegaraan asing pasangan wajib diisi"
    ),
    jenisKelaminPemohon: string().required("Jenis kelamin wajib diisi"),
    statusPerkawinan: string().required("Status pernikahan wajib diisi"),
    pekerjaanPemohon: string()
      .min(2, "Pekerjaan minimal 2 karakter")
      .max(50, "Pekerjaan maksimal 50 karakter")
      .required("Pekerjaan wajib diisi"),
    tempatLahirPemohon: string()
      .min(2, "Tempat lahir minimal 2 karakter")
      .max(50, "Tempat lahir maksimal 50 karakter")
      .required("Tempat lahir wajib diisi"),
    tanggalLahirPemohon: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    alasanPemohon: string().oneOf(
      ["Putusnya perkawinan"],
      "Alasan pemohon tidak dapat diubah"
    ),
    nomorAktaPemohon: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta wajib diisi"),
    tanggalAktaPemohon: date().required("Tanggal akta wajib diisi"),

    // Data alamat
    tempatTinggalPemohon: string().required("Tempat tinggal wajib diisi"),
    negaraTinggalPemohon: string().when("tempatTinggalPemohon", {
      is: "Luar Negeri",
      then: (schema) => schema.required("Negara wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nomorHandphonePemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor handphone wajib diisi"),
    nomorTeleponPemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor telepon wajib diisi"),
    provinsi: string().when("tempatTinggalPemohon", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Provinsi wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kabkot: string().when("tempatTinggalPemohon", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Kabupaten atau kota wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emailPemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    alamatTinggalPemohon: string().required("Alamat rumah wajib diisi"),

    // Dokumen kelahiran anak
    nomorAktaAnak: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta wajib diisi"),
    tanggalAktaAnak: date().required("Tanggal akta wajib diisi"),

    // Dokumen perkawinan
    nomorAktaPerkawinan: string()
      .matches(
        /^[A-Za-z0-9./-]+$/,
        "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
      )
      .required("Nomor akta perkawinan wajib diisi"),
    tanggalAktaPerkawinan: date().required(
      "Tanggal akta perkawinan wajib diisi"
    ),
    nomorAktaCerai: string()
      .matches(
        /^[A-Za-z0-9./-]+$/,
        "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
      )
      .required("Nomor akta perkawinan wajib diisi"),
    tanggalAktaCerai: date()
      .required("Tanggal akta cerai wajib diisi")
      .test(
        "is-after-perkawinan",
        "Tanggal akta cerai harus lebih baru dari tanggal akta perkawinan",
        function (value) {
          const { tanggalAktaPerkawinan } = this.parent;
          if (!value || !tanggalAktaPerkawinan) return true; // skip validasi kalau salah satu belum diisi
          return new Date(value) > new Date(tanggalAktaPerkawinan);
        }
      ),
    // Dokumen Perjalanan
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

  2: object({
    // Informasi data pasangan
    namaLengkapPasangan: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap wajib diisi"),
    kewarganegaraanPasangan: string().required(
      "Kewarganegaraan pasangan wajib diisi"
    ),
    emailPasangan: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),

    nomorHpPasangan: string()
      .matches(
        /^[0-9]{10,20}$/,
        "Nomor telepon harus terdiri dari 10 sampai 15 angka"
      )
      .required("Nomor telepon wajib diisi"),
    tempatLahirPasangan: string()
      .min(2, "Tempat lahir minimal 2 karakter")
      .max(50, "Tempat lahir maksimal 50 karakter")
      .required("Tempat lahir wajib diisi"),
    tanggalLahirPasangan: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    alamatTinggalPasangan: string().required("Alamat rumah wajib diisi"),

    // Informasi data anak
    namaLengkapAnak: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap wajib diisi"),
    emailAnak: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    tempatLahirAnak: string()
      .min(2, "Tempat lahir minimal 2 karakter")
      .max(50, "Tempat lahir maksimal 50 karakter")
      .required("Tempat lahir wajib diisi"),
    tanggalLahirAnak: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    alamatTinggalAnak: string().required("Alamat rumah wajib diisi"),
  }),

  3: object({
    suratPermohonan: string().required("Rules wajib dicentang"),
  }),
  4: object({
    fotokopiAktaKelahiran: pdfValidation,
    fotokopiPasporRI: pdfValidation,
    fotokopiKtp: pdfValidation,
    fotokopiAktaNikah: pdfValidation,
    fotokopiAktaCerai: pdfValidation,
    fotokopiAktaKelahiranAnak: pdfValidation,
    suratPernyataanKesetiaan: pdfValidation,
    suratPernyataanMelepaskan: pdfValidation,
    daftarRiwayatHidup: pdfValidation,
    pasFoto: imageValidation,
  }),
};
