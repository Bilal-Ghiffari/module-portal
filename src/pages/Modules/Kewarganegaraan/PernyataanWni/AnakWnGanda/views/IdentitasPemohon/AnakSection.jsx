import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import {
  JENIS_KELAMIN_OPTIONS,
  TEMPAT_TINGGAL_OPTIONS,
} from "../../../Constant/master";
import { BsPlus } from "react-icons/bs";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { apiGetDropdownKotakab } from "../../../services/api";
import { warningMsg } from "@/helpers/Notification/toastNotification";
import { transformData } from "@/pages/Modules/Kewarganegaraan/utils/transform";

const InformasiAnakSection = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const { negara, provinsi, statusKawin, pekerjaan } = useSelector(
    (state) => state.master
  );
  const isDalamNegeri = values.tempat_lahir_pemohon === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_pemohon === "Luar Negeri";
  const [loading, setLoading] = useState(false);
  const [kotaKabLahir, setKotaKabLahir] = useState([]);

  const fetchKotaKab = async (id_provinsi) => {
    setLoading(true);
    try {
      const response = await apiGetDropdownKotakab(id_provinsi);
      const transformedData = transformData(response.data);
      setKotaKabLahir(transformedData);
    } catch (error) {
      warningMsg("Terjadi kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (values.tempat_lahir_pemohon === "Luar Negeri") {
      setFieldValue("id_provinsi_lahir_pemohon", "");
      setFieldValue("id_kab_kota_lahir_pemohon", "");
    } else if (values.tempat_lahir_pemohon === "Dalam Negeri") {
      setFieldValue("id_negara_lahir_pemohon", "");
    }
  }, [values.tempat_lahir_pemohon, setFieldValue]);

  useEffect(() => {
    if (values.id_provinsi_lahir_pemohon) {
      fetchKotaKab(values.id_provinsi_lahir_pemohon);
    }
  }, [values.id_provinsi_lahir_pemohon, setFieldValue]);

  return (
    <>
      <FormHeader title={"Informasi Anak"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_lengkap_pemohon"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nik_pemohon"
              placeholder={"Tulis NIK/NIT"}
              title="Nomor Induk Kependudukan/Tunggal"
              type="number"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="no_hp_pemohon"
              title="Nomor HP (Diikuti Kode Negara)"
              placeholder={"62 ..."}
              leftIcon={<BsPlus size={12} />}
              required
              type="number"
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="no_telp_pemohon"
              title="Nomor Telepon Rumah"
              placeholder={"Tulis nomor telepon"}
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="jenis_kelamin_pemohon"
              placeholder="Jenis Kelamin"
              options={JENIS_KELAMIN_OPTIONS}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="status_kawin_pemohon"
              placeholder="status perkawinan"
              options={statusKawin.data}
              title="Status Perkawinan "
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="email_pemohon"
              placeholder={"Tulis alamat email aktif"}
              title="Email"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_pekerjaan_pemohon"
              placeholder="pekerjaan saat ini"
              options={pekerjaan.data}
              title="Pekerjaan"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="tempat_lahir_pemohon"
              placeholder="Tempat lahir"
              options={TEMPAT_TINGGAL_OPTIONS}
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_pemohon"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kwn_pemohon"
              title="Kewarganegaraan Kelahiran"
              options={[{ label: "Indonesia", value: 76 }]}
              placeholder={"Indonesia"}
              required
              isDisabled
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kwn_asing_pemohon"
              placeholder="kewarganegaraan asing"
              options={negara.data}
              title="Kewarganegaraan Asing"
              required
            />
          </Col>
        </Row>
        <Row>
          {isDalamNegeri && (
            <>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormAutocomplete
                  formik={formik}
                  name="id_provinsi_lahir_pemohon"
                  title="Provinsi Kelahiran"
                  options={provinsi.data}
                  placeholder={"Pilih provinsi kelahiran"}
                  required
                />
              </Col>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormAutocomplete
                  formik={formik}
                  name="id_kab_kota_lahir_pemohon"
                  title="Kab/Kota kelahiran"
                  options={kotaKabLahir}
                  placeholder={"Pilih kota/Kab kelahiran"}
                  isDisabled={loading || !values.id_provinsi_lahir_pemohon}
                  required
                />
              </Col>
            </>
          )}

          {isLuarNegeri && (
            <Col xs="12" md="12" lg="6" xl="6">
              <FormAutocomplete
                formik={formik}
                name="id_negara_lahir_pemohon"
                placeholder="Masukkan Negara Kelahiran"
                options={negara.data}
                title="Negara Kelahiran"
                required
              />
            </Col>
          )}
        </Row>
      </Box>
    </>
  );
};

export default InformasiAnakSection;
