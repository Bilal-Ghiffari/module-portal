import { Col, Row } from "reactstrap";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { useEffect, useState, useCallback } from "react";
import {
  apiGetDropdownDesa,
  apiGetDropdownKec,
  apiGetDropdownKotakab,
  apiGetDropdownProv,
  apiGetDropdownCountry,
} from "@/helpers/backend_helper";
import { filterEmptyValues, transformData } from "@/helpers/services/convert";
import get from "lodash/get";
import set from "lodash/set";

const Region = ({
  formik,
  disabled,
  // Default keys
  provinsiKey = "provinsi",
  kabupatenKey = "kabupaten",
  kecamatanKey = "kecamatan",
  kelurahanKey = "kelurahan",
  negaraKey = "negara",
  required = false,
  showProvinsi = true,
  showKabupaten = true,
  showKecamatan = true,
  showKelurahan = true,
  showNegara = false,
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
      let transformed = [];

      if (key == "negara") {
        transformed = transformData(res.data, {
          value: "id_negara",
          label: "nama_negara",
        });
      } else {
        transformed = transformData(res.data, {
          value: "id",
          label: "name",
        });
      }

      setRegion((prev) => ({
        ...prev,
        [key]: transformed,
      }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  // Helper untuk mendapatkan nilai - support nested dan flat
  const getNestedValue = (obj, path) => {
    // Jika path tidak mengandung titik, langsung akses
    if (!path.includes(".")) {
      return obj[path] || "";
    }

    // Jika path mengandung titik, gunakan lodash
    return get(obj, path, "");
  };

  // Helper untuk set nilai - support nested dan flat
  const setNestedValue = (formik, path, value) => {
    // Jika path tidak mengandung titik, set langsung
    if (!path.includes(".")) {
      formik.setFieldValue(path, value);
      return;
    }

    // Jika path mengandung titik, gunakan set
    const newValues = { ...formik.values };
    set(newValues, path, value);
    formik.setValues(newValues);
  };

  // Reset bertingkat dengan support nested dan flat
  const resetNestedFields = useCallback((formik, keys) => {
    keys.forEach((key) => {
      setNestedValue(formik, key, "");
    });
  }, []);

  // Fetch negara jika showNegara true
  useEffect(() => {
    if (showNegara) {
      fetchAndSetRegion(apiGetDropdownCountry, "negara");
    }
  }, [showNegara]);

  // Fetch provinsi pertama kali
  useEffect(() => {
    fetchAndSetRegion(apiGetDropdownProv, "provinsi");
  }, []);

  // Bertingkat: jika provinsi berubah
  useEffect(() => {
    const provinsiValue = getNestedValue(formik.values, provinsiKey);

    if (provinsiValue) {
      fetchAndSetRegion(apiGetDropdownKotakab, "kabupaten", {
        id_provinsi: provinsiValue,
      });
    } else {
      // Reset bertingkat dengan keys nested/flat
      resetNestedFields(formik, [kabupatenKey, kecamatanKey, kelurahanKey]);

      setRegion((prev) => ({
        ...prev,
        kabupaten: [],
        kecamatan: [],
        desa: [],
      }));
    }
  }, [getNestedValue(formik.values, provinsiKey)]);

  // Logika serupa untuk kabupaten dan kecamatan
  useEffect(() => {
    const kabupatenValue = getNestedValue(formik.values, kabupatenKey);

    if (kabupatenValue) {
      fetchAndSetRegion(apiGetDropdownKec, "kecamatan", {
        id_kotakab: kabupatenValue,
      });
    } else {
      resetNestedFields(formik, [kecamatanKey, kelurahanKey]);

      setRegion((prev) => ({
        ...prev,
        kecamatan: [],
        desa: [],
      }));
    }
  }, [getNestedValue(formik.values, kabupatenKey)]);

  useEffect(() => {
    const kecamatanValue = getNestedValue(formik.values, kecamatanKey);

    if (kecamatanValue) {
      fetchAndSetRegion(apiGetDropdownDesa, "desa", {
        id_kecamatan: kecamatanValue,
      });
    } else {
      resetNestedFields(formik, [kelurahanKey]);

      setRegion((prev) => ({
        ...prev,
        desa: [],
      }));
    }
  }, [getNestedValue(formik.values, kecamatanKey)]);

  return (
    <Row>
      {showProvinsi && (
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={provinsiKey}
            data={region.provinsi}
            label="Provinsi"
            isDisabled={disabled}
            required={required}
            onChange={(value) => {
              formik.setFieldValue(provinsiKey, value?.value);
              formik.setFieldValue(`${provinsiKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showKabupaten && (
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={kabupatenKey}
            data={region.kabupaten}
            label="Kabupaten/Kota"
            isDisabled={disabled || !getNestedValue(formik.values, provinsiKey)}
            required={required}
            onChange={(value) => {
              formik.setFieldValue(kabupatenKey, value?.value);
              formik.setFieldValue(`${kabupatenKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showKecamatan && (
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={kecamatanKey}
            data={region.kecamatan}
            label="Kecamatan"
            isDisabled={
              disabled || !getNestedValue(formik.values, kabupatenKey)
            }
            required={required}
            onChange={(value) => {
              formik.setFieldValue(kecamatanKey, value?.value);
              formik.setFieldValue(`${kecamatanKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showKelurahan && (
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={kelurahanKey}
            data={region.desa}
            label="Kelurahan/Desa"
            isDisabled={
              disabled || !getNestedValue(formik.values, kecamatanKey)
            }
            required={required}
            onChange={(value) => {
              formik.setFieldValue(kelurahanKey, value?.value);
              formik.setFieldValue(`${kelurahanKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showNegara && (
        <Col xs="12" md="6" lg="4" xl="3" className="px-3">
          <DynamicDropdown
            formik={formik}
            fieldName={negaraKey}
            data={region?.negara || []}
            label="Negara"
            isDisabled={disabled}
            required={required}
            onChange={(value) => {
              formik.setFieldValue(negaraKey, value?.value);
              formik.setFieldValue(`${negaraKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
    </Row>
  );
};
export default Region;

// const Region = ({
//   formik,
//   disabled,
//   provinsiKey = 'provinsi',
//   kabupatenKey = 'kabupaten',
//   kecamatanKey = 'kecamatan',
//   kelurahanKey = 'kelurahan',
//   negaraKey = 'negara',
//   required = false,
//   showProvinsi = true,
//   showKabupaten = true,
//   showKecamatan = true,
//   showKelurahan = true,
//   showNegara = false,
// }) => {
//   const [region, setRegion] = useState({
//     provinsi: [],
//     kabupaten: [],
//     kecamatan: [],
//     desa: [],
//   });

//   // Helper: fetch data + transform + update partial region state
//   const fetchAndSetRegion = async (apiFunc, key, params = {}) => {
//     try {
//       const res = await apiFunc(filterEmptyValues(params));
//       const transformed = transformData(res.data, {
//         value: 'id',
//         label: 'name',
//       });
//       setRegion((prev) => ({
//         ...prev,
//         [key]: transformed,
//       }));
//     } catch (error) {
//       console.error(`Error fetching ${key}:`, error);
//     }
//   };

//   // Fetch provinsi pertama kali
//   useEffect(() => {
//     fetchAndSetRegion(apiGetDropdownProv, 'provinsi');
//   }, []);

//   // Bertingkat: jika provinsi berubah
//   useEffect(() => {
//     if (formik.values?.[provinsiKey]) {
//       fetchAndSetRegion(apiGetDropdownKotakab, 'kabupaten', {
//         id_provinsi: formik.values?.[provinsiKey],
//       });
//     } else {
//       // Reset kabupaten, kecamatan, desa
//       formik.setFieldValue(kabupatenKey, '');
//       formik.setFieldValue(kecamatanKey, '');
//       formik.setFieldValue(kelurahanKey, '');

//       setRegion((prev) => ({
//         ...prev,
//         kabupaten: [],
//         kecamatan: [],
//         desa: [],
//       }));
//     }
//   }, [formik.values?.[provinsiKey]]);

//   useEffect(() => {
//     if (formik.values?.[kabupatenKey]) {
//       fetchAndSetRegion(apiGetDropdownKec, 'kecamatan', {
//         id_kotakab: formik.values?.[kabupatenKey],
//       });
//     } else {
//       // Reset kecamatan, desa
//       formik.setFieldValue(kecamatanKey, '');
//       formik.setFieldValue(kelurahanKey, '');
//       setRegion((prev) => ({
//         ...prev,
//         kecamatan: [],
//         desa: [],
//       }));
//     }
//   }, [formik.values?.[kabupatenKey]]);

//   useEffect(() => {
//     if (formik.values?.[kecamatanKey]) {
//       fetchAndSetRegion(apiGetDropdownDesa, 'desa', {
//         id_kecamatan: formik.values?.[kecamatanKey],
//       });
//     } else {
//       // Reset desa
//       formik.setFieldValue(kelurahanKey, '');
//       setRegion((prev) => ({
//         ...prev,
//         desa: [],
//       }));
//     }
//   }, [formik.values?.[kecamatanKey]]);

//   return (
//     <Row>
//       {showProvinsi && (
//         <Col xs="12" md="6" lg="4" xl="3" className="px-3">
//           <DynamicDropdown
//             formik={formik}
//             fieldName={provinsiKey}
//             data={region.provinsi}
//             label="Provinsi"
//             isDisabled={disabled}
//             required={required}
//           />
//         </Col>
//       )}
//       {showKabupaten && (
//         <Col xs="12" md="6" lg="4" xl="3" className="px-3">
//           <DynamicDropdown
//             formik={formik}
//             fieldName={kabupatenKey}
//             data={region.kabupaten}
//             label="Kabupaten/Kota"
//             isDisabled={disabled}
//             required={required}
//           />
//         </Col>
//       )}
//       {showKecamatan && (
//         <Col xs="12" md="6" lg="4" xl="3" className="px-3">
//           <DynamicDropdown
//             formik={formik}
//             fieldName={kecamatanKey}
//             data={region.kecamatan}
//             label="Kecamatan"
//             isDisabled={disabled}
//             required={required}
//           />
//         </Col>
//       )}
//       {showKelurahan && (
//         <Col xs="12" md="6" lg="4" xl="3" className="px-3">
//           <DynamicDropdown
//             formik={formik}
//             fieldName={kelurahanKey}
//             data={region.desa}
//             label="Kelurahan/Desa"
//             isDisabled={disabled}
//             required={required}
//           />
//         </Col>
//       )}
//       {showNegara && (
//         <Col xs="12" md="6" lg="4" xl="3" className="px-3">
//           <DynamicDropdown
//             formik={formik}
//             fieldName={negaraKey}
//             data={[]}
//             label="Negara"
//             isDisabled={disabled}
//             required={required}
//           />
//         </Col>
//       )}
//     </Row>
//   );
// };

// export default Region;
