import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import CustomAccordion from "@/components/Common/Accordion";
import { steps } from "./dummy";
import VerticalStepper from "../components/Stepper";
import { useParams } from "react-router-dom";
import { useDetailPermohonan } from "../hooks/useDetailPermohonan";
import SuratKeteranganTerbit from "./SK";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiGetSkPermohonan } from "../../services/api";

const DetailPermohonan = () => {
  const params = useParams();
  const suratPermohonanRef = useRef(null);
  const { id } = params;

  const { data, loading, error } = useDetailPermohonan({ id });
  console.log("DATA DETAIL PERMOHONAN", data);
  // status aktivitas 6 = SK terbit
  const skTerbitStatus = data.status_aktivitas === 6;

  const [dataSk, setDataSk] = useState(null);
  const [loadingSk, setLoadingSk] = useState(false);

  const handleDownloadSK = () => {
    if (suratPermohonanRef.current) {
      suratPermohonanRef.current.handleDownload();
    } else {
      console.error("SuratPermohonan component ref is not available.");
    }
  };

  useEffect(() => {
    const fetchDataSk = async () => {
      if (!id || !data?.status_aktivitas || data.status_aktivitas <= 5) return;
      console.log("APi RUn when status 7");
      try {
        setLoadingSk(true);
        const res = await apiGetSkPermohonan({ id_permohonan: id });
        setDataSk(res?.data || null);
      } catch (err) {
        console.error("Gagal mengambil data SK:", err);
        setDataSk(null);
      } finally {
        setLoadingSk(false);
      }
    };

    fetchDataSk();
  }, [id, data]);

  return (
    <Container className="page-content bg-white mt-3">
      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid #E7E7E7",
          padding: "24px",
        }}
      >
        {error && <p style={{ color: "red" }}>Error : {error.message}</p>}
        {loading || loadingSk ? (
          <p>Loading</p>
        ) : (
          <>
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
                <CustomAccordion
                  title="Informasi Pribadi"
                  defaultExpanded={false}
                >
                  <InfoRow
                    label="Nama Lengkap"
                    value={data.nama_lengkap_pemohon}
                  />
                  <InfoRow
                    label="Kewarganegaraan Asal"
                    value={data.kewarganegaraan_asal_pemohon_text}
                  />
                  <InfoRow
                    label="Jenis Kelamin"
                    value={data.jenis_kelamin_pemohon}
                  />
                  <InfoRow label="Agama" value={data.agama_pemohon} />
                  <InfoRow
                    label="Pekerjaan"
                    value={data.pekerjaan_pemohon_text}
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
                    value={data.status_kawin}
                  />
                  <InfoRow label="Tanggal Pernikahan" value={data.tgl_kawin} />
                  <InfoRow
                    label="Nomor Buku Nikah"
                    value={data.no_buku_nikah}
                  />
                  <InfoRow label="Nomor SKIM" value={data.no_skim} />
                </CustomAccordion>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, border: "1px dashed #E7E7E7" }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CustomAccordion title="Data Alamat" defaultExpanded={false}>
                  <InfoRow
                    label="Provinsi"
                    value={data.provinsi_pemohon_text}
                  />
                  <InfoRow label="Kota" value={data.kab_kota_pemohon_text} />
                  <InfoRow label="Kecamatan" value={data.kec_pemohon_text} />
                  <InfoRow
                    label="Kelurahan"
                    value={data.desa_kel_pemohon_text}
                  />
                  <InfoRow label="Jalan" value={data.alamat_pemohon} />
                  <InfoRow label="Kode Pos" value={data.kode_pos} />
                </CustomAccordion>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CustomAccordion
                  title="Informasi Data Pasangan WNI"
                  defaultExpanded={false}
                >
                  <InfoRow label="Nama Lengkap" value={data.nama_pasangan} />
                  <InfoRow
                    label="Tanggal Lahir"
                    value={data.tgl_lahir_pasangan}
                  />
                  <InfoRow
                    label="Pekerjaan"
                    value={data.pekerjaan_pasangan_text}
                  />
                  <InfoRow
                    label="Negara"
                    value={data.pekerjaan_pasangan_text}
                  />
                  <InfoRow
                    label="Provinsi"
                    value={data.provinsi_lahir_pasangan_text}
                  />
                  <InfoRow
                    label="Kab/Kota"
                    value={data.kab_kota_lahir_pasangan_text}
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
            <VerticalStepper
              step={steps}
              activeStep={data.status_aktivitas - 1}
              onClickSk={handleDownloadSK}
              canShowSk={skTerbitStatus}
            />
          </>
        )}
      </Box>

      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <SuratKeteranganTerbit
          ref={suratPermohonanRef}
          data={data}
          dataSk={dataSk}
        />
      </div>
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
