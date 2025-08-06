// 📄 views/Pratinjau.jsx

import { CustomButton } from "@/components/Common/Button";
import { FormHeader } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { RowField } from "../../../components/Listing";
import LineDashed from "@/components/Common/Line/Dashed";
import Checked from "@/components/Common/Checked";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { usePostPermohonan } from "../hooks/usePostPermohonan";

const PratinjauPermohonanWasiat = ({ formik, setActiveStep }) => {
  const { values } = formik;
  const toastify = new ToastifyService();
  const { loading } = usePostPermohonan();

  const handleSubmit = () => {
    if (!values.pratinjau) {
      toastify.customWarningMsg(
        "Harap menyetujui bahwa formulir yang diisi sudah benar"
      );
      return;
    }
    formik.handleSubmit();
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="page-content">
      <h4 className="mb-4">Pratinjau Formulir</h4>

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
              <Col md="6">{RowField("Nama Notaris")}</Col>
              <Col md="6">{RowField("Tahun Pelaporan")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Provinsi Notaris")}</Col>
              <Col md="6">{RowField("Bulan Pelaporan")}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kabupaten Notaris")}</Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Informasi Akta Wasiat" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">{RowField("Jenis Akta", values.jenis_akta)}</Col>
              <Col md="6">
                {RowField("Tanggal Akta Wasiat", values.tgl_akta)}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField("Nomor Akta Wasiat", values.nomor_akta)}
              </Col>
              <Col md="6">
                {RowField("Nomor Repertorium", values.no_repertorium)}
              </Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Informasi Pemberi Wasiat" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">
                {RowField("Nama Lengkap", values.nama_lengkap_pemberi)}
              </Col>
              <Col md="6">
                {RowField("Pekerjaan", values.pekerjaan_pemberi)}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField("Dahulu Bernama/Alias", values.alias_pemberi)}
              </Col>
              <Col md="6">
                {RowField("Tempat Lahir", values.tempat_lahir_pemberi)}
              </Col>
            </Row>
            <Row>
              <Col md="6">{RowField("NIK", values.nik_pemberi)}</Col>
              <Col md="6">
                {RowField("Tanggal Lahir", values.tgl_lahir_pemberi)}
              </Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <FormHeader title="Alamat Pemberi Wasiat" />
          <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
            <Row>
              <Col md="6">
                {RowField("Provinsi", values.id_provinsi_pemberi)}
              </Col>
              <Col md="6">{RowField("RT", values.rt_pemberi)}</Col>
            </Row>
            <Row>
              <Col md="6">
                {RowField("Kab/Kota", values.id_kab_kota_pemberi)}
              </Col>
              <Col md="6">{RowField("RW", values.rw_pemberi)}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kecamatan", values.id_kec_pemberi)}</Col>
              <Col md="6">{RowField("Kode Pos", values.kode_pos_pemberi)}</Col>
            </Row>
            <Row>
              <Col md="6">{RowField("Kelurahan", values.id_kel_pemberi)}</Col>
              <Col md="6">{RowField("Alamat", values.alamat_pemberi)}</Col>
            </Row>
          </Box>
        </>
        <LineDashed />
        <>
          <Box className="form-horizontal px-4 py-3">
            <Checked
              fontSize="0.85rem"
              label="Jika saya dalam proses pengisian data pada format isian tidak sesuai dengan data yang sebenarnya, maka saya bersedia menerima sanksi sesuai dengan peraturan perundang-undangan."
              value="1"
              fieldName={"pratinjau"}
              formik={formik}
            />
          </Box>
        </>
        <LineDashed />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "flex-end",
            alignItems: "flex-end",
            pt: 3,
            mt: 2,
            pb: { xs: 2, sm: 2 },
          }}
        >
          <CustomButton
            onClick={handleBack}
            text="Kembali"
            bgColor="transparent"
            border="1px solid #E7E7E7"
            textColor="#041662"
            style={{ width: "fit-content" }}
          />
          <CustomButton
            onClick={handleSubmit}
            text="Buat Permohonan"
            bgColor="#041662"
            hoverColor="#1e40af"
            style={{ width: "fit-content" }}
            loading={loading}
          />
        </Box>
      </Box>
    </div>
  );
};

export default PratinjauPermohonanWasiat;
