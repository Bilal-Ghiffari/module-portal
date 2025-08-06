import {
  getCountries,
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
} from "@/services/RegionService";
import { ErrorMessage } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { Input, Modal, ModalBody, Button } from "reactstrap";
import { SelectInput } from "../Fields/SelectInput";
import { NumberInput } from "../Fields/NumberInput";
import KriteriaPemilikManfaat from "./components/KriteriaPemilikManfaat";
import { useRef } from "react";

const ModalDataPemilikManfaat = ({
  isOpen,
  toggle,
  onSubmit,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  touched,
  resetForm,
  editingIndex,
}) => {
  const sectionRef = useRef();

  const [dataNegara, setDataNegara] = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKotakab, setDataKotakab] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const [dataKel, setDataKel] = useState([]);

  const [dataKewarganegaraan] = useState([
    {
      id: "wni",
      nama: "WNI",
    },
    {
      id: "wna",
      nama: "WNA",
    },
  ]);

  const [dataJenisIdentitas, setDataJenisIdentitas] = useState([]);

  useEffect(() => {
    if (values.kewarganegaraan == "wni") {
      setDataJenisIdentitas([
        {
          id: "ktp",
          nama: "KTP",
        },
        {
          id: "sim",
          nama: "SIM",
        },
      ]);
      setFieldValue("jenisIdentitas", "");
    } else {
      setDataJenisIdentitas([
        {
          id: "paspor",
          nama: "Paspor",
        },
      ]);
      setFieldValue("jenisIdentitas", "paspor");
    }
  }, [values.kewarganegaraan]);

  useEffect(() => {
    const fetchNegara = async () => {
      try {
        const res = await getCountries();
        setDataNegara(res.data);
      } catch (error) {
        errorMsg(error);
      }
    };
    fetchNegara();
  }, []);

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
      const res = await getRegencies(values.provinsi);
      setDataKotakab(res.data);
    };

    fetchKotakab();

    if (!editingIndex) {
      setFieldValue("kotakab", "");
      setFieldValue("kecamatan", "");
      setFieldValue("kelurahan", "");
      setDataKec([]);
      setDataKel([]);
    }
  }, [values.provinsi]);

  useEffect(() => {
    if (!values.kotakab) return;

    const fetchKecamatan = async () => {
      const res = await getDistricts(values.kotakab);
      setDataKec(res.data);
    };

    fetchKecamatan();

    if (!editingIndex) {
      setFieldValue("kecamatan", "");
      setFieldValue("kelurahan", "");
      setDataKel([]);
    }
  }, [values.kotakab]);

  useEffect(() => {
    if (!values.kecamatan) return;

    const fetchKelurahan = async () => {
      const res = await getVillages(values.kecamatan);
      setDataKel(res.data);
    };

    fetchKelurahan();

    if (!editingIndex) {
      setFieldValue("kelurahan", "");
    }
  }, [values.kecamatan]);

  const formGroupStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
  };

  const handleToggle = () => {
    toggle();
    resetForm();
  };

  const scrollTop = () => {
    const element = sectionRef.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered size="lg">
      <ModalBody style={{ padding: "40px" }}>
        <div
          ref={sectionRef}
          className="d-flex flex-column justify-content-center align-items-center gap-5"
        >
          <div className="row g-3 w-100">
            <section className="d-flex flex-column gap-3">
              <div
                style={{
                  backgroundColor: "#EFF7FF",
                  borderRadius: "8px",
                  padding: "12px 10px",
                }}
              >
                <span className="fw-medium fs-5">Kriteria Pemilik Manfaat</span>
              </div>

              <div>
                <KriteriaPemilikManfaat
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  touched={touched}
                />
              </div>
            </section>

            <section className="d-flex flex-column gap-3">
              <div
                style={{
                  backgroundColor: "#EFF7FF",
                  borderRadius: "8px",
                  padding: "12px 10px",
                }}
              >
                <span className="fw-medium fs-5">Data Pemilik Manfaat</span>
              </div>

              <div className="row g-3">
                <div className="col-3 d-flex flex-column gap-1">
                  <label className="fw-medium">
                    Nama Lengkap <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tulis Nama Lengkap"
                    style={formGroupStyle}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <SelectInput
                  name="kewarganegaraan"
                  label="Kewarganegaraan"
                  value={values.kewarganegaraan}
                  options={dataKewarganegaraan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isRequired={true}
                />

                <div className="col-3 d-flex flex-column gap-1">
                  <label className="fw-medium">
                    Tempat Lahir <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="tempatLahir"
                    value={values.tempatLahir}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tulis Tempat Lahir"
                    style={formGroupStyle}
                  />
                  <ErrorMessage
                    name="tempatLahir"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-3 d-flex flex-column gap-1">
                  <label className="fw-medium">
                    Tanggal Lahir <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="tglLahir"
                    type="date"
                    value={values.tglLahir}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tulis Tanggal Lahir"
                    style={formGroupStyle}
                  />
                  <ErrorMessage
                    name="tglLahir"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <SelectInput
                  name="jenisIdentitas"
                  label="Jenis Identitas"
                  value={values.jenisIdentitas}
                  options={dataJenisIdentitas}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="col-3 d-flex flex-column gap-1">
                  <label className="fw-medium">
                    Nomor Identitas <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="nomorIdentitas"
                    type={values.jenisIdentitas == "paspor" ? "text" : "number"}
                    value={values.nomorIdentitas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tulis Nomor Identitas"
                    style={formGroupStyle}
                  />
                  <ErrorMessage
                    name="nomorIdentitas"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-6 d-flex flex-column gap-1">
                  <label className="fw-medium">
                    Alamat sesuai kartu identitas{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="alamat"
                    value={values.alamat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tulis Alamat Sesuai Identitas"
                    style={formGroupStyle}
                  />
                  <ErrorMessage
                    name="alamat"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-6 d-flex flex-column gap-1">
                  <label className="fw-medium">
                    Hubungan Korporasi dengan Pemilik Manfaat{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="hubungan"
                    value={values.hubungan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tulis Hubungan Korporasi"
                    style={formGroupStyle}
                  />
                  <ErrorMessage
                    name="hubungan"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {values.kewarganegaraan == "wni" && (
                  <>
                    <SelectInput
                      name="provinsi"
                      label="Provinsi"
                      value={values.provinsi}
                      options={dataProvinsi}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <SelectInput
                      name="kotakab"
                      label="Kabupaten/Kota"
                      value={values.kotakab}
                      options={dataKotakab}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </>
                )}

                {values.kewarganegaraan == "wni" && (
                  <NumberInput
                    name="nomorNPWP"
                    label="Nomor NPWP"
                    value={values.nomorNPWP}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    col={6}
                  />
                )}

                {values.kewarganegaraan == "wni" ? (
                  <>
                    <SelectInput
                      name="kecamatan"
                      label="Kecamatan"
                      value={values.kecamatan}
                      options={dataKec}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <SelectInput
                      name="kelurahan"
                      label="Kelurahan"
                      value={values.kelurahan}
                      options={dataKel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div className="col-6"></div>

                    <NumberInput
                      name="rt"
                      label="RT"
                      value={values.rt}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <NumberInput
                      name="rw"
                      label="RW"
                      value={values.rw}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <NumberInput
                      name="kodePos"
                      label="Kode Pos"
                      value={values.kodePos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </>
                ) : (
                  <>
                    <SelectInput
                      name="negaraAsal"
                      label="Negara Asal"
                      value={values.negaraAsal}
                      options={dataNegara}
                      optionValue="id_negara"
                      optionLabel="nama_negara"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <NumberInput
                      name="nomorNPWP"
                      label="Nomor NPWP"
                      value={values.nomorNPWP}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      col={3}
                      type="text"
                      maxLength={16}
                    />
                  </>
                )}
              </div>
            </section>
          </div>

          <div className="d-flex gap-2 mt-4">
            <Button
              color="secondary"
              onClick={handleToggle}
              style={{ width: "150px", height: "40px" }}
            >
              Kembali
            </Button>
            <Button
              color="primary"
              onClick={() => {
                scrollTop();
                onSubmit();
              }}
              style={{ width: "150px", height: "40px" }}
            >
              Simpan
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDataPemilikManfaat;
