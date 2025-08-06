import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import CustomAccordion from "@/components/Common/Accordion";
import { dummyFormData, steps } from "./dummy";
import HorizontalStep from "@/components/Common/Stepper/HorizontalStepper";

const DetailPermohonan = () => {
  return (
    <Container className="page-content bg-white mt-3">
      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid #E7E7E7",
          padding: "24px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "20px",
            lineHeight: "24px",
            color: "#041662",
          }}
        >
          Pratinjau Formulir
        </Typography>
        <Divider sx={{ my: 2, border: "1px dashed #E7E7E7" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <CustomAccordion title="Informasi Pribadi" defaultExpanded={false}>
              <InfoRow
                label="Nama Lengkap"
                value={dummyFormData.informasiPribadi.namaLengkap}
              />
              <InfoRow
                label="Kewarganegaraan Asal"
                value={dummyFormData.informasiPribadi.kewarganegaraanAsal}
              />
              <InfoRow
                label="Tempat Lahir"
                value={dummyFormData.informasiPribadi.tempatLahir}
              />
              <InfoRow
                label="Jenis Kelamin"
                value={dummyFormData.informasiPribadi.jenisKelamin}
              />
              <InfoRow
                label="Agama"
                value={dummyFormData.informasiPribadi.agama}
              />
              <InfoRow
                label="Pekerjaan"
                value={dummyFormData.informasiPribadi.pekerjaan}
              />
            </CustomAccordion>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomAccordion
              title="Informasi Pernikahan"
              defaultExpanded={false}
            >
              <InfoRow
                label="Status Perkawinan"
                value={dummyFormData.informasiPernikahan.statusPerkawinan}
              />
              <InfoRow
                label="Tanggal Pernikahan"
                value={dummyFormData.informasiPernikahan.tanggalPernikahan}
              />
              <InfoRow
                label="Nomor Buku Nikah"
                value={dummyFormData.informasiPernikahan.nomorBukuNikah}
              />
              <InfoRow
                label="Nomor SKIM"
                value={dummyFormData.informasiPernikahan.nomorSKIM}
              />
            </CustomAccordion>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, border: "1px dashed #E7E7E7" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <CustomAccordion title="Informasi Pribadi" defaultExpanded={false}>
              <InfoRow
                label="Jalan"
                value={dummyFormData.alamatPribadi.jalan}
              />
              <InfoRow
                label="Kelurahan"
                value={dummyFormData.alamatPribadi.kelurahan}
              />
              <InfoRow
                label="Kecamatan"
                value={dummyFormData.alamatPribadi.kecamatan}
              />
              <InfoRow label="Kota" value={dummyFormData.alamatPribadi.kota} />
              <InfoRow
                label="Provinsi"
                value={dummyFormData.alamatPribadi.provinsi}
              />
              <InfoRow
                label="Kode Pos"
                value={dummyFormData.alamatPribadi.kodePos}
              />
            </CustomAccordion>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomAccordion
              title="Informasi Pernikahan"
              defaultExpanded={false}
            >
              <InfoRow
                label="Nama Lengkap"
                value={dummyFormData.informasiPernikahan.namaLengkap}
              />
              <InfoRow
                label="Tempat Lahir"
                value={dummyFormData.informasiPernikahan.tempatLahir}
              />
              <InfoRow
                label="Tanggal Lahir"
                value={dummyFormData.informasiPernikahan.tanggalLahir}
              />
              <InfoRow
                label="Pekerjaan"
                value={dummyFormData.informasiPernikahan.pekerjaan}
              />
              <InfoRow
                label="Alamat"
                value={dummyFormData.informasiPernikahan.alamat}
              />
              <InfoRow
                label="Nomor KTP"
                value={dummyFormData.informasiPernikahan.nomorKTP}
              />
            </CustomAccordion>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, border: "1px dashed #E7E7E7" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "20px",
            lineHeight: "24px",
            color: "#041662",
          }}
        >
          Aktivitas Permohonan
        </Typography>
        <Divider sx={{ my: 2, border: "1px dashed #E7E7E7" }} />
        <HorizontalStep step={steps} activeStep={2} />
      </Box>
    </Container>
  );
};

const InfoRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
    }}
  >
    <Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          fontFamily: "Poppins",
          fontSize: "14px",
          color: "#6D6D6D",
          whiteSpace: "nowrap",
        }}
      >
        {label}:
      </Typography>
    </Box>

    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        fontFamily: "Poppins",
        fontSize: "14px",
        color: "#202020",
        ml: 1,
        wordBreak: "break-word",
      }}
    >
      {value || "-"}
    </Typography>
  </Box>
);

export default DetailPermohonan;
