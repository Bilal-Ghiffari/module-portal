import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormInput } from "@/components/Common/FormField";
import PopupPayment from "@/components/Payment/PopupPayment";
import { FaArrowRight } from "react-icons/fa";

const OnBoardingPendaftaran = ({ formik, setActiveStep, label }) => {
  const [checkMessage, setCheckMessage] = useState("");
  const [isVoucherValid, setIsVoucherValid] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("");

  function handleCheckAndRedirect() {
    // const voucher = formik.values.voucher?.trim() || "";
    // const validVouchers = ["VOUCHER123", "PROMO2025", "FREE100"];

    // const isValid = validVouchers.includes(voucher);

    // if (!voucher) {
    //   setIsVoucherValid(false);
    //   setVoucherMessage("Voucher tidak boleh kosong.");
    // } else if (isValid) {
    //   setIsVoucherValid(true);
    //   setVoucherMessage("Voucher valid!");

    //   // hanya redirect jika nama perseroan sudah tersedia
    //   if (isAvailable) {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   } else {
    //     setVoucherMessage("Nama perseroan belum dicek atau tidak tersedia.");
    //   }
    // } else {
    //   setIsVoucherValid(false);
    //   setVoucherMessage("Voucher tidak valid.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  // RESET message saat nama perseroan berubah
  useEffect(() => {
    setCheckMessage("");
  }, [formik.values.nama_perseroan]);

  useEffect(() => {
    setVoucherMessage("");
    setIsVoucherValid(false);
  }, [formik.values.voucher]);

  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row className="w-100">
          <Col xs="12">
            <Row
              className="w-100"
              style={{ maxWidth: "800px", padding: "0px 50px" }}
            >
              <Col xs="12" className="mb-2">
                <h4 className="fw-bold" style={{ color: "#041662" }}>
                  {label}
                </h4>
                <hr className="mt-0 mb-3" />
              </Col>
              <Col xs="12" className="mb-2">
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Anda akan memulai proses {label}. Pastikan Anda telah
                  menyiapkan dokumen dan informasi yang dibutuhkan sebelum
                  melanjutkan.
                </p>
              </Col>
            </Row>
          </Col>

          <Col xs="12" className="">
            <Row
              className="w-100"
              style={{ maxWidth: "800px", padding: "0px 50px" }}
            >
              <Col xs="12" className="mb-4">
                <FormInput
                  formik={formik}
                  name="voucher"
                  title="Kode Voucher"
                  placeholder={`Untuk melanjutkan, Anda perlu memasukkan kode voucher ${label} terlebih dahulu.`}
                  // readonly={formik.values?.nama_perseroan?.trim().length < 3}
                  readonly
                  fontSize="0.85rem"
                  required
                />
              </Col>

              <Col xs="12" className="mb-3">
                <p className="mb-2" style={{ fontSize: "0.95rem" }}>
                  Jika Anda belum memiliki kode voucher, silakan melakukan
                  pembelian melalui layanan SIMPADHU pada tautan berikut:
                </p>
                <PopupPayment />
                {voucherMessage && (
                  <small
                    style={{
                      color: "red",
                      marginTop: "4px",
                      display: "block",
                      fontSize: "0.85rem",
                    }}
                  >
                    {voucherMessage}
                  </small>
                )}
              </Col>
              <Col xs="12" className="mb-4">
                <button
                  onClick={handleCheckAndRedirect}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#041662",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  <span>Mulai Pendaftaran</span> <FaArrowRight size={10} />
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPendaftaran;
