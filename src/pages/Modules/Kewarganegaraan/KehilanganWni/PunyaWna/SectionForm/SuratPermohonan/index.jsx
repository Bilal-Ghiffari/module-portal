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
        position = heightLeft - imgHeight; // Menghitung posisi untuk halaman berikutnya
        pdf.addPage(); // Menambahkan halaman baru
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight); // Menambahkan gambar ke halaman baru
        heightLeft -= pdfHeight; // Mengurangi tinggi halaman PDF lagi
      }

      // Menyimpan PDF dengan nama file yang ditentukan
      pdf.save("PermohonanSuratKeteranganKehilanganKewarganegaraan.pdf");
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
                {/* Judul Surat - Sesuai image_7af6c0.png */}
                <div
                  className="text-center"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  Permohonan Surat Keterangan Kehilangan Kewarganegaraan Ri
                  <br />
                  Atas Kemauan Sendiri Bagi Orang Yang Telah Memperoleh
                  <br />
                  Kewarganegaraan Asing
                </div>

                {/* Bagian Header Surat (Lampiran, Perihal, Tanggal) - Sesuai image_7af6c0.png */}
                <div style={{ marginTop: 20 }}>
                  <table style={{ fontSize: 12, width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "10%" }}>Lampiran</td>
                        <td style={{ width: "2%" }}>:</td>
                        <td>1 (satu) Berkas</td>
                        <td style={{ textAlign: "right" }}>
                          Jakarta, 25 Juni 2025
                        </td>
                      </tr>
                      <tr>
                        <td>Perihal</td>
                        <td>:</td>
                        <td>
                          Pernyataan Surat Keterangan Kehilangan Kewarganegaraan
                          RI Atas Kemauan Sendiri Bagi Orang yang Telah
                          Memperoleh Kewarganegaraan Asing
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Detail Pemohon - Sesuai image_7af6c0.png */}
                <div style={{ marginTop: 30 }}>
                  <div style={{ fontSize: 12, marginBottom: 10 }}>
                    Yang bertanda tangan dibawah ini :
                  </div>
                  <table
                    style={{ width: "100%", fontSize: 12, lineHeight: 1.8 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>Nama Lengkap</td>
                        <td style={{ width: "2%" }}>:</td>
                        <td>Ana</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>Laki-laki</td>
                      </tr>
                      <tr>
                        <td>Tempat/Tanggal Lahir</td>
                        <td>:</td>
                        <td>1234567891234567, 01 Juni 1989</td>
                      </tr>
                      <tr>
                        <td>
                          Nomor Induk Kependudukan (NIK) / Nomor Induk Tunggal
                          (NIT)
                        </td>
                        <td>:</td>
                        <td>1234567891234567</td>
                      </tr>
                      <tr>
                        <td>Nomor Paspor Republik Indonesia</td>
                        <td>:</td>
                        <td>2222222222222222</td>
                      </tr>
                      <tr>
                        <td>Tanggal Habis Berlaku Paspor RI</td>
                        <td>:</td>
                        <td>18 Juni 2025</td>
                      </tr>
                      <tr>
                        <td>
                          Nomor Paspor Asing / Nomor Sertifikat Warga Negara
                          Asing
                        </td>
                        <td>:</td>
                        <td>1234567891234567</td>
                      </tr>
                      <tr>
                        <td>Tanggal Habis Berlaku Paspor Asing</td>
                        <td>:</td>
                        <td>01 Juni 2023</td>
                      </tr>
                      <tr>
                        <td>Alamat Tempat Tinggal Indonesia</td>
                        <td>:</td>
                        <td>Cisitu Indah 3 1234567891234567</td>
                      </tr>
                      <tr>
                        <td>Alamat Tempat Tinggal Luar Negeri</td>
                        <td>:</td>
                        <td>22222222</td>
                      </tr>
                      <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>2222</td>
                      </tr>
                      <tr>
                        <td>Status Perkawinan</td>
                        <td>:</td>
                        <td>Kawin</td>
                      </tr>
                      <tr>
                        <td>Data Suami / Istri :</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>&nbsp; &nbsp; • Nama</td>
                        <td>:</td>
                        <td>Ana</td>
                      </tr>
                      <tr>
                        <td>&nbsp; &nbsp; • Kewarganegaraan</td>
                        <td>:</td>
                        <td>Aland Islands</td>
                      </tr>
                      <tr>
                        <td>Alasan Permohonan</td>
                        <td>:</td>
                        <td>Telah menjadi Warga Negara Asing</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Kalimat Permohonan - Sesuai image_7af6c0.png */}
                  <div style={{ marginTop: 30, marginBottom: 30 }}>
                    Dengan ini kami mohon kepada Bapak/Ibu berkenan mengabulkan
                    permohonan untuk memberikan Surat Keterangan Kehilangan
                    Kewarganegaraan Republik Indonesia.
                  </div>

                  {/* Kalimat Penutup dan Tanda Tangan - Sesuai image_7af6c0.png */}
                  <div style={{ marginBottom: 30 }}>
                    Atas bantuan Bapak/Ibu, saya mengucapkan terima kasih.
                  </div>

                  <div
                    style={{
                      marginTop: 50,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div>
                      <div style={{ textAlign: "center" }}>Hormat Kami,</div>
                      <div style={{ height: 40 }} /> {/* Jarak untuk materai */}
                      <div style={{ textAlign: "center" }}>(Materai)</div>
                      <div style={{ height: 40 }} />{" "}
                      {/* Jarak untuk tanda tangan */}
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Ana
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <Box
              sx={{
                border: "none",
                mb: 3,
                maxWidth: 890,
                margin: "0 auto",
              }}
            >
              <Col
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
              </Col>
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
