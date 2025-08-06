import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropTypes from "prop-types";

const ModalsComponent = (props) => {
  const { modalBackdrop, modalPopup, modalPreview, text } = props;
  return (
    <Modal
      isOpen={modalBackdrop}
      toggle={() => {
        modalPopup();
      }}
      backdrop={"static"}
      id="staticBackdrop"
    >
      <ModalHeader
        toggle={() => {
          modalPopup();
        }}
      >
        <span className="text-secondary mb-0 fs-4">Simpan Perubahan?</span>
      </ModalHeader>
      <ModalBody>
        <p>
          Jika anda yakin akan menyimpan perubahan, pilih tombol <strong>Simpan.</strong> Jika anda ingin kembali melakukan perubahan data, pilih tombol <strong>Tutup.</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        {/* <Button
          type="button"
          color="success"
          onClick={() => {
            modalPreview();
          }}
        >
          Preview
        </Button> */}
        <div className="d-flex gap-3">
          <Button
            type="button"
            color="light"
            onClick={() => {
              modalPopup();
            }}
          >
            Tutup
          </Button>
          <Button type="button" color="primary" onClick={() => props.approve()}>
            {text || "Simpan"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

ModalsComponent.propTypes = {
  modalBackdrop: PropTypes.bool,
  modalPopup: PropTypes.func,
  modalPreview: PropTypes.func,
  approve: PropTypes.func,
  text: PropTypes.string,
};

export default ModalsComponent;
