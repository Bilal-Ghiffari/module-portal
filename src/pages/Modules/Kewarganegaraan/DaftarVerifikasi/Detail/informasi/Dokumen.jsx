import { CustomButton } from "@/components/Common/Button";
import { Container } from "reactstrap";
import { FILE_TYPES } from "../helpers/type";
import { useState, useEffect } from "react";

// Mapping yang EKSAKT sesuai dengan backend response

const BACKEND_FIELD_MAPPING = {
  kutipanAktaLahirPemohon: {
    validField: "akta_lahir_pemohon_valid",
    catatanField: "catatan_akta_lahir_pemohon",
  },
  kutipanAktaPerkawinanAtauBukuNikah: {
    validField: "akta_kawin_pemohon_valid",
    catatanField: "catatan_akta_kawin_pemohon",
  },
  dokumenPernahWNI: {
    validField: "paspor_pemohon_valid",
    catatanField: "catatan_paspor_pemohon",
  },
  ktpAtauNIT: {
    validField: "ktp_pemohon_valid",
    catatanField: "catatan_ktp_pemohon",
  },
  suratPernyataanPenolakanWNA: {
    validField: "surat_menolak_wna_valid",
    catatanField: "catatan_surat_menolak_wna",
  },
  pasFoto: {
    validField: "pas_foto_valid",
    catatanField: "catatan_pas_foto",
  },
};

const generateFieldKeys = (fileKey) => {
  const mapping = BACKEND_FIELD_MAPPING[fileKey];

  if (!mapping) {
    console.warn(`No mapping found for fileKey: ${fileKey}`);
    return {
      validKey: `${fileKey}_valid`,
      catatanKey: `catatan_${fileKey}`,
    };
  }

  return {
    validKey: mapping.validField,
    catatanKey: mapping.catatanField,
  };
};

const DocumentVerificationItem = ({
  label,
  data,
  fileKey,
  verifikasiData,
  onUpdate,
}) => {
  const { validKey, catatanKey } = generateFieldKeys(fileKey);

  const handleViewDoc = () => {
    if (data?.url) {
      window.open(data.url, "_blank");
    }
  };

  const handleValidationClick = (isValid) => {
    onUpdate(validKey, isValid);
  };

  const handleNoteChange = (e) => {
    onUpdate(catatanKey, e.target.value || null);
  };

  const currentValid = verifikasiData[validKey];
  const currentNote = verifikasiData[catatanKey];

  return (
    <div className="border rounded p-3 mb-3">
      <h6 className="mb-2">{label}</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <CustomButton
              text="Lihat Dokumen"
              bgColor="transparent"
              textColor="#041662"
              border="1px solid #EfEfEf"
              onClick={handleViewDoc}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small text-muted">
              Status Validasi:
            </label>
            <div className="btn-group d-block" role="group">
              <button
                type="button"
                className={`btn btn-sm me-2 ${
                  currentValid === true ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => handleValidationClick(true)}
                style={{ minWidth: "80px" }}
              >
                ✓ Sesuai
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  currentValid === false ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => handleValidationClick(false)}
                style={{ minWidth: "100px" }}
              >
                ✗ Tidak Sesuai
              </button>
            </div>
          </div>

          {/* Debug info untuk memastikan mapping benar */}
          {/* {process.env.NODE_ENV === "development" && (
            <small className="text-muted d-block mt-1">
              Valid: {validKey} | Note: {catatanKey}
            </small>
          )} */}
        </div>

        <div className="col-md-6">
          <label className="form-label small text-muted">Catatan:</label>
          <textarea
            className="form-control"
            placeholder="Tulis catatan..."
            rows={4}
            value={currentNote || ""}
            onChange={handleNoteChange}
          />
        </div>
      </div>
    </div>
  );
};

const DokumenSection = ({ formik, onVerifikasiDataChange }) => {
  const files = formik.values.files || [];
  console.log("FORMIK", formik.values);

  const [verifikasiData, setVerifikasiData] = useState(() => {
    const initialData = {
      id_permohonan: formik.values.id_permohonan || null,
    };

    Object.keys(BACKEND_FIELD_MAPPING).forEach((fileKey) => {
      const { validKey, catatanKey } = generateFieldKeys(fileKey);
      initialData[validKey] = null;
      initialData[catatanKey] = null;
    });

    return initialData;
  });

  useEffect(() => {
    if (onVerifikasiDataChange) {
      onVerifikasiDataChange(verifikasiData);
    }
  }, [verifikasiData, onVerifikasiDataChange]);

  const fileTypeLabelMap = Object.entries(FILE_TYPES).reduce(
    (acc, [key, item]) => {
      acc[item.file_type] = { label: item.label, key };
      return acc;
    },
    {}
  );

  const latestFilesByType = Object.values(
    files
      .sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at))
      .reduce((acc, file) => {
        if (fileTypeLabelMap[file.file_type]) {
          if (!acc[file.file_type]) {
            acc[file.file_type] = file;
          }
        }
        return acc;
      }, {})
  );

  const handleUpdate = (key, value) => {
    setVerifikasiData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Container>
      {latestFilesByType.length === 0 && (
        <div className="alert alert-info">
          Tidak ada dokumen yang ditemukan untuk diverifikasi.
        </div>
      )}

      {latestFilesByType.map((file) => {
        const fileTypeInfo = fileTypeLabelMap[file.file_type];

        if (!fileTypeInfo) {
          return null;
        }

        const { key: fileKey, label } = fileTypeInfo;

        // Pastikan fileKey ada di mapping
        if (!BACKEND_FIELD_MAPPING[fileKey]) {
          console.warn(`FileKey ${fileKey} tidak ada di BACKEND_FIELD_MAPPING`);
          return null;
        }

        return (
          <DocumentVerificationItem
            key={file.id_file}
            data={file}
            label={label}
            fileKey={fileKey}
            verifikasiData={verifikasiData}
            onUpdate={handleUpdate}
          />
        );
      })}

      {/* Preview data untuk debugging */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="mt-4">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">
                Preview Data Verifikasi (Development Only)
              </h6>
            </div>
            <div className="card-body">
              <pre
                style={{
                  fontSize: "12px",
                  maxHeight: "300px",
                  overflow: "auto",
                }}
              >
                <code>{JSON.stringify(verifikasiData, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      )} */}
    </Container>
  );
};

export default DokumenSection;
