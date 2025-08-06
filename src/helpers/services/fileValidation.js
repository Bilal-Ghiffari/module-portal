import * as Yup from "yup";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 5MB

// Updated validation for upload flow
export const uploadedFileValidation = Yup.mixed()
  .required("File wajib diunggah")
  .test(
    "file-uploaded",
    "File wajib diupload terlebih dahulu",
    function (value) {
      console.log("🔍 Yup validation - uploadedFileValidation:", {
        value,
        type: typeof value,
        isFile: value instanceof File,
        isObject: value && typeof value === "object",
        hasId: value && value.id,
        hasUrl: value && value.url,
      });

      if (!value) {
        console.log("❌ Yup: No value");
        return false;
      }

      // Jika value adalah File object (belum diupload) - FAIL validation
      if (value instanceof File) {
        console.log("❌ Yup: File not uploaded yet");
        return this.createError({
          message: "File belum diupload, silakan klik tombol upload",
        });
      }

      // Jika value adalah response object dari upload (sudah diupload) - PASS
      if (
        value &&
        typeof value === "object" &&
        (value.id || value.url || value.file_path)
      ) {
        console.log("✅ Yup: File uploaded successfully");
        return true;
      }

      // Jika value adalah string URL - PASS
      if (value && typeof value === "string") {
        console.log("✅ Yup: String URL found");
        return true;
      }

      console.log("❌ Yup: Invalid value type");
      return false;
    }
  );

// Legacy PDF validation (jika masih digunakan di tempat lain)
export const pdfValidation = Yup.mixed()
  .required("File wajib diunggah")
  .test("fileSize", "Ukuran file maksimal 5MB", (value) => {
    // Skip size validation untuk uploaded files
    if (value && typeof value === "object" && !(value instanceof File)) {
      return true;
    }
    // Only validate size for File objects
    return value && value.size <= MAX_FILE_SIZE;
  })
  .test("fileFormat", "Format file harus PDF", (value) => {
    // Skip format validation untuk uploaded files
    if (value && typeof value === "object" && !(value instanceof File)) {
      return true;
    }
    // Only validate format for File objects
    return value && value.type === "application/pdf";
  });

export const imageValidation = Yup.mixed()
  .required("Foto wajib diunggah")
  .test("fileSize", "Ukuran foto maksimal 5MB", (value) => {
    // Skip size validation untuk uploaded files
    if (value && typeof value === "object" && !(value instanceof File)) {
      return true;
    }
    return value && value.size <= MAX_FILE_SIZE;
  })
  .test("fileFormat", "Format foto harus JPG/PNG", (value) => {
    // Skip format validation untuk uploaded files
    if (value && typeof value === "object" && !(value instanceof File)) {
      return true;
    }
    return (
      value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    );
  });

export const fileValidationSchema = (
  name,
  required = true,
  acceptedTypes = ["application/pdf"],
  maxSizeMB = 1
) => {
  let schema = Yup.mixed();

  if (required) {
    schema = schema.required(`${name} wajib diunggah`);
  } else {
    schema = schema.nullable();
  }

  // Size validation - only for File objects
  schema = schema.test(
    "fileSize",
    `Ukuran file tidak boleh lebih dari ${maxSizeMB}MB.`,
    (value) => {
      if (!value) return true;

      // Skip validation for uploaded files (object response)
      if (value && typeof value === "object" && !(value instanceof File)) {
        return true;
      }

      // Only validate File objects
      if (value instanceof File) {
        return value.size <= maxSizeMB * 1024 * 1024;
      }

      return true;
    }
  );

  // Type validation - only for File objects
  schema = schema.test(
    "fileType",
    `Tipe file tidak valid. Harap unggah ${acceptedTypes
      .map((type) => type.split("/")[1].toUpperCase())
      .join(", ")}.`,
    (value) => {
      if (!value) return true;

      // Skip validation for uploaded files (object response)
      if (value && typeof value === "object" && !(value instanceof File)) {
        return true;
      }

      // Only validate File objects
      if (value instanceof File) {
        return acceptedTypes.includes(value.type);
      }

      return true;
    }
  );

  return schema;
};

export const conditionalPdfValidation = (
  fieldName,
  expectedValue,
  errorMessage = "File wajib diunggah"
) => {
  return Yup.mixed().when(fieldName, {
    is: (val) =>
      Array.isArray(expectedValue)
        ? expectedValue.includes(val)
        : val === expectedValue,
    then: (schema) =>
      schema
        .required(errorMessage)
        .test("fileSize", "Ukuran file maksimal 5MB", (value) => {
          if (value && typeof value === "object" && !(value instanceof File)) {
            return true;
          }
          return value && value.size <= 5 * 1024 * 1024;
        })
        .test("fileFormat", "Format file harus PDF", (value) => {
          if (value && typeof value === "object" && !(value instanceof File)) {
            return true;
          }
          return value && value.type === "application/pdf";
        }),
    otherwise: (schema) => schema.notRequired().nullable(),
  });
};
