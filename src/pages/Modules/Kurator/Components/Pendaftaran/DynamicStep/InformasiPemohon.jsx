import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "../../../../Fidusia/Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { dummyJenisKelamin } from "../../mock";
import RegionNested from "@/components/RegionNested";
const InformasiPemohon = ({ formik, disabled }) => {
  return (
    <>
      {/* Informasi Pemohon Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Informasi Pemohon"} disabled={disabled} />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="nama"
            type="text"
            placeholder="Nama"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="nama_gelar_depan"
            type="text"
            placeholder="Nama Gelar Depan"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="gelar_s1"
            type="text"
            placeholder="Gelar S1"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="gelar_s2"
            type="text"
            placeholder="Gelar S2"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="nik"
            type="text"
            placeholder="NIK"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="npwp"
            type="text"
            placeholder="NPWP"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={"agama"}
            data={[]}
            label="Agama"
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={"jenis_kelamin"}
            data={dummyJenisKelamin}
            label="Jenis Kelamin"
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="email"
            type="text"
            placeholder="Email"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="no_hp"
            type="text"
            placeholder="Nomor HP"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="no_hp"
            type="text"
            placeholder="Nomor HP"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={"tempat_lahir"}
            data={[]}
            label="Tempat Lahir"
            required
          />
        </Col>
        <Col xs="3" className="px-3">
          <FormInput
            formik={formik}
            name="tanggal_lahir"
            type="date"
            placeholder="Tanggal Lahir"
            readonly={disabled}
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={"profesi"}
            data={[]}
            label="Profesi"
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={"organisasi"}
            data={[]}
            label="Organisasi"
            required
          />
        </Col>
      </Row>
      {/* Alamat Kantor Section */}
      <Row>
        <Col xs="12" md="12">
          <Header label={"Alamat Kantor"} disabled={disabled} />
        </Col>
        <RegionNested
          formik={formik}
          disabled={disabled}
          provinsiKey="provinsi_kantor"
          kabupatenKey="kabupaten_kantor"
          kecamatanKey="kecamatan_kantor"
          kelurahanKey="kelurahan_kantor"
          showNegara={false}
          col="3"
          required
        />
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="alamat"
            placeholder="Alamat"
            type="text"
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="rt_kantor"
            placeholder="RT"
            type="number"
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="rw_kantor"
            placeholder="RW"
            type="number"
            required
          />
        </Col>
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <FormInput
            formik={formik}
            name="kode_pos_kantor"
            placeholder="Kode Pos"
            type="number"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiPemohon;
