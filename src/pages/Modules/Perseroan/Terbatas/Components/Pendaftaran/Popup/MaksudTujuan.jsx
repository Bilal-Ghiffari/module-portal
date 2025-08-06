import { useState } from "react";
import Checked from "@/components/Common/Checked";
import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Col, Row, Label } from "reactstrap";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { dummyJenisKelamin } from "@/pages/Modules/Apostille/Components/mock";
const MaksudTujuan = ({ formik, editingIndex, setEditingIndex }) => {
  const lastIdx = formik.values.maksud_tujuan.length - 1;
  const [data, setData] = useState(
    editingIndex !== null ? [editingIndex] : [lastIdx]
  );


  const handleSave = () => {
    const currentDocIdx = data[0];
    const newDoc = formik.values.maksud_tujuan[currentDocIdx];

    if (editingIndex !== null) {
      // mode edit ➜ ganti item di index editingIndex
      const updatedList = formik.values.maksud_tujuan.map((item, idx) =>
        idx === editingIndex ? newDoc : item
      );
      formik.setFieldValue("maksud_tujuan", updatedList);
      setEditingIndex(null);
    } else {
      // mode tambah ➜ tambahkan item baru (newDoc) + initialDocumentObject
      const existingDocs = formik.values.maksud_tujuan.filter(
        (doc, idx) =>
          idx !== currentDocIdx && doc && doc.nama_pendiri?.trim() !== ""
      );
      const initialDocumentObject = {
        nama_pendiri: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        disabilitas: "",
      };
      const newList = [...existingDocs, newDoc, initialDocumentObject];
      formik.setFieldValue("maksud_tujuan", newList);
      setData([newList.length - 1]);
    }
  };
  return (
    <>
      {data.map((d) => {
        return (
          <Row key={d} className="mb-3">
            <Col xs="12">
              <FormInput
                formik={formik}
                name={`maksud_tujuan[${d}].nama_pendiri`}
                placeholder="Nama Pendiri"
                required
              />
            </Col>
            <Col xs="6">
              <DynamicDropdown
                formik={formik}
                fieldName={`maksud_tujuan[${d}].jenis_kelamin`}
                data={dummyJenisKelamin}
                label="Jenis Kelamin"
                required
              />
            </Col>
            <Col xs="6">
              <FormInput
                type="date"
                formik={formik}
                name={`maksud_tujuan[${d}].tanggal_lahir`}
                placeholder="Tanggal Lahir"
                required
              />
            </Col>
            <Col xs="12" className="px-3">
              <Label className="mb-0" style={{ fontSize: "12px" }}>
                Apakah memiliki status disabilitas?
                <span className="text-danger">*</span>
              </Label>
              <div
                className="d-flex align-items-center gap-5 mt-1"
                style={{ padding: "0px 22px" }}
              >
                <Checked
                  label="Ya"
                  value="Ya"
                  fieldName={`maksud_tujuan[${d}].disabilitas`}
                  formik={formik}
                />
                <Checked
                  label="Tidak"
                  value="Tidak"
                  fieldName={`maksud_tujuan[${d}].disabilitas`}
                  formik={formik}
                />
              </div>
            </Col>
          </Row>
        );
      })}
      <div className="w-100 text-end">
        <ButtonCustom
          onClick={handleSave}
          label={
            editingIndex !== null && editingIndex !== undefined
              ? "Perbarui"
              : "Simpan"
          }
        />
      </div>
    </>
  );
};

export default MaksudTujuan;
