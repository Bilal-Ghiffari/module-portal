import TablePersekutuanKomanditer from "../components/Table";
import { CustomButton } from "@/components/Common/Button";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import ModalSekutu from "../components/Modal/ModalSekutu";
import initialValuesSekutu from "../../Schema/IdentitasPemohon/InitialValue/sekutu";
import sekutuValidationSchema from "../../Schema/IdentitasPemohon/SekutuValidationSchema";

const Sekutu = ({ setFieldValue }) => {
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
    setFieldValue("sekutu", updated);
  };

  const handleSubmit = (item, resetForm) => {
    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = item;
      setData(updated);
      setFieldValue("sekutu", updated);
    } else {
      const newData = [...data, item];
      setData(newData);
      setFieldValue("sekutu", newData);
    }

    setOpenModal(false);
    setEditingIndex(null);
    resetForm();
  };

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama Sekutu", accessor: "namaSekutu" },
    { header: "NIK", accessor: "nik" },
    { header: "Jabatan", accessor: "jabatan" },
    { header: "NPWP", accessor: "nomorNPWP" },
    { header: "Kontribusi", accessor: "kontribusi" },
    {
      header: "Nilai Kontribusi",
      accessor: "nilaiKontribusi",
      type: "currency",
    },
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
        <span className="fw-medium fs-5">Sekutu</span>
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
            setFieldValue("namaSekutu", data[idx].namaSekutu);
            toggleModal();
          }}
          onDelete={handleDelete}
        />

        <ErrorMessage name="sekutu" component="div" className="text-danger" />
      </div>

      {/* Modal Form */}
      <Formik
        enableReinitialize
        initialValues={
          editingIndex !== null ? data[editingIndex] : initialValuesSekutu
        }
        validationSchema={sekutuValidationSchema}
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
          <ModalSekutu
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

export default Sekutu;
