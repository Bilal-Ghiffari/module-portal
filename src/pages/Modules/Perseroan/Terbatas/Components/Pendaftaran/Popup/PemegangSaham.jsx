import { useState } from "react";
import Checked from "@/components/Common/Checked";
import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import Header from "@/components/Header";
import Region from "@/components/Region";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { Col, Row, Label } from "reactstrap";
import RegionNested from "@/components/RegionNested";

const PemegangSaham = ({ formik, editingIndex, setEditingIndex }) => {
  const lastIdx = formik.values.pemegang_saham.length - 1;
  const [data, setData] = useState(
    editingIndex !== null ? [editingIndex] : [lastIdx]
  );

  const handleSave = () => {
    const currentIdx = data[0];
    const newItem = formik.values.pemegang_saham[currentIdx];

    if (editingIndex !== null) {
      // mode edit ➜ ganti item di index editingIndex
      const updatedList = formik.values.pemegang_saham.map((item, idx) =>
        idx === editingIndex ? newItem : item
      );
      formik.setFieldValue("pemegang_saham", updatedList);
      setEditingIndex(null);
    } else {
      const existingItems = formik.values.pemegang_saham.filter(
        (item, idx) => idx !== currentIdx && item?.nama_lengkap?.trim() !== ""
      );

      const initialObject = {
        tanggal_lahir: "",
        jenis_pemegang_saham: "",
        kewarganegaraan: "",
        nama_lengkap: "",
        nik: "",
        npwp: "",
        email: "",
        no_hp: "",
        tempat_lahir: "",
        pemegang_saham_sebagai: [],
        klasifikasi_saham: "",
        lembar_saham: "",
        penanggung_jawab_pajak: "",
        jabatan_pengurus: "",
        alamat: "",
        no_telp: "",
        rt: "",
        rw: "",
        kode_pos: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
      };

      const newList = [...existingItems, newItem, initialObject];
      formik.setFieldValue("pemegang_saham", newList);
      setData([newList.length - 1]);
    }
  };

  return (
    <>
      {data.map((d) => (
        <Row key={d} className="mb-3">
          <Col xs="4">
            <DynamicDropdown
              formik={formik}
              fieldName={`pemegang_saham[${d}].jenis_pemegang_saham`}
              data={[]}
              label="Jenis Pemegang Saham"
              required
            />
          </Col>
          <Col xs="4">
            <DynamicDropdown
              formik={formik}
              fieldName={`pemegang_saham[${d}].kewarganegaraan`}
              data={[]}
              label="Kewarganegaraan"
              required
            />
          </Col>
          <Col xs="4">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].nama_lengkap`}
              placeholder="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="4">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].nik`}
              placeholder="NIK"
              required
            />
          </Col>
          <Col xs="4">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].npwp`}
              placeholder="NPWP"
              required
            />
          </Col>
          <Col xs="4">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].email`}
              placeholder="Email"
              required
            />
          </Col>
          <Col xs="4">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].no_hp`}
              placeholder="Nomor HP"
              required
            />
          </Col>
          <Col xs="4">
            <DynamicDropdown
              formik={formik}
              fieldName={`pemegang_saham[${d}].tempat_lahir`}
              data={[]}
              label="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="4">
            <FormInput
              type="date"
              formik={formik}
              name={`pemegang_saham[${d}].tanggal_lahir`}
              placeholder="Tanggal Lahir"
              required
            />
          </Col>

          <Col xs="12" className="px-3">
            <Label className="mb-0" style={{ fontSize: "12px" }}>
              Pemegang Saham Sebagai:
            </Label>
            <div
              className="d-flex align-items-center gap-5 mt-1"
              style={{ padding: "0px 22px" }}
            >
              <Checked
                label="Pemegang Saham"
                value="Pemegang Saham"
                fieldName={`pemegang_saham[${d}].pemegang_saham_sebagai`}
                formik={formik}
                isMulti
              />
              <Checked
                label="Direksi/Komisaris"
                value="Direksi/Komisaris"
                fieldName={`pemegang_saham[${d}].pemegang_saham_sebagai`}
                formik={formik}
                isMulti
              />
            </div>
          </Col>

          {/* Bagian dinamis: jika pemegang_saham_sebagai berisi "Pemegang Saham" */}
          {formik.values.pemegang_saham?.[d]?.pemegang_saham_sebagai?.includes(
            "Pemegang Saham"
          ) && (
            <>
              <Col xs="6" className="mt-2">
                <DynamicDropdown
                  formik={formik}
                  fieldName={`pemegang_saham[${d}].klasifikasi_saham`}
                  data={[]}
                  label="Klasifikasi Saham"
                  required
                />
              </Col>
              <Col xs="6" className="mt-2">
                <FormInput
                  type="number"
                  formik={formik}
                  name={`pemegang_saham[${d}].lembar_saham`}
                  placeholder="Lembar Saham"
                  required
                />
              </Col>
            </>
          )}

          {/* Bagian dinamis: jika pemegang_saham_sebagai berisi "Direksi/Komisaris" */}
          {formik.values.pemegang_saham?.[d]?.pemegang_saham_sebagai?.includes(
            "Direksi/Komisaris"
          ) && (
            <>
              <Col xs="6" className="px-3 mt-2">
                <Label className="mb-0" style={{ fontSize: "12px" }}>
                  Penanggung Jawab Pajak <span className="text-danger">*</span>
                </Label>
                <div
                  className="d-flex align-items-center gap-5 mt-1"
                  style={{ padding: "0px 22px" }}
                >
                  <Checked
                    label="Ya"
                    value="Ya"
                    fieldName={`pemegang_saham[${d}].penanggung_jawab_pajak`}
                    formik={formik}
                  />
                  <Checked
                    label="Tidak"
                    value="Tidak"
                    fieldName={`pemegang_saham[${d}].penanggung_jawab_pajak`}
                    formik={formik}
                  />
                </div>
              </Col>
              <Col xs="6" className="mt-2">
                <DynamicDropdown
                  formik={formik}
                  fieldName={`pemegang_saham[${d}].jabatan_pengurus`}
                  data={[]}
                  label="Jabatan Pengurus"
                  required
                />
              </Col>
            </>
          )}

          {/* Alamat */}
          <Col xs="12" className="mt-4">
            <Header label={"Alamat"} />
          </Col>
          <Col xs="12">
            <RegionNested
              formik={formik}
              provinsiKey={`pemegang_saham[${d}].provinsi`}
              kabupatenKey={`pemegang_saham[${d}].kabupaten`}
              kecamatanKey={`pemegang_saham[${d}].kecamatan`}
              kelurahanKey={`pemegang_saham[${d}].kelurahan`}
              showNegara={false}
              col="3"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].alamat`}
              placeholder="Alamat Kantor"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].no_telp`}
              placeholder="Nomor Telepon"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].rt`}
              placeholder="RT"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].rw`}
              placeholder="RW"
              type="number"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name={`pemegang_saham[${d}].kode_pos`}
              placeholder="Kode Pos"
              type="number"
              required
            />
          </Col>
        </Row>
      ))}

      <div className="w-100 text-end">
        <ButtonCustom
          onClick={handleSave}
          label={
            editingIndex !== null && editingIndex !== undefined
              ? "Perbarui"
              : "Simpan"
          }
        />{" "}
      </div>
    </>
  );
};

export default PemegangSaham;
