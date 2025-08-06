import React, { useRef, useState } from "react";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { Box, Typography, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checked from "@/components/Common/Checked";
import { CustomButton } from "@/components/Common/Button";
import { FaFilePdf } from "react-icons/fa";

export default function SuratPermohonanPemulihanWni({ formik }) {
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

      pdf.save("PemulihanWni.pdf");
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
                <div
                  className="text-center"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textTransform: "uppercase", // opsional
                  }}
                >
                  FORMULIR PERNYATAAN MEMPEROLEH KEMBALI KEWARGANEGARAAN
                  REPUBLIK INDONESIA
                </div>

                <div style={{ marginTop: 20 }}>
                  <table style={{ fontSize: 12 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "1%" }}>Lampiran</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          <div
                            style={{
                              minWidth: 200,
                              height: 22,
                            }}
                          >
                            1 (satu) berkas
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "1%" }}>Perihal</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          <div
                            style={{
                              minWidth: 200,
                              height: 22,
                            }}
                          >
                            Pernyataan Memperoleh Kembali Kewarganegaraan
                            Republik Indonesia
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: 12, marginTop: 30, lineHeight: 1.6 }}>
                  <div>
                    Merujuk pada Pasal 32 Undang-Undang Nomor 12 Tahun 2006
                    tentang Kewarganegaraa Republik Indonesia Juncto Pasal 49
                    Peraturan Pemerintah Nomor 2 Tahun 2007 tentang Tata Cara
                    Memperoleh, Kehilangan, Pembatalan, dan Memperoleh kembali
                    Kewarganegaraan Republik Indonesia, bersama ini dengan
                    hormat saya :
                  </div>
                  <table
                    style={{ width: "100%", marginTop: 20, marginBottom: 47 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "2%" }}>Nama Lengkap</td>
                        <td style={{ width: "5%" }}>: Oktavia Ardiani</td>
                      </tr>

                      <tr>
                        <td>Alamat Tempat Tinggal</td>
                        <td>: Jakarta</td>
                      </tr>
                      <tr>
                        <td>Tempat/Tanggal Lahir</td>
                        <td>: Sleman, 01 November 1990</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>: Wanita</td>
                      </tr>
                      <tr>
                        <td>Alamat Tempat Tinggal</td>
                        <td>: Jln Karya Utama</td>
                      </tr>
                      <tr>
                        <td>Status Perkawinan</td>
                        <td>: CERAI</td>
                      </tr>
                      <tr>
                        <td>Alasan Kehilangan</td>
                        <td>: Putusnya perkawinan</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginBottom: 10 }}>
                    Dengan ini menyampaikan pernyataan untuk memperoleh kembali
                    Kewarganegaraan Republik Indonesia.
                  </div>
                  <div style={{ marginBottom: 30 }}>
                    Saya menyadari sepenuhnya konsekuensi akibat hukum dengan
                    penyampaian pernyataan memperoleh kembali Kewarganegaraan
                    Republik Indonesia, dan akan tunduk pada ketentuan peraturan
                    perundang-undangan
                  </div>
                  <div style={{ marginBottom: 30 }}>
                    Demikian penyampaian memperoleh kembali Kewarganegaraan
                    Republik Indonesia ini disampaikan, atas perhatiannya
                    diucapkan terima kasih.
                  </div>

                  <div
                    style={{
                      marginTop: 50,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div>
                      <div style={{ textAlign: "center" }}>
                        Indonesia, 09 November 2017
                      </div>
                      <div style={{ textAlign: "center" }}>Yang menyatakan</div>
                      <div style={{ height: 40 }} />
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          marginTop: 50,
                          fontWeight: "bold",
                        }}
                      >
                        Oktavia Ardiani Rendra
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

              {/* <Box
                sx={{
                  background: "#FAD9AE",
                  color: "#454545",
                  borderRadius: 4,
                  padding: 5,
                  fontSize: 14,
                }}
              >
                <Typography component="div" sx={{ fontSize: 14 }}>
                  Semua dokumen yang perlu untuk diunggah harus disiapkan
                  sebelum anda mendaftar secara online. Verifikator tidak akan
                  menerima dokumen unggah yang dikirimkan setelah anda mendaftar
                  online.
                  <br />
                  <br />
                  Surat pernyataan ini harus diisi dan ditandatangani di atas
                  materai oleh pemohon dan dilampirkan pada saat pendaftaran
                  Notaris. Apabila ada hal yang kurang jelas silakan
                  menghubungi: Subdit Sertifikasi Notariat, Direktorat Perdata,
                  Direktorat Jenderal Administrasi Hukum Umum, Gedung
                  Kementerian Hukum dan HAM, Jl. H.R. Rasuna Said Kav 6-7
                  Kuningan, Jakarta Selatan 12940, Telp (021) 5202393, pada hari
                  kerja Senin-Jumat pada jam pelayanan permohonan HPI.
                </Typography>
              </Box> */}
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
