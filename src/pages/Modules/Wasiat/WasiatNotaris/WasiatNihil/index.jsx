import { useState } from "react";
import { Input, Row, Col } from "reactstrap";
import { FaArrowRight } from "react-icons/fa";
import { CustomButton } from "@/components/Common/Button";
import { FormInput } from "@/components/Common/FormField";

const OnBoardingPermohonanWasiatNihil = () => {
  const [voucher, setVoucher] = useState("");

  const handleRedirect = () => {};

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
              Pelaporan Wasiat Nihil
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
              Pelaporan wasiat nihil berarti menyatakan bahwa tidak ada akta
              wasiat yang diterbitkan dalam periode tertentu.
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
              Anda akan melaporkan tidak adanya akta wasiat untuk periode ini.
            </p>
            <p
              style={{
                color: "#5D5D5D",
                fontSize: "14px",
                lineHeight: "26px",
                fontWeight: 500,
              }}
            >
              Apakah anda yakin ingin melaporkan laporan wasiat nihil?
            </p>
            <CustomButton
              bgColor="#041662"
              textColor="#fff"
              hoverColor="#041992"
              text={"Lanjutkan Pelaporan"}
              rightIcon={<FaArrowRight />}
              onClick={handleRedirect}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPermohonanWasiatNihil;
