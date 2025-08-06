import { Box } from "@mui/material";
import InformasiAnakSection from "./AnakSection";
import LineDashed from "@/components/Common/Line/Dashed";
import DataAlamatSection from "./AlamatSection";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import DokPerjalananSection from "./PerjalananSection";

const IdentitasPemohon = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <InformasiAnakSection formik={formik} />
      <LineDashed />
      <DataAlamatSection formik={formik} />
      <LineDashed />
      <>
        <FormHeader title={"Dokumen Kelahiran"} />
        <Box className="form-horizontal">
          <Row>
            <Col xs="12" sm="12" md="6" lg="6" xl="6">
              <FormInput
                formik={formik}
                name="no_akta_lahir_pemohon"
                title="Nomor akta/Bukti kelahiran"
                placeholder={"Tulis nomor akta"}
                required
              />
            </Col>
            <Col xs="12" sm="12" md="6" lg="6" xl="6">
              <FormInput
                formik={formik}
                name="tgl_akta_lahir_pemohon"
                title="Tanggal akta/Bukti kelahiran"
                placeholder={"Masukkan tanggal akta"}
                type="date"
                required
              />
            </Col>
          </Row>
        </Box>
      </>
      <>
        <FormHeader title={"Dokumen Perkawinan Orang Tua"} />
        <Box className="form-horizontal">
          <Row>
            <Col xs="12" md="6" lg="6" xl="6">
              <FormInput
                formik={formik}
                title="Nomor Akta Perkawinan / Buku Nikah / Laporan Kawin"
                name={"no_akta_kawin_ortu_pemohon"}
                placeholder={"Tulis nomor akta nikah"}
                required
              />
            </Col>
            <Col xs="12" md="6" lg="6" xl="6">
              <FormInput
                formik={formik}
                title="Tanggal Akta Perkawinan / Buku Nikah"
                name={"tgl_akta_kawin_ortu_pemohon"}
                placeholder={"Masukkan Tanggal Akta Perkawinan / Buku Nikah"}
                type="date"
                required
              />
            </Col>
          </Row>
        </Box>
        <LineDashed />
        <DokPerjalananSection formik={formik} />
        <LineDashed />
        <>
          <FormHeader title={"Dokumen Keimigrasian"} />
          <Box className="form-horizontal">
            <Row>
              <Col xs="12" md="6" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  title="Nomor SK WNI / Fasilitas Keimigrasian / Surat AHU"
                  name={"no_dok_keimigrasian_pemohon"}
                  placeholder={"Tulis nomor SK WNI"}
                  required
                />
              </Col>
              <Col xs="12" md="6" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  title="Tanggal SK WNI / Fasilitas Keimigrasian / Surat AHU"
                  name={"tgl_dok_keimigrasian_pemohon"}
                  placeholder={"Masukkan Tanggal SK WNI"}
                  type="date"
                  required
                />
              </Col>
            </Row>
          </Box>
        </>
      </>
    </Box>
  );
};

export default IdentitasPemohon;
