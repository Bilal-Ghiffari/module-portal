import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { TEMPAT_TINGGAL_OPTIONS } from "../../../Constant/master";
import { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";
import { useState } from "react";
import { apiGetDropdownKotakab } from "../../../services/api";
import { transformData } from "../../utils/transform";

const IdentitasAlamatPemohon = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const [kotakab, setKotakab] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { negara, provinsi } = useSelector((state) => state.master);

  const isDalamNegeri = values.tempat_tinggal_pemohon === "Dalam Negeri";
  const isLuarNegeri = values.tempat_tinggal_pemohon === "Luar Negeri";

  const getKotaKab = async (id_provinsi) => {
    if (!id_provinsi) {
      setKotakab([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiGetDropdownKotakab(id_provinsi);

      if (Array.isArray(response.data)) {
        const transformedData = transformData(response.data, {
          valueKey: "id",
          labelKey: "nama",
          lowercaseValue: false,
          useSameLabelAndValue: false,
        });
        setKotakab(transformedData);
      } else {
        console.warn("Expected array in response.data, got:", response.data);
        setKotakab([]);
      }
    } catch (error) {
      console.error("Error fetching kota/kab:", error);
      setKotakab([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDalamNegeri) {
      setFieldValue("id_negara_tinggal_pemohon", "");
    } else if (isLuarNegeri) {
      setFieldValue("id_provinsi_tinggal_pemohon", "");
      setFieldValue("id_kab_kota_tinggal_pemohon", "");
    }
    if (!values.tempat_tinggal_pemohon) {
      setFieldValue("id_negara_tinggal_pemohon", "");
      setFieldValue("id_provinsi_tinggal_pemohon", "");
      setFieldValue("id_kab_kota_tinggal_pemohon", "");
    }
  }, [
    values.tempat_tinggal_pemohon,
    setFieldValue,
    isDalamNegeri,
    isLuarNegeri,
  ]);

  useEffect(() => {
    const idProvinsi = values.id_provinsi_tinggal_pemohon;

    if (isDalamNegeri && idProvinsi) {
      getKotaKab(idProvinsi);
    } else {
      setKotakab([]);
    }
  }, [values.id_provinsi_tinggal_pemohon, isDalamNegeri, setFieldValue]);

  return (
    <>
      <FormHeader title={"Data Alamat"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
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
          <Col xs="12" sm="12" md="12" lg="6" xl="4">
            <FormAutocomplete
              formik={formik}
              name="id_negara_tinggal_pemohon"
              title="Negara Tinggal"
              placeholder={"negara tinggal"}
              options={negara.data}
              required={isLuarNegeri}
            />
          </Col>
        )}
        {isDalamNegeri && (
          <>
            <Col xs="12" sm="12" md="12" lg="6" xl="4">
              <FormAutocomplete
                formik={formik}
                name="id_provinsi_tinggal_pemohon"
                title="Provinsi"
                placeholder={"provinsi domisili"}
                options={provinsi.data}
                required={isDalamNegeri}
              />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="4">
              <FormAutocomplete
                formik={formik}
                name="id_kab_kota_tinggal_pemohon"
                title="Kabupaten/Kota"
                placeholder={"kabupaten/kota domisili"}
                options={kotakab}
                required={isDalamNegeri}
                loading={isLoading}
              />
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
          <FormInput
            formik={formik}
            name="no_hp_pemohon"
            title="Nomor HP"
            placeholder={"Tulis nomor handphone aktif"}
            type="tel"
            required
            leftIcon={<BsPlus />}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
          <FormInput
            formik={formik}
            name="no_telp_pemohon"
            title="Nomor Telepon Rumah"
            type="tel"
            placeholder={"Tulis nomor telepon"}
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
          <FormInput
            formik={formik}
            name="email_pemohon"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
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
    </>
  );
};

export default IdentitasAlamatPemohon;
