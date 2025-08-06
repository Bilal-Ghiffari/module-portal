import { Box, Typography } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Region from "@/components/Region";
import PopupTable from "../PopupTable";
import TableKegiatanUsaha from "../TableKegiatanUsaha";
import Header from "../../Header";
import RegionNested from "@/components/RegionNested";

const FormIdentitasDiri = ({ formik, disabled = false }) => {
  return (
    <div className="mt-5 mb-3 px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {/* Informasi Perseroan Section */}
        <Row>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-2 mb-3">
            <div
              className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-4 px-3"
              style={{
                backgroundColor: "#FEF7EE",
                fontSize: "12px",
                borderRadius: 5,
              }}
            >
              <CustomTooltipMui title="" arrow>
                <span className="d-flex align-items-center gap-1">
                  <i
                    className="mdi mdi-information fw-bold"
                    style={{ color: "#FFA500", fontSize: "16px" }}
                  />
                  <p className="m-0 p-0">PERHATIAN</p>
                </span>
              </CustomTooltipMui>
              <p className="m-0 p-0 w-75">
                Nama dianggap sudah digunakan setelah terbit Sertifikat
                Pendaftaran. Setelah input data selesai dan permohonan masuk
                dalam daftar transaksi (selama batas waktu konfirmasi belum
                habis), nama untuk sementara tidak dapat digunakan oleh pemohon
                lain.
              </p>
              <p className="m-0 p-0 w-75">
                Jika pemohon tidak melakukan konfirmasi sampai batas waktu yang
                ditentukan, maka transaksi dianggap batal dan nama dapat
                digunakan oleh pemohon yang lainnya (perlakuan yang sama berlaku
                untuk transaksi yang dihapus oleh pemohon).
              </p>
            </div>
          </Col>
          <Col xs="12" md="12">
            <Header label={"Informasi Perseroan"} disabled={disabled} />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6" className="px-3">
            <FormInput
              formik={formik}
              name="nama_perseroan"
              placeholder="Nama Perseroan"
              readonly={disabled}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="email"
              placeholder="Email Perseroan"
              readonly={disabled}
              required
            />
          </Col>
        </Row>

        {/* Data Alamat Section */}
        <Row className="mt-4">
          <Col xs="12">
            <Header label={"Alamat Perseroan"} />
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
              name="alamat_kantor"
              type="text"
              placeholder="Alamat Kantor"
              readonly={disabled}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3" className="px-3">
            <FormInput
              formik={formik}
              name="no_telp_kantor"
              type="tel"
              placeholder="Nomor Telepon"
              readonly={disabled}
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="2" className="px-3">
            <FormInput
              formik={formik}
              name="rt_kantor"
              placeholder="RT"
              type="number"
              readonly={disabled}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2" className="px-3">
            <FormInput
              formik={formik}
              name="rw_kantor"
              placeholder="RW"
              type="number"
              readonly={disabled}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2" className="px-3">
            <FormInput
              formik={formik}
              name="kode_pos_kantor"
              placeholder="Kode Pos"
              type="number"
              readonly={disabled}
              required
            />
          </Col>
        </Row>

        {/* Modal Usaha Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Modal Usaha"} />
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3">
            <div
              className="p-1 px-2 d-flex align-items-center gap-2 mb-2"
              style={{
                backgroundColor: "#FEF7EE",
                fontSize: "12px",
                borderRadius: 5,
              }}
            >
              <CustomTooltipMui
                title="Modal maksimal untuk usaha mikro dan kecil adalah Rp 5 Miliar"
                arrow
              >
                <i
                  className="mdi mdi-information fw-bold"
                  style={{ color: "#FFA500", fontSize: "16px" }}
                />
              </CustomTooltipMui>
              <p className="m-0 p-0">
                Modal maksimal untuk usaha mikro dan kecil adalah Rp 5 Miliar
              </p>
            </div>

            <FormInput
              formik={formik}
              type="text"
              name="total_modal_usaha"
              placeholder="Total Modal Usaha"
              maks={5000000000}
              readonly={disabled}
              required
              isCurrency
            />
          </Col>
        </Row>

        {/* Kegiatan Usaha Section */}
        <Row>
          <Col xs="12" md="12">
            <Box
              className="d-flex align-items-center justify-content-between"
              sx={{
                backgroundColor: "#EFF7FF",
                padding: 1,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#041662",
                  fontSize: "14px",
                  px: 0,
                  fontFamily: "Poppins",
                }}
                className="fw-semibold"
              >
                Kegiatan Usaha
              </Typography>
              {!disabled && <PopupTable formik={formik} />}
            </Box>
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3">
            <TableKegiatanUsaha
              data={formik.values?.kegiatan_usaha}
              total_count={formik.values?.kegiatan_usaha?.length}
              formik={formik}
              showSelect={false}
            />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default FormIdentitasDiri;
