import { FormHeader } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { RowField } from "../../../components/Listing";
import LineDashed from "@/components/Common/Line/Dashed";
import VerticalStepper from "../../../components/Stepper";
import { steps } from "../dummy";

const DetailRiwayatLaporan = () => {
  return (
    <div className="page-content">
      <h4 className="mb-4">Detail Formulir</h4>

      <Box
        sx={{
          borderRadius: "16px",
          border: "1px solid #E7E7E7",
          padding: "16px",
          mb: 4,
        }}
      >
        <>
          <FormHeader title="Informasi Notaris" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">{RowField("Nama Notaris", "Budi Santosa, S.H.")}</Col>
              <Col md="6">{RowField("Tahun Pelaporan", "2025")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Provinsi Notaris", "DKI Jakarta")}</Col>
              <Col md="6">{RowField("Bulan Pelaporan", "Juli")}</Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField("Kabupaten Notaris", "Jakarta Selatan")}
              </Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Informasi Lokasi & Pengadilan" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">{RowField("Dibuat Di Negara", "Belanda")}</Col>
              <Col md="6">{RowField("Kota Kantor Perwakilan", "Den Haag")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kota", "Rotterdam")}</Col>
              <Col md="6">
                {RowField("Nama Kantor Perwakilan RI", "KBRI Den Haag")}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField("Nomor Penetapan Pengadilan", "PN/2025/073")}
              </Col>
              <Col md="6">
                {RowField("Tanggal Penetapan Pengadilan", "2025-06-12")}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField(
                  "Tanggal Pengesahan dari kantor perwakilan RI",
                  "2025-06-15"
                )}
              </Col>
              <Col md="6">
                {RowField("Nama Pemohon Penetapan Pengadilan", "Andi Wijaya")}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField(
                  "Nama Pengadilan Negeri",
                  "Pengadilan Negeri Jakarta Pusat"
                )}
              </Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Informasi Akta Wasiat" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">{RowField("Jenis Akta", "Umum")}</Col>
              <Col md="6">{RowField("Tanggal Akta Wasiat", "2025-05-20")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Nomor Akta Wasiat", "AW/2025/009")}</Col>
              <Col md="6">{RowField("Nomor Repertorium", "REP/2025/441")}</Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Informasi Pemberi Wasiat" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">{RowField("Nama Lengkap", "Maria Christina")}</Col>
              <Col md="6">{RowField("Pekerjaan", "Wiraswasta")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Dahulu Bernama/Alias", "Maria")}</Col>
              <Col md="6">{RowField("Tempat Lahir", "Surabaya")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("NIK", "3578012309980001")}</Col>
              <Col md="6">{RowField("Tanggal Lahir", "1980-09-23")}</Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Alamat Pemberi Wasiat" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">{RowField("Provinsi", "Jawa Timur")}</Col>
              <Col md="6">{RowField("RT", "02")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kab/Kota", "Surabaya")}</Col>
              <Col md="6">{RowField("RW", "08")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kecamatan", "Wonokromo")}</Col>
              <Col md="6">{RowField("Kode Pos", "60243")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kelurahan", "Darmo")}</Col>
              <Col md="6">{RowField("Alamat", "Jl. Raya Darmo No.99")}</Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Aktivitas Permohonan" />
          <VerticalStepper step={steps} activeStep={2} />
        </>
        <LineDashed />
      </Box>
    </div>
  );
};

export default DetailRiwayatLaporan;
