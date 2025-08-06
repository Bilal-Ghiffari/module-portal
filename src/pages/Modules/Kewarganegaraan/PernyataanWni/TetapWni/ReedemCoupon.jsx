import React, { useState } from "react";
import Button from "@mui/material/Button";
import AlertDialog from "@/components/Common/CustomDialog";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { Form, Row, Col } from "reactstrap";
import { FormInput, FormSelect } from "@/components/Common/FormField";
import { useFormik } from "formik";
import pdfImage from "@/assets/images/image 34.png";
import { ArrowForward, SaveAlt } from "@mui/icons-material";
import { CustomButton } from "@/components/Common/Button";
import { couponSchema } from "../schemas/coupon";

export default function CouponTetapWni() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleOpen = () => {
    setOpen(true);
    setStep(1);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  const subLayananOptions = [
    {
      label: "Pewarganegaraan berdasarkan perkawinan campuran",
      value: "Pewarganegaraan berdasarkan perkawinan campuran",
    },
  ];

  const validationCoupon = useFormik({
    enableReinitialize: true,
    initialValues: {
      jumlahPembelian: 1,
      subLayanan: "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      setStep(2);
    },
  });

  const renderContent = () => {
    if (step === 1) {
      return (
        <Form onSubmit={validationCoupon.handleSubmit}>
          <Row>
            <Col xs="12">
              <FormInput
                formik={validationCoupon}
                name="jumlahPembelian"
                placeholder="Tulis jumlah pembelian"
                required
                type="number"
                readonly
              />
            </Col>
            <Col xs="12">
              <FormSelect
                formik={validationCoupon}
                name="subLayanan"
                placeholder="Pilih sub layanan jasa hukum"
                options={subLayananOptions}
                required
              />
            </Col>
          </Row>
        </Form>
      );
    } else if (step === 2) {
      return (
        <Form>
          <Row>
            <Col xs="12">
              <div>
                <img
                  src={pdfImage}
                  alt="Panduan Pembayaran"
                  style={{ maxWidth: "100%", margin: "16px 0" }}
                />
                <CustomButton
                  onClick={validationCoupon.handleSubmit}
                  text={"Download"}
                  leftIcon={<SaveAlt />}
                  textColor="#041662"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  hoverColor="#041992"
                />

                <p
                  style={{
                    color: "#6D6D6D",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Apabila telah melakukan pembayaran tetapi status pembayaran
                  "belum bayar", Anda dapat melakukan konfirmasi pembayaran pada
                  menu konfirmasi pembayaran.
                </p>

                <p
                  style={{
                    color: "#6D6D6D",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Apabila masih terdapat kendala terkait pembayaran PNBP, Anda
                  dapat melakukan konsultasi pada menu Konsultasi Pembayaran.
                </p>
                <p
                  style={{
                    color: "#6D6D6D",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Untuk panduan cara pembayaran dapat diakses pada link berikut.
                </p>
              </div>
            </Col>
          </Row>
        </Form>
      );
    } else {
      return null;
    }
  };

  const renderActions = () => {
    if (step === 1) {
      return (
        <>
          <CustomButton
            text={"Kembali"}
            onClick={handleClose}
            textColor="#041662"
            bgColor="transparent"
            border="1px solid #E7E7E7"
          />
          <CustomButton
            text={"Selanjutnya"}
            rightIcon={<FaArrowRight />}
            onClick={validationCoupon.handleSubmit}
            bgColor="#041662"
            textColor="#fff"
            hoverColor="#041992"
          />
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <CustomButton
            text={"Sebelumnya"}
            onClick={() => setStep(1)}
            textColor="#041662"
            bgColor="transparent"
            border="1px solid #E7E7E7"
            hoverColor="#041992"
          />
          <CustomButton
            onClick={() => handleClose()}
            text={"Selanjutnya"}
            rightIcon={<ArrowForward />}
          />
        </>
      );
    }
  };

  return (
    <>
      <Button
        style={{
          textDecoration: "underline",
          color: "#041662",
          fontWeight: 500,
          fontSize: "14px",
          fontFamily: "Poppins",
          textTransform: "initial",
        }}
        onClick={handleOpen}
      >
        Beli Voucher di SIMPADHU
      </Button>

      <AlertDialog
        open={open}
        onClose={handleClose}
        title={"Pembelian Voucher"}
        description={
          step === 1
            ? "Silahkan pilih layanan yang anda inginkan"
            : "Berikut adalah bukti pemesanan voucher anda"
        }
        actions={renderActions()}
      >
        {renderContent()}
      </AlertDialog>
    </>
  );
}
