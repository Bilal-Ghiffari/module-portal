import { Col, Row } from "reactstrap";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { useEffect, useState } from "react";
import {
  apiGetDropdownDesa,
  apiGetDropdownKec,
  apiGetDropdownKotakab,
  apiGetDropdownProv,
} from "@/helpers/backend_helper";
import { filterEmptyValues, transformData } from "@/helpers/services/convert";

const Region = ({
  formik,
  disabled,
  provinsiKey = "provinsi",
  kabupatenKey = "kabupaten",
  kecamatanKey = "kecamatan",
  kelurahanKey = "kelurahan",
}) => {
  const [region, setRegion] = useState({
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    desa: [],
  });

  // Helper: fetch data + transform + update partial region state
  const fetchAndSetRegion = async (apiFunc, key, params = {}) => {
    try {
      const res = await apiFunc(filterEmptyValues(params));
      const transformed = transformData(res.data, {
        value: "id",
        label: "name",
      });
      setRegion((prev) => ({
        ...prev,
        [key]: transformed,
      }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  // Fetch provinsi pertama kali
  useEffect(() => {
    fetchAndSetRegion(apiGetDropdownProv, "provinsi");
  }, []);

  // Bertingkat: jika provinsi berubah
  useEffect(() => {
    if (formik.values?.[provinsiKey]) {
      fetchAndSetRegion(apiGetDropdownKotakab, "kabupaten", {
        id_provinsi: formik.values?.[provinsiKey],
      });
    } else {
      // Reset kabupaten, kecamatan, desa
      formik.setFieldValue(kabupatenKey, "");
      formik.setFieldValue(kecamatanKey, "");
      formik.setFieldValue(kelurahanKey, "");

      setRegion((prev) => ({
        ...prev,
        kabupaten: [],
        kecamatan: [],
        desa: [],
      }));
    }
  }, [formik.values?.[provinsiKey]]);

  useEffect(() => {
    if (formik.values?.[kabupatenKey]) {
      fetchAndSetRegion(apiGetDropdownKec, "kecamatan", {
        id_kotakab: formik.values?.[kabupatenKey],
      });
    } else {
      // Reset kecamatan, desa
      formik.setFieldValue(kecamatanKey, "");
      formik.setFieldValue(kelurahanKey, "");
      setRegion((prev) => ({
        ...prev,
        kecamatan: [],
        desa: [],
      }));
    }
  }, [formik.values?.[kabupatenKey]]);

  useEffect(() => {
    if (formik.values?.[kecamatanKey]) {
      fetchAndSetRegion(apiGetDropdownDesa, "desa", {
        id_kecamatan: formik.values?.[kecamatanKey],
      });
    } else {
      // Reset desa
      formik.setFieldValue(kelurahanKey, "");
      setRegion((prev) => ({
        ...prev,
        desa: [],
      }));
    }
  }, [formik.values?.[kecamatanKey]]);

  return (
    <Row>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={provinsiKey}
          data={region.provinsi}
          label="Provinsi"
          isDisabled={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={kabupatenKey}
          data={region.kabupaten}
          label="Kabupaten/Kota"
          isDisabled={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={kecamatanKey}
          data={region.kecamatan}
          label="Kecamatan"
          isDisabled={disabled}
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <DynamicDropdown
          formik={formik}
          fieldName={kelurahanKey}
          data={region.desa}
          label="Kelurahan/Desa"
          isDisabled={disabled}
        />
      </Col>
    </Row>
  );
};

export default Region;
