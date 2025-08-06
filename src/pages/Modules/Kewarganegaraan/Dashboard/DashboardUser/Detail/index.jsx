import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import CustomAccordion from "@/components/Common/Accordion";
import { steps } from "./dummy";
import { useParams } from "react-router-dom";
import { useDetailPermohonan } from "../hooks/useDetailPermohonan";
import VerticalStepper from "../components/Stepper";
import SuratKeteranganTerbit from "./SK";
import { useRef } from "react";
import { useSkPermohonan } from "../hooks/useSkPermohonan";
import { useEffect } from "react";
import { useState } from "react";
import { apiGetSkPermohonan } from "../../services/api";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";

const DetailPermohonan = () => {
  const params = useParams();
  const { id } = params;
  const suratPermohonanRef = useRef(null);

  const { data, loading } = useDetailPermohonan({ id });

  const [dataSk, setDataSk] = useState(null);
  const [loadingSk, setLoadingSk] = useState(false);

  const handleDownloadSK = () => {
    if (suratPermohonanRef.current) {
      suratPermohonanRef.current.handleDownload();
    } else {
      console.error("SuratPermohonan component ref is not available.");
    }
  };

  const canShowSk = data.status_aktivitas > 6;

  if (!id) {
    return (
      <Container className="page-content bg-white mt-3">
        <Typography variant="h6">
          ID tidak ditemukan.Harap refresh halaman
        </Typography>
      </Container>
    );
  }

  useEffect(() => {
    const fetchDataSk = async () => {
      if (!id || !data?.status_aktivitas || data.status_aktivitas <= 6) return;

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
        {loading || loadingSk ? (
          <p>Loading...</p>
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
                  <InfoRow label="NIK" value={data.nik_pemohon} />
                  <InfoRow
                    label="Tempat Lahir"
                    value={data.negara_lahir_pemohon_text}
                  />
                  <InfoRow
                    label="Tanggal Lahir"
                    value={formatDateToIndonesian(data.tgl_lahir_pemohon)}
                  />
                  <InfoRow
                    label="Jenis Kelamin"
                    value={data.jenis_kelamin_pemohon}
                  />
                  <InfoRow
                    label="Kewarganegaraan Asal"
                    value={data.kewarganegaraan_asal_pemohon_text}
                  />
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
                    value={data.status_kawin_pemohon}
                  />
                  <InfoRow
                    label="Tanggal Pernikahan"
                    value={formatDateToIndonesian(data.tgl_akta_kawin_pemohon)}
                  />
                  <InfoRow
                    label="Nomor Buku Nikah"
                    value={data.no_akta_kawin_pemohon}
                  />
                  <InfoRow
                    label="Nama Pasangan"
                    value={data.nama_lengkap_pasangan}
                  />
                  <InfoRow
                    label="Tempat Lahir Pasangan"
                    value={data.negara_lahir_pasangan_text}
                  />
                  <InfoRow
                    label="Tanggal Lahir Pasangan"
                    value={formatDateToIndonesian(data.tgl_lahir_pasangan)}
                  />
                  <InfoRow
                    label="Kewarganegaraan Pasangan"
                    value={data.kewarganegaraan_pasangan_text}
                  />
                  <InfoRow
                    label="Alamat Tinggal Pasangan"
                    value={data.alamat_tinggal_pasangan}
                  />
                </CustomAccordion>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, border: "1px dashed #E7E7E7" }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CustomAccordion
                  title="Alamat Tinggal Pemohon"
                  defaultExpanded={false}
                >
                  <InfoRow label="Alamat" value={data.alamat_tinggal_pemohon} />
                  <InfoRow
                    label="Provinsi"
                    value={data.provinsi_tinggal_pemohon_text}
                  />
                  <InfoRow
                    label="Kab/Kota"
                    value={data.kab_kota_tinggal_pemohon_text}
                  />
                  <InfoRow
                    label="Tempat Tinggal"
                    value={data.tempat_tinggal_pemohon}
                  />
                </CustomAccordion>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CustomAccordion title="Kontak" defaultExpanded={false}>
                  <InfoRow label="Email" value={data.email_pemohon} />
                  <InfoRow label="No HP" value={data.no_hp_pemohon} />
                  <InfoRow label="No Telepon" value={data.no_telp_pemohon} />
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
              activeStep={data.status_aktivitas}
              canShowSk={canShowSk}
              onClickSk={handleDownloadSK}
            />
            <div
              style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
            >
              <SuratKeteranganTerbit
                ref={suratPermohonanRef}
                data={data}
                dataSk={dataSk}
              />
            </div>
          </>
        )}
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
