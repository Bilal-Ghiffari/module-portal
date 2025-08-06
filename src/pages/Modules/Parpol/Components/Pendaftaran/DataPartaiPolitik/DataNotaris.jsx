import ButtonCustom from "@/components/Common/ButtonCustom";
import { FormInput } from "@/components/Common/FormField";
import FileUploadComponent from "@/components/Common/UploadFile";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { useState } from "react";
import { Row, Col } from "reactstrap";

const DataNotaris = ({ formik, editingIndex, setEditingIndex }) => {
  const lastIdx = formik.values.notaris.length - 1;
  const [data, setData] = useState(
    editingIndex !== null ? [editingIndex] : [lastIdx]
  );

  const handleSave = () => {
    const currentDocIdx = data[0];
    const newDoc = formik.values.notaris[currentDocIdx];

    if (editingIndex !== null) {
      // mode edit ➜ ganti item di index editingIndex
      const updatedList = formik.values.notaris.map((item, idx) =>
        idx === editingIndex ? newDoc : item
      );
      formik.setFieldValue("notaris", updatedList);
      setEditingIndex(null);
    } else {
      // mode tambah ➜ tambahkan item baru (newDoc) + initialDocumentObject
      const existingDocs = formik.values.notaris.filter(
        (doc, idx) =>
          idx !== currentDocIdx && doc && doc.nama_pendiri?.trim() !== ""
      );
      const initialDocumentObject = {
        nama_notaris: "",
        kedudukan: "",
        no_akta: "",
        tanggal_akta: "",
        perihal_akta: "",
        dokumen_akta: null,
      };
      const newList = [...existingDocs, newDoc, initialDocumentObject];
      formik.setFieldValue("notaris", newList);
      setData([newList.length - 1]);
    }
  };

  return (
    <>
      {data?.map((_, index) => {
        return (
          <Row key={index}>
            <Col xs="3" className="px-3">
              <FormInput
                formik={formik}
                name={`notaris[${index}].nama_notaris`}
                type="text"
                placeholder="Nama Notaris"
                required
              />
            </Col>
            <Col xs="3" className="px-3">
              <DynamicDropdown
                formik={formik}
                fieldName={`notaris[${index}].kedudukan`}
                data={[]}
                label="Kedudukan"
                required
              />
            </Col>
            <Col xs="3" className="px-3">
              <FormInput
                formik={formik}
                name={`notaris[${index}].no_akta`}
                type="number"
                placeholder="Nomor Akta"
                required
              />
            </Col>
            <Col xs="3" className="px-3">
              <FormInput
                formik={formik}
                name={`notaris[${index}].tanggal_akta`}
                type="date"
                placeholder="Tanggal Akta"
                required
              />
            </Col>
            <Col xs="6" className="px-3">
              <FormInput
                formik={formik}
                name={`notaris[${index}].perihal_akta`}
                type="textarea"
                placeholder="Perihal Akta"
                required
              />
            </Col>
            <Col xs="6" className="px-3">
              <FileUploadComponent
                label="Dokumen Akta"
                text="Pilih file Anda"
                name={`notaris[${index}].dokumen_akta`}
                resFile={(file) =>
                  formik.setFieldValue(`notaris[${index}].dokumen_akta`, file)
                }
                maxSizeMb={10}
                searchLatLon={false}
                validType="pdf"
                specified={true}
                required
                fieldValue={formik.values?.notaris?.[index]?.dokumen_akta}
              />
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

export default DataNotaris;
