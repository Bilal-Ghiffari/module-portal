import { Box } from "@mui/material";
import FormPendafataran from "./Form";
import { CustomButton } from "@/components/Common/Button";
import { useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { Input } from "reactstrap";

const Pendafataran = () => {
  const [isStart, setIsStart] = useState(true); // nanti ganti defaultnya false

  return (
    <div>
      {isStart ? (
        <Box
          className="bg-white page-content mb-4"
          sx={{ width: "100%", minHeight: "100vh" }}
        >
          <FormPendafataran />
        </Box>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Box
            className="bg-white page-content mb-4"
            sx={{ width: "100%", maxWidth: "692px" }}
          >
            <h3 style={{ fontWeight: 500, fontSize: 24, color: "#041662" }}>
              Pendaftaran Commanditaire Vennootschap (CV)
            </h3>

            <hr className="my-4" style={{ borderColor: "#DBEBFE" }} />

            <div className="d-flex flex-column gap-4">
              <section>
                <span>
                  Anda akan memulai proses pendaftaran Commanditaire
                  Vennootschap (CV).
                  <br />
                  Pastikan Anda telah menyiapkan dokumen dan informasi yang
                  dibutuhkan sebelum melanjutkan.
                </span>
              </section>

              <section className="d-flex flex-column gap-2">
                <span>Silahkan masukkan nomor pengajuan Anda</span>
                <Input
                  placeholder="Tulis kode voucher Anda di sini"
                  style={{ padding: "12px 16px", borderRadius: "8px" }}
                />
              </section>

              <section className="d-flex flex-column gap-2">
                <span>
                  Untuk melanjutkan, Anda perlu memasukkan kode voucher layanan
                  terlebih dahulu.
                </span>
                <Input
                  placeholder="Tulis kode voucher Anda di sini"
                  style={{ padding: "12px 16px", borderRadius: "8px" }}
                />
              </section>

              <section className="d-flex flex-column gap-4">
                <span>
                  Jika Anda belum memiliki kode voucher, silakan melakukan
                  pembelian melalui layanan SIMPADHU pada tautan berikut:
                </span>

                <div>
                  <u
                    style={{
                      fontWeight: 500,
                      color: "#041662",
                      cursor: "pointer",
                    }}
                  >
                    Beli Voucher di SIMPADHU
                  </u>
                </div>
              </section>

              <div>
                <CustomButton
                  text="Mulai Pendaftaran"
                  rightIcon={<ArrowForward fontSize="14" />}
                  sx={{ borderRadius: "6px" }}
                  onClick={() => setIsStart(true)}
                />
              </div>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Pendafataran;
