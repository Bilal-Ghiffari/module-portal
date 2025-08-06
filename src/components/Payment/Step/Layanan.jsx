import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { FormInput } from "@/components/Common/FormField";
import { CustomButton } from "@/components/Common/Button";
import { FaRegFilePdf } from "react-icons/fa";
import Voucher from "./Voucher";
import MetodePembayaran from "./MetodePembayaran";
import PembayaranVoucher from "./PembayaranVoucher";

const Layanan = ({ formik, label, description }) => {
  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row className="w-100" style={{ padding: "0px 10px" }}>
          <Col xs="12" className="mb-2 text-center">
            <h4
              className="fw-bold m-0 p-0"
              style={{ fontSize: "1rem", licolor: "#041662" }}
            >
              {label}
            </h4>
            <p style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>
              {description}
            </p>
            <hr className="mt-0 mb-3" />
          </Col>

          <>
            {label == "Pembelian Voucher" && (
              <>
                <Col xs="12" className="mb-2">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={"layanan"}
                    data={[]}
                    label="Sub layanan jasa hukum"
                    required
                  />
                </Col>

                <Col xs="12" className="mb-2">
                  <FormInput
                    formik={formik}
                    name="jumlah"
                    type="number"
                    placeholder="Jumlah Pembelian"
                    required
                  />
                </Col>
              </>
            )}
          </>
          <>
            {label == "Detail Voucher" && (
              <>
                <Col xs="12" className="mb-2">
                  <Voucher />
                </Col>
              </>
            )}
          </>
          <>
            {label == "Metode Pembayaran" && (
              <>
                <Col xs="12" className="mb-2">
                  <MetodePembayaran formik={formik} />
                </Col>
              </>
            )}
          </>
          <>
            {label == "Pembayaran Voucher" && (
              <>
                <Col xs="12" className="mb-2">
                  <PembayaranVoucher formik={formik} />
                </Col>
              </>
            )}
          </>
        </Row>
      </div>
    </div>
  );
};

export default Layanan;
