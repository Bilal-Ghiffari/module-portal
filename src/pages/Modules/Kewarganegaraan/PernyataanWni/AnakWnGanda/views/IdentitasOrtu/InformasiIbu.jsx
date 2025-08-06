import { FormHeader, FormInput } from "@/components/Common/FormField";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";
import { transformData } from "@/pages/Modules/Kewarganegaraan/utils/transform";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { apiGetDropdownKotakab } from "../../../services/api";
import { TEMPAT_TINGGAL_OPTIONS } from "../../../Constant/master";

const InformasiIbuSection = ({ formik }) => {
  const { setFieldValue, values } = formik;

  const { statusKawin, negara, provinsi } = useSelector(
    (state) => state.master
  );

  const isDalamNegeri = values.tempat_lahir_ibu === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_ibu === "Luar Negeri";

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
    if (values.tempat_lahir_ibu === "Dalam Negeri") {
      setFieldValue("id_negara_lahir_ibu", "");
    } else if (values.tempat_lahir_ibu === "Luar Negeri") {
      setFieldValue("id_provinsi_lahir_ibu", "");
      setFieldValue("id_kab_kota_lahir_ibu", "");
    }
  }, [values.tempat_lahir_ibu, setFieldValue]);

  useEffect(() => {
    if (values.id_provinsi_lahir_ibu) {
      fetchKotaKab(values.id_provinsi_lahir_ibu);
    }
  }, [values.id_provinsi_lahir_ibu, setFieldValue]);

  return (
    <>
      <FormHeader title={"Informasi Data Ibu"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_lengkap_ibu"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="status_kawin_ibu"
              placeholder="status perkawinan"
              options={statusKawin.data}
              title="Status Perkawinan "
              required
            />
          </Col>

          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="email_ibu"
              placeholder={"Tulis alamat email aktif"}
              title="Email"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomor_hp_ibu"
              title="Nomor HP (Diikuti Kode Negara)"
              placeholder={"62 ..."}
              type="number"
              leftIcon={<BsPlus size={12} />}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="6" xl="6">
            <FormAutocomplete
              formik={formik}
              name="id_kwn_asal_ibu"
              placeholder="kewarganegaraan Asal"
              options={negara.data}
              title="Kewarganegaraan Asal"
              required
            />
          </Col>

          <Col xs="12" md="12" lg="6" xl="6">
            <FormInput
              formik={formik}
              name="alamat_tinggal_ibu"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="tempat_lahir_ibu"
              placeholder="Masukkan tempat lahir"
              options={TEMPAT_TINGGAL_OPTIONS}
              title="Tempat Lahir"
              required
            />
          </Col>

          {isDalamNegeri && (
            <>
              <Col xs="12" md="12" lg="6" xl="3">
                <FormAutocomplete
                  formik={formik}
                  name="id_provinsi_lahir_ibu"
                  placeholder="Provinsi Tempat lahir"
                  options={provinsi.data}
                  title="Provinsi Lahir"
                  required
                />
              </Col>

              <Col xs="12" md="12" lg="6" xl="3">
                <FormAutocomplete
                  formik={formik}
                  name="id_kab_kota_lahir_ibu"
                  placeholder="Kab/Kota Tempat lahir"
                  options={kotaKabLahir}
                  title="Kab/Kota Lahir"
                  isDisabled={kotaKabLahir.length < 1}
                  required
                />
              </Col>
            </>
          )}

          {isLuarNegeri && (
            <Col xs="12" md="12" lg="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name="id_negara_lahir_ibu"
                placeholder="Negara Tempat lahir"
                options={negara.data}
                title="Negara Kelahiran"
                required
              />
            </Col>
          )}

          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_ibu"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiIbuSection;
