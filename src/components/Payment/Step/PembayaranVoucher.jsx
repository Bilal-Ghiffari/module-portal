import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import bca from "@/assets/bank/BCA.png";
import mandiri from "@/assets/bank/Mandiri.png";
import bri from "@/assets/bank/Bri.png";
import bni from "@/assets/bank/BNI.png";
import CountdownTimer from "./CountdownTimer";

const PembayaranVoucher = ({ formik }) => {
  const bankIcons = {
    bca,
    mandiri,
    bri,
    bni,
  };

  return (
    <div className="mb-4">
      <div
        className="border border-primary rounded mb-3"
        style={{ background: "#002366" }}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-3">
          <span className="text-white fw-bold">Total Pembayaran</span>
          <span className="text-white fw-bold">Rp 150.000</span>
        </div>
        <div className="border-top border-primary px-3 py-3 bg-light">
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Bayar Dalam</span>
            <CountdownTimer />
          </div>
          <p className="text-muted mb-0 text-end">
            Jatuh tempo 06 Jul 2025, 11:22
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center mb-2">
        <img
          src={bankIcons[formik.values?.metode_pembayaran]}
          alt={formik.values?.metode_pembayaran}
          style={{ width: "40px" }}
        />

        <p className="mb-0 ms-2 fw-bold text-capitalize">
          Bank {formik.values?.metode_pembayaran} (Virtual Account)
        </p>
      </div>

      <hr />

      <div className="mb-2">
        <p className="mb-1 fw-bold">Nomor Kode Billing</p>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold text-primary mb-0">896 0822 5432 2312</h5>
          <a href="#" className="text-primary fw-bold">
            Salin
          </a>
        </div>
      </div>

      <div className="border-top border-dashed my-3"></div>

      <p className="text-success fw-semibold mb-2">
        Proses verifikasi kurang dari 10 menit setelah pembayaran berhasil
      </p>

      <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
        Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan kembali
        dengan Virtual Account agar nomor tetap sama.
      </p>

      <Accordion
        sx={{
          boxShadow: "none",
          border: "none",
        }}
        defaultExpanded
        className="mb-2"
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#EFF7FF",
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            className="fw-bold text-primary"
            sx={{ fontSize: "14px" }}
          >
            Petunjuk Transfer mBanking
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol className="ps-3">
            <li>
              Login ke mBanking-mu. Pilih Payment, kemudian pilih e-Commerce.
            </li>
            <li>
              Pilih Penyedia Layanan: AHU Link, dan masukkan nomor Virtual
              Account <strong>896 0822 5432 2312</strong>, kemudian pilih
              Lanjut.
            </li>
            <li>
              Periksa informasi yang tertera di layar. Pastikan Merchant adalah
              AHU Link, total tagihan sudah benar, dan username kamu fauzi. Jika
              benar, masukkan PIN dan pilih OK.
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          boxShadow: "none",
          border: "none",
        }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#EFF7FF",
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            className="fw-bold text-primary"
            sx={{ fontSize: "14px" }}
          >
            Petunjuk Transfer iBanking
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol className="ps-3">
            <li>Login ke iBanking-mu dan pilih menu Payment.</li>
            <li>
              Masukkan nomor Virtual Account <strong>896 0822 5432 2312</strong>{" "}
              dan konfirmasi detail pembayaran.
            </li>
            <li>
              Periksa kembali detail pesanan, lalu masukkan token dan selesaikan
              pembayaran.
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PembayaranVoucher;
