import { useState } from "react";
import { Input, Row, Col } from "reactstrap";
import { FaArrowRight } from "react-icons/fa";
import { CustomButton } from "@/components/Common/Button";
import CouponPemulihanWni from "./ReedemCoupon";
import { FormInput } from "@/components/Common/FormField";

const OnBoardingPendaftaran = ({ formik, setActiveStep, label }) => {
  const handleRedirect = () => {
    if (!formik.errors.voucher && formik.values.voucher) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      formik.setFieldTouched("voucher", true);
    }
  };
  return (
    <div
      className="page-content d-flex justify-content-center align-items-center px-2 mb-3"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="d-flex flex-column w-100" style={{ maxWidth: 800 }}>
        {/* Judul */}
        <Row className="justify-content-center mb-2">
          <Col lg="10">
            <h4
              style={{
                color: "#041662",
                fontWeight: 500,
                fontSize: "28px",
                lineHeight: "52px",
              }}
            >
              Permohonan Surat Keterangan Kehilangan Kewarganegaraan RI Atas
              Kemauan Sendiri Bagi Orang Yang Telah Memperoleh Kewarganegaraan
              Asing
            </h4>
            <hr />
          </Col>
        </Row>

        {/* Deskripsi */}
        <Row className="justify-content-center mb-2">
          <Col lg="10">
            <p
              style={{
                color: "#5D5D5D",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "26px",
              }}
            >
              Anda akan memulai proses permohonan surat keterangan kehilangan
              kewarganegaraan RI atas kemauan sendiri bagi orang yang telah
              memperoleh kewarganegaraan asing. Pastikan Anda telah menyiapkan
              dokumen dan informasi yang dibutuhkan sebelum melanjutkan.
            </p>
          </Col>
        </Row>

        {/* Input Voucher */}
        <Row className="justify-content-center mb-2">
          <Col lg="10">
            <p
              style={{
                color: "#5D5D5D",
                fontSize: "14px",
                lineHeight: "26px",
                fontWeight: 500,
              }}
            >
              Untuk melanjutkan, Anda perlu memasukkan kode voucher pendaftaran
              terlebih dahulu.
            </p>
            <FormInput
              formik={formik}
              type="text"
              name="voucher"
              placeholder="Tulis Kode Voucher Anda Di Sini"
              className="mt-2 form-field-input"
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg="10">
            <p
              style={{
                color: "#5D5D5D",
                fontSize: "14px",
                lineHeight: "26px",
                fontWeight: 500,
              }}
            >
              Jika Anda belum memiliki kode voucher, silakan melakukan pembelian
              melalui layanan SIMPADHU pada tautan berikut:
            </p>
            <CouponPemulihanWni />
          </Col>
        </Row>

        {/* Tombol Mulai Pendaftaran */}
        <Row className="justify-content-center">
          <Col lg="10">
            <CustomButton
              bgColor="#041662"
              textColor="#fff"
              hoverColor="#041992"
              text={"Mulai Pendaftaran"}
              rightIcon={<FaArrowRight />}
              onClick={handleRedirect}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPendaftaran;
