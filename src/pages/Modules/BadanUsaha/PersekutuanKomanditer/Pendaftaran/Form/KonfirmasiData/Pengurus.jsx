import { useState } from "react";
import TablePersekutuanKomanditer from "../components/Table";
import { Button } from "reactstrap";

const Pengurus = ({
  values,
  setFieldValue,
  setActiveStep,
  setActiveSection,
}) => {
  const [data, setData] = useState([]);
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama Pengurus", accessor: "namaPengurus" },
    { header: "NIK", accessor: "nik" },
    { header: "Jabatan", accessor: "jabatan" },
    { header: "NPWP", accessor: "nomorNPWP" },
  ];
  return (
    <section className="d-flex flex-column gap-4">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Pengurus</span>
        <Button
          className="d-flex align-items-center gap-2"
          style={{
            backgroundColor: "white",
            color: "#041662",
            borderColor: "#E7E7E7",
            borderRadius: "6px",
          }}
          onClick={() => {
            setActiveStep(0);
            setActiveSection("pengurus");
          }}
        >
          <img src="/src/assets/icons/PencilSimpleLine.svg" alt="" /> Ubah
        </Button>
      </div>

      <div>
        <TablePersekutuanKomanditer
          columns={columns}
          data={data}
          setData={setData}
          striped
          bordered
          hover
        />
      </div>
    </section>
  );
};

export default Pengurus;
