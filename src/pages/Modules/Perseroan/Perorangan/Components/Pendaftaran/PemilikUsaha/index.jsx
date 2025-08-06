import { Box, Typography } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Region from "@/components/Region";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Header from "../../Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import Checked from "@/components/Common/Checked";
import { Label } from "reactstrap";
import RegionNested from "@/components/RegionNested";

const PemilikUsaha = ({ formik, disabled = false, label }) => {
  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {label == "Perubahan Data" && (
          <>
            {/* Modal Pemilik Usaha Baru Section */}
            <Row>
              <Col xs="12" md="12">
                <Box
                  className="d-flex align-items-center gap-2"
                  sx={{
                    backgroundColor: "#EFF7FF",
                    padding: 1,
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <CustomTooltipMui title="Lorem Ipsum Produksi 30" arrow>
                    <i
                      className="mdi mdi-progress-question fw-bold text-primary"
                      style={{ fontSize: "14px" }}
                    />
                  </CustomTooltipMui>
                  <p className="m-0 p-0">
                    Apakah Anda ingin melakukan pergantian pemilik usaha?{" "}
                    <span className="text-danger fw-bold">*</span>
                  </p>
                  <div className="d-flex gap-5 mx-5">
                    <Checked
                      label="Ya"
                      value="Ya"
                      fieldName="pergantian_usaha"
                      formik={formik}
                      type="radio"
                    />
                    <Checked
                      label="Tidak"
                      value="Tidak"
                      fieldName="pergantian_usaha"
                      formik={formik}
                      type="radio"
                    />
                  </div>
                </Box>
              </Col>
            </Row>

            {/* Informasi Pemilik Usaha Baru Section */}
            {formik.values.pergantian_usaha == "Ya" && (
              <Row>
                <Col xs="12" md="12">
                  <Header label={"Informasi Pemilik Usaha Baru"} />
                </Col>
                <Col xs="12" md="12" lg="12" xl="6">
                  <FormInput
                    formik={formik}
                    name="nama_lengkap_baru"
                    placeholder="Nama Lengkap"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="nik_baru"
                    type="text"
                    placeholder="NIK"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="no_telp_baru"
                    type="tel"
                    placeholder="Nomor Telepon"
                    required
                    // readonly={disabled}
                  />
                </Col>

                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="tanggal_lahir_baru"
                    type="date"
                    placeholder="Tanggal Lahir"
                    required
                    maksDate="2008-12-31"
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="email_baru"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="npwp_baru"
                    type="text"
                    placeholder="NPWP"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={"jabatan_baru"}
                    data={[{ value: "Direktur", label: "Direktur" }]}
                    label="Jabatan"
                    required
                  />
                </Col>
                <Col xs="12" className="px-3">
                  <Label className="mb-0" style={{ fontSize: "12px" }}>
                    Tempat Lahir <span className="text-danger">*</span>
                  </Label>
                  <div
                    className="d-flex align-items-center gap-5 mt-1"
                    style={{ padding: "0px 22px" }}
                  >
                    <Checked
                      label="Dalam Negeri"
                      value="dalam_negeri"
                      fieldName="tempat_lahir_baru"
                      formik={formik}
                      type="radio"
                    />
                    <Checked
                      label="Luar Negeri"
                      value="luar_negeri"
                      fieldName="tempat_lahir_baru"
                      formik={formik}
                      type="radio"
                    />
                  </div>
                </Col>
                <Col xs="12" className="px-3 mt-2">
                  <RegionNested
                    formik={formik}
                    provinsiKey="pemilik_provinsi_lahir_baru"
                    kabupatenKey="pemilik_kab_kota_lahir_baru"
                    negaraKey="pemilik_negara_lahir_baru"
                    showProvinsi={
                      formik.values.tempat_lahir_baru == "luar_negeri"
                        ? false
                        : true
                    }
                    showKabupaten={
                      formik.values.tempat_lahir_baru == "luar_negeri"
                        ? false
                        : true
                    }
                    showKecamatan={false}
                    showKelurahan={false}
                    showNegara={
                      formik.values.tempat_lahir_baru == "luar_negeri"
                        ? true
                        : false
                    }
                    col="3"
                    required
                  />
                </Col>
              </Row>
            )}
          </>
        )}
        {/* Informasi Pemilik Usaha Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Informasi Pemilik Usaha"} disabled={disabled} />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="nama_lengkap"
              placeholder="Nama Lengkap"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="nik"
              type="text"
              placeholder="NIK"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="no_telp"
              type="tel"
              placeholder="Nomor Telepon"
              required
              readonly={disabled}
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="tanggal_lahir"
              type="date"
              placeholder="Tanggal Lahir"
              required
              readonly={disabled}
              maksDate="2008-12-31"
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="email"
              type="email"
              placeholder="Email"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="npwp"
              type="text"
              placeholder="NPWP"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="jabatan"
              type="text"
              placeholder="Jabatan"
              required
              readonly={true}
            />
          </Col>
          <Col xs="12" className="px-3">
            <Label className="mb-0" style={{ fontSize: "12px" }}>
              Tempat Lahir <span className="text-danger">*</span>
            </Label>
            <div
              className="d-flex align-items-center gap-5 mt-1"
              style={{ padding: "0px 22px" }}
            >
              <Checked
                label="Dalam Negeri"
                value="dalam_negeri"
                fieldName="tempat_lahir"
                formik={formik}
                type="radio"
              />
              <Checked
                label="Luar Negeri"
                value="luar_negeri"
                fieldName="tempat_lahir"
                formik={formik}
                type="radio"
              />
            </div>
          </Col>
          <Col xs="12" className="px-3 mt-2">
            <RegionNested
              formik={formik}
              disabled={disabled}
              provinsiKey="pemilik_provinsi_lahir"
              kabupatenKey="pemilik_kab_kota_lahir"
              negaraKey="pemilik_negara_lahir"
              showProvinsi={
                formik.values.tempat_lahir == "luar_negeri" ? false : true
              }
              showKabupaten={
                formik.values.tempat_lahir == "luar_negeri" ? false : true
              }
              showKecamatan={false}
              showKelurahan={false}
              showNegara={
                formik.values.tempat_lahir == "luar_negeri" ? true : false
              }
              col="3"
              required
            />
          </Col>
        </Row>

        {/* Alamat Pemilik Usaha Section */}
        <Row className="mt-4">
          <Col xs="12">
            <Header label={"Alamat Pemilik Usaha"} />
          </Col>
          <RegionNested
            formik={formik}
            disabled={disabled}
            provinsiKey="provinsi_pemilik"
            kabupatenKey="kabupaten_pemilik"
            kecamatanKey="kecamatan_pemilik"
            kelurahanKey="kelurahan_pemilik"
            showNegara={false}
            col="3"
            required
          />

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="alamat_pemilik"
              type="text"
              required
              placeholder="Alamat"
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="no_telp_pemilik"
              type="tel"
              required
              placeholder="Nomor Telepon"
              readonly={disabled}
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rt_pemilik"
              required
              placeholder="RT"
              type="number"
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rw_pemilik"
              required
              placeholder="RW"
              type="number"
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="kode_pos_pemilik"
              required
              placeholder="Kode Pos"
              type="number"
              readonly={disabled}
            />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default PemilikUsaha;
