import {
  imageValidation,
  pdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";
import { requiredIf } from "../../../utils/formik";

export const validationSchemas = {
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),
  // Identitas Pemohon (Anak)
  1: object({
    // Informasi Anak
    nama_lengkap_pemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-)"
      )
      .required("Nama lengkap wajib diisi"),
    nik_pemohon: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .required("NIK wajib diisi"),
    no_hp_pemohon: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .required("Nomor handphone wajib diisi"),
    no_telp_pemohon: string()
      .matches(/^\d*$/, "Nomor telepon harus angka")
      .notRequired(),

    jenis_kelamin_pemohon: string().required("Jenis kelamin wajib diisi"),
    status_kawin_pemohon: string().required("Status pernikahan wajib diisi"),
    email_pemohon: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    id_pekerjaan_pemohon: string().required("Pekerjaan wajib diisi"),
    tempat_lahir_pemohon: string().required("Tempat Kelahiran wajib diisi"),
    id_provinsi_lahir_pemohon: requiredIf(
      "tempat_lahir_pemohon",
      "Dalam Negeri",
      "Provinsi kelahiran wajib diisi"
    ),
    id_kab_kota_lahir_pemohon: requiredIf(
      "tempat_lahir_pemohon",
      "Dalam Negeri",
      "Kabupaten/Kota wajib diisi"
    ),
    id_negara_lahir_pemohon: requiredIf(
      "tempat_lahir_pemohon",
      "Luar Negeri",
      "Negara kelahiran wajib diisi"
    ),
    tgl_lahir_pemohon: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),

    id_kwn_pemohon: string().notRequired(),
    id_kwn_asing_pemohon: string().required(
      "Kewarganegaraan asing wajib diisi"
    ),

    // Data Alamat
    tempat_tinggal_pemohon: string().required("Tempat tinggal wajib diisi"),
    id_negara_tinggal_pemohon: requiredIf(
      "tempat_tinggal_pemohon",
      "Luar Negeri",
      "Negara tinggal wajib diisi"
    ),
    id_prov_tinggal_pemohon: requiredIf(
      "tempat_tinggal_pemohon",
      "Dalam Negeri",
      "Provinsi tinggal wajib diisi"
    ),
    id_kab_kota_tinggal_pemohon: requiredIf(
      "tempat_tinggal_pemohon",
      "Dalam Negeri",
      "Kab/Kota wajib diisi"
    ),
    alamat_tinggal_pemohon: string().required("Alamat tinggal wajib diisi"),

    // Dokumen Kelahiran
    no_akta_lahir_pemohon: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta wajib diisi"),
    tgl_akta_lahir_pemohon: date().required("Tanggal akta wajib diisi"),

    // Dokumen Perkawinan Ortu
    no_akta_kawin_ortu_pemohon: string()
      .matches(
        /^[A-Za-z0-9./-]+$/,
        "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
      )
      .required("Nomor akta perkawinan wajib diisi"),
    tgl_akta_kawin_ortu_pemohon: date().required(
      "Tanggal akta perkawinan wajib diisi"
    ),

    // Dokumen Perjalanan
    no_paspor_ri_pemohon: string()
      .matches(
        /^[A-Za-z0-9]{9}$/,
        "Nomor Paspor RI harus 9 karakter, hanya huruf dan angka"
      )
      .required("Nomor Paspor RI wajib diisi"),
    id_wilayah_paspor_ri_pemohon: string().required(
      "Wilayah terbit paspor wajib diisi"
    ),
    tgl_exp_paspor_ri_pemohon: date().required(
      "Tanggal kedaluwarsa paspor wajib diisi"
    ),

    no_paspor_kebangsaan_pemohon: string()
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor Paspor Kebangsaan hanya boleh huruf, angka, spasi, '/' atau '-'"
      )

      .required("Nomor Paspor Kebangsaan wajib diisi"),
    id_negara_paspor_kebangsaan_pemohon: string().required(
      "Wilayah paspor kebangsaan wajib diisi"
    ),
    tgl_exp_paspor_kebangsaan_pemohon: date().required(
      "Tanggal kedaluwarsa paspor kebangsaan wajib diisi"
    ),

    // Dokumen Keimigrasian / SK WNI
    no_dok_keimigrasian_pemohon: string()
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor dokumen hanya boleh huruf, angka, spasi, '/' atau '-'"
      )
      .required("Nomor dokumen keimigrasian wajib diisi"),
    tgl_dok_keimigrasian_pemohon: date()
      .max(new Date(), "Tanggal tidak boleh di masa depan")
      .required("Tanggal dokumen keimigrasian wajib diisi"),
  }),
  2: object({
    // Data Ayah
    nama_lengkap_ayah: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-)"
      )
      .required("Nama lengkap ayah wajib diisi"),
    status_kawin_ayah: string().required("Status pernikahan ayah wajib diisi"),
    email_ayah: string()
      .email("Email tidak valid")
      .required("Email ayah wajib diisi"),
    nomor_hp_ayah: string()
      .matches(/^[0-9]+$/, "Nomor HP hanya angka")
      .required("Nomor HP ayah wajib diisi"),
    id_kwn_asal_ayah: number().required("Kewarganegaraan ayah wajib diisi"),
    alamat_tinggal_ayah: string().required("Alamat ayah wajib diisi"),
    tempat_lahir_ayah: string().required("Tempat Kelahiran wajib diisi"),
    id_provinsi_lahir_ayah: requiredIf(
      "tempat_lahir_ayah",
      "Dalam Negeri",
      "Provinsi kelahiran wajib diisi"
    ),
    id_kab_kota_lahir_ayah: requiredIf(
      "tempat_lahir_ayah",
      "Dalam Negeri",
      "Kab/Kota wajib diisi"
    ),
    id_negara_lahir_ayah: requiredIf(
      "tempat_lahir_ayah",
      "Luar Negeri",
      "Negara kelahiran wajib diisi"
    ),
    tgl_lahir_ayah: date().required("Tanggal lahir ayah wajib diisi"),

    // Data Ibu
    nama_lengkap_ibu: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-)"
      )
      .required("Nama lengkap ibu wajib diisi"),
    status_kawin_ibu: string().required("Status pernikahan ayah wajib diisi"),
    email_ibu: string()
      .email("Email tidak valid")
      .required("Email ibu wajib diisi"),
    nomor_hp_ibu: string()
      .matches(/^[0-9]+$/, "Nomor HP hanya angka")
      .required("Nomor HP ibu wajib diisi"),
    id_kwn_asal_ibu: number().required("Kewarganegaraan ibu wajib diisi"),
    alamat_tinggal_ibu: string().required("Alamat ibu wajib diisi"),
    tempat_lahir_ibu: string().required("Tempat Kelahiran wajib diisi"),
    id_provinsi_lahir_ibu: requiredIf(
      "tempat_lahir_ibu",
      "Dalam Negeri",
      "Provinsi kelahiran wajib diisi"
    ),
    id_kab_kota_lahir_ibu: requiredIf(
      "tempat_lahir_ibu",
      "Dalam Negeri",
      "Kab/Kota kelahiran wajib diisi"
    ),
    id_negara_lahir_ibu: requiredIf(
      "tempat_lahir_ibu",
      "Luar Negeri",
      "Negara Kelahiran wajib diisi"
    ),
    tgl_lahir_ibu: date().required("Tanggal lahir ibu wajib diisi"),
  }),

  3: object({
    suratPermohonan: string().required(
      "Setujui bahwa pengisian formulir sudah sesuai"
    ),
  }),
  4: object({
    kutipanAktaKelahiran: pdfValidation,
    kutipanAktaPerkawinan: pdfValidation,
    pasporRepublik: pdfValidation,
    ktp: pdfValidation,
    keputusanMenteri: pdfValidation,
    pasFoto: pdfValidation,
  }),
};
