import React, { useRef, useState, useEffect } from "react";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { Box, Typography, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checked from "@/components/Common/Checked";
import { CustomButton } from "@/components/Common/Button";
import { FaFilePdf } from "react-icons/fa";
import MessageBox from "@/components/Common/MessageBox";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

export default function SuratPermohonan({ formik }) {
  const suratRef = useRef(null);
  const checkboxRef = useRef(null);
  const currentDate = new Date();

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

      pdf.save("SuratPermohonan.pdf");
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
                  FORMULIR PERNYATAAN TETAP SEBAGAI WARGA NEGARA INDONESIA
                </div>

                <div style={{ fontSize: 12, marginTop: 30, lineHeight: 1.6 }}>
                  <div>Saya yang bertanda tangan dibawah ini :</div>
                  <table
                    style={{ width: "100%", marginTop: 20, marginBottom: 47 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "2%" }}>Nama Lengkap</td>
                        <td style={{ width: "5%" }}>
                          : {formik.values.nama_lengkap_pemohon}
                        </td>
                      </tr>

                      <tr>
                        <td>Tempat/Tanggal Lahir</td>
                        <td>
                          : {formik.values.kab_kota_pemohon_text}, 24 Juli 2025
                        </td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>: {formik.values.jenis_kelamin_pemohon}</td>
                      </tr>
                      <tr>
                        <td>Alamat Tempat Tinggal</td>
                        <td>: {formik.values.alamat_tinggal_pemohon}</td>
                      </tr>
                      <tr>
                        <td>Pekerjaan</td>
                        <td>: {formik.values.pekerjaan_pemohon_text}</td>
                      </tr>
                      <tr>
                        <td>Kewarganegaraan Suami/Istri</td>
                        <td>: {formik.values.kewarganegaraan_pasangan_text}</td>
                      </tr>
                      <tr>
                        <td>Status Perkawinan</td>
                        <td>: KAWIN DENGAN WARGA NEGARA ASING</td>
                      </tr>
                      <tr>
                        <td>Nama Lengkap Suami/Istri</td>
                        <td>: {formik.values.nama_lengkap_pasangan}</td>
                      </tr>
                      <tr>
                        <td>Nomor Paspor</td>
                        <td>
                          <div>
                            1. Paspor Republik Indonesia
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              <li>
                                nomor : {formik.values.no_paspor_ri_pemohon}
                              </li>
                              <li>
                                diterbitkan di:{" "}
                                {formik.values.wilayah_paspor_ri_pemohon_text}
                              </li>
                              <li>
                                berlaku sampai dengan :{" "}
                                {formatDateToIndonesian(
                                  formik.values.tgl_exp_paspor_ri_pemohon
                                )}
                              </li>
                            </ul>
                          </div>
                          <div>
                            2. Paspor Kebangsaan
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              <li>
                                nomor :{" "}
                                {formik.values.no_paspor_kebangsaan_pemohon}
                              </li>
                              <li>
                                diterbitkan di:{" "}
                                {
                                  formik.values
                                    .wilayah_paspor_kebangsaan_pemohon_text
                                }
                              </li>
                              <li>
                                berlaku sampai dengan :{" "}
                                {formatDateToIndonesian(
                                  formik.values
                                    .tgl_exp_paspor_kebangsaan_pemohon
                                )}
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginBottom: 10 }}>
                    Terlebih dahulu diterangkan :
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    Bahwa diindonesia, pada tanggal{" "}
                    {formatDateToIndonesian(currentDate)}, telah dilangsungkan
                    perkawinan antara saya dengan{" "}
                    {formik.values.nama_lengkap_pasangan}.
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    Bahwa suami saya ({formik.values.nama_lengkap_pasangan})
                    adalah kewarganegaraan{" "}
                    {formik.values.kewarganegaraan_pasangan_text || "undefined"}
                    . Bahwa berdasarkan uraian tersebut, saya dengan ini
                    menyatakan untuk tetap mempertahankan kewarganegaraan saya,
                    yaitu Kewarganegaraan Republik Indonesia dan menolak
                    Kewarganegaraan suami saya, yaitu Kewarganegaraan{" "}
                    {formik.values.kewarganegaraan_pasangan_text || "undefined"}
                    .
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    Demikian surat pernyataan ini saya buat dengan sebenarnya
                    tanpa adanya paksaan dan tekanan dari pihak lain manapun
                    juga sehingga segala akibat yang mungkin timbul kemudian
                    hari karena dibuatnya surat pernyataan ini akan menjadi
                    tanggung jawab saya sepenuhnya
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
                        Indonesia, {formatDateToIndonesian(currentDate)}
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
                        {formik.values.nama_lengkap_pemohon}
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
                className="d-flex flex-row gap-2 px-4"
                style={{ marginBottom: "32px", marginTop: "32px" }}
              >
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
                        Pastikan pengisian data yang telah anda isi sudah benar
                        dan lengkap
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
              <MessageBox type="warning">
                Semua dokumen yang perlu untuk diunggah harus disiapkan sebelum
                anda mendaftar secara online. Verifikator tidak akan menerima
                dokumen unggah yang dikirimkan setelah anda mendaftar online.
                <br />
                <br />
                Surat pernyataan ini harus diisi dan ditandatangani di atas
                materai oleh pemohon dan dilampirkan pada saat pendaftaran
                Notaris. Apabila ada hal yang kurang jelas silakan menghubungi:
                Subdit Sertifikasi Notariat, Direktorat Perdata, Direktorat
                Jenderal Administrasi Hukum Umum, Gedung Kementerian Hukum dan
                HAM, Jl. H.R. Rasuna Said Kav 6-7 Kuningan, Jakarta Selatan
                12940, Telp (021) 5202393, pada hari kerja Senin-Jumat pada jam
                pelayanan permohonan HPI.
              </MessageBox>
            </Box>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
