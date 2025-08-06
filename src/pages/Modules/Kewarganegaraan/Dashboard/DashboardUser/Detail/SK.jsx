import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Box } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import pdfLogo from "@/assets/logo/logo_kemehum.png";
import userDummy from "@/assets/images/user-dummy-img.jpg";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const SuratKeteranganTerbit = forwardRef(({ data, dataSk }, ref) => {
  const suratRef = useRef(null);

  const urlUserImg = data.files.find((img) => img.file_type === 6);
  // const urlQrCode = dataSk
  // console.log(urlUserImg.url);
  const qrCodeUrl = dataSk?.qr_url;
  console.log(qrCodeUrl);

  const handleDownload = async () => {
    if (!dataSk) {
      console.warn("SK belum tersedia untuk diunduh.");
      return;
    }
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

        // Menginisialisasi jsPDF dengan ukuran A4
        const pdf = new jsPDF("p", "mm", "a4");
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
        const fileName = `sk_kewarganegaraan_${
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
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Logo dan Header Kementerian */}
                <div className="text-center" style={{ marginBottom: 20 }}>
                  <img
                    src={pdfLogo}
                    alt="Logo Kementerian"
                    style={{ marginBottom: 10, maxWidth: "120px" }}
                  />
                  <p style={{ fontWeight: "bold", fontSize: 14, margin: 0 }}>
                    KEMENTERIAN HUKUM DAN HAK ASASI MANUSIA
                  </p>
                  <p style={{ fontWeight: "bold", fontSize: 14, margin: 0 }}>
                    REPUBLIK INDONESIA
                  </p>
                </div>

                {/* Judul Keputusan */}
                <div
                  className="text-center"
                  style={{ marginTop: 30, marginBottom: 20 }}
                >
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    KEPUTUSAN MENTERI HUKUM DAN HAK ASASI MANUSIA
                  </p>
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    REPUBLIK INDONESIA
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    NOMOR : {dataSk?.nomor_sk}
                  </p>
                  <p style={{ fontWeight: "bold", margin: 0 }}>TENTANG</p>
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    TETAP SEBAGAI WARGA NEGARA INDONESIA
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    ATAS NAMA{" "}
                    {data.nama_lengkap_pemohon?.toUpperCase() || "NAMA PEMOHON"}
                  </p>

                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA
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
                          Bahwa setelah dilakukan pemeriksaan kelengkapan
                          dokumen persyaratan yang dilampirkanoleh pemohontelah
                          memmenuhi persyaratan, sehingga dapat dikabulkan
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bagian Mengingat */}
                <div style={{ marginTop: 20 }}>
                  <table style={{ width: "100%", fontSize: 12 }}>
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15%" }}>
                          Mengingat :
                        </td>
                        <td style={{ verticalAlign: "top", width: "2%" }}>
                          1.
                        </td>
                        <td style={{ verticalAlign: "top" }}>
                          Undang-Undang nomor 12 tahun 2006 tentang
                          Kewarganegaraan Republik Indonesia (Lembaran Negara
                          Republik Indonesia Tahun 2006 Nomor 63, Tambahan
                          Lembaran Negara Republik Indonesia Nomor 4634)
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style={{ verticalAlign: "top" }}>2.</td>
                        <td style={{ verticalAlign: "top" }}>
                          Peraturan Pemerintah Republik Indonesia Nomor 2 Tahun
                          2007 tentang Tata Cara Memperoleh, Kehilangan,
                          Pembatalan, dan Memperoleh Kembali Kewarganegaraan
                          Republik Indonesia (Lembaran Negara Republik Indonesia
                          tahun 2007 Nomor 2, Tambahan Lembaran Negara Republik
                          Indonesia Nomor 4676)
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style={{ verticalAlign: "top" }}>3.</td>
                        <td style={{ verticalAlign: "top" }}>
                          Peraturan Menteri Hukum dan Hak Asasi Manusia Republik
                          Indonesia Nomor 47 Tahun 2016 tentang Tata Cara
                          Penyampaian Permohonan Kewarganegaraan Respublik
                          Indonesia Secara Elektronik (Berita Negara )
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bagian Memutuskan */}
                <div style={{ marginTop: 5 }}>
                  <p
                    className="text-center"
                    style={{ fontWeight: "bold", marginBottom: 20 }}
                  >
                    MEMUTUSKAN :
                  </p>
                  <table style={{ width: "100%", fontSize: 12 }}>
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15%" }}>
                          Menetapkan :
                        </td>
                        <td style={{ verticalAlign: "top" }}>
                          KEPUTUSAN MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK
                          INDONESIA TENTANG KEWARGANEGARAAN REPUBLIK INDONESIA
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15%" }}>
                          KESATU :
                        </td>
                        <td style={{ verticalAlign: "top", width: "85%" }}>
                          <span>
                            {data.nama_lengkap_pemohon?.toUpperCase() ||
                              "NAMA PEMOHON"}
                          </span>
                          , yang dilahirkan di{" "}
                          <span>{data.kab_kota_tinggal_pemohon_text}</span>,
                          tanggal {formatTanggal(data.tgl_lahir_pemohon)}, yang
                          telah melangsungkan perkawinan dengan{" "}
                          {data.nama_lengkap_pasangan} warga negara{" "}
                          {data.negara_lahir_pasangan_text} pada tanggal{" "}
                          {formatDateToIndonesian(data.tgl_akta_kawin_pemohon)}{" "}
                          sesuai akta perkawinan nomor{" "}
                          {data.no_akta_kawin_pemohon} tanggal{" "}
                          {formatDateToIndonesian(data.tgl_akta_kawin_pemohon)}{" "}
                          adalah tetap sebagai warga negara indonesia
                          berdasarkan Pasal 26 Undang-Undang Nomor 12 Tahun 2006
                          tentang Kewarganegaraan Republik Indonesia
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top" }}>KEDUA :</td>
                        <td style={{ verticalAlign: "top" }}>
                          Pemohon harus melaporkan kepada pejabat keimigrasian
                          dan pejabat pencatatan sipil setelah memperoleh
                          Kewarganegaraan Republik Indonesia
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>KETIGA :</td>
                        <td style={{ verticalAlign: "top" }}>
                          Keputusan ini mulai berlaku pada tanggal ditetapkan
                          dengan ketentuan apabila dikemudian hari terdapat
                          kekeliruan akan diperbaiki sebagaimana mestinya
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tanda Tangan */}
                <div
                  style={{
                    marginTop: 10,
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
                      gap: 10,
                      marginRight: 20,
                    }}
                  >
                    {/* Foto 4x6 user */}
                    <img
                      src={userDummy}
                      alt="Logo Kementerian"
                      style={{ marginBottom: 10, maxWidth: "100px" }}
                    />
                    <img
                      src={qrCodeUrl}
                      alt="Logo Kementerian"
                      style={{ marginBottom: 10, maxWidth: "100px" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 0 }}>Ditetapkan di Jakarta</p>
                    <p style={{ margin: 0 }}>
                      pada tanggal {formatTanggal(new Date())}.
                    </p>
                    <p style={{ margin: 0, marginTop: 10 }}>
                      a.n MENTERI HUKUM
                    </p>
                    <p style={{ margin: 0 }}>REPUBLIK INDONESIA</p>
                    <p style={{ margin: 0 }}>
                      DIREKTUR JENDERAL ADMINISTRASI HUKUM UMUM
                    </p>
                    <div style={{ height: 60 }} />
                    <p style={{ fontWeight: "bold", margin: 0 }}>Widodo</p>
                  </div>
                </div>

                {/* Footer peringatan */}
                <div>
                  <p
                    style={{
                      fontWeight: "bolder",
                      fontSize: "10px",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Surat Keterangan ini diproses melalui Sistem AHU
                    Kewarganegaraan yang diisioleh Pemohon. Apabila kemudian
                    hari format isian tidak sesuai dengan data sebenarnya, maka
                    pemohon dapat menerima sanksi sesuai dengan peraturan
                    perundang-undangan.
                  </p>
                </div>
              </div>
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
});

SuratKeteranganTerbit.displayName = "SuratKeteranganTerbit";

export default SuratKeteranganTerbit;
