import { pdfValidation } from "@/helpers/services/fileValidation";
import { object, string, date, mixed } from "yup";

const nameRegex = /^[A-Za-z\s'-]+$/;
const DALAM_NEGERI = ["Dalam Negeri"];
const LUAR_NEGERI = ["Luar Negeri"];

export const validationSchemas = {
  // Step 0 - Voucher
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),

  // Step 1 - Identitas Pemohon
  1: object({
    nama_lengkap_pemohon: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        nameRegex,
        "Nama hanya boleh huruf, spasi, apostrof ('), dan tanda hubung (-)"
      )
      .required("Nama lengkap wajib diisi"),
    id_kewarganegaraan_asal_pemohon: string().required(
      "Kewarganegaraan wajib diisi"
    ),
    id_negara_lahir_pemohon: string().required("Negara lahir wajib diisi"),
    tgl_lahir_pemohon: date().required("Tanggal lahir wajib diisi"),
    jenis_kelamin_pemohon: string().required("Jenis kelamin wajib diisi"),
    agama_pemohon: string().required("Agama wajib diisi"),
    id_pekerjaan_pemohon: string().required("Pekerjaan wajib diisi"),
    status_kawin: string().required("Status perkawinan wajib diisi"),
    tgl_kawin: date().nullable().required("Tanggal pernikahan wajib diisi"),
    no_buku_nikah: string().required("Nomor buku nikah wajib diisi"),
    no_skim: string().required(
      "Nomor surat keterangan Keimigrasian wajib diisi"
    ),
    id_provinsi_pemohon: string().required("Provinsi wajib diisi"),
    id_kab_kota_pemohon: string().required("Kabupaten/Kota wajib diisi"),
    id_kec_pemohon: string().required("Kecamatan wajib diisi"),
    id_desa_kel_pemohon: string().required("Kelurahan wajib diisi"),
    no_telp_pemohon: string()
      .matches(/^[0-9]+$/, "Nomor HP hanya boleh angka")
      .required("No telepon wajib diisi"),
    email_pemohon: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    rt: string().required("RT wajib diisi"),
    rw: string().required("RW wajib diisi"),
    kode_pos: string().required("Kode pos wajib diisi"),
    alamat_pemohon: string()
      .min(5, "Alamat rumah minimal 5 karakter")
      .max(255, "Alamat rumah maksimal 255 karakter")
      .required("Alamat rumah wajib diisi"),
  }),

  // Step 2 - Identitas Pasangan
  2: object({
    nama_pasangan: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        nameRegex,
        "Nama hanya boleh huruf, spasi, apostrof ('), dan tanda hubung (-)"
      )
      .required("Nama pasangan wajib diisi"),
    nik_pasangan: string()
      .matches(/^[0-9]{16}$/, "NIK harus 16 digit angka")
      .required("NIK pasangan wajib diisi"),
    no_telp_pasangan: string("Nomor HP pasangan wajib diisi").required(
      "Nomor HP pasangan wajib diisi"
    ),
    email_pasangan: string()
      .email("Email tidak valid")
      .required("Email pasangan wajib diisi"),
    // tempat_lahir_pasangan: string()
    //   .oneOf([DALAM_NEGERI[0], LUAR_NEGERI[0]])
    //   .notRequired(),
    tempat_lahir_pasangan: string().required("Tempat lahir wajib dipilih"),
    id_provinsi_lahir_pasangan: string().when("tempat_lahir_pasangan", {
      is: (val) => DALAM_NEGERI.includes(val),
      then: (schema) => schema.required("Provinsi pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    id_kab_kota_lahir_pasangan: string().when("tempat_lahir_pasangan", {
      is: (val) => DALAM_NEGERI.includes(val),
      then: (schema) => schema.required("Kabupaten/Kota pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    id_negara_lahir_pasangan: string().when("tempat_lahir_pasangan", {
      is: (val) => LUAR_NEGERI.includes(val),
      then: (schema) => schema.required("Negara pasangan wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    tgl_lahir_pasangan: date().required("Tanggal lahir pasangan wajib diisi"),
    id_pekerjaan_pasangan: string().required("Pekerjaan pasangan wajib diisi"),
    jenis_kelamin_pasangan: string().required(
      "Jenis kelamin pasangan wajib diisi"
    ),
    agama_pasangan: string().required("Agama pasangan wajib diisi"),
  }),

  // Step 3 - Surat Permohonan
  3: object({
    suratPermohonan: string()
      .required("Anda harus menyetujui bahwa data yang diisi sudah benar")
      .oneOf(["1"], "Anda harus menyetujui bahwa data yang diisi sudah benar"),
  }),

  // Step 4 - Dokumen Upload
  4: object({
    fotokopiAktaKelahiran: pdfValidation,
    fotokopiKitap: pdfValidation,
    fotokopiAktaKelahiranPasangan: pdfValidation,
    fotokopiKtpPasangan: pdfValidation,
    fotokopiAktaPerkawinan: pdfValidation,
    suratKeteranganImigrasi: pdfValidation,
    sckcAsli: pdfValidation,
    suratPerwakilanNegara: pdfValidation,
    pasfoto: pdfValidation,
    suratKeteranganSehat: pdfValidation,
    buktiPembayaran: pdfValidation,
    suratPermohonanTertulis: pdfValidation,
    suratPernyataanAlasan: pdfValidation,
    suratPernyataanBerbahasa: pdfValidation,
    suratPernyataanNama: pdfValidation,
    suratPernyataanKesetiaan: pdfValidation,
  }),
};
