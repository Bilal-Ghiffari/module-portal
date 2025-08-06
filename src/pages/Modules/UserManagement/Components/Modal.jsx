import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input } from "reactstrap";

export default function ModalUsman(props) {
  return (
    <div>
      <Modal
        isOpen={props.modalBackdrop}
        centered
        toggle={() => {
          props.modalPopup();
        }}
        backdrop={"static"}
        id="staticBackdrop"
      >
        <ModalHeader
          toggle={() => {
            props.modalPopup();
          }}
        >
          {" "}
          <div className={`d-flex align-items-center ${props.valid?.valid ? "text-danger": "text-success"}`}>
            <i className="bx bx-help-circle fa-2x me-3"></i>
            <h4 className="mb-0 fw-semibold">{props.valid?.valid ? "Nonaktifkan Data": "Pengaktifan Data"} </h4>{" "}
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-muted fs-5 fw-semibold">Apakah Anda yakin ingin {props.valid?.valid ? "Nonaktifkan Data": "Pengaktifan Data"} Berikut?</p>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end gap-3">
            <div>
              <Button
                type="button"
                color="secondary"
                onClick={() => {
                  props.modalPopup();
                }}
                style={{ minWidth: "100px", maxWidth: "100px", width: "100px" }}
              >
                Tidak
              </Button>
            </div>
            <div>
              <Button type="button" color="primary" onClick={() => props.approve()} style={{ minWidth: "100px", maxWidth: "100px", width: "100px" }}>
                Ya
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
