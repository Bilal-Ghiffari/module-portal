import TablePersekutuanKomanditer from "../components/Table";
import { CustomButton } from "@/components/Common/Button";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import initialValuesPengurus from "../../Schema/IdentitasPemohon/InitialValue/pengurus";
import pengurusValidationSchema from "../../Schema/IdentitasPemohon/PengurusValidationSchema";
import ModalPengurus from "../components/Modal/ModalPengurus";

const Pengurus = ({ setFieldValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const toggleModal = () => setOpenModal((prev) => !prev);

  const handleAdd = () => {
    setEditingIndex(null);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
    setFieldValue("pengurus", updated);
  };

  const handleSubmit = (item, resetForm) => {
    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = item;
      setData(updated);
      setFieldValue("pengurus", updated);
    } else {
      const newData = [...data, item];
      setData(newData);
      setFieldValue("pengurus", newData);
    }

    setOpenModal(false);
    setEditingIndex(null);
    resetForm();
  };

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama Pengurus", accessor: "namaPengurus" },
    { header: "NIK", accessor: "nik" },
    { header: "Jabatan", accessor: "jabatan" },
    { header: "NPWP", accessor: "nomorNPWP" },
    {
      header: "Aksi",
      accessor: "aksi",
    },
  ];

  return (
    <section className="d-flex flex-column gap-3">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Pengurus</span>
        <CustomButton
          text={"Tambah"}
          textColor="#6D6D6D"
          bgColor="white"
          border="1px solid #E7E7E7"
          leftIcon={<BsPlus size={24} />}
          onClick={handleAdd}
        />
      </div>

      {/* Table */}
      <div>
        <TablePersekutuanKomanditer
          columns={columns}
          data={data}
          setData={setData}
          striped
          bordered
          hover
          onEdit={(idx) => {
            setEditingIndex(idx);
            setFieldValue("namaPengurus", data[idx].namaPengurus);
            toggleModal();
          }}
          onDelete={handleDelete}
        />

        <ErrorMessage name="pengurus" component="div" className="text-danger" />
      </div>

      {/* Modal Form */}
      <Formik
        enableReinitialize
        initialValues={
          editingIndex !== null ? data[editingIndex] : initialValuesPengurus
        }
        validationSchema={pengurusValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          resetForm,
        }) => (
          <ModalPengurus
            isOpen={openModal}
            toggle={() => {
              toggleModal();
              resetForm();
              setEditingIndex(null);
            }}
            onSubmit={handleSubmit}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            resetForm={resetForm}
            editingIndex={editingIndex}
          />
        )}
      </Formik>
    </section>
  );
};

export default Pengurus;
