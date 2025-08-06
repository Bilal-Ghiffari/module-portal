import { ErrorMessage } from "formik";
import { useRef } from "react";
import {
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  Button,
} from "reactstrap";
import { NumberInput } from "../Fields/NumberInput";

const ModalPengurus = ({
  isOpen,
  toggle,
  onSubmit,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  resetForm,
  editingIndex,
}) => {
  const sectionRef = useRef();

  const handleToggle = () => {
    toggle();
    resetForm();
  };

  const scrollTop = () => {
    const element = sectionRef.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered size="lg">
      <ModalBody style={{ padding: "40px" }}>
        <div className="d-flex flex-column justify-content-center align-items-center gap-5">
          {/* Header */}
          <div className="d-flex flex-column align-items-center">
            <span className="fs-2">
              {editingIndex !== null ? "Edit Pengurus" : "Tambah Pengurus"}
            </span>
            <span style={{ color: "#888888" }}>
              Silakan isi data di bawah ini
            </span>
          </div>

          {/* Body */}
          <div ref={sectionRef} className="row g-3 w-100">
            <div className="col-6 d-flex flex-column gap-1">
              <label className="fw-medium">
                Nama Pengurus <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="namaPengurus"
                value={values.namaPengurus}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tulis Nama Pengurus"
                style={{ padding: "12px 16px", borderRadius: "8px" }}
              />
              <ErrorMessage
                name="namaPengurus"
                component="div"
                className="text-danger"
              />
            </div>

            <NumberInput
              name="nik"
              label="NIK"
              value={values.nik}
              onChange={handleChange}
              onBlur={handleBlur}
              col={6}
              type="text"
              maxLength={16}
            />

            <div className="col-6 d-flex flex-column gap-1">
              <label className="fw-medium">
                Jabatan <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="jabatan"
                value={values.jabatan}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ padding: "12px 16px", borderRadius: "8px" }}
                disabled
              ></Input>
              <ErrorMessage
                name="jabatan"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-6 d-flex flex-column gap-1">
              <label className="fw-medium">
                Pekerjaan <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="pekerjaan"
                value={values.pekerjaan}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tulis Pekerjaan"
                style={{ padding: "12px 16px", borderRadius: "8px" }}
              />
              <ErrorMessage
                name="pekerjaan"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-12 d-flex flex-column gap-1">
              <label className="fw-medium">
                Alamat Domisili <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="alamatDomisili"
                value={values.alamatDomisili}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tulis Alamat Domisili"
                style={{ padding: "12px 16px", borderRadius: "8px" }}
              />
              <ErrorMessage
                name="alamatDomisili"
                component="div"
                className="text-danger"
              />
            </div>

            <NumberInput
              name="nomorNPWP"
              label="Nomor NPWP"
              value={values.nomorNPWP}
              onChange={handleChange}
              onBlur={handleBlur}
              col={12}
              type="text"
              maxLength={16}
            />
          </div>

          {/* Footer */}
          <div className="d-flex gap-2">
            <Button
              color="secondary"
              onClick={handleToggle}
              style={{ width: "150px", height: "40px" }}
            >
              Kembali
            </Button>
            <Button
              color="primary"
              onClick={() => {
                scrollTop();
                onSubmit();
              }}
              style={{ width: "150px", height: "40px" }}
            >
              Simpan
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalPengurus;
