import { useState } from "react";
import { FormInput } from "@/components/Common/FormField";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { Col, Row } from "reactstrap";

const DataKurator = ({ formik, editingIndex, setEditingIndex, fieldName }) => {
  const lastIdx = formik?.values?.[fieldName]?.length - 1;
  const [data, setData] = useState(
    editingIndex !== null ? [editingIndex] : [lastIdx]
  );

  const handleSave = () => {
    const currentIdx = data[0];
    const newItem = formik.values?.[fieldName]?.[currentIdx];

    if (editingIndex !== null) {
      // mode edit ➜ ganti item di index editingIndex
      const updatedList = formik.values?.[fieldName]?.map((item, idx) =>
        idx === editingIndex ? newItem : item
      );
      formik.setFieldValue(fieldName, updatedList);
      setEditingIndex(null);
    } else {
      const existingItems = (formik.values?.[fieldName] || []).filter(
        (item, idx) => idx !== currentIdx && item?.nama?.trim() !== ""
      );
      const initialObject = {
        nama: "",
        nik: "",
        alamat: "",
      };

      const newList = [...existingItems, newItem, initialObject];
      formik.setFieldValue(fieldName, newList);
      setData([newList.length - 1]);
    }
  };

  return (
    <>
      {data?.map((d) => (
        <Row key={d}>
          <Col xs="12" md="6" className="px-3">
            <FormInput
              formik={formik}
              name={`${fieldName}[${d}].nama`}
              placeholder="Nama"
              type="text"
              required
            />
          </Col>
          <Col xs="12" md="6" className="px-3">
            <FormInput
              formik={formik}
              name={`${fieldName}[${d}].nik`}
              placeholder="NIK"
              type="text"
              required
            />
          </Col>
          <Col xs="12" className="px-3">
            <FormInput
              formik={formik}
              name={`${fieldName}[${d}].alamat`}
              placeholder="Alamat"
              type="text"
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
        />
      </div>
    </>
  );
};

export default DataKurator;
