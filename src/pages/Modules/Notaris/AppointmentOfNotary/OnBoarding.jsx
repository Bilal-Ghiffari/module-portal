import { useState } from "react";
import { Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const OnBoardingRegistry = () => {
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState("");

  function handleRedirect() {
    navigate("/notaris/pengangkatan-notaris/pendaftaran/form-pendaftaran");
  }

  return (
    <div className="page-content  px-2 mb-3">
      <div className="card-body-onboarding d-flex flex-column">
        <Row className="">
          <Col lg="10">
            <h4
              className="card-body-onboarding-title"
              // style={{ color: "#041662", fontWeight: "500" }}
            >
              Pendaftaran Pengangkatan Notaris
            </h4>
            <hr className="card-body-onboarding-hr" />
          </Col>
        </Row>
        <Row className="">
          <Col lg="10">
            <p className="card-body-onboarding-subtitle">
              Anda akan memulai proses pendaftaran pengangkatan notaris secara
              online.
              <br />
              Pastikan Anda telah menyiapkan dokumen dan informasi yang
              dibutuhkan sebelum melanjutkan.
            </p>
          </Col>
        </Row>
        <Row className="">
          <Col lg="10">
            <p className="card-body-onboarding-subtitle">
              Untuk melanjutkan, Anda perlu memasukkan kode voucher permohonan
              akses terlebih dahulu.
            </p>
            <Input
              type="text"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              placeholder="Tulis Kode Voucher Anda Di Sini"
              className="mt-2 card-body-onboarding-input"
              // style={{
              //   border: "none",
              //   boxShadow: "none",
              //   outline: "none",
              //   fontSize: 14,
              //   backgroundColor: "#E7E7E7",
              // }}
            />
          </Col>
        </Row>
        <Row className="">
          <Col lg="10">
            <p className="card-body-onboarding-subtitle">
              Jika Anda belum memiliki kode voucher, silakan melakukan pembelian
              melalui layanan SIMPADHU pada tautan berikut:
            </p>
            <a
              href="https://simpadhu.example.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                color: "#041662",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              <u>Beli Voucher di SIMPADHU</u>
            </a>
            <div className="mt-4">
              <Button
                onClick={handleRedirect}
                sx={{
                  mr: 1,
                  backgroundColor: "#041662",
                  color: "#fff",
                  border: "1px solid grey",
                  px: 2,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#041992",
                    color: "#fff",
                  },
                  textTransform: "lowercase",
                }}
              >
                <span className="me-2">Mulai Pendaftaran</span> <FaArrowRight />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingRegistry;
