import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight } from "react-icons/fa";
import DaftarPerseroan from "./DaftarPerseroan";
import { FormInput } from "@/components/Common/FormField";
import PopupPayment from "@/components/Payment/PopupPayment";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { dummyNamaPerseroan } from "../../mock";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { apiGetListPerseroanPeroranganByUser } from "@/helpers/backend_helper";
import { getUser } from "@/helpers/services/generateOptions";
import { transformData } from "@/helpers/services/convert";

const OnBoardingPendaftaran = ({
  formik,
  setActiveStep,
  activeStep,
  label,
  showPerseroan = false,
  showVoucher = false,
  isAvailable,
  setIsAvailable,
}) => {
  const [checkMessage, setCheckMessage] = useState("");
  const [isVoucherValid, setIsVoucherValid] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("");
  const user = getUser();

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

  function handleCek() {
    const nama = formik.values.nama_perseroan?.trim() || "";
    const existingNames = [
      "Maju Jaya",
      "Sukses Selalu",
      "Berkah Abadi",
      "Karya Bersama",
    ];

    const isNameTaken = existingNames.some(
      (existing) => existing.toLowerCase() === nama.toLowerCase()
    );

    if (!nama) {
      setIsAvailable(false);
      setCheckMessage("Nama perseroan tidak boleh kosong.");
    } else if (isNameTaken) {
      setIsAvailable(false);
      setCheckMessage("Nama perseroan sudah digunakan, coba nama lain.");
    } else {
      setIsAvailable(true);
      setCheckMessage("Nama perseroan tersedia!");
    }
  }

  // RESET message saat nama perseroan berubah
  useEffect(() => {
    setCheckMessage("");
    setIsAvailable(false);
  }, [formik.values.nama_perseroan]);

  useEffect(() => {
    setVoucherMessage("");
    setIsVoucherValid(false);
  }, [formik.values.voucher]);

  const [data, setData] = useState([]);
  const toastifyService = new ToastifyService();

  useEffect(() => {
    if (label !== "Pendaftaran Pendirian" && user.id) {
      fetchData();
    }
  }, [label, user?.id]);

  const fetchData = () => {
    toastifyService.showLoading();
    apiGetListPerseroanPeroranganByUser(user.id)
      .then((res) => {
        const transform = transformData(res, {
          value: "id",
          label: "nama_perseroan",
        });
        setData(transform);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        toastifyService.close(); // panggil fungsinya
      });
  };

  const showVoucherSection =
    (label === "Pendaftaran Pendirian" && activeStep === 1) ||
    label !== "Pendaftaran Pendirian";

  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row className="w-100">
          {activeStep == 0 && (
            <Col xs="12">
              <Row
                className="w-100"
                style={{ maxWidth: "800px", padding: "0px 50px" }}
              >
                <Col xs="12" className="mb-2">
                  <h4 className="fw-bold" style={{ color: "#041662" }}>
                    {label} Perseroan Perorangan
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

                {label == "Pendaftaran Pendirian" && (
                  <Col xs="12" className="mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="w-75">
                        <FormInput
                          formik={formik}
                          name="nama_perseroan"
                          title="Nama Perseroan yang Anda inginkan"
                          placeholder="Silahkan masukkan nama perseroan yang Anda inginkan"
                          fontSize="0.85rem"
                          required
                        />
                      </div>
                      <button
                        onClick={handleCek}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: "#041662",
                          color: "#fff",
                          border: "none",
                          padding: "9px 16px",
                          borderRadius: "5px",
                          fontSize: "14px",
                          cursor: "pointer",
                          marginTop: "8px",
                        }}
                      >
                        <span>Cek Nama</span>
                      </button>
                    </div>
                    {checkMessage && formik.values.nama_perseroan?.trim() && (
                      <small
                        style={{
                          color: isAvailable ? "green" : "red",
                          display: "block",
                          fontSize: "0.85rem",
                        }}
                      >
                        {checkMessage}
                      </small>
                    )}
                  </Col>
                )}
              </Row>

              {isAvailable && (
                <Col xs="12" className="mb-4">
                  <DaftarPerseroan formik={formik} />
                </Col>
              )}
            </Col>
          )}

          {showVoucherSection && (
            <Col xs="12" className="">
              <Row
                className="w-100"
                style={{ maxWidth: "800px", padding: "0px 50px" }}
              >
                <Col xs="12" className="mb-4">
                  {label == "Pendaftaran Pendirian" ? (
                    <FormInput
                      formik={formik}
                      name="nama_perseroan"
                      placeholder="Nama Perseroan Anda"
                      readonly={label == "Pendaftaran Pendirian" ? true : false}
                      fontSize="0.85rem"
                    />
                  ) : (
                    <DynamicDropdown
                      formik={formik}
                      fieldName={"nama_perseroan"}
                      data={data}
                      label="Pilih Nama Perseroan yang Anda inginkan"
                      required={true}
                    />
                  )}
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
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPendaftaran;
