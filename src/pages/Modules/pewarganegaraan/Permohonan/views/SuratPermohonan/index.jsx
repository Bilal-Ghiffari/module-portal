import { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CustomButton } from "@/components/Common/Button";
import { FaFilePdf } from "react-icons/fa";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

export default function SuratPermohonan({ formik }) {
  const suratRef = useRef(null);
  const checkboxRef = useRef(null);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const currentValue = formik.values.suratPermohonan === "1";
    setIsChecked(currentValue);

    if (checkboxRef.current) {
      checkboxRef.current.checked = currentValue;
    }
  }, [formik.values.suratPermohonan]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    const value = checked ? "1" : "";

    setIsChecked(checked);

    formik.setFieldValue("suratPermohonan", value);
    formik.setFieldTouched("suratPermohonan", true);
  };

  // Fungsi untuk mengunduh PDF dengan tata letak HTML
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
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("FormulirPernyataanPermohonan.pdf");
    }
  };
  console.log(formik.values);

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
              {/* PDF Content */}
              <div
                ref={suratRef}
                style={{
                  padding: 50,
                  fontFamily: "Times New Roman",
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                {/* Judul Surat */}
                <div
                  className="text-center"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    marginBottom: 30,
                  }}
                >
                  Formulir Pernyataan Permohonan
                </div>

                {/* Detail Pemohon */}
                <div style={{ marginBottom: 20 }}>
                  <p>Saya yang bertanda tangan dibawah ini :</p>
                  <table
                    style={{
                      width: "100%",
                      fontSize: 12,
                      marginTop: 10,
                      lineHeight: 1.8,
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>1. Nama Lengkap</td>
                        <td style={{ width: "2%" }}>:</td>
                        <td>{formik.values.nama_lengkap_pemohon}</td>
                      </tr>
                      <tr>
                        <td>2. Tempat dan Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                          {formik.values.negara_lahir_pemohon_text}, {""}{" "}
                          {formatDateToIndonesian(
                            formik.values.tgl_lahir_pemohon
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>3. Alamat Tempat Tinggal</td>
                        <td>:</td>
                        <td>{formik.values.alamat_pemohon}</td>
                      </tr>
                      <tr>
                        <td>4. Kewarganegaraan</td>
                        <td>:</td>
                        <td>
                          {formik.values.kewarganegaraan_asal_pemohon_text}
                        </td>
                      </tr>
                      <tr>
                        <td>5. Adalah Isteri/Suami dari</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>&nbsp; &nbsp; Nama Lengkap</td>
                        <td>:</td>
                        <td>{formik.values.nama_pasangan}</td>
                      </tr>
                      <tr>
                        <td>&nbsp; &nbsp; Tempat dan Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                          {formik.values.tempat_lahir_pasangan ===
                          "Dalam Negeri"
                            ? formik.values.provinsi_lahir_pasangan_text
                            : formik.values.negara_lahir_pasangan_text}
                          ,{" "}
                          {formatDateToIndonesian(
                            formik.values.tgl_lahir_pasangan
                          )}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp; &nbsp; Kewarganegaraan</td>
                        <td>:</td>
                        <td>{formik.values.kewarganegaraan_pasangan_text}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Paragraf Pengantar Lampiran */}
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <p>
                    Berdasarkan kutipan akte perkawinan/buku nikah nomor 372819
                    tanggal 17 Mei 2017, dengan ini menyampaikan pernyataan
                    untuk memperoleh Kewarganegaraan Republik Indonesia
                    mengikuti suami/isteri berdasarkan Pasal 19 Undang-Undang
                    Nomor 12 Tahun 2006. Untuk melengkapi permohonan pendaftaran
                    ini saya lampirkan :
                  </p>
                </div>

                {/* Daftar Persyaratan/Lampiran */}
                <ol
                  style={{
                    listStyleType: "decimal",
                    marginLeft: 20,
                    fontSize: 12,
                    lineHeight: 1.8,
                  }}
                >
                  <li>
                    Fotokopi akta kelahiran Pemohon yang telah diterjemahkan ke
                    dalam Bahasa Indonesia oleh penerjemah resmi tersumpah dan
                    telah dilegalisasi oleh pejabat berwenang;
                  </li>
                  <li>
                    Fotokopi KITAP (Kartu Izin Tinggal Tetap) pemohon yang masih
                    berlaku dan telah dilegalisasi.
                  </li>
                  <li>
                    Fotokopi akta kelahiran suami atau isteri Pemohon yang telah
                    dilegalisasi oleh pejabat yang berwenang;
                  </li>
                  <li>
                    Fotokopi kartu tanda penduduk suami atau isteri Pemohon yang
                    telah dilegalisasi oleh pejabat yang berwenang;
                  </li>
                  <li>
                    Fotokopi akta perkawinan/buku nikah Pemohon dari suami atau
                    isteri yang telah diterjemahkan ke dalam Bahasa Indonesia
                    oleh penerjemah resmi tersumpah dan dilegalisasi oleh
                    pejabat berwenang;
                  </li>
                  <li>
                    Asli surat keterangan dari kantor imigrasi di tempat tinggal
                    Pemohon yang menerangkan bahwa Pemohon telah bertempat
                    tinggal di Indonesia paling singkat 5 (lima) tahun
                    berturut-turut atau paling singkat 10 (sepuluh) tahun tidak
                    berturut-turut;
                  </li>
                  <li>
                    Asli surat keterangan catatan kepolisian yang dikeluarkan
                    oleh Markas Besar Kepolisian Negara Republik Indonesia yang
                    masih berlaku;
                  </li>
                  <li>
                    Asli surat keterangan dari perwakilan negara Pemohon yang
                    menerangkan jika Pemohon memperoleh Kewarganegaraan Republik
                    Indonesia maka yang bersangkutan kehilangan
                    kewarganegaraannya;
                  </li>
                  <li>
                    Pas foto Pemohon terbaru berwarna ukuran 4 x 6 cm dengan
                    latar belakang warna merah, berpakaian rapi dan sopan;
                  </li>
                  <li>
                    Asli bukti pembayaran permohonan pernyataan untuk menjadi
                    Warga Negara Indonesia;
                  </li>
                  <li>
                    Asli surat keterangan sehat jasmani dan rohani dari rumah
                    sakit pemerintah;
                  </li>
                  <li>
                    Asli Permohonan secara tertulis dalam bahasa Indonesia di
                    tandatangani diatas kertas bermaterai yang ditujukan kepada
                    Menteri Hukum dan HAM melalui Ditjen AHU;
                  </li>
                  <li>
                    Asli Surat pernyataan alasan pemohon untuk menjadi WNI yang
                    ditulis tangan sendiri di tandatangani dan bermaterai;
                  </li>
                  <li>
                    Asli Surat pernyataan dapat berbahasa Indonesia yang ditulis
                    tangan sendiri di tandatangani dan bermaterai;
                  </li>
                  <li>
                    Asli Surat pernyataan menerangkan nama lengkap pemohon yang
                    akan dipakai dalam Surat Keputusan ditulis tangan sendiri di
                    tandatangani dan bermaterai;
                  </li>
                  <li>
                    Asli Surat pernyataan tertulis bahwa pemohon akan setia
                    kepada negara kesatuan RI, Pancasila, Undang-Undang Dasar
                    Negara RI tahun 1945 dan akan membelanya dengan
                    sungguh-sungguh serta menjalankan kewajiban untuk menjadi
                    WNI dengan tulus dan ikhlas ditulis tangan sendiri di
                    tandatangani dan bermaterai.
                  </li>
                </ol>

                {/* Penutup Surat */}
                <div
                  style={{
                    marginTop: 50,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div>
                    <div style={{ textAlign: "right" }}>
                      {formik.values.kab_kota_pemohon_text},{" "}
                      {formatDateToIndonesian(new Date())}
                    </div>
                    <div style={{ textAlign: "center" }}>Yang menyatakan</div>
                    <div style={{ height: 40 }} />
                    <div style={{ textAlign: "center" }}>materai</div>
                    <div style={{ height: 40 }} />
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {formik.values.nama_lengkap_pemohon}
                    </div>
                  </div>
                </div>
              </div>
            </Box>

            {/* UNCONTROLLED CHECKBOX SOLUTION */}
            <Box
              sx={{
                borderRadius: 2,
                mb: 3,
                maxWidth: 890,
                margin: "0 auto",
              }}
              xs="12"
              className="d-flex flex-row gap-2 px-4 justify-content-between"
              style={{ marginBottom: "32px", marginTop: "32px" }}
            >
              {/* UNCONTROLLED CHECKBOX */}
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    padding: "8px",
                    border: isChecked
                      ? "2px solid #28a745"
                      : formik.errors.suratPermohonan &&
                        formik.touched.suratPermohonan
                      ? "2px solid #dc3545"
                      : "",
                    borderRadius: "8px",
                    backgroundColor: isChecked
                      ? "#d4edda"
                      : formik.errors.suratPermohonan &&
                        formik.touched.suratPermohonan
                      ? "#f8d7da"
                      : "white",
                    transition: "all 0.3s",
                  }}
                >
                  {/* UNCONTROLLED CHECKBOX - NO checked prop */}
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    style={{
                      marginRight: "12px",
                      marginTop: "4px",
                      transform: "scale(1.3)",
                      cursor: "pointer",
                    }}
                  />
                  <span>
                    Pastikan pengisian data yang telah anda isi sudah benar dan
                    lengkap
                  </span>
                </label>

                {/* Error Display */}
                {formik.errors.suratPermohonan &&
                  formik.touched.suratPermohonan && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "12px",
                        marginTop: "8px",
                        marginLeft: "",
                        fontWeight: "500",
                      }}
                    >
                      ⚠️ {formik.errors.suratPermohonan}
                    </div>
                  )}
              </div>

              {/* Download Button */}
              <CustomButton
                text={"Download"}
                leftIcon={<FaFilePdf />}
                textColor="#041662"
                bgColor="transparent"
                border="1px solid #E7E7E7"
                onClick={handleDownload}
                sx={{ height: "45px" }}
              />
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
