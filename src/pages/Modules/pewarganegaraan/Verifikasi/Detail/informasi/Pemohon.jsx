import { Col } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { BsPlus } from "react-icons/bs";

const PemohonSection = ({ formik }) => {
  return (
    <Row>
      <Row>
        <Col>
          <FormHeader title={"Informasi Pribadi"} />
          <Box className="form-horizontal">
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="namaLengkapPemohon"
                  placeholder="Tulis nama lengkap"
                  title="Nama Lengkap"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="kewarganegaraanAsal"
                  title="kewarganegaraan Asal"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tempatLahir"
                  title="Tempat Lahir"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tanggalLahir"
                  title="Tanggal Lahir"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="jenisKelamin"
                  title="Jenis Kelamin"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="agama"
                  title="Agama"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <FormInput
                formik={formik}
                name="pekerjaan"
                title="pekerjaan"
                readonly={true}
                placeholder="!"
              />
            </Row>
          </Box>
        </Col>
        <Col>
          <FormHeader title={"Informasi Pernikahan"} />
          <Box className="form-horizontal">
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="statusPerkawinan"
                  title="Status Perkawinan"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tanggalPernikahan"
                  title="Tanggal Pernikahan"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="nomorAktaNikah"
                  title="Nomor Buku Nikah / Akta Nikah"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="nomorSkim"
                  title="Nomor SKIM (Surat Keterangan Keimigrasian)"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormHeader title={"Data Alamat"} />
          <Box className="form-horizontal">
            <Row>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="provinsi"
                  placeholder="!"
                  title="Provinsi"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="kabupaten"
                  placeholder="!"
                  title="Kabupaten/Kota"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="kecamatan"
                  placeholder="!"
                  title="Kecamatan"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="kelurahan"
                  placeholder="!"
                  title="Kelurahan"
                  readonly={true}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="nomorHp"
                  placeholder="!"
                  title="Nomor HP"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="email"
                  placeholder="!"
                  title="Email"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="2">
                <FormInput
                  formik={formik}
                  name="rt"
                  placeholder="!"
                  title="RT"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="2">
                <FormInput
                  formik={formik}
                  name="rw"
                  placeholder="!"
                  title="RW"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="2">
                <FormInput
                  formik={formik}
                  name="kodePos"
                  placeholder="!"
                  title="Kode Pos"
                  readonly={true}
                />
              </Col>
            </Row>
            <Col>
              <FormInput
                formik={formik}
                name="alamatRumah"
                placeholder="!"
                title="Alamat Rumah"
                readonly={true}
              />
            </Col>
          </Box>
        </Col>
      </Row>
    </Row>
  );
};

export default PemohonSection;
