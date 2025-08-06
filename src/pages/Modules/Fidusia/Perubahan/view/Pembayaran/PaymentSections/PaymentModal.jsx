import React from 'react';
import { Modal } from 'react-bootstrap';
import PaymentSection from './index';

const PaymentModal = ({ show, handleClose, formik, handlePayment }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-90w" // Use this to increase modal width
      aria-labelledby="payment-method-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="payment-method-modal">
          Pilih Metode Pembayaran
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PaymentSection
          formik={formik}
          onHandlePayment={handlePayment}
          onHandleClose={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
