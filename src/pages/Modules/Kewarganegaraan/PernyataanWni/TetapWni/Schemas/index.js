import {
  imageValidation,
  pdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";

// Validasi schema setiap Step
export const validationSchemas = {
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),
  // =================== Step 1 Identitas Pemohon ===============
  1: object({
    // data pribadi
    nama_lengkap_pemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap wajib diisi"),
    nik_pemohon: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .required("NIK wajib diisi"),
    id_provinsi_pemohon: string().required("Provinsi wajib diisi"),
    id_kab_kota_pemohon: string().required("Kabupaten/Kota wajib diisi"),
    id_negara_lahir_pemohon: string().required("Negara asal wajib diisi"),
    tgl_lahir_pemohon: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    jenis_kelamin_pemohon: string().required("Jenis kelamin wajib diisi"),
    status_kawin_pemohon: string().notRequired(),
    id_kewarganegaraan_asal_pemohon: string().notRequired(),
    id_pekerjaan_pemohon: string().required("Pekerjaan wajib diisi"),

    // Skema Data Alamat
    tempat_tinggal_pemohon: string().required("Tempat tinggal wajib diisi"),
    id_negara_tinggal_pemohon: string().when("tempat_tinggal_pemohon", {
      is: "Luar Negeri",
      then: (schema) => schema.required("Negara wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    id_provinsi_tinggal_pemohon: string().when("tempat_tinggal_pemohon", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Provinsi wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    id_kab_kota_tinggal_pemohon: string().when("tempat_tinggal_pemohon", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Kabupaten atau kota wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamat_tinggal_pemohon: string().required("Alamat wajib diisi"),
    no_hp_pemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor handphone wajib diisi"),
    no_telp_pemohon: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor telepon wajib diisi"),
    email_pemohon: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),

    // Dokumen Kependudukan
    no_akta_lahir_pemohon: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta wajib diisi"),
    tgl_akta_lahir_pemohon: date().required("Tanggal akta wajib diisi"),

    // Dokumen perkawinan
    no_akta_kawin_pemohon: string()
      .matches(
        /^[A-Za-z0-9./-]+$/,
        "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
      )
      .required("Nomor akta perkawinan wajib diisi"),
    tgl_akta_kawin_pemohon: date().required(
      "Tanggal akta perkawinan wajib diisi"
    ),

    // dokumen perjalanan
    no_paspor_ri_pemohon: string()
      .matches(
        /^[A-Za-z0-9]{9}$/,
        "Nomor Paspor RI harus 9 karakter, hanya huruf dan angka"
      )
      .required("Nomor Paspor RI wajib diisi"),
    wilayah_paspor_ri_pemohon: string()
      .min(2, "Wilayah terbit paspor minimal 2 karakter")
      .max(50, "Wilayah terbit paspor maksimal 50 karakter")
      .required("Wilayah terbit paspor wajib diisi"),
    tgl_exp_paspor_ri_pemohon: date().required(
      "Tanggal kedaluwarsa paspor wajib diisi"
    ),
    no_paspor_kebangsaan_pemohon: string()
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor Paspor Kebangsaan hanya boleh huruf, angka, spasi, '/' atau '-'"
      )
      .min(5, "Nomor Paspor Kebangsaan minimal 5 karakter")
      .max(30, "Nomor Paspor Kebangsaan maksimal 30 karakter")
      .required("Nomor Paspor Kebangsaan wajib diisi"),
    wilayah_paspor_kebangsaan_pemohon: string().required(
      "Wilayah terbit paspor kebangsaan wajib diisi"
    ),
    tgl_exp_paspor_kebangsaan_pemohon: date().required(
      "Tanggal kedaluwarsa paspor kebangsaan wajib diisi"
    ),
  }),

  // ================ Step 2 Identitas Pasangan ===============
  2: object({
    nama_lengkap_pasangan: string()
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof ('), dan tanda hubung (-)"
      )
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .required("Nama lengkap wajib diisi"),

    id_kewarganegaraan_pasangan: string().required(
      "Kewarganegaraan pasangan wajib diisi"
    ),

    email_pasangan: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),

    no_hp_pasangan: string()
      .matches(
        /^[0-9]{10,15}$/,
        "Nomor telepon harus terdiri dari 10 sampai 15 angka"
      )
      .required("Nomor telepon wajib diisi"),
    id_negara_lahir_pasangan: string().required("Negara lahir wajib diisi"),
    tgl_lahir_pasangan: date().required("Tanggal lahir wajib diisi"),
    alamat_tinggal_pasangan: string()
      .max(200, "Alamat tidak boleh lebih 200 karakter")
      .required("Alamat tinggal wajib diisi"),
    status_kawin_pasangan: string().notRequired(),
    agama_pasangan: string().required("Agama wajib diisi"),
    no_paspor_asing_pasangan: string()
      .required("Nomor paspor asing wajib diisi")
      .matches(
        /^[A-Z0-9]{6,9}$/,
        "Nomor paspor harus terdiri dari 6 sampai 9 huruf kapital dan angka tanpa spasi atau simbol"
      ),
    tgl_exp_paspor_asing_pasangan: date().required(
      "Tanggal kedaluarsa paspor wajib diisi"
    ),
  }),
  // Step 3 surat permohonan
  3: object({
    suratPermohonan: string().required(
      "Setujui bahwa data yang diisi sudah sesuai"
    ),
  }),
  // Step 4 Unggah dokumen
  4: object({
    kutipanAktaLahirPemohon: pdfValidation,
    kutipanAktaPerkawinanAtauBukuNikah: pdfValidation,
    dokumenPernahWNI: pdfValidation,
    ktpAtauNIT: pdfValidation,
    suratPernyataanPenolakanWNA: pdfValidation,
    pasFoto: pdfValidation,
  }),
};
