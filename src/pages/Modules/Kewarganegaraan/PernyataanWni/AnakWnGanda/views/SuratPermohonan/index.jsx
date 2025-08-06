import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checked from "@/components/Common/Checked";
import { CustomButton } from "@/components/Common/Button";
import { FaFilePdf } from "react-icons/fa";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

export default function SuratPermohonanWnGanda({ formik }) {
  const suratRef = useRef(null);
  const { values } = formik;

  console.log("FOR SURAT", values);

  const isDalamNegeri = values.tempat_lahir_pemohon === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_pemohon === "Luar Negeri";
  const renderTempatLahir = isDalamNegeri
    ? values.provinsi_lahir_pemohon_text
    : values.negara_lahir_pemohon_text;

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

      pdf.save("Surat-pernyataan.pdf");
    }
  };

  return (
    <div className="mt-5 mb-3 px-2">
      <div
        style={{ border: "1px solid #E7E7E7", borderRadius: 20, padding: 16 }}
      >
        <div className="row">
          <div className="col">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                marginBottom: 24,
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
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    marginBottom: 30,
                  }}
                >
                  FORMULIR PERNYATAAN PERMOHONAN PENYAMPAIAN PERNYATAAN MEMILIH
                  KEWARGANEGARAAN REPUBLIK INDONESIA BAGI ANAK
                  BERKEWARGANEGARAAN GANDA
                </div>

                <div style={{ marginTop: 20 }}>
                  <table style={{ fontSize: 12, width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "15%" }}>Lampiran</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          <div
                            style={{
                              minWidth: 200,
                              height: 22,
                            }}
                          >
                            1 (satu) Berkas
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "15%" }}>Perihal</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          <div
                            style={{
                              minWidth: 200,
                              height: 22,
                            }}
                          >
                            Pernyataan Permohonan Penyampaian Pernyataan Memilih
                            Kewarganegaraan Republik Indonesia Bagi Anak
                            Berkewarganegaraan Ganda
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ fontSize: 12, marginTop: 30, lineHeight: 1.6 }}>
                  <div style={{ marginBottom: 20 }}>
                    Merujuk pada Pasal 5 Undang-Undang Nomor 12 Tahun 2006
                    tentang Kewarganegaraan Republik Indonesia Juncto Pasal 49
                    Peraturan Pemerintah Nomor 2 Tahun 2007 tentang Tata Cara
                    Memperoleh, Kehilangan, Pembatalan, dan Memperoleh kembali
                    Kewarganegaraan Republik Indonesia, bersama ini dengan
                    hormat saya :
                  </div>

                  <table
                    style={{ width: "100%", marginTop: 20, marginBottom: 30 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "25%", verticalAlign: "top" }}>
                          Nama
                        </td>
                        <td style={{ width: "3%" }}>:</td>
                        <td>{values.nama_lengkap_pemohon}</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>Jenis Kelamin</td>
                        <td>:</td>
                        <td>{values.jenis_kelamin_pemohon}</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Tempat/Tanggal Lahir
                        </td>
                        <td>:</td>
                        <td>
                          {renderTempatLahir || values.id_negara_lahir_pemohon},{" "}
                          {formatDateToIndonesian(values.tgl_lahir_pemohon)}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Kewarganegaraan
                        </td>
                        <td>:</td>
                        <td>
                          {values.kwn_pemohon_text} &{" "}
                          {values.kwn_asing_pemohon_text}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>Pekerjaan</td>
                        <td>:</td>
                        <td>Pelajar</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Alamat Tempat Tinggal
                        </td>
                        <td>:</td>
                        <td>
                          <div>{values.alamat_tinggal_pemohon}</div>
                          <div style={{ marginLeft: 20, marginTop: 10 }}>
                            <div>1. Paspor Republik Indonesia :</div>
                            <div style={{ marginLeft: 20 }}>
                              <div>- nomor : {values.no_paspor_ri_pemohon}</div>
                              <div>
                                - dikeluarkan di :{" "}
                                {values.wilayah_paspor_ri_pemohon_text}
                              </div>
                              <div>
                                - berlaku sampai dengan :{" "}
                                {formatDateToIndonesian(
                                  values.tgl_exp_paspor_ri_pemohon
                                )}
                              </div>
                            </div>
                            <div>2. Paspor Kebangsaan :</div>
                            <div style={{ marginLeft: 20 }}>
                              <div>
                                - nomor : {values.no_paspor_kebangsaan_pemohon}
                              </div>
                              <div>
                                - dikeluarkan di :{" "}
                                {values.negara_paspor_kebangsaan_pemohon_text}
                              </div>
                              <div>
                                - berlaku sampai dengan :{" "}
                                {formatDateToIndonesian(
                                  values.tgl_exp_paspor_kebangsaan_pemohon
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Nomor Surat WNI/Surat Asal
                        </td>
                        <td>:</td>
                        <td>
                          <div>
                            Nomor {values.no_dok_keimigrasian_pemohon}{" "}
                            diterbitkan tanggal{" "}
                            {formatDateToIndonesian(
                              values.tgl_dok_keimigrasian_pemohon
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>Orang Tua</td>
                        <td>:</td>
                        <td>
                          <div>1. Ayah :</div>
                          <div style={{ marginLeft: 20 }}>
                            <div>- nama : {values.nama_lengkap_ayah}</div>
                            <div>
                              - kewarganegaraan : {values.kwn_asal_ayah_text}
                            </div>
                          </div>
                          <div>2. Ibu :</div>
                          <div style={{ marginLeft: 20 }}>
                            <div>- nama : {values.nama_lengkap_ibu}</div>
                            <div>
                              - kewarganegaraan : {values.kwn_asal_ibu_text}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ marginBottom: 20 }}>
                    Dengan ini menyampaikan pernyataan untuk Permohonan
                    Penyampaian Pernyataan Memilih Kewarganegaraan Republik
                    Indonesia Bagi Anak Berkewarganegaraan Ganda.
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    Saya menyadari sepenuhnya konsekuensi akibat hukum dengan
                    penyampaian Pernyataan Permohonan Penyampaian Pernyataan
                    Memilih Kewarganegaraan Republik Indonesia Bagi Anak
                    Berkewarganegaraan Ganda, dan akan tunduk pada ketentuan
                    peraturan perundang-undangan.
                  </div>

                  <div style={{ marginBottom: 30 }}>
                    Demikian penyampaian Permohonan Penyampaian Pernyataan
                    Memilih Kewarganegaraan Republik Indonesia Bagi Anak
                    Berkewarganegaraan Ganda ini disampaikan, atas perhatiannya
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
                      <div style={{ textAlign: "center", marginBottom: 10 }}>
                        Yang menyampaikan pernyataan,
                      </div>
                      <div style={{ height: 60 }} />
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {values.nama_lengkap_pemohon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                border: "none",
                marginBottom: 24,
                maxWidth: 890,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 32px",
                  marginBottom: "32px",
                  marginTop: "32px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Checked
                    fontSize="0.95rem"
                    label="Pastikan pengisian data yang telah anda isi sudah benar dan
                    lengkap"
                    value="1"
                    fieldName={`suratPermohonan`}
                    formik={formik}
                  />
                </div>
                <CustomButton
                  text={"Download"}
                  leftIcon={<FaFilePdf />}
                  textColor="#041662"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  onClick={handleDownload}
                />
              </div>
              <Box
                sx={{
                  background: "#FAD9AE",
                  color: "#454545",
                  borderRadius: 4,
                  padding: 5,
                  fontSize: 14,
                }}
              >
                <Typography component="div" sx={{ fontSize: 14 }}>
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
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
