import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Box } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import pdfLogo from "@/assets/logo/logo_kemehum.png";
import userDummy from "@/assets/images/user-dummy-img.jpg";
import CerticateLayout from "@/components/Common/Certificate/CerticateLayout";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const SuratKeteranganTerbit = forwardRef(({ data, dataSk }, ref) => {
  const suratRef = useRef(null);

  console.log("DATA SK", dataSk);

  const qrCodeUrl = dataSk?.qr_url;

  const handleDownload = async () => {
    if (suratRef.current) {
      try {
        // Loading state bisa ditambahkan di sini
        console.log("Memulai proses download PDF...");

        // Mengubah elemen HTML menjadi kanvas dengan konfigurasi yang lebih baik
        const canvas = await html2canvas(suratRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        // Menginisialisasi jsPDF dengan ukuran F4: 210mm x 330mm
        const pdf = new jsPDF("p", "mm", [210, 330]);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Menghitung dimensi gambar agar sesuai dengan lebar PDF
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Menambahkan gambar ke halaman pertama
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Menambahkan halaman baru jika ada sisa gambar yang belum masuk
        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        // Membuat nama file dengan timestamp atau data dinamis
        const fileName = `Surat_keputusan_Pewarganegaraan_${
          data?.nama_lengkap_pemohon?.replace(/\s+/g, "_") || "document"
        }_${new Date().getTime()}.pdf`;

        // Menyimpan PDF
        pdf.save(fileName);

        console.log("PDF berhasil didownload");
      } catch (error) {
        console.error("Error saat mendownload PDF:", error);
        alert("Terjadi kesalahan saat mendownload dokumen. Silakan coba lagi.");
      }
    } else {
      console.error("Element surat tidak ditemukan");
    }
  };

  useImperativeHandle(ref, () => ({
    handleDownload,
  }));

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!data) {
    return <div>Loading document data...</div>;
  }

  return (
    <div className="mt-5 mb-3 px-2">
      <Box
        sx={{
          border: "1px solid #E7E7E7",
          borderRadius: 5,
          padding: 2,
          fontFamily: "sans-serif",
        }}
      >
        <Row>
          <Col>
            <CerticateLayout suratRef={suratRef}>
              {/* Logo dan Header Kementerian */}
              <div
                className="text-center"
                style={{ marginBottom: 20, marginTop: 50 }}
              >
                <img
                  src={pdfLogo}
                  alt="Logo Kementerian"
                  style={{ marginBottom: 5, maxWidth: "90px" }}
                />
                <p style={{ fontWeight: "bold", fontSize: "18px", margin: 0 }}>
                  KEMENTERIAN HUKUM REPUBLIK INDONESIA
                </p>
              </div>

              {/* Judul Keputusan */}
              <div
                className="text-center"
                style={{ marginTop: 30, marginBottom: 20 }}
              >
                <p style={{ fontWeight: "bold", margin: 0, fontSize: "16px" }}>
                  KEPUTUSAN MENTERI HUKUM REPUBLIK INDONESIA
                </p>

                <p
                  style={{
                    margin: 0,
                    marginTop: 20,
                    fontSize: "18px",
                  }}
                >
                  Nomor : {dataSk?.nomor_sk}
                </p>
                <p style={{ margin: 0, fontSize: "14px" }}>Tentang</p>
                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>
                  MEMPEROLEH KEMBALI KEWARGANEGARAAN REPUBLIK INDONESIA{" "}
                </p>
                <p style={{ margin: 0, fontSize: "14px" }}>Atas Nama </p>
                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>
                  MENTERI HUKUM INDONESIA REPUBLIK INDONESIA{" "}
                </p>
              </div>

              {/* Bagian Menimbang */}
              <div style={{ marginTop: 30 }}>
                <table style={{ width: "100%", fontSize: 12 }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "15%" }}>
                        Menimbang :
                      </td>
                      <td style={{ verticalAlign: "top" }}>
                        Bahwa setelah dilakukan pemeriksaan kelengkapan dokumen
                        persyaratan yang dilampirkan oleh pemohon telah memenuhi
                        persyaratan, sehingga dapat dilakukan.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bagian Mengingat */}
              <div style={{ marginTop: 10 }}>
                <table style={{ width: "100%", fontSize: 12 }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "15%" }}>
                        Mengingat :
                      </td>
                      <td style={{ verticalAlign: "top", width: "2%" }}>1.</td>
                      <td style={{ verticalAlign: "top" }}>
                        Undang-Undang Nomor12 Tahun 2006 tentang Kewarganegaraan
                        Republik Indonesia (Lembaran Negara Republik Indonesia
                        Tahun 2006 Nomor 63, Tambahan Lembaga Negara Republik
                        Indonesia Nomor 4634).
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{ verticalAlign: "top" }}>2.</td>
                      <td style={{ verticalAlign: "top" }}>
                        Undang-Undang Nomor12 Tahun 2006 tentang Kewarganegaraan
                        Republik Indonesia (Lembaran Negara Republik Indonesia
                        Tahun 2006 Nomor 63, Tambahan Lembaga Negara Republik
                        Indonesia Nomor 4634).
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{ verticalAlign: "top" }}>3.</td>
                      <td style={{ verticalAlign: "top" }}>
                        Peraturan Pemerintah Republik Indonesia Nomor 2 Tahun
                        2007 tentang Tata Cara Memperoleh, Kehilangan,
                        Pembatalan, dan Memperoleh Kembali Kewarganegaraan
                        Republik Indonesia (Lembaran Negara Republik Indonesia
                        Tahun 2007 Nomor 2, Tambahan Lembaran Negara Republik
                        Indonesia Nomor 4676).
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{ verticalAlign: "top" }}>4.</td>
                      <td style={{ verticalAlign: "top" }}>
                        Peraturan Menteri Hukum Nomor 47 Tahun 2016 tentang Tata
                        Cara Penyampaian Permohonan Kewarganegaraan Republik
                        Indonesia Secara Elektronik (Berita Negara Republik
                        Indonesia Tahun 2016 Nomor 1938).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bagian Memutuskan */}
              <div style={{ marginTop: 20 }}>
                <p
                  className="text-center"
                  style={{ fontWeight: "bold", marginBottom: 10 }}
                >
                  Memutuskan :
                </p>
                <table style={{ width: "100%", fontSize: 12 }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "15%" }}>
                        Menetapkan :
                      </td>
                      <td style={{ verticalAlign: "top" }}>
                        Keputusan Menteri Hukum Republik Indonesia Tentang
                        Memperoleh Kembali Kewarganegaraan Republik Indonesia.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "15%" }}>
                        Kesatu :
                      </td>
                      <td style={{ verticalAlign: "top", width: "85%" }}>
                        {data.nama_lengkap_pemohon} dilahirkan di{" "}
                        {data.negara_lahir_pemohon_text} tanggal{" "}
                        {formatDateToIndonesian(data.tgl_lahir_pemohon)}{" "}
                        memperoleh kembali Kewarganegaraan Republik Indonesia
                        berdasarkan Pasal 32 Undang-Undang Nomor 12 Tahun 2006
                        tentang Kewarganegaraan Republik Indonesia.
                      </td>
                    </tr>

                    <tr>
                      <td style={{ verticalAlign: "top" }}>Kedua :</td>
                      <td style={{ verticalAlign: "top" }}>
                        Pemohon harus melaporkan kepada pejabat keimigrasian dan
                        pencacatan sipil setelah memperoleh kewarganegaraan
                        Republik Indonesia
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "top" }}>Ketiga :</td>
                      <td style={{ verticalAlign: "top" }}>
                        Keputusan ini mulai berlaku pada tanggal
                        ditetapkandengan ketentuan apabila di kemudian hari
                        terdapat kekeliruan akan diperbaiki sebagaimaan
                        mestinya.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tanda Tangan */}
              <div
                style={{
                  marginTop: 39,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 30,
                    marginRight: 20,
                    marginLeft: 30,
                  }}
                >
                  {/* Foto 4x6 user */}
                  <img
                    src={userDummy}
                    alt="Logo Kementerian"
                    style={{ marginBottom: 5, maxWidth: "100px" }}
                  />
                  <img
                    src={qrCodeUrl}
                    alt="Logo Kementerian"
                    style={{ marginBottom: 5, maxWidth: "100px" }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 0,
                    height: 217,
                    // border: "1px solid red",
                    position: "relative",
                  }}
                >
                  <p style={{ margin: 0 }}>Ditetapkan di Jakarta</p>
                  <p style={{ margin: 0 }}>
                    pada tanggal {formatTanggal(new Date())}.
                  </p>
                  <p style={{ margin: 0, marginTop: 5 }}>
                    a.n Menteri Hukum Republik Indonesia
                  </p>
                  <p style={{ margin: 0 }}>
                    Direktur Jenderal Administrasi Hukum Umum
                  </p>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "25%" }}
                  >
                    <p style={{ fontWeight: "bold", margin: 0 }}>Widodo</p>
                    <p style={{ fontWeight: "", margin: 0 }}>
                      NIP. 19661118 199403 1 001
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  paddingLeft: 25,
                  paddingRight: 25,
                  paddingBottom: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: "11px", textAlign: "center" }}>
                  Surat Keputusan Menteri ini diterbitkan secara daring
                  berdasarkan isian dari pemohon. Ketidaksesuaian data di
                  kemudian hari menjadi tanggung jawab pemohon dan dapat dikenai
                  sanksi sesuai dengan ketentuan peraturan perundang-undangan
                  yang berlaku.
                </p>
              </div>
            </CerticateLayout>
          </Col>
        </Row>
      </Box>
    </div>
  );
});

SuratKeteranganTerbit.displayName = "SuratKeteranganTerbit";

export default SuratKeteranganTerbit;
