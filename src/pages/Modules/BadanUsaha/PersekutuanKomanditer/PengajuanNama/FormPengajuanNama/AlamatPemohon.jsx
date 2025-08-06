import { errorMsg } from "@/helpers/Notification/toastNotification";
import {
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
} from "@/services/RegionService";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { SelectInput } from "../components/Fields/SelectInput";
import { NumberInput } from "../components/Fields/NumberInput";

const AlamatPemohon = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKotakab, setDataKotakab] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const [dataKel, setDataKel] = useState([]);

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const res = await getProvinces();
        setDataProvinsi(res.data);
      } catch (error) {
        errorMsg(error);
      }
    };
    fetchProvinsi();
  }, []);

  useEffect(() => {
    if (!values.provinsi) return;

    const fetchKotakab = async () => {
      try {
        const res = await getRegencies(values.provinsi);
        setDataKotakab(res.data);
      } catch (error) {
        errorMsg(error);
      }
    };

    fetchKotakab();
    setFieldValue("kotakab", "");
    setFieldValue("kecamatan", "");
    setFieldValue("kelurahan", "");
    setDataKec([]);
    setDataKel([]);
  }, [values.provinsi]);

  useEffect(() => {
    if (!values.kotakab) return;

    const fetchKecamatan = async () => {
      try {
        const res = await getDistricts(values.kotakab);
        setDataKec(res.data);
      } catch (error) {
        errorMsg(error);
      }
    };

    fetchKecamatan();
    setFieldValue("kecamatan", "");
    setFieldValue("kelurahan", "");
    setDataKel([]);
  }, [values.kotakab]);

  useEffect(() => {
    if (!values.kecamatan) return;

    const fetchKelurahan = async () => {
      try {
        const res = await getVillages(values.kecamatan);
        setDataKel(res.data);
      } catch (error) {
        errorMsg(error);
      }
    };

    fetchKelurahan();
    setFieldValue("kelurahan", "");
  }, [values.kecamatan]);

  const formGroupStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
  };

  return (
    <section className="d-flex flex-column gap-3">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Alamat CV</span>
      </div>

      <div className="row g-3">
        {/* Alamat */}
        <div className="col-6 d-flex flex-column gap-1">
          <label className="fw-medium">
            Alamat <span className="text-danger">*</span>
          </label>
          <Input
            name="alamat"
            value={values.alamat}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Alamat Lengkap"
            style={formGroupStyle}
          />
          <ErrorMessage name="alamat" component="div" className="text-danger" />
        </div>

        {/* Provinsi */}
        <SelectInput
          name="provinsi"
          label="Provinsi"
          value={values.provinsi}
          options={dataProvinsi}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Kabupaten/Kota */}
        <SelectInput
          name="kotakab"
          label="Kabupaten/Kota"
          value={values.kotakab}
          options={dataKotakab}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Kecamatan */}
        <SelectInput
          name="kecamatan"
          label="Kecamatan"
          value={values.kecamatan}
          options={dataKec}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Kelurahan */}
        <SelectInput
          name="kelurahan"
          label="Kelurahan"
          value={values.kelurahan}
          options={dataKel}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* RT */}
        <NumberInput
          name="rt"
          label="RT"
          maxLength={3}
          value={values.rt}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* RW */}
        <NumberInput
          name="rw"
          label="RW"
          maxLength={3}
          value={values.rw}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Kode Pos */}
        <NumberInput
          name="kodePos"
          label="Kode Pos"
          maxLength={5}
          value={values.kodePos}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </section>
  );
};

export default AlamatPemohon;
