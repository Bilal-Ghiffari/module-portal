import LineDashed from "@/components/Common/Line/Dashed";
import { ErrorMessage } from "formik";
import { useRef, useState } from "react";
import { Label } from "reactstrap";
import { InputGroup, InputGroupText, Input } from "reactstrap";

const UnggahDokumen = ({ values, setFieldValue }) => {
  const fileInputRef = useRef();
  const fileInputRefFC = useRef();
  const [fileName, setFileName] = useState("");
  const [fileNameFC, setFileNameFC] = useState("");

  const handleFileChange = (e, fieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setFieldValue(fieldValue, file);
      if (fieldValue == "aktaPendiri") {
        setFileName(file.name);
      } else {
        setFileNameFC(file.name);
      }
    }
  };

  return (
    <section className="d-flex flex-column">
      <div
        className="mb-4"
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Unggah Dokumen</span>
      </div>

      <section>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, "aktaPendiri")}
        />
        <Label>
          Minuta Akta Pendiri <span className="text-danger">*</span>
        </Label>
        <InputGroup
          style={{
            border: "1px solid #E7E7E7",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <InputGroupText
            style={{
              backgroundColor: "#041662",
              color: "white",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <span className="mdi mdi-file-document-outline fs-2"></span>
          </InputGroupText>

          <Input
            readOnly
            onClick={() => fileInputRef.current.click()}
            placeholder="Unggah dokumen dengan klik untuk memilih file"
            value={fileName}
            style={{ padding: "12px 16px", cursor: "pointer", border: "none" }}
          />
        </InputGroup>
        <Label
          className="fw-normal mt-2"
          style={{ fontSize: "12px", color: "#6D6D6D" }}
        >
          *File harus berformat PDF dan berukuran tidak lebih dari 5MB
        </Label>

        <ErrorMessage
          name="aktaPendiri"
          component="div"
          className="text-danger mt-1"
        />
      </section>

      <LineDashed marginY={0} />

      <section style={{ marginBotton: "0px !important" }}>
        <input
          type="file"
          ref={fileInputRefFC}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, "fcKeteranganAlamat")}
        />
        <Label>
          Fotokopi Surat Keterangan Alamat Lengkap{" "}
          <span className="text-danger">*</span>
        </Label>
        <InputGroup
          style={{
            border: "1px solid #E7E7E7",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <InputGroupText
            style={{
              backgroundColor: "#041662",
              color: "white",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => fileInputRefFC.current.click()}
          >
            <span className="mdi mdi-file-document-outline fs-2"></span>
          </InputGroupText>

          <Input
            readOnly
            onClick={() => fileInputRefFC.current.click()}
            placeholder="Unggah dokumen dengan klik untuk memilih file"
            value={fileNameFC}
            style={{ padding: "12px 16px", cursor: "pointer", border: "none" }}
          />
        </InputGroup>
        <Label
          className="fw-normal mt-2"
          style={{ fontSize: "12px", color: "#6D6D6D" }}
        >
          *File harus berformat PDF dan berukuran tidak lebih dari 5MB
        </Label>

        <ErrorMessage
          name="fcKeteranganAlamat"
          component="div"
          className="text-danger mt-1"
        />
      </section>
    </section>
  );
};

export default UnggahDokumen;
