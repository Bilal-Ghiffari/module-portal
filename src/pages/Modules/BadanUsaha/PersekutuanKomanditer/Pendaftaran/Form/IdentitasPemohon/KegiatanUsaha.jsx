import TablePersekutuanKomanditer from "../components/Table";
import { CustomButton } from "@/components/Common/Button";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import ModalKegiatanUsaha from "../components/Modal/ModalKegiatanUsaha";
import { Input } from "reactstrap";
import { ErrorMessage } from "formik";

const KegiatanUsaha = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);

  const handleSubmit = (item) => {
    // setData(item);
    setFieldValue("kegiatanUsaha", item);
    toggleModal();
  };

  const [data, setData] = useState([]);

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Kode KBLI", accessor: "kode", width: 100 },
    { header: "Judul KBLI", accessor: "judul", width: 200 },
    { header: "Uraian KBLI", accessor: "uraian" },
    // { header: "Aksi", accessor: "aksi" },
  ];

  return (
    <section className="d-flex flex-column gap-3">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Kegiatan Usaha</span>
        <CustomButton
          text={"Tambah"}
          textColor="#6D6D6D"
          bgColor="white"
          border="1px solid #E7E7E7"
          leftIcon={<BsPlus size={24} />}
          onClick={toggleModal}
        />
      </div>

      <div>
        <TablePersekutuanKomanditer
          columns={columns}
          data={values.kegiatanUsaha}
          // setData={setData}
          striped
          bordered
          hover
        />
        <ErrorMessage
          name="kegiatanUsaha"
          component="div"
          className="text-danger"
        />

        <div className="d-flex gap-2">
          <div>
            <Input
              type="checkbox"
              name="setujuKegiatanUsaha"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.setujuKegiatanUsaha}
            />
          </div>
          <div>
            <span>
              Saya, Notaris, dengan ini memahami dan menyatakan bahwa KBLI yang
              Saya pilih telah sesuai dengan Peraturan Presiden Nomor 49 Tahun
              2021 tentang Perubahan atas Peraturan Presiden Nomor 10 Tahun 2021
              tentang Bidang Usaha Penanaman Modal serta sesuai dengan peraturan
              perundang-undangan terkait lainnya.
            </span>
            <ErrorMessage
              name="setujuKegiatanUsaha"
              component="div"
              className="text-danger"
            />
          </div>
        </div>
      </div>

      <ModalKegiatanUsaha
        isOpen={openModal}
        toggle={toggleModal}
        onSubmit={handleSubmit}
        values={values}
        setFieldValue={setFieldValue}
      />
    </section>
  );
};

export default KegiatanUsaha;
