import React, { useRef, useState } from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CustomButton } from "@/components/Common/Button";
import { FaFilePdf } from "react-icons/fa";

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
      pdf.save("FormulirPernyataanKehilanganKewarganegaraan.pdf");
    }
  };

  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box>
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
                {/* Judul Surat - Sesuai image_7aeedf.png */}
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
                  Formulir Pernyataan Kehilangan Kewarganegaraan Ri Atas
                  <br />
                  Kemauan Sendiri Bagi Orang Yang Belum Memperoleh
                  <br />
                  Kewarganegaraan Asing
                </div>

                {/* Bagian Header Surat (Lampiran, Perihal, Tanggal) - Sesuai image_7aeedf.png */}
                <div style={{ marginTop: 20 }}>
                  <table style={{ fontSize: 12, width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "10%" }}>Lampiran</td>
                        <td style={{ width: "2%" }}>:</td>
                        <td>1 (satu) Berkas</td>
                        <td style={{ textAlign: "right" }}>
                          Jakarta, 10 Desember 2024
                        </td>
                      </tr>
                      <tr>
                        <td>Perihal</td>
                        <td>:</td>
                        <td>
                          Pernyataan Surat Keterangan Kehilangan Kewarganegaraan
                          RI Atas Kemauan Sendiri Bagi Orang yang Belum
                          Memperoleh Kewarganegaraan Asing
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bagian Tujuan Surat (Dihapus karena tidak ada di image_7aeedf.png) */}
                {/* <div style={{ marginTop: 30 }}>
                  <div style={{ fontSize: 12 }}>Kepada Yang Terhormat,</div>
                  <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 5 }}>Presiden R.I</div>
                  <div style={{ fontSize: 12, marginTop: 5 }}>Melalui,</div>
                  <div style={{ fontSize: 12, marginTop: 5 }}>Menteri Hukum dan Hak Asasi Manusia, R.I.</div>
                  <div style={{ fontSize: 12, marginTop: 5, marginBottom: 20 }}>Di Jakarta</div>
                </div> */}

                {/* Detail Pemohon - Sesuai image_7aeedf.png */}
                <div style={{ marginTop: 30 }}>
                  {" "}
                  {/* Changed from 20 to 30 to align with the image */}
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
                        <td>Ferry Lima</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>Laki-laki</td>
                      </tr>
                      <tr>
                        <td>Tempat/Tanggal Lahir</td>
                        <td>:</td>
                        <td>Bandung, 12 Desember 2005</td>
                      </tr>
                      <tr>
                        <td>
                          Nomor Induk Kependudukan (NIK) / Nomor Induk Tunggal
                          (NIT)
                        </td>
                        <td>:</td>
                        <td>93284832984832989</td>
                      </tr>
                      <tr>
                        <td>Nomor Paspor Republik Indonesia</td>
                        <td>:</td>
                        <td>93892849832984832983289</td>
                      </tr>
                      <tr>
                        <td>Tanggal Habis Berlaku Paspor RI</td>
                        <td>:</td>
                        <td>10 Desember 2024</td>
                      </tr>
                      <tr>
                        <td>
                          Nomor Paspor Asing / Nomor Sertifikat Warga Negara
                          Asing
                        </td>
                        <td>:</td>
                        <td></td> {/* Empty as per image */}
                      </tr>
                      <tr>
                        <td>Tanggal Habis Berlaku Paspor Asing</td>
                        <td>:</td>
                        <td></td> {/* Empty as per image */}
                      </tr>
                      <tr>
                        <td>Alamat Tempat Tinggal Indonesia</td>
                        <td>:</td>
                        <td>Jln Testing</td>
                      </tr>
                      <tr>
                        <td>Alamat Tempat Tinggal Luar Negeri</td>
                        <td>:</td>
                        <td></td> {/* Empty as per image */}
                      </tr>
                      <tr>
                        <td>Nomor Surat Keterangan Naturalisasi</td>
                        <td>:</td>
                        <td>32984932848329489382</td>
                      </tr>
                      <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>Testing</td>
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
                        <td>Herman</td>
                      </tr>
                      <tr>
                        <td>&nbsp; &nbsp; • Kewarganegaraan</td>
                        <td>:</td>
                        <td>Germany</td>
                      </tr>
                      <tr>
                        <td>Alasan Permohonan</td>
                        <td>:</td>
                        <td>Kemauan Sendiri</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Kalimat Permohonan - Sesuai image_7aeedf.png */}
                  <div style={{ marginTop: 30, marginBottom: 30 }}>
                    Dengan ini kami mohon kepada Bapak/Ibu berkenan mengabulkan
                    permohonan untuk memberikan Surat Keterangan Kehilangan
                    Kewarganegaraan Republik Indonesia.
                  </div>
                  {/* Bagian "Sebagai Bahan Pertimbangan" (Dihapus karena tidak ada di image_7aeedf.png) */}
                  {/* <div style={{ marginTop: 20 }}>
                    Sebagai Bahan Pertimbangan, Saya lampirkan dokumen persyaratan sebagai berikut:
                    <ul style={{ listStyleType: "disc", marginLeft: 20, marginTop: 10 }}>
                      <li>Fotokopi kutipan akta kelahiran atau surat yang membuktikan kelahiran pemohon yang disahkan oleh Kepala Perwakilan Republik Indonesia;</li>
                      <li>Fotokopi akta perkawinan/buku nikah, kutipan akta perceraian/surat talak/perceraian, atau kutipan akta kematian suami/istri pemohon bagi yang belum berusia 18 (delapan belas) tahun dan sudah kawin yang disahkan oleh Kepala Perwakilan Republik Indonesia;</li>
                      <li>Fotokopi surat perjalanan Republik Indonesia atau kartu tanda penduduk yang disahkan oleh Kepala Perwakilan Republik Indonesia;</li>
                      <li>Surat keterangan dari perwakilan negara asing bahwa dengan kehilangan Kewarganegaraan Republik Indonesia Pemohon akan menjadi warga negara asing; dan</li>
                      <li>Pasfoto Pemohon terbaru berwarna dengan ukuran 4x6 cm (empat kali enam sentimeter) sebanyak 2 (dua) lembar.</li>
                    </ul>
                  </div> */}
                  {/* Penutup Surat - Sesuai image_7aeedf.png */}
                  <div style={{ marginTop: 30 }}>
                    Demikian surat permohonan ini dibuat dengan keterangan
                    sebenar-benarnya.
                  </div>
                  <div style={{ marginTop: 20 }}>
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
                        Ferry Lima
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
