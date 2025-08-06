import { Box } from "@mui/material";
import CheckIcon from "@/assets/icons/check.png";

const SuccessSection = () => (
  <div
    style={{
      maxWidth: "70%",
      margin: "40px auto",
      padding: 32,
      borderRadius: 12,
      textAlign: "center",
      border: "1px solid #E7E7E7",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Box>
      <img
        src={CheckIcon}
        alt="Success"
        style={{
          width: 80,
          height: 80,
        }}
      />
      <h2 style={{ color: "#222", margin: "24px 0 20px", fontSize: 28 }}>
        Pendaftaran berhasil
      </h2>
    </Box>
    <Box
      sx={{
        borderTop: 0.5,
        borderColor: "#E7E7E7",
      }}
    >
      <p
        style={{
          color: "#5D5D5D",
          fontSize: 14,
          lineHeight: 1.6,
          paddingTop: 8,
          marginTop: 10,
        }}
      >
        Verifikasi akan dilakukan setelah dokumen fisik diterima secara lengkap
        oleh Subdit Pewarganegaraan dalam waktu paling lama 5 (lima) hari
        terhiitung sejak tanggal permohonan diterima.
      </p>
    </Box>
  </div>
);

export default SuccessSection;
