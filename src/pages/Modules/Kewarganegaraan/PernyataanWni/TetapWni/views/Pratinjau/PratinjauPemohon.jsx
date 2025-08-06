import { FormHeader } from "@/components/Common/FormField";
import { formatDateToIndonesian } from "@/helpers/services/changeTimeIndo";
import { RowField } from "@/pages/Modules/Kewarganegaraan/components/Listing";
import { Box } from "@mui/material";
import { Row, Col } from "reactstrap";

const PratinjauFormPemohon = ({ formik }) => {
  const { values } = formik;

  const previewField = (label, value) => RowField(label, value || "-");

  return (
    <>
      <FormHeader title="Pratinjau Informasi Pemohon" />
      <Box className="form-horizontal border border-1 rounded-4 px-4 py-3">
        <FormHeader title="Informasi Pribadi" />
        <Row>
          <Col md="6">
            {previewField("Nama Lengkap", values.nama_lengkap_pemohon)}
          </Col>
          <Col md="6">{previewField("NIK/NIT", values.nik_pemohon)}</Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField(
              "Tanggal Lahir",
              formatDateToIndonesian(values.tgl_lahir_pemohon)
            )}
          </Col>
          <Col md="6">
            {previewField("Negara Kelahiran", values.negara_lahir_pemohon_text)}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField("Jenis Kelamin", values.jenis_kelamin_pemohon)}
          </Col>
          <Col md="6">
            {previewField("Status Perkawinan", values.status_kawin_pemohon)}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField(
              "Kewarganegaraan Asal",
              values.kewarganegaraan_asal_pemohon_text || ""
            )}
          </Col>
          <Col md="6">
            {previewField("Pekerjaan", values.pekerjaan_pemohon_text)}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField("Provinsi Kelahiran", values.provinsi_pemohon_text)}
          </Col>
          <Col md="6">
            {previewField("Kab/Kota Kelahiran", values.kab_kota_pemohon_text)}
          </Col>
        </Row>

        {/* Alamat */}
        <FormHeader title="Alamat" />
        <Row>
          <Col md="6">
            {previewField("Tempat Tinggal", values.tempat_tinggal_pemohon)}
          </Col>
          {values.tempat_tinggal_pemohon === "Luar Negeri" && (
            <Col md="6">
              {previewField("Negara Tinggal", values.negara_lahir_pemohon_text)}
            </Col>
          )}
          {values.tempat_tinggal_pemohon === "Dalam Negeri" && (
            <>
              <Col md="6">
                {previewField("Provinsi", values.provinsi_tinggal_pemohon_text)}
              </Col>
              <Col md="6">
                {previewField(
                  "Kabupaten/Kota",
                  values.kab_kota_tinggal_pemohon_text
                )}
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col md="6">{previewField("Nomor HP", values.no_hp_pemohon)}</Col>
          <Col md="6">
            {previewField("Nomor Telepon Rumah", values.no_telp_pemohon)}
          </Col>
        </Row>
        <Row>
          <Col md="6">{previewField("Email", values.email_pemohon)}</Col>
          <Col md="6">
            {previewField("Alamat Tinggal", values.alamat_tinggal_pemohon)}
          </Col>
        </Row>

        {/* Dokumen Kependudukan */}
        <FormHeader title="Dokumen Kependudukan" />
        <Row>
          <Col md="6">
            {previewField("No Akta Kelahiran", values.no_akta_lahir_pemohon)}
          </Col>
          <Col md="6">
            {previewField(
              "Tanggal Akta Kelahiran",
              formatDateToIndonesian(values.tgl_akta_lahir_pemohon)
            )}
          </Col>
        </Row>

        {/* Dokumen Perjalanan */}
        <FormHeader title="Dokumen Perjalanan" />
        <Row>
          <Col md="6">
            {previewField("No Paspor RI", values.no_paspor_ri_pemohon)}
          </Col>
          <Col md="6">
            {previewField(
              "Wilayah Terbit Paspor RI",
              values.wilayah_paspor_ri_pemohon_text
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField(
              "Tanggal Kedaluwarsa Paspor RI",
              formatDateToIndonesian(values.tgl_exp_paspor_ri_pemohon)
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField(
              "No Paspor Kebangsaan",
              values.no_paspor_kebangsaan_pemohon
            )}
          </Col>
          <Col md="6">
            {previewField(
              "Wilayah Terbit Paspor Kebangsaan",
              values.wilayah_paspor_kebangsaan_pemohon_text
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {previewField(
              "Tanggal Exp Paspor Kebangsaan",
              formatDateToIndonesian(values.tgl_exp_paspor_kebangsaan_pemohon)
            )}
          </Col>
        </Row>

        {/* Dokumen Perkawinan */}
        <FormHeader title="Dokumen Perkawinan" />
        <Row>
          <Col md="6">
            {previewField("No Akta Perkawinan", values.no_akta_kawin_pemohon)}
          </Col>
          <Col md="6">
            {previewField(
              "Tanggal Akta Perkawinan",
              formatDateToIndonesian(values.tgl_akta_kawin_pemohon)
            )}
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default PratinjauFormPemohon;
