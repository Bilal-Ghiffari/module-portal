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

  // Download PDF with HTML layout
  const handleDownload = async () => {
    if (suratRef.current) {
      const canvas = await html2canvas(suratRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("surat-permohonan.pdf");
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
                {/* Bagian atas surat */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12 }}>Kepada Yang Terhormat,</div>
                  <div
                    style={{ fontSize: 26, fontWeight: "bold", marginTop: 5 }}
                  >
                    Presiden Republik Indonesia
                  </div>
                  <div style={{ fontSize: 12, marginTop: 5 }}>Melalui,</div>
                  <div style={{ fontSize: 12, marginTop: 5 }}>
                    Menteri Hukum dan Hak Asasi Manusia, R.I.
                  </div>
                  <div style={{ fontSize: 12, marginTop: 5 }}>Di Jakarta</div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 12 }}>
                    Yang bertanda tangan dibawah ini :
                  </div>
                  <table
                    style={{ width: "100%", marginTop: 10, marginBottom: 47 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "20%" }}>Nama</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                      <tr>
                        <td>Tempat/Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat Tinggal</td>
                        <td>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                      <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                      <tr>
                        <td>Status Perkawinan</td>
                        <td>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                      <tr>
                        <td>Alasan Permohonan</td>
                        <td>:</td>
                        <td>
                          .........................................................................
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginBottom: 10 }}>
                    Dengan ini memohon untuk melepaskan kewarganegaraan Republik
                    Indonesia, dengan alasan
                  </div>

                  <div>
                    Sebagai Bahan Pertimbangan, Saya lampirkan dokumen
                    persyaratan sebagai berikut:
                    <ul
                      style={{
                        listStyleType: "disc",
                        marginLeft: 20,
                        marginTop: 10,
                      }}
                    >
                      <li>
                        Fotokopi kutipan akta kelahiran atau surat yang
                        membuktikan kelahiran pemohon yang disahkan oleh Kepala
                        Perwakilan Republik Indonesia;
                      </li>
                      <li>
                        Fotokopi akta perkawinan/buku nikah, kutipan akta
                        perceraian/surat talak/perceraian, atau kutipan akta
                        kematian suami/istri pemohon bagi yang belum berusia 18
                        (delapan belas) tahun dan sudah kawin yang disahkan oleh
                        Kepala Perwakilan Republik Indonesia;
                      </li>
                      <li>
                        Fotokopi surat perjalanan Republik Indonesia atau kartu
                        tanda penduduk yang disahkan oleh Kepala Perwakilan
                        Republik Indonesia;
                      </li>
                      <li>
                        Surat keterangan dari perwakilan negara asing bahwa
                        dengan kehilangan Kewarganegaraan Republik Indonesia
                        Pemohon akan menjadi warga negara asing; dan
                      </li>
                      <li>
                        Pasfoto Pemohon terbaru berwarna dengan ukuran 4x6 cm
                        (empat kali enam sentimeter) sebanyak 2 (dua) lembar.
                      </li>
                    </ul>
                  </div>

                  <div style={{ marginTop: 30 }}>
                    Demikian surat permohonan ini dibuat dengan keterangan
                    sebenar-benarnya.
                  </div>

                  <div
                    style={{
                      marginTop: 50,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div>
                      <div style={{ textAlign: "center", marginTop: 10 }}></div>{" "}
                      {/* Kosongkan jika tidak ada teks di bawah tanggal */}
                      <div style={{ height: 60 }} />{" "}
                      {/* Jarak untuk tanda tangan */}
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        ................................................
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

              <MessageBox>
                <Typography>
                  Semua dokumen yang perlu untuk dilegalisir harus dilakukan
                  sebelum Anda mendaftar secara online. Verifikator tidak akan
                  menerima dokumen legalisir yang dilakukan setelah Anda
                  mendaftar online.
                  <br />
                  <br />
                  Anda harus mengirimkan dokumen-dokumen di atas beserta dokumen
                  yang Anda cetak dan tanda tangani kepada: Subdirektorat
                  Notariat, Direktorat Perdata, Direktorat Jenderal Administrasi
                  Hukum Umum, Kementerian Hukum dan HAM RI, EX Gedung Sentra
                  Mulia, Jl. HR. Rasuna Said Kav x-6/8 Lantai 3 dan 6, Kuningan,
                  Jakarta Selatan, Kode Pos 12940. Selambat-lambatnya 7 hari
                  setelah Anda memasukkan permohonan ini.
                </Typography>
              </MessageBox>
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
