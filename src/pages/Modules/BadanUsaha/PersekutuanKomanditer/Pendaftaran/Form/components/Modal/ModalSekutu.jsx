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

const ModalSekutu = ({
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

  const formatRupiah = (value) => {
    if (!value || isNaN(value)) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const parseRupiah = (value) => value.replace(/[^0-9]/g, "");

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
      <ModalBody
        style={{
          padding: "40px",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center gap-5">
          {/* Header */}
          <div className="d-flex flex-column align-items-center">
            <span className="fs-2">
              {editingIndex !== null ? "Edit Sekutu" : "Tambah Sekutu"}
            </span>
            <span style={{ color: "#888888" }}>
              Silakan isi data di bawah ini
            </span>
          </div>

          {/* Body */}
          <div ref={sectionRef} className="row g-3 w-100">
            <div className="col-6 d-flex flex-column gap-1">
              <label className="fw-medium">
                Nama Sekutu <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="namaSekutu"
                value={values.namaSekutu}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tulis Nama Sekutu"
                style={{ padding: "12px 16px", borderRadius: "8px" }}
              />
              <ErrorMessage
                name="namaSekutu"
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
                type="select"
                value={values.jabatan}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ padding: "12px 16px", borderRadius: "8px" }}
              >
                <option value="">Pilih Jabatan</option>
                <option value="aktif">Aktif</option>
                <option value="pasif">Pasif</option>
              </Input>
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

            <div className="col-6 d-flex flex-column gap-1">
              <label className="fw-medium">
                Kontribusi <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="kontribusi"
                type="select"
                value={values.kontribusi}
                onChange={(e) => {
                  const { value } = e.target;
                  handleChange(e);
                  if (value !== "barang") {
                    setFieldValue("namaBarang", "");
                  }
                }}
                onBlur={handleBlur}
                style={{ padding: "12px 16px", borderRadius: "8px" }}
              >
                <option value="">Pilih Kontribusi</option>
                <option value="uang">Uang</option>
                <option value="barang">Barang</option>
              </Input>

              <ErrorMessage
                name="kontribusi"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-6 d-flex flex-column gap-1">
              <label className="fw-medium">
                Nilai Kontribusi <span style={{ color: "red" }}>*</span>
              </label>
              <InputGroup>
                <InputGroupText style={{ borderRadius: "8px 0 0 8px" }}>
                  Rp
                </InputGroupText>
                <Input
                  name="nilaiKontribusi"
                  value={formatRupiah(values.nilaiKontribusi)}
                  onChange={(e) => {
                    const raw = parseRupiah(e.target.value);
                    setFieldValue(
                      "nilaiKontribusi",
                      raw ? parseFloat(raw) : ""
                    );
                  }}
                  onBlur={handleBlur}
                  placeholder="Tulis Jumlah Harga"
                  style={{ padding: "12px 16px", borderRadius: "0 8px 8px 0" }}
                />
              </InputGroup>
              <ErrorMessage
                name="nilaiKontribusi"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-6" />
            {values.kontribusi == "barang" && (
              <div className="col-6 d-flex flex-column gap-1">
                <label className="fw-medium">
                  Nama Barang <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  name="namaBarang"
                  value={values.namaBarang}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tulis Nama Barang"
                  style={{ padding: "12px 16px", borderRadius: "8px" }}
                />
                <ErrorMessage
                  name="namaBarang"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <div>
                <Input
                  type="checkbox"
                  name="setujuSekutu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.setujuSekutu}
                />
              </div>
              <div>
                <span>
                  Saya memahami bahwa sesuai Pasal 5 Undang-Undang No. 25 Tahun
                  2007 tentang Penanaman Modal, hanya Warga Negara Indonesia
                  (WNI) yang dapat menjadi sekutu.
                </span>
                <ErrorMessage
                  name="setujuSekutu"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
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

export default ModalSekutu;
