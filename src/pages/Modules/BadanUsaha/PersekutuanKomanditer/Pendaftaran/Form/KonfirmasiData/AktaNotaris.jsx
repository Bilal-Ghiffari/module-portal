import { Button } from "reactstrap";

const AktaNotaris = ({
  values,
  setFieldValue,
  setActiveStep,
  setActiveSection,
}) => {
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
        <span className="fw-medium fs-5">Akta Notaris</span>
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
            setActiveSection("aktaNotaris");
          }}
        >
          <img src="/src/assets/icons/PencilSimpleLine.svg" alt="" /> Ubah
        </Button>
      </div>

      <section className="row">
        <div className="col-6">
          <div className="row mb-2">
            <div className="col-6">Nomor Akta</div>
            <div className="col-6">: Korporasi</div>
          </div>
          <div className="row mb-2">
            <div className="col-6">Tanggal Akta</div>
            <div className="col-6">: Korporasi</div>
          </div>
          <div className="row mb-2">
            <div className="col-6">Provinsi</div>
            <div className="col-6">: Korporasi</div>
          </div>
          <div className="row mb-2">
            <div className="col-6">Kabupaten/Kota</div>
            <div className="col-6">: Korporasi</div>
          </div>
        </div>

        <div className="col-6">
          <div className="row mb-2">
            <div className="col-6">Nama Notaris</div>
            <div className="col-6">: Korporasi</div>
          </div>
          <div className="row mb-2">
            <div className="col-6">Kedudukan Notaris</div>
            <div className="col-6">: Korporasi</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AktaNotaris;
