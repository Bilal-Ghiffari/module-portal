import { Modal, ModalBody, Button } from "reactstrap";

const ModalPreview = ({ isOpen, toggle, onSubmit, values }) => {
  const handleToggle = () => {
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered size="md">
      <ModalBody style={{ padding: "40px" }}>
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          {/* Header */}
          <div className="d-flex flex-column align-items-center">
            <span className="fs-2">Konfirmasi Data</span>
            <span style={{ color: "#888888" }}>
              Silakan periksa data sebelum melanjutkan
            </span>
          </div>

          {/* Body */}
          <div className="row g-2 w-100">
            <div className="col-6">Nama CV yang diajukan</div>
            <div className="col-6">: {values?.namaCV}</div>
            <div className="col-6">Singkatan CV</div>
            <div className="col-6">: {values?.singkatanCV}</div>
            <div className="col-6">Nama Pemohon</div>
            <div className="col-6">: {values?.namaPemohon}</div>
            <div className="col-6">Email</div>
            <div className="col-6">: {values?.email}</div>
            <div className="col-6">Telepon</div>
            <div className="col-6">: {values?.telepon}</div>
          </div>

          {/* Footer */}
          <div className="d-flex gap-2 mt-4">
            <Button
              color="secondary"
              onClick={handleToggle}
              style={{ width: "150px", height: "40px" }}
            >
              Kembali
            </Button>
            <Button
              color="primary"
              onClick={onSubmit}
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

export default ModalPreview;
