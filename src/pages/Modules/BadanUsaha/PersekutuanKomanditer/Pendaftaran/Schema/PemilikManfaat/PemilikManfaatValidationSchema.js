import * as Yup from "yup";

const PemilikManfaatValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nama lengkap wajib diisi"),
  kewarganegaraan: Yup.string().required("Kewarganegaraan wajib dipilih"),
  tempatLahir: Yup.string().required("Tempat lahir wajib diisi"),
  tglLahir: Yup.date()
    .required("Tanggal lahir wajib diisi")
    .typeError("Tanggal lahir tidak valid"),

  jenisIdentitas: Yup.string().required("Jenis identitas wajib diisi"),

  nomorIdentitas: Yup.string()
    .required("Nomor identitas wajib diisi")
    .when("jenisIdentitas", {
      is: (val) => val !== "paspor",
      then: (schema) =>
        schema.matches(/^\d+$/, "Nomor identitas harus berupa angka"),
      otherwise: (schema) => schema,
    }),

  alamat: Yup.string().required("Alamat wajib diisi"),
  hubungan: Yup.string().required("Hubungan dengan korporasi wajib diisi"),

  // Validasi untuk WNI
  provinsi: Yup.string().when("kewarganegaraan", {
    is: "wni",
    then: (schema) => schema.required("Provinsi wajib dipilih"),
    otherwise: (schema) => schema.notRequired(),
  }),
  kotakab: Yup.string().when("kewarganegaraan", {
    is: "wni",
    then: (schema) => schema.required("Kabupaten/Kota wajib dipilih"),
    otherwise: (schema) => schema.notRequired(),
  }),
  kecamatan: Yup.string().when("kewarganegaraan", {
    is: "wni",
    then: (schema) => schema.required("Kecamatan wajib dipilih"),
    otherwise: (schema) => schema.notRequired(),
  }),
  kelurahan: Yup.string().when("kewarganegaraan", {
    is: "wni",
    then: (schema) => schema.required("Kelurahan wajib dipilih"),
    otherwise: (schema) => schema.notRequired(),
  }),
  rt: Yup.number()
    .typeError("RT harus berupa angka")
    .when("kewarganegaraan", {
      is: "wni",
      then: (schema) => schema.required("RT wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
  rw: Yup.number()
    .typeError("RW harus berupa angka")
    .when("kewarganegaraan", {
      is: "wni",
      then: (schema) => schema.required("RW wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
  kodePos: Yup.number()
    .typeError("Kode Pos harus berupa angka")
    .when("kewarganegaraan", {
      is: "wni",
      then: (schema) => schema.required("Kode Pos wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),

  // Validasi untuk WNA
  negaraAsal: Yup.string().when("kewarganegaraan", {
    is: "wna",
    then: (schema) => schema.required("Negara asal wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),

  nomorNPWP: Yup.string()
    .min(15, "NPWP minimal 15 digit")
    .max(16, "NPWP maksimal 16 digit")
    .required("Nomor NPWP wajib diisi"),

  kriteria: Yup.array()
    .min(1, "Minimal satu pilihan harus dipilih")
    .test(
      "exclusive-groups",
      "Pilih hanya dari grup 1-2 *atau* grup 3-4-5",
      (value) => {
        const group1 = ["1", "2"];
        const group2 = ["3", "4", "5"];

        const hasGroup1 = value.some((v) => group1.includes(v));
        const hasGroup2 = value.some((v) => group2.includes(v));

        return !(hasGroup1 && hasGroup2);
      }
    ),
});

export default PemilikManfaatValidationSchema;
