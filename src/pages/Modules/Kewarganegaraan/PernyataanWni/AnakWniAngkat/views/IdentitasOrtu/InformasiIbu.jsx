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

const InformasiIbu = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const [loading, setLoading] = useState(false);
  const [kotaKabLahir, setKotaKabLahir] = useState([]);
  const { statusKawin, negara, provinsi, pekerjaan } = useSelector(
    (state) => state.master
  );
  const isTmptTglSelected = values.tempat_lahir_ibu !== "";
  const isDalamNegeri = values.tempat_lahir_ibu === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_ibu === "Luar Negeri";
  const isProvinsiSelected = values.id_provinsi_lahir_ibu !== "";

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
    const current = values.tempat_lahir_ibu;
    const prev = prevTmpLhrRef.current;

    if (prev !== current) {
      if (current === "Dalam Negeri") {
        setFieldValue("id_negara_lahir_ibu", "");
      } else if (current === "Luar Negeri") {
        setFieldValue("id_provinsi_lahir_ibu", "");
        setFieldValue("id_kab_kota_lahir_ibu", "");
      }

      prevTmpLhrRef.current = current;
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
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nama_lengkap_ibu"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nik_ibu"
            placeholder="Tulis nomor NIK sesuai identitas"
            title="NIK"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="email_ibu"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="no_hp_ibu"
            placeholder="Tulis nomor handphone aktif"
            title="No HP (Diikuti Kode Negara)"
            leftIcon={<BsPlus />}
            type="tel"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name={"id_kwn_asal_ibu"}
            placeholder={"kewarganegaraan"}
            title="Kewarganegaraan Asal"
            options={negara.data}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name={"status_kawin_ibu"}
            placeholder={"status perkawinan"}
            title="Status Perkawinan"
            options={statusKawin.data}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="alamat_tinggal_ibu"
            placeholder="Tulis alamat lengkap domisili saat ini"
            title="Alamat Tinggal"
            type="textarea"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tgl_lahir_ibu"
            placeholder="Pilih tanggal lahir"
            title="Tanggal Lahir"
            type="date"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormAutocomplete
            formik={formik}
            name={"tempat_lahir_ibu"}
            placeholder={"tempat lahir"}
            title="Tempat Lahir"
            options={TEMPAT_TINGGAL_OPTIONS}
            required
          />
        </Col>
        {isDalamNegeri && (
          <>
            <Col xs="12" sm="12" md="12" lg="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name={"id_provinsi_lahir_ibu"}
                placeholder={" provinsi kelahiran"}
                title="Provinsi Lahir"
                options={provinsi.data}
                required
              />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name={"id_kab_kota_lahir_ibu"}
                placeholder={" kab/kota kelahiran"}
                title="Kab/Kota Lahir"
                options={kotaKabLahir}
                required
              />
            </Col>
          </>
        )}
        {isLuarNegeri && (
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name={"id_negara_lahir_ibu"}
              placeholder={" negara kelahiran"}
              title="Negara Lahir"
              options={negara.data}
              required
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormAutocomplete
            formik={formik}
            name="id_pekerjaan_ibu"
            placeholder=" pekerjaan atau profesi saat ini"
            title="Pekerjaan/Profesi"
            options={pekerjaan.data}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiIbu;
