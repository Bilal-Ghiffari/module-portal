import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Row, Col } from "reactstrap";
import { dummyJenisKelamin } from "../../mock";
import { Label } from "reactstrap";
import Checked from "@/components/Common/Checked";
import RegionNested from "@/components/RegionNested";
import { renderFileUpload } from "@/components/Common/UploadFileWithAPI";
import Header from "@/components/Header";

const DiriSendiri = ({ formik, disabled, dropdown }) => {
  return (
    <Row>
      <Col xs="12" md="12" lg="12" className="px-3">
        <Header label={"Informasi Pemohon"} />
      </Col>
      <Col xs="12" md="12" lg="12" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="fullname_pemohon"
          placeholder="Nama Lengkap"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="nik_pemohon"
          type="text"
          placeholder="NIK"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="email_pemohon"
          type="email"
          placeholder="Email"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="no_hp_pemohon"
          type="tel"
          placeholder="Nomor Telepon"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="4" className="px-3">
        <FormInput
          formik={formik}
          name="tanggal_lahir_pemohon"
          type="date"
          placeholder="Tanggal Lahir"
          readonly={disabled}
          required
        />
      </Col>

      <Col xs="12" md="6" lg="4" xl="4" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={"jenis_kelamin_pemohon"}
          data={dummyJenisKelamin}
          label="Jenis Kelamin"
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="4" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={"id_negara_tinggal_pemohon"}
          data={dropdown.negara}
          label="Negara Tempat Tinggal "
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="6" className="px-3">
        <FormInput
          formik={formik}
          name="alamat_pemohon"
          type="text"
          placeholder="Alamat"
          readonly={disabled}
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="6" className="px-3">
        {renderFileUpload("File Identitas Pemohon", "ktp_pemohon", formik)}
      </Col>
      <Col xs="3" className="px-3">
        <Label className="mb-0" style={{ fontSize: "12px" }}>
          Tempat Lahir <span className="text-danger">*</span>
        </Label>
        <div
          className="d-flex align-items-center gap-5 mt-1"
          style={{ padding: "0px 22px" }}
        >
          <Checked
            key={`dalam_negeri-${formik.values.tempat_lahir_pemohon}`}
            label="Dalam Negeri"
            value="dalam_negeri"
            fieldName="tempat_lahir_pemohon"
            formik={formik}
            type="radio"
          />
          <Checked
            key={`luar_negeri-${formik.values.tempat_lahir_pemohon}`}
            label="Luar Negeri"
            value="luar_negeri"
            fieldName="tempat_lahir_pemohon"
            formik={formik}
            type="radio"
          />
        </div>
      </Col>
      <Col xs="9" className="px-3 mt-2">
        <RegionNested
          formik={formik}
          provinsiKey="id_provinsi_lahir_pemohon"
          kabupatenKey="id_kab_kota_lahir_pemohon"
          negaraKey="id_negara_lahir_pemohon"
          showProvinsi={
            formik.values.tempat_lahir_pemohon == "luar_negeri" ? false : true
          }
          showKabupaten={
            formik.values.tempat_lahir_pemohon == "luar_negeri" ? false : true
          }
          showKecamatan={false}
          showKelurahan={false}
          showNegara={
            formik.values.tempat_lahir_pemohon == "luar_negeri" ? true : false
          }
          required
        />
      </Col>
    </Row>
  );
};

export default DiriSendiri;
