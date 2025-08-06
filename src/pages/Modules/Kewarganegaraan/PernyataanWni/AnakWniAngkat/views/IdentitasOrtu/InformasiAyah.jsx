import { FormHeader, FormInput } from "@/components/Common/FormField";
import { BsPlus } from "react-icons/bs";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { PEKERJAAN_OPTIONS } from "../../../Constant/master";
import { useSelector } from "react-redux";
import { TEMPAT_TINGGAL_OPTIONS } from "../../../Constant/master";
import { useState, useEffect } from "react";
import { transformData } from "@/pages/Modules/Kewarganegaraan/utils/transform";
import { apiGetDropdownKotakab } from "../../../services/api";
import { useRef } from "react";
import { FormAutocomplete } from "@/components/Common/AutoComplete";

const InformasiAyah = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const [loading, setLoading] = useState(false);
  const [kotaKabLahir, setKotaKabLahir] = useState([]);
  const { statusKawin, negara, provinsi, pekerjaan } = useSelector(
    (state) => state.master
  );
  const isTmptTglSelected = values.tempat_lahir_ayah !== "";
  const isDalamNegeri = values.tempat_lahir_ayah === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_ayah === "Luar Negeri";
  const isProvinsiSelected = values.id_provinsi_tinggal_pemohon !== "";

  const prevTmpLhrRef = useRef("");

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
    const current = values.tempat_lahir_ayah;
    const prev = prevTmpLhrRef.current;

    if (prev !== current) {
      if (current === "Dalam Negeri") {
        setFieldValue("id_negara_tinggal_pemohon", "");
      } else if (current === "Luar Negeri") {
        setFieldValue("id_provinsi_tinggal_pemohon", "");
        setFieldValue("id_kab_kota_tinggal_pemohon", "");
      }

      prevTmpLhrRef.current = current;
    }
  }, [values.tempat_lahir_ayah, setFieldValue]);

  useEffect(() => {
    if (values.id_provinsi_tinggal_pemohon) {
      fetchKotaKab(values.id_provinsi_tinggal_pemohon);
    }
  }, [values.id_provinsi_tinggal_pemohon, setFieldValue]);

  return (
    <>
      <FormHeader title={"Informasi Data Ayah"} />

      {/* IDENTITAS DASAR */}
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nama_lengkap_ayah"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nik_ayah"
            placeholder="Tulis nomor NIK sesuai identitas"
            title="NIK"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="email_ayah"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="no_hp_ayah"
            placeholder="Tulis nomor handphone aktif"
            title="No HP (Diikuti Kode Negara)"
            leftIcon={<BsPlus />}
            type="tel"
            required
          />
        </Col>
      </Row>

      {/* TANGGAL & TEMPAT LAHIR */}
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tgl_lahir_ayah"
            placeholder="Pilih tanggal lahir"
            title="Tanggal Lahir"
            type="date"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name={"tempat_lahir_ayah"}
            placeholder={"tempat lahir"}
            title="Tempat Lahir"
            options={TEMPAT_TINGGAL_OPTIONS}
            required
          />
        </Col>

        {/* Conditional Input: Dalam Negeri */}
        {isDalamNegeri && (
          <>
            <Col xs="12" sm="12" md="12" lg="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name={"id_provinsi_lahir_ayah"}
                placeholder={" provinsi kelahiran"}
                title="Provinsi Lahir"
                options={provinsi.data}
                required
              />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name={"id_kab_kota_lahir_ayah"}
                placeholder={" kab/kota kelahiran"}
                title="Kab/Kota Lahir"
                options={kotaKabLahir}
                isDisabled={!isProvinsiSelected}
                required
              />
            </Col>
          </>
        )}

        {/* Conditional Input: Luar Negeri */}
        {isLuarNegeri && (
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormAutocomplete
              formik={formik}
              name={"id_negara_lahir_ayah"}
              placeholder={"Tulis negara kelahiran"}
              title="Negara Lahir"
              options={negara.data}
              required
            />
          </Col>
        )}
      </Row>

      {/* ALAMAT TINGGAL */}
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="alamat_tinggal_ayah"
            placeholder="Tulis alamat lengkap domisili saat ini"
            title="Alamat Tinggal"
            type="textarea"
            required
          />
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
          <FormAutocomplete
            formik={formik}
            name="id_pekerjaan_ayah"
            placeholder=" pekerjaan atau profesi saat ini"
            title="Pekerjaan/Profesi"
            options={pekerjaan.data}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
          <FormAutocomplete
            formik={formik}
            name={"status_kawin_ayah"}
            placeholder={"status perkawinan"}
            title="Status Perkawinan"
            options={statusKawin.data}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="4">
          <FormAutocomplete
            formik={formik}
            name={"id_kwn_asal_ayah"}
            placeholder={" kewarganegaraan asal"}
            title="Kewarganegaraan Asal"
            options={negara.data}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiAyah;
