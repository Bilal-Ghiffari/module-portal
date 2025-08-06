import * as Yup from "yup";

// master schema default untuk semua step
export const masterStepSchemas = {
  // 1: {
  //   fields: ["nama_perseroan", "rules_1", "rules_2"],
  //   validation: Yup.object().shape({
  //     nama_perseroan: Yup.string()
  //       .required("Nama Perseroan wajib di isi")
  //       .min(3, "Minimal 3 karakter"),
  //     rules_1: Yup.string().required("Rules wajib di centang"),
  //     rules_2: Yup.string().required("Rules wajib di centang"),
  //   }),
  // },
  // 2: {
  //   fields: ["voucher"],
  //   validation: Yup.object().shape({
  //     voucher: Yup.string().required("Voucher wajib di isi"),
  //   }),
  // },
  // 3: {
  //   fields: [
  //     "nama_perseroan",
  //     "email",
  //     "provinsi_kantor",
  //     "kabupaten_kantor",
  //     "kecamatan_kantor",
  //     "kelurahan_kantor",
  //     "alamat_kantor",
  //     "no_telp_kantor",
  //     "kode_pos_kantor",
  //     "rt_kantor",
  //     "rw_kantor",
  //     "total_modal_usaha",
  //     "kegiatan_usaha",
  //   ],
  //   validation: Yup.object().shape({
  //     nama_perseroan: Yup.string()
  //       .required("Nama Perseroan wajib di isi")
  //       .min(3, "Minimal 3 karakter"),
  //     email: Yup.string()
  //       .email("Format email tidak valid")
  //       .required("Email wajib di isi"),
  //     provinsi_kantor: Yup.string().required("Provinsi Kantor wajib di isi"),
  //     kabupaten_kantor: Yup.string().required("Kabupaten Kantor wajib di isi"),
  //     kecamatan_kantor: Yup.string().required("Kecamatan Kantor wajib di isi"),
  //     kelurahan_kantor: Yup.string().required("Kelurahan Kantor wajib di isi"),
  //     alamat_kantor: Yup.string().required("Alamat Kantor wajib di isi"),
  //     no_telp_kantor: Yup.string()
  //       .required("No Telepon Kantor wajib di isi")
  //       .matches(
  //         /^(?:\+62|62|08)[0-9]{8,12}$/,
  //         "Format nomor telepon tidak valid. Contoh: 081234567890"
  //       ),
  //     kode_pos_kantor: Yup.string()
  //       .required("Kode Pos Kantor wajib di isi")
  //       .max(5, "Maksimal Kode POS 5 karakter"),
  //     rt_kantor: Yup.string()
  //       .required("RT Kantor wajib di isi")
  //       .max(3, "Maksimal RT 3 karakter"),
  //     rw_kantor: Yup.string()
  //       .required("RW Kantor wajib di isi")
  //       .max(3, "Maksimal RW 3 karakter"),
  //     total_modal_usaha: Yup.string().required(
  //       "Total Modal Usaha wajib di isi"
  //     ),
  //     kegiatan_usaha: Yup.array()
  //       .of(
  //         Yup.object().shape({
  //           id_kbli: Yup.number().required("ID KBLI wajib diisi"),
  //           kode: Yup.string().required("Kode KBLI wajib diisi"),
  //           kategori: Yup.string().required("Kategori wajib diisi"),
  //           judul: Yup.string().required("Judul wajib diisi"),
  //           tahun: Yup.string().required("Tahun wajib diisi"),
  //           status: Yup.number()
  //             .oneOf([0, 1], "Status harus 0 atau 1")
  //             .required("Status wajib diisi"),
  //         })
  //       )
  //       .min(1, "Minimal 1 kegiatan usaha wajib di isi"),
  //   }),
  // },
  // 4: {
  //   fields: [
  //     "provinsi_pemilik",
  //     "kabupaten_pemilik",
  //     "kecamatan_pemilik",
  //     "kelurahan_pemilik",
  //     "alamat_pemilik",
  //     "kode_pos_pemilik",
  //     "rt_pemilik",
  //     "rw_pemilik",
  //     "nama_lengkap",
  //     "no_telp",
  //     "nik",
  //     "tempat_lahir",
  //     "tanggal_lahir",
  //     "npwp",
  //   ],
  //   validation: Yup.object().shape({
  //     provinsi_pemilik: Yup.string().required("Provinsi Pemilik wajib di isi"),
  //     kabupaten_pemilik: Yup.string().required(
  //       "Kabupaten Pemilik wajib di isi"
  //     ),
  //     kecamatan_pemilik: Yup.string().required(
  //       "Kecamatan Pemilik wajib di isi"
  //     ),
  //     kelurahan_pemilik: Yup.string().required(
  //       "Kelurahan Pemilik wajib di isi"
  //     ),
  //     alamat_pemilik: Yup.string().required("Alamat Pemilik wajib di isi"),
  //     kode_pos_pemilik: Yup.string()
  //       .required("Kode Pos Pemilik wajib di isi")
  //       .max(5, "Maksimal Kode POS 5 karakter"),
  //     rt_pemilik: Yup.string()
  //       .required("RT Pemilik wajib di isi")
  //       .max(3, "Maksimal RT 3 karakter"),
  //     rw_pemilik: Yup.string()
  //       .required("RW Pemilik wajib di isi")
  //       .max(3, "Maksimal RW 3 karakter"),

  //     nama_lengkap: Yup.string().required("Nama Lengkap wajib di isi"),
  //     no_telp: Yup.string()
  //       .required("No Telepon wajib di isi")
  //       .matches(
  //         /^(?:\+62|62|08)[0-9]{8,12}$/,
  //         "Format nomor telepon tidak valid. Contoh: 081234567890"
  //       ),

  //     nik: Yup.string().required("NIK wajib di isi"),
  //     tempat_lahir: Yup.string().required("Tempat Lahir wajib di isi"),
  //     tanggal_lahir: Yup.string().required("Tanggal Lahir wajib di isi"),
  //     npwp: Yup.string().required("NPWP wajib di isi"),
  //   }),
  // },
  // 5: {
  //   fields: ["rules_10", "rules_11"],
  //   validation: Yup.object().shape({
  //     rules_10: Yup.string().required("Rules wajib di centang"),
  //     rules_11: Yup.string().required("Rules wajib di centang"),
  //   }),
  // },
  // 7: {
  //   fields: [
  //     "rules_3",
  //     "rules_4",
  //     "rules_5",
  //     "rules_6",
  //     "rules_7",
  //     "rules_8",
  //     "rules_9",
  //   ],
  //   validation: Yup.object().shape({
  //     rules_3: Yup.string().required("Rules wajib di centang"),
  //     rules_4: Yup.string().required("Rules wajib di centang"),
  //     rules_5: Yup.string().required("Rules wajib di centang"),
  //     rules_6: Yup.string().required("Rules wajib di centang"),
  //     rules_7: Yup.string().required("Rules wajib di centang"),
  //     rules_8: Yup.string().required("Rules wajib di centang"),
  //     rules_9: Yup.string().required("Rules wajib di centang"),
  //   }),
  // },
  // tambahkan step dst sesuai project
};

