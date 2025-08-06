import { useEffect, useRef, useState } from "react";
import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col, Row } from "reactstrap";
import { FormAutocomplete } from "@/components/Common/AutoComplete";
import { useSelector } from "react-redux";
import { TEMPAT_TINGGAL_OPTIONS } from "../../../Constant/master";
import { transformData } from "@/pages/Modules/Kewarganegaraan/utils/transform";
import { warningMsg } from "@/helpers/Notification/toastNotification";
import { apiGetDropdownKotakab } from "../../../services/api";

const AlamatTinggalSection = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const { negara, provinsi } = useSelector((state) => state.master);
  const [loading, setLoading] = useState(false);
  const [kotaKabLahir, setKotaKabLahir] = useState([]);

  const isTmptTglSelected = values.tempat_tinggal_pemohon !== "";
  const isDalamNegeri = values.tempat_tinggal_pemohon === "Dalam Negeri";
  const isLuarNegeri = values.tempat_tinggal_pemohon === "Luar Negeri";
  const isProvinsiSelected = values.id_provinsi_tinggal_pemohon !== "";

  const prevTmpTglRef = useRef("");

  const fetchKotaKab = async (id_provinsi) => {
    setLoading(true);
    try {
      const response = await apiGetDropdownKotakab(id_provinsi);
      const transformedData = transformData(response.data);
      setKotaKabLahir(transformedData);
    } catch (error) {
      console.error(error);
      warningMsg("Terjadi kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const current = values.tempat_tinggal_pemohon;
    const prev = prevTmpTglRef.current;

    if (prev !== current) {
      if (current === "Dalam Negeri") {
        setFieldValue("id_negara_tinggal_pemohon", "");
      } else if (current === "Luar Negeri") {
        setFieldValue("id_provinsi_tinggal_pemohon", "");
        setFieldValue("id_kab_kota_tinggal_pemohon", "");
      }

      prevTmpTglRef.current = current;
    }
  }, [values.tempat_tinggal_pemohon, setFieldValue]);

  useEffect(() => {
    if (values.id_provinsi_tinggal_pemohon) {
      fetchKotaKab(values.id_provinsi_tinggal_pemohon);
    }
  }, [values.id_provinsi_tinggal_pemohon, setFieldValue]);

  return (
    <>
      <FormHeader title="Alamat Tempat Tinggal Anak" />
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="6">
          <FormAutocomplete
            formik={formik}
            name="tempat_tinggal_pemohon"
            placeholder="tempat tinggal"
            options={TEMPAT_TINGGAL_OPTIONS}
            title="Tempat Tinggal"
            required
          />
        </Col>

        {isLuarNegeri && (
          <Col xs="12" sm="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="id_negara_tinggal_pemohon"
              placeholder="negara tinggal"
              options={negara.data}
              title="Negara Tinggal"
              disabled={!isTmptTglSelected || isDalamNegeri}
              required
            />
          </Col>
        )}
      </Row>

      {isDalamNegeri && (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="id_provinsi_tinggal_pemohon"
              placeholder="provinsi"
              options={provinsi.data}
              title="Provinsi"
              disabled={!isTmptTglSelected || !isDalamNegeri}
              required
            />
          </Col>

          <Col xs="12" sm="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="id_kab_kota_tinggal_pemohon"
              placeholder="kabupaten/kota"
              options={kotaKabLahir}
              title="Kabupaten/Kota"
              disabled={!isProvinsiSelected}
              required
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <FormInput
            formik={formik}
            name="alamat_tinggal_pemohon"
            placeholder="Tulis alamat lengkap domisili saat ini"
            title="Alamat Tempat Tinggal"
            type="textarea"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default AlamatTinggalSection;
