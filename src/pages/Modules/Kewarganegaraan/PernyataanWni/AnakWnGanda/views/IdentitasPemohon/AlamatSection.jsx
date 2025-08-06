import {
  FormHeader,
  FormSelect,
  FormInput,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { TEMPAT_TINGGAL_OPTIONS } from "../../../Constant/master";
import { useEffect } from "react";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";
import { useSelector } from "react-redux";
import { useState } from "react";
import { transformData } from "@/pages/Modules/Kewarganegaraan/utils/transform";
import { apiGetDropdownKotakab } from "../../../services/api";

const DataAlamatSection = ({ formik }) => {
  const { negara, provinsi } = useSelector((state) => state.master);

  const { values, setFieldValue } = formik;
  const isDalamNegeri = values.tempat_tinggal_pemohon === "Dalam Negeri";
  const isLuarNegeri = values.tempat_tinggal_pemohon === "Luar Negeri";
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
    if (values.tempat_tinggal_pemohon === "Dalam Negeri") {
      setFieldValue("id_negara_tinggal_pemohon", "");
    } else if (values.tempat_tinggal_pemohon === "Luar Negeri") {
      setFieldValue("id_prov_tinggal_pemohon", "");
      setFieldValue("id_kab_kota_tinggal_pemohon", "");
    }
  }, [values.tempat_tinggal_pemohon, setFieldValue]);

  useEffect(() => {
    if (values.id_prov_tinggal_pemohon) {
      fetchKotaKab(values.id_prov_tinggal_pemohon);
    }
  }, [values.id_prov_tinggal_pemohon, setFieldValue]);

  return (
    <>
      <FormHeader title={"Data Alamat"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="tempat_tinggal_pemohon"
              title="Tempat tinggal"
              placeholder={"tempat tinggal"}
              options={TEMPAT_TINGGAL_OPTIONS}
              required
            />
          </Col>
          {isLuarNegeri && (
            <Col xs="12" sm="12" md="12" lg="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name="id_negara_tinggal_pemohon"
                title="Negara Tinggal"
                placeholder={"negara tinggal"}
                options={negara.data}
                required
                disabled={isDalamNegeri}
              />
            </Col>
          )}
          {isDalamNegeri && (
            <>
              <Col xs="12" sm="12" md="12" lg="6" xl="3">
                <FormAutocomplete
                  formik={formik}
                  name="id_prov_tinggal_pemohon"
                  title="Provinsi Tinggal"
                  placeholder={"provinsi domisili"}
                  options={provinsi.data}
                  disabled={!isDalamNegeri}
                  required
                />
              </Col>
              <Col xs="12" sm="12" md="12" lg="6" xl="3">
                <FormAutocomplete
                  formik={formik}
                  name="id_kab_kota_tinggal_pemohon"
                  title="Kabupaten/Kota Tinggal"
                  placeholder={"kabupaten/kota domisili"}
                  options={kotaKabLahir}
                  disabled={!isDalamNegeri}
                  required
                />
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="12">
            <FormInput
              formik={formik}
              name="alamat_tinggal_pemohon"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default DataAlamatSection;