// step config per label
export const labelsStepConfig = {
  "Pendaftaran Pendirian": {
    steps: ["1", "2", "3", "4", "5", "6"],
    overrides: {}, // default, pakai master
  },
  "Perubahan Data": {
    steps: ["1", "3", "4"],
    overrides: {
      1: {
        fields: ["nama_perseroan", "voucher"],
        validation: Yup.object().shape({
          nama_perseroan: Yup.string()
            .required("Nama Perseroan wajib di isi")
            .min(3, "Minimal 3 karakter"),
          voucher: Yup.string().required("Voucher wajib di isi"),
        }),
      },
      4: {
        fields: [
          "pergantian_usaha",
          "pemilik_kab_kota_lahir_baru",
          "nama_lengkap_baru",
          "no_telp_baru",
          "email_baru",
          "nik_baru",
          "tanggal_lahir_baru",
          "npwp_baru",
          "jabatan_baru",
          "pemilik_provinsi_lahir_baru",
          "tempat_lahir_baru",
          "pemilik_negara_lahir_baru",
        ],
        validation: Yup.object().shape({
          pergantian_usaha: Yup.string().required("Pilih Salah Satu"),
          // pemilik_provinsi_lahir_baru: Yup.string().required(
          //   "Provinsi wajib di isi"
          // ),
          // pemilik_kab_kota_lahir_baru: Yup.string().required(
          //   "Kabupaten/Kota wajib di isi"
          // ),
          // nama_lengkap_baru: Yup.string().required("Nama Lengkap wajib di isi"),
          // no_telp_baru: Yup.string()
          //   .required("No Telepon wajib di isi")
          //   .matches(
          //     /^(?:\+62|62|08)[0-9]{8,12}$/,
          //     "Format nomor telepon tidak valid. Contoh: 081234567890"
          //   ),
          // email_baru: Yup.string()
          //   .email("Format email tidak valid")
          //   .required("Email wajib di isi"),
          // nik_baru: Yup.string().required("NIK wajib di isi"),
          // tanggal_lahir_baru: Yup.string().required("Tanggal Lahir wajib di isi"),
          // npwp_baru: Yup.string().required("NPWP wajib di isi"),
          // jabatan_baru: Yup.string().required("Jabatan wajib di isi"),
          // tempat_lahir_baru: Yup.string().required("Pilih Salah Satu"),
        }),
      },
    },
  },
  "Pembubaran Data": {
    steps: ["1", "7"],
    overrides: {
      1: {
        fields: ["nama_perseroan", "voucher"],
        validation: Yup.object().shape({
          nama_perseroan: Yup.string()
            .required("Nama Perseroan wajib di isi")
            .min(3, "Minimal 3 karakter"),
          voucher: Yup.string().required("Voucher wajib di isi"),
        }),
      },
    },
  },
  "Perbaikan Data": {
    steps: ["1", "3", "4"],
    overrides: {
      1: {
        fields: ["nama_perseroan", "voucher"],
        validation: Yup.object().shape({
          nama_perseroan: Yup.string()
            .required("Nama Perseroan wajib di isi")
            .min(3, "Minimal 3 karakter"),
          voucher: Yup.string().required("Voucher wajib di isi"),
        }),
      },
    },
  },
};

export const generateStepSchemasByLabel = (label) => {
  const config = labelsStepConfig[label];
  if (!config) return {};

  return config.steps.reduce((acc, stepId) => {
    const defaultStep = masterStepSchemas[stepId];
    const override = config.overrides?.[stepId];

    acc[stepId] = {
      fields: override?.fields || defaultStep?.fields || [],
      validation: override?.validation || defaultStep?.validation || null,
    };
    return acc;
  }, {});
};
