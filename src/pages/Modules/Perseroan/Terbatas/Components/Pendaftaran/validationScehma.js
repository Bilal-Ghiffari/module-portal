import * as Yup from "yup";

// master schema default untuk semua step
export const masterStepSchemas = {
  // 1: {
  //   fields: [
  //     "nama_perseroan",
  //     "singkatan_nama_perseroan",
  //     "rules_1",
  //     "rules_2",
  //     "rules_3",
  //   ],
  //   validation: Yup.object().shape({
  //     nama_perseroan: Yup.string().required("Nama Perseroan wajib di isi"),
  //     singkatan_nama_perseroan: Yup.string().required(
  //       "Singkatan Nama Perseroan wajib di isi"
  //     ),
  //     rules_1: Yup.string().required("Rules wajib di centang"),
  //     rules_2: Yup.string().required("Rules wajib di centang"),
  //     rules_3: Yup.string().required("Rules wajib di centang"),
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
  //     nama_perseroan: Yup.string().required("Nama Perseroan wajib di isi"),
  //     email: Yup.string()
  //       .email("Format email tidak valid")
  //       .required("Email wajib di isi"),
  //     provinsi_kantor: Yup.string().required("Provinsi Kantor wajib di isi"),
  //     kabupaten_kantor: Yup.string().required("Kabupaten Kantor wajib di isi"),
  //     kecamatan_kantor: Yup.string().required("Kecamatan Kantor wajib di isi"),
  //     kelurahan_kantor: Yup.string().required("Kelurahan Kantor wajib di isi"),
  //     alamat_kantor: Yup.string().required("Alamat Kantor wajib di isi"),
  //     no_telp_kantor: Yup.string().required("No Telepon Kantor wajib di isi"),
  //     kode_pos_kantor: Yup.string().required("Kode Pos Kantor wajib di isi"),
  //     rt_kantor: Yup.string().required("RT Kantor wajib di isi"),
  //     rw_kantor: Yup.string().required("RW Kantor wajib di isi"),
  //     total_modal_usaha: Yup.string().required(
  //       "Total Modal Usaha wajib di isi"
  //     ),
  //     kegiatan_usaha: Yup.array()
  //       .of(
  //         Yup.object().shape({
  //           id: Yup.number().required("ID wajib di isi"),
  //           kode: Yup.string().required("Kode KBLI wajib di isi"),
  //           judul: Yup.string().required("Judul wajib di isi"),
  //           uraian: Yup.string().required("Uraian wajib di isi"),
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
  //   valdation: Yup.object().shape({
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
  //     kode_pos_pemilik: Yup.string().required("Kode Pos Pemilik wajib di isi"),
  //     rt_pemilik: Yup.string().required("RT Pemilik wajib di isi"),
  //     rw_pemilik: Yup.string().required("RW Pemilik wajib di isi"),

  //     nama_lengkap: Yup.string().required("Nama Lengkap wajib di isi"),
  //     no_telp: Yup.string().required("No Telepon wajib di isi"),
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
  //   fields: ["rules_4", "rules_5", "rules_6", "rules_7", "rules_8", "rules_9"],
  //   validation: Yup.object().shape({
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
          nama_perseroan: Yup.string().required("Nama Perseroan wajib di isi"),
          voucher: Yup.string().required("Voucher wajib di isi"),
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
          nama_perseroan: Yup.string().required("Nama Perseroan wajib di isi"),
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
          nama_perseroan: Yup.string().required("Nama Perseroan wajib di isi"),
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
