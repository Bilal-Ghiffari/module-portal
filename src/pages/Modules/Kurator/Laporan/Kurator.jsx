import { Box } from "@mui/material";
import { Col, Row, Label } from "reactstrap";
import Header from "@/components/Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import RegionNested from "@/components/RegionNested";
import HeaderAdd from "../Components/HeaderAdd";
import TableDynamic from "../Components/TableDynamic";
import FileUploadComponent from "@/components/Common/UploadFile";
import { filterValidDocuments } from "@/helpers/services/convert";
import { useState } from "react";
import { FormInput } from "@/components/Common/FormField";
import Checked from "@/components/Common/Checked";

const Kurator = ({ formik, disabled, type, fieldData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeEditLabel, setActiveEditLabel] = useState("");
  return (
    <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
      {/* Data Hakim Pengawas dan Kurator Section */}
      <Row>
        <Col xs="12" md="12">
          <Header
            label={"Data Hakim Pengawas dan Kurator"}
            disabled={disabled}
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nomor Putusan"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Tanggal Putusan Pailit"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="12" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nama Hakim Pengawas"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
      </Row>
      {/* Informasi Debitor Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Informasi Debitor"} disabled={disabled} />
        </Col>
        <Col xs="12" className="px-3">
          <Label className="mb-0" style={{ fontSize: "12px" }}>
            Pilih Jenis Debitor
            <span className="text-danger">*</span>
          </Label>
          <div
            className="d-flex align-items-center gap-5 mt-1"
            style={{ padding: "0px 22px" }}
          >
            <Checked
              label="Korporasi"
              value="Korporasi"
              fieldName="jenis_debitor"
              formik={formik}
              type="radio"
            />
            <Checked
              label="Perorangan"
              value="Perorangan"
              fieldName="jenis_debitor"
              formik={formik}
              type="radio"
            />
          </div>
        </Col>
        {formik.values.jenis_debitor == "Korporasi" ? (
          <Col xs="6" className="px-3 mt-2">
            <DynamicDropdown
              formik={formik}
              fieldName={"jenis_korporasi"}
              data={[]}
              label="Jenis Korporasi"
              required
            />
          </Col>
        ) : (
          <Col xs="6" className="px-3 mt-2">
            <DynamicDropdown
              formik={formik}
              fieldName={"pekerjaan_debitor"}
              data={[]}
              label="Pekerjaan Debitor"
              required
            />
          </Col>
        )}
        <Col xs="12" md="6" className="px-3 mt-2">
          <FormInput
            formik={formik}
            placeholder="Nama Debitor"
            type="text"
            required
            usePlaceholder
          />
        </Col>

        <RegionNested
          formik={formik}
          disabled={disabled}
          provinsiKey="provinsi_debitor"
          kabupatenKey="kabupaten_debitor"
          kecamatanKey="kecamatan_debitor"
          kelurahanKey="kelurahan_debitor"
          showNegara={false}
          col="3"
          required
        />
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            placeholder="Alamat"
            type="number"
            required
            usePlaceholder
          />
        </Col>

        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="rt_debitor"
            placeholder="RW"
            type="number"
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="rw_debitor"
            placeholder="RW"
            type="number"
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="kode_pos_debitor"
            placeholder="Kode Pos"
            type="number"
            required
          />
        </Col>
      </Row>
      {/* Data Kurator Section */}
      <Row className="mt-2">
        <Col xs="12" md="12">
          <HeaderAdd
            formik={formik}
            disabled={disabled}
            label={type == "kurator" ? "Data Kurator" : "Data Pengurus"}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            activeEditLabel={activeEditLabel}
            fieldName={type == "kurator" ? "data_kurator" : "data_pengurus"}
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="12" className="px-3">
          <TableDynamic
            data={filterValidDocuments(fieldData)}
            total_count={fieldData?.length}
            formik={formik}
            showSelect={false}
            label={type == "kurator" ? "Data Kurator" : "Data Pengurus"}
            fieldName={type == "kurator" ? "data_kurator" : "data_pengurus"}
            setEditOpen={setEditOpen}
            setEditingIndex={setEditingIndex}
            setActiveEditLabel={setActiveEditLabel}
          />
        </Col>
      </Row>
      {/* Data Kreditor Section */}
      <Row className="mt-4">
        <Col xs="12" md="12">
          <Header label={"Data Kreditor"} disabled={disabled} />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Nama Panitia Kreditor Sementara"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Pekerjaan Panitia Kreditor Sementara"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="4" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Alamat Panitia Kreditor Sementara"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="text"
            placeholder="Tempat Penyelanggaraan Rapat Kreditor Pertama"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        <Col xs="6" className="px-3">
          <FormInput
            formik={formik}
            type="date"
            placeholder="Waktu Penyelanggaraan Rapat Kreditor Pertama"
            readonly={disabled}
            required
            usePlaceholder
          />
        </Col>
        {/* Unggah Dokumen Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Unggah Dokumen"} disabled={disabled} />
          </Col>
          <Col xs="12" className="px-3">
            <FileUploadComponent
              label="Bukti Pengumuman di Surat Kabar Harian 1"
              text="Pilih file Anda"
              name="bukti_pengumuman_surat_kabar_harian_1"
              resFile={(file) =>
                formik.setFieldValue(
                  "bukti_pengumuman_surat_kabar_harian_1",
                  file
                )
              }
              maxSizeMb={10}
              searchLatLon={false}
              validType="pdf"
              specified={true}
              required
              fieldValue={formik.values.bukti_pengumuman_surat_kabar_harian_1}
            />
          </Col>
          <Col xs="12" className="px-3">
            <FileUploadComponent
              label="Bukti Pengumuman di Surat Kabar Harian 2"
              text="Pilih file Anda"
              name="bukti_pengumuman_surat_kabar_harian_2"
              resFile={(file) =>
                formik.setFieldValue(
                  "bukti_pengumuman_surat_kabar_harian_2",
                  file
                )
              }
              maxSizeMb={10}
              searchLatLon={false}
              validType="pdf"
              specified={true}
              required
              fieldValue={formik.values.bukti_pengumuman_surat_kabar_harian_2}
            />
          </Col>
          <Col xs="12" className="px-3">
            <FileUploadComponent
              label="Bukti Pembayaran Pengumuman Dalam Berita Negara Republik Indonesia"
              text="Pilih file Anda"
              name="bukti_pembayaran_pengumuman_dalam_berita"
              resFile={(file) =>
                formik.setFieldValue(
                  "bukti_pembayaran_pengumuman_dalam_berita",
                  file
                )
              }
              maxSizeMb={10}
              searchLatLon={false}
              validType="pdf"
              specified={true}
              required
              fieldValue={
                formik.values.bukti_pembayaran_pengumuman_dalam_berita
              }
            />
          </Col>
        </Row>
      </Row>
    </Box>
  );
};

export default Kurator;
