import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import "./style.css";
import QRCode from "react-qr-code";
import logo from "../../../assets/logo/image 70.png";

import "dayjs/locale/id";
import {
  getUser,
  toLowerCapitalCase,
} from "@/helpers/services/generateOptions";
import { CustomButton } from "@/components/Common/Button";
import { FaRegFilePdf } from "react-icons/fa";

// Set Day.js locale to Indonesian
dayjs.locale("id");

const Voucher = () => {
  const notaRef = useRef();

  const handleDownload = async () => {
    const element = notaRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 }); // kualitas bagus
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Bukti Pemesanan Voucher - Ditjen AHU.pdf");
    } catch (error) {
      console.error("Gagal generate PDF:", error);
    }
  };

  return (
    <>
      <div ref={notaRef} className="nota-dinas3 text-black bg-white p-4">
        <div className="header">
          <div className="gap-4">
            <img
              src={logo}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
            <div className="d-flex flex-column mt-2">
              <h1 className="official-title text-black">
                DIREKTORAT JENDERAL AHU
              </h1>
              <h5 className="fw-bold text-black mt-1 m-0 p-0">
                BUKTI PEMESANAN NOMOR VOUCHER
              </h5>
              <h5 className="fw-bold text-success m-0 p-0">PEWARGANEGARAAN</h5>
              <h5 className="text-primary fw-bold m-0 p-0">
                Pewarganegaraan Berdasarkan Perkawinan
              </h5>
            </div>
            <p></p>
          </div>
        </div>
        <div className="border border-1 border-black"></div>
        <div className="content mt-4">
          <div>
            <div className="d-flex align-items-center justify-content-center gap-4">
              <span>
                <p className="m-0 mt-1 p-0">Kode Voucher</p>
                <p className="m-0 mt-1 p-0">Nama Pemohon</p>
                <p className="m-0 mt-1 p-0">Email Pemohon</p>
                <p className="m-0 mt-1 p-0">Nomor HP</p>
                <p className="m-0 mt-1 p-0">Wilayah</p>
                <p className="m-0 mt-1 p-0">Tanggal Transaksi</p>
                <p className="m-0 mt-1 p-0">Tanggal Expired</p>
                <p className="m-0 mt-1 p-0">Tagihan</p>
                <p className="m-0 mt-1 p-0">Status</p>
              </span>
              <span>
                <p className="m-0 mt-1 p-0">: 123ABC456</p>
                <p className="m-0 mt-1 p-0">: John Doe</p>
                <p className="m-0 mt-1 p-0">: john.doe@email.com</p>
                <p className="m-0 mt-1 p-0">: 081234567890</p>
                <p className="m-0 mt-1 p-0">: Jakarta</p>
                <p className="m-0 mt-1 p-0">: 08-07-2025</p>
                <p className="m-0 mt-1 p-0">: 15-07-2025</p>
                <p className="m-0 mt-1 p-0">: Rp 1.000.000</p>
                <p className="m-0 mt-1 p-0 text-uppercase text-danger fw-bold">
                  : Belum Bayar
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <CustomButton
          onClick={handleDownload}
          text={"Download"}
          leftIcon={<FaRegFilePdf />}
          textColor="#041662"
          bgColor="transparent"
          border="1px solid #ccc"
          hoverColor="#041992"
        />
      </div>
    </>
  );
};

export default Voucher;
