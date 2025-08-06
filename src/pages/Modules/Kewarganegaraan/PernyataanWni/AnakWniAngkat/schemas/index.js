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
    jenis_kelamin_pemohon: string().required("Jenis kelamin wajib diisi"),
    id_tempat_lahir_pemohon: string().required("Tempat lahir wajib diisi"),
    tgl_lahir_pemohon: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    email_pemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    id_kwn_asal_pemohon: string().required(
      "Kewarganegaraan asing anak wajib diisi"
    ),

    // Alamat tempat tinggal anak
    tempat_tinggal_pemohon: string().required("Tempat tinggal wajib diisi"),
    id_negara_tinggal_pemohon: requiredIf(
      "tempat_tinggal_pemohon",
      "Luar Negeri",
      "Negara Tinggal Wajib diisi!"
    ),
    id_provinsi_tinggal_pemohon: requiredIf(
      "tempat_tinggal_pemohon",
      "Dalam Negeri",
      "Provinsi tinggal wajib diisi!"
    ),
    id_kab_kota_tinggal_pemohon: requiredIf(
      "tempat_tinggal_pemohon",
      "Dalam Negeri",
      "Kab/Kota Tinggal wajib diisi!"
    ),
    alamat_tinggal_pemohon: string().required("Alamat rumah wajib diisi"),

    // Informasi pengangkatan anak
    no_dok_pengangkatan_anak: string()
      .matches(
        /^[A-Za-z0-9\/\.\-]+$/,
        "Nomor Penetapan hanya boleh berisi huruf, angka, '/', '.', dan '-'"
      )
      .min(5, "Nomor Penetapan minimal 5 karakter")
      .max(50, "Nomor Penetapan maksimal 50 karakter")
      .required("Nomor Penetapan wajib diisi"),
    tgl_dok_pengangkatan_anak: date().required("Tanggal penetapan wajib diisi"),

    // Informasi paspor asing
    no_paspor_asing_pemohon: string()
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor Paspor hanya boleh berisi huruf, angka, spasi, '/' dan '-'"
      )
      .required("Nomor Paspor wajib diisi"),
    id_wilayah_paspor_asing_pemohon: string().required(
      "Wilayah terbit paspor wajib diisi"
    ),
    tgl_exp_paspor_asing_pemohon: date().required(
      "Tanggal kedaluwarsa paspor wajib diisi"
    ),
  }),
  2: object({
    // Data ayah
    nama_lengkap_ayah: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-), tanpa karakter khusus lainnya"
      )
      .required("Nama lengkap wajib diisi"),
    nik_ayah: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .min(16, "NIK harus 16 digit")
      .max(16, "NIK harus 16 digit")
      .required("NIK wajib diisi"),
    email_ayah: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    no_hp_ayah: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .min(10, "Nomor handphone minimal 10 digit")
      .max(15, "Nomor handphone maksimal 15 digit")
      .required("Nomor handphone wajib diisi"),
    id_kwn_asal_ayah: string().required("Kewarganegaraan pasangan wajib diisi"),
    status_kawin_ayah: string().required("Status pernikahan wajib diisi"),
    alamat_tinggal_ayah: string()
      .min(5, "Alamat rumah minimal 5 karakter")
      .max(200, "Alamat rumah maksimal 200 karakter")
      .required("Alamat rumah wajib diisi"),
    tempat_lahir_ayah: string().required(
      "Tempat lahir wajib diisi dan sesuai identitas"
    ),
    id_negara_lahir_ayah: requiredIf(
      "tempat_lahir_ayah",
      "Luar Negeri",
      "Negara Tinggal Wajib diisi!"
    ),
    id_provinsi_lahir_ayah: requiredIf(
      "tempat_lahir_ayah",
      "Dalam Negeri",
      "Provinsi tinggal wajib diisi!"
    ),
    id_kab_kota_lahir_ayah: requiredIf(
      "tempat_lahir_ayah",
      "Dalam Negeri",
      "Kab/Kota Tinggal wajib diisi!"
    ),
    tgl_lahir_ayah: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    id_pekerjaan_ayah: string().required("Pekerjaan wajib diisi"),

    // Data Ibu
    nama_lengkap_ibu: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-), tanpa karakter khusus lainnya"
      )
      .required("Nama lengkap wajib diisi"),
    nik_ibu: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .min(16, "NIK harus 16 digit")
      .max(16, "NIK harus 16 digit")
      .required("NIK wajib diisi"),
    email_ibu: string()
      .email("Format email tidak valid")

      .required("Email wajib diisi"),
    no_hp_ibu: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .min(10, "Nomor handphone minimal 10 digit")
      .max(15, "Nomor handphone maksimal 15 digit")
      .required("Nomor handphone wajib diisi"),
    id_kwn_asal_ibu: string().required("Kewarganegaraan pasangan wajib diisi"),
    status_kawin_ibu: string().required("Status pernikahan wajib diisi"),
    alamat_tinggal_ibu: string()
      .min(5, "Alamat rumah minimal 5 karakter")
      .max(200, "Alamat rumah maksimal 200 karakter")
      .required("Alamat rumah wajib diisi"),
    tempat_lahir_ibu: string().required(
      "Tempat lahir wajib diisi dan sesuai identitas"
    ),
    id_negara_lahir_ibu: requiredIf(
      "tempat_lahir_ibu",
      "Luar Negeri",
      "Negara Tinggal Wajib diisi!"
    ),
    id_provinsi_lahir_ibu: requiredIf(
      "tempat_lahir_ibu",
      "Dalam Negeri",
      "Provinsi tinggal wajib diisi!"
    ),
    id_kab_kota_lahir_ibu: requiredIf(
      "tempat_lahir_ibu",
      "Dalam Negeri",
      "Kab/Kota Tinggal wajib diisi!"
    ),
    tgl_lahir_ibu: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    id_pekerjaan_ibu: string().required("Pekerjaan wajib diisi"),
  }),
  3: object({
    suratPermohonan: string().required("Rules wajib dicentang"),
  }),
  4: object({
    kutipanAktaKelahiran: pdfValidation,
    IzinKeimigrasian: pdfValidation,
    skTmpTinggal: pdfValidation,
    pasporAnak: pdfValidation,
    penetapanKeadilan: pdfValidation,
    srtPerwaNgrAsal: pdfValidation,
    kutipanAktaKelaOrtu: pdfValidation,
    pasporKtpOrtu: pdfValidation,
    kutipanAktaPerkawinan: pdfValidation,
    pasfoto: pdfValidation,
  }),
};
