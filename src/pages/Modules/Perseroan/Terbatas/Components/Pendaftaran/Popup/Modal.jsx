import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import ButtonCustom from "@/components/Common/ButtonCustom";

const Modal = ({ formik, fieldName, editingIndex, setEditingIndex }) => {
  const lastIdx = Array.isArray(formik.values?.[fieldName])
    ? formik.values[fieldName].length - 1
    : 0;

  const [data, setData] = useState(
    editingIndex !== null ? [editingIndex] : [lastIdx]
  );

  useEffect(() => {
    data.forEach((d) => {
      const hargaRaw = formik.values?.[fieldName]?.[d]?.harga_perlembar || "0";
      const harga = Number(hargaRaw.toString().replace(/\D/g, "")) || 0;

      const lembarRaw = formik.values?.[fieldName]?.[d]?.lembar_saham || "0";
      const lembar = Number(lembarRaw.toString().replace(/\D/g, "")) || 0;

      const total = harga * lembar;

      // setFieldValue ke Formik tetap angka
      formik.setFieldValue(`${fieldName}[${d}].total_modal`, total);
    });
  }, [
    data,
    ...data.map((d) => formik.values?.[fieldName]?.[d]?.harga_perlembar),
    ...data.map((d) => formik.values?.[fieldName]?.[d]?.lembar_saham),
  ]);

  const handleSave = () => {
    const currentDocIdx = data[0];
    const newDoc = formik.values?.[fieldName]?.[currentDocIdx];

    if (editingIndex !== null) {
      // mode edit ➜ ganti item di index editingIndex
      const updatedList = formik.values?.[fieldName]?.map((item, idx) =>
        idx === editingIndex ? newDoc : item
      );
      formik.setFieldValue(fieldName, updatedList);
      setEditingIndex(null);
    } else {
      const existingDocs = formik.values?.[fieldName]?.filter(
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
      formik.setFieldValue(fieldName, newList);
      setData([newList.length - 1]);
    }
  };
  return (
    <>
      {data.map((d) => (
        <Row key={d} className="mb-3">
          <Col xs="12">
            <DynamicDropdown
              formik={formik}
              fieldName={`${fieldName}[${d}].klasifikasi_saham`}
              data={[]} // isikan data sesuai kebutuhan
              label="Klasifikasi Saham"
              required
            />
          </Col>
          <Col xs="6">
            <FormInput
              formik={formik}
              name={`${fieldName}[${d}].harga_perlembar`}
              placeholder="Harga Perlembar"
              type="text"
              required
              isCurrency
            />
          </Col>
          <Col xs="6">
            <FormInput
              formik={formik}
              name={`${fieldName}[${d}].lembar_saham`}
              placeholder="Lembar Saham"
              type="text"
              required
            />
          </Col>
          <Col xs="12">
            <FormInput
              formik={formik}
              name={`${fieldName}[${d}].total_modal`}
              title="Total Modal"
              placeholder="Auto Fill"
              type="text"
              required
              readonly
              isCurrency
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

export default Modal;
