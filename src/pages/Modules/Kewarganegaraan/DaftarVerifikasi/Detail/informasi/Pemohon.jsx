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
                  name="nama_lengkap_pemohon"
                  placeholder="Tulis nama lengkap"
                  title="Nama Lengkap"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="id_kewarganegaraan_asal_pemohon"
                  title="Kewarganegaraan Asal"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="id_negara_lahir_pemohon"
                  title="Negara kelahiran"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tgl_lahir_pemohon"
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
                  name="jenis_kelamin_pemohon"
                  title="Jenis Kelamin"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <FormInput
                formik={formik}
                name="id_pekerjaan_pemohon"
                title="Pekerjaan"
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
                  name="status_kawin_pemohon"
                  title="Status Perkawinan"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tgl_akta_kawin_pemohon"
                  title="Tanggal Pernikahan"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="no_akta_kawin_pemohon"
                  title="Nomor Buku Nikah / Akta Nikah"
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
          <FormHeader title={"Dokumen Perjalanan"} />
          <Box className="form-horizontal">
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="no_paspor_ri_pemohon"
                  title="Nomor Paspor RI"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="wilayah_paspor_ri_pemohon"
                  title="Wilayah Paspor RI"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tgl_exp_paspor_ri_pemohon"
                  title="Tanggal Exp Paspor RI"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="no_paspor_kebangsaan_pemohon"
                  title="Nomor Paspor Kebangsaan"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="wilayah_paspor_kebangsaan_pemohon"
                  title="Wilayah Paspor Kebangsaan"
                  readonly={true}
                  placeholder="!"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="6">
                <FormInput
                  formik={formik}
                  name="tgl_exp_paspor_kebangsaan_pemohon"
                  title="Tanggal Exp Paspor Kebangsaan"
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
                  name="id_provinsi_tinggal_pemohon"
                  placeholder="!"
                  title="Provinsi"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="id_kab_kota_tinggal_pemohon"
                  placeholder="!"
                  title="Kabupaten/Kota"
                  readonly={true}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="no_hp_pemohon"
                  placeholder="!"
                  title="Nomor HP"
                  readonly={true}
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormInput
                  formik={formik}
                  name="email_pemohon"
                  placeholder="!"
                  title="Email"
                  readonly={true}
                />
              </Col>
            </Row>
            <Col>
              <FormInput
                formik={formik}
                name="alamat_tinggal_pemohon"
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
