import React, { useRef, useState } from "react";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { Box, Typography, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checked from "@/components/Common/Checked";
import { CustomButton } from "@/components/Common/Button";
import { FaFilePdf } from "react-icons/fa";
import MessageBox from "@/components/Common/MessageBox";

export default function SuratPermohonan({ formik }) {
  const suratRef = useRef(null);

  // Fungsi untuk mengunduh PDF dengan tata letak HTML
  const handleDownload = async () => {
    if (suratRef.current) {
      // Mengubah elemen HTML menjadi kanvas
      const canvas = await html2canvas(suratRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Menginisialisasi jsPDF dengan ukuran A4
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Menghitung dimensi gambar agar sesuai dengan lebar PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight; // Tinggi sisa gambar yang perlu ditambahkan ke halaman PDF
      let position = 0; // Posisi vertikal gambar pada halaman PDF

      // Menambahkan gambar ke halaman pertama
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight; // Mengurangi tinggi halaman PDF dari tinggi sisa gambar

      // Menambahkan halaman baru jika ada sisa gambar yang belum masuk
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight; // Menghitung posisi untuk halaman berikutnya
        pdf.addPage(); // Menambahkan halaman baru
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight); // Menambahkan gambar ke halaman baru
        heightLeft -= pdfHeight; // Mengurangi tinggi halaman PDF lagi
      }

      // Menyimpan PDF dengan nama file yang ditentukan
      pdf.save("SuratKehilanganKewarganegaraan.pdf");
    }
  };

  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        <Row>
          <Col>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                mb: 3,
                maxWidth: 890,
                margin: "0 auto",
              }}
            >
              <div
                ref={suratRef}
                style={{
                  padding: 50,
                  fontFamily: "Times New Roman",
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                {/* Header Surat - Sesuai image_7aeadd.png */}
                <div style={{ textAlign: "left", marginBottom: 30 }}>
                  <p>Jakarta, 17 November 2019</p>
                  <p>Kepada Yth :</p>
                  <p>Bapak Direktur Jenderal Administrasi Hukum Umum</p>
                  <p>Kementerian Hukum dan HAM Republik Indonesia</p>
                  <p>U.p. Direktur Tata Negara</p>
                  <p>Di -</p>
                  <p>Jakarta,</p>
                </div>

                {/* Perihal Surat - Sesuai image_7aeadd.png */}
                <div style={{ marginBottom: 30 }}>
                  <p>
                    Perihal : PERMOHONAN SURAT KETERANGAN KEHILANGAN
                    KEWARGANEGARAAN REPUBLIK INDONESIA
                  </p>
                </div>

                {/* Detail Pemohon - Sesuai image_7aeadd.png */}
                <div style={{ marginBottom: 20 }}>
                  <p>Yang bertanda tangan dibawah ini :</p>
                  <table style={{ width: "100%", fontSize: 12 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "25%" }}>Nama</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>Eti Supriyati</td>
                      </tr>
                      <tr>
                        <td>Tempat/Tanggal Lahir</td>
                        <td>:</td>
                        <td>Cilacap, 02 April 1980</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>Wanita</td>
                      </tr>
                      <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>Petani/pekebun</td>
                      </tr>
                      <tr>
                        <td>Status Perkawinan</td>
                        <td>:</td>
                        <td>Kawin</td>
                      </tr>
                      <tr>
                        <td>Nama Lengkap Suami / Istri</td>
                        <td>:</td>
                        <td>
                          Suami / Istri : Lin Sheng Hsien - kewarganegaraan :
                          Taiwan
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat tempat tinggal</td>
                        <td>:</td>
                        <td>
                          No. 29, Datan, Neighbourhood 017, Datan Village,
                          Xingang Town, Jiayi County, Taiwan Province
                        </td>
                      </tr>
                      <tr>
                        <td>Alasan Permohonan</td>
                        <td>:</td>
                        <td>KARENA PERKAWINAN</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Kalimat Permohonan - Sesuai image_7aeadd.png */}
                <div style={{ marginTop: 20, marginBottom: 30 }}>
                  <p>
                    Dengan ini kami mohon kepada Bapak/Ibu sudilah kiranya
                    mengabulkan permohonan untuk memberikan surat keterangan
                    Kehilangan Kewarganegaraan Republik Indonesia, karena
                    mengikuti Suami warga Negara Taiwan.
                  </p>
                  <p style={{ marginTop: 10 }}>
                    Atas bantuan Bapak/Ibu, saya mengucapkan terima kasih.
                  </p>
                </div>

                {/* Tanda Tangan - Sesuai image_7aeadd.png */}
                <div
                  style={{
                    marginTop: 50,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div>
                    <div style={{ textAlign: "center" }}>Hormat Kami,</div>
                    <div style={{ height: 60 }} />{" "}
                    {/* Jarak untuk tanda tangan */}
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Eti Supriyati
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <Box
              xs="12"
              className="d-flex flex-row gap-2 px-4 justify-content-between"
              style={{ marginBottom: "32px", marginTop: "32px" }}
            >
              <Checked
                fontSize="0.95rem"
                label="Pastikan pengisian data yang telah anda isi sudah benar dan lengkap"
                value="1"
                fieldName={`suratPermohonan`}
                formik={formik}
              />
              <CustomButton
                text={"Download"}
                leftIcon={<FaFilePdf />}
                textColor="#041662"
                bgColor="transparent"
                border="1px solid #E7E7E7"
                onClick={handleDownload}
              />
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
