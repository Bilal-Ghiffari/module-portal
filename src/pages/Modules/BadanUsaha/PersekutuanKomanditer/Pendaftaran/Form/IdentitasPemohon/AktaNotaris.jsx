import { getProvinces, getRegencies } from "@/services/RegionService";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { SelectInput } from "../components/Fields/SelectInput";

const AktaNotaris = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKotakab, setDataKotakab] = useState([]);

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
    setFieldValue("kotakabAkta", "");
  }, [values.provinsi]);

  return (
    <section className="d-flex flex-column gap-3">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Akta Notaris</span>
      </div>

      <div className="row g-3">
        {/* Nomor Akta */}
        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Nomor Akta <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="noAkta"
            value={values.noAkta}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Nomor Akta"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage name="noAkta" component="div" className="text-danger" />
        </div>

        {/* Tanggal Akta */}
        <div className="col-3 d-flex flex-column gap-1">
          <label className="fw-medium">
            Tanggal Akta <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="tanggalAkta"
            type="date"
            value={values.tanggalAkta}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Tanggal Akta"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
          />
          <ErrorMessage
            name="tanggalAkta"
            component="div"
            className="text-danger"
          />
        </div>

        {/* Provinsi */}
        <SelectInput
          name="provinsiAkta"
          label="Provinsi"
          value={values.provinsiAkta}
          options={dataProvinsi}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Kabupaten/Kota */}
        <SelectInput
          name="kotakabAkta"
          label="Kabupaten/Kota"
          value={values.kotakabAkta}
          options={dataKotakab}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Nama Notaris */}
        <div className="col-6 d-flex flex-column gap-1">
          <label className="fw-medium">
            Nama Notaris <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="namaNotaris"
            value={values.namaNotaris}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Nama Notaris"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
            disabled
          />
          <ErrorMessage
            name="namaNotaris"
            component="div"
            className="text-danger"
          />
        </div>

        {/* Kedudukan Notaris */}
        <div className="col-6 d-flex flex-column gap-1">
          <label className="fw-medium">
            Kedudukan Notaris <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="kedudukanNotaris"
            value={values.kedudukanNotaris}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Kedudukan Notaris"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
            // disabled
          />
          <ErrorMessage
            name="kedudukanNotaris"
            component="div"
            className="text-danger"
          />
        </div>

        {/* Notaris Pengganti */}
        <div className="col-6 d-flex flex-column gap-1">
          <label className="fw-medium">
            Apakah Memiliki Notaris Pengganti?{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <div className="d-flex gap-3">
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="notarisPengganti"
                  value="ya"
                  checked={values.notarisPengganti === "ya"}
                  onChange={handleChange}
                />
                Ya
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="notarisPengganti"
                  value="tidak"
                  checked={values.notarisPengganti === "tidak"}
                  onChange={handleChange}
                />
                Tidak
              </Label>
            </FormGroup>
          </div>
          <ErrorMessage
            name="notarisPengganti"
            component="div"
            className="text-danger"
          />
        </div>

        {/* Nama Notaris Pengganti */}
        <div className="col-6 d-flex flex-column gap-1">
          <label className="fw-medium">
            Nama Notaris Pengganti <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            name="namaNotarisPengganti"
            value={values.namaNotarisPengganti}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis Nama Notaris Pengganti"
            style={{ padding: "12px 16px", borderRadius: "8px" }}
            disabled={values.notarisPengganti != "ya"}
          />
          <ErrorMessage
            name="namaNotarisPengganti"
            component="div"
            className="text-danger"
          />
        </div>
      </div>
    </section>
  );
};

export default AktaNotaris;
