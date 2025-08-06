import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "../../../../Fidusia/Header";
import Checked from "@/components/Common/Checked";
import { useState } from "react";
import HeaderAdd from "../../HeaderAdd";
import { filterValidDocuments } from "@/helpers/services/convert";
import TableDynamic from "../../TableDynamic";
import InformasiPermohonan from "./InformasiPermohonan";
import AlamatParpol from "./AlamatParpol";
import FilePreview from "@/components/Common/FilePreview";
import FileUploadComponent from "@/components/Common/UploadFile";
import FileUploadBox from "../../FileUploadBox";

const DataPartaiPolitik = ({ formik, disabled = false }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeEditLabel, setActiveEditLabel] = useState("");

  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {/* Informasi Partai Politik Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Informasi Partai Politik"} disabled={disabled} />
          </Col>
          <Col xs="12" className="px-3">
            <Row>
              <Col xs="5" className="px-3">
                <FileUploadBox id="foto_parpol" formik={formik}/>
              </Col>
              <Col xs="7" className="px-3">
                <Row>
                  <Col xs="12" className="px-3">
                    <FormInput
                      formik={formik}
                      name="nama_parpol"
                      type="text"
                      placeholder="Nama Partai Politik (harus diinput keseluruhan nama “PARTAI”)"
                      readonly={disabled}
                      required
                    />
                  </Col>
                  <Col xs="12" className="px-3">
                    <FormInput
                      formik={formik}
                      name="singkatan_nama_parpol"
                      type="text"
                      placeholder="Singkatan Nama Partai politik"
                      readonly={disabled}
                      required
                    />
                  </Col>
                  <Col xs="12" className="px-3">
                    <FormInput
                      formik={formik}
                      name="arti_parpol"
                      type="textarea"
                      placeholder="Arti dari Nama, Lambang, atau Tanda Gambar"
                      readonly={disabled}
                      required
                      rows={6}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xs="12" className="px-4 mb-4">
            <Checked
              label="Dengan ini menyatakan apabila nama dan lambang Partai Politik yang dimohonkan bertentangan dengan peraturan perundang-undangan maka dengan ini pemohon bersedia jika permohonan pengesahan pendirian badan hukum partai politik ini tidak dilanjutkan prosesnya."
              value="1"
              fieldName="rules_1"
              formik={formik}
            />
          </Col>
          <Col xs="12" className="px-3">
            <FormInput
              formik={formik}
              name="asas"
              type="textarea"
              placeholder="Asas"
              readonly={disabled}
              required
            />
          </Col>
          <Col xs="12" className="px-3">
            <FormInput
              formik={formik}
              name="visi"
              type="textarea"
              placeholder="Visi"
              readonly={disabled}
              required
            />
          </Col>
          <Col xs="12" className="px-3">
            <FormInput
              formik={formik}
              name="misi"
              type="textarea"
              placeholder="Misi"
              readonly={disabled}
              required
            />
          </Col>

          <Col xs="12" className="px-4 mb-4">
            <Checked
              label="Dengan ini menyatakan bahwa asas, visi dan misi Partai politik tidak bertentangan dengan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
              value="1"
              fieldName="rules_2"
              formik={formik}
            />
          </Col>
        </Row>
        {/* Data Notaris Section */}
        <Row className="mt-2">
          <Col xs="12" md="12">
            <HeaderAdd
              formik={formik}
              disabled={disabled}
              label={"Data Notaris"}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              activeEditLabel={activeEditLabel}
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-3">
            <TableDynamic
              data={filterValidDocuments(formik.values.notaris)}
              total_count={formik.values.notaris?.length}
              formik={formik}
              showSelect={false}
              label="Data Notaris"
              fieldName="notaris"
              setEditOpen={setEditOpen}
              setEditingIndex={setEditingIndex}
              setActiveEditLabel={setActiveEditLabel}
            />
          </Col>
        </Row>
        {/* Informasi Permohonan Section */}
        <Row className="mt-4">
          <Col xs="12" md="12">
            <HeaderAdd
              formik={formik}
              disabled={true}
              label={"Informasi Permohonan"}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              activeEditLabel={activeEditLabel}
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-3">
            <InformasiPermohonan formik={formik} />
          </Col>
        </Row>
        {/* Alamat Partai Politik Section */}
        <Row className="mt-4">
          <Col xs="12" md="12">
            <HeaderAdd
              formik={formik}
              disabled={true}
              label={"Alamat Partai Politik"}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              activeEditLabel={activeEditLabel}
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-3">
            <AlamatParpol formik={formik} />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default DataPartaiPolitik;
