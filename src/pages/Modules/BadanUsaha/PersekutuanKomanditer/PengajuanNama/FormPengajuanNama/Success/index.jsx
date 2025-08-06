import { Box } from "@mui/material";
import CheckIcon from "@/assets/icons/check.png";

const SuccessPengajuanNama = ({ values }) => {
  return (
    <Box
      className="bg-white page-content mb-4"
      sx={{ width: "100%", minHeight: "100vh" }}
    >
      <section
        className="d-flex justify-content-center align-items-start mt-5"
        style={{ height: "100vh" }}
      >
        <div
          style={{
            width: "828px",
            border: "1px solid #DBEBFE",
            borderRadius: "12px",
            padding: "40px",
          }}
        >
          <div className="d-flex flex-column align-items-center gap-3 mb-4">
            <img
              src={CheckIcon}
              alt="Success"
              style={{
                width: 80,
                height: 80,
              }}
            />
            <span className="fw-medium" style={{ fontSize: "28px" }}>
              Pendaftaran Berhasil!
            </span>
          </div>

          <hr style={{ borderColor: "#DBEBFE", margin: "24px 0px" }} />

          <div className="row g-2 w-100 mx-2">
            <div className="col-6">Nomor Pengajuan Nama</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Nama CV</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Singkatan CV</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Tanggal Pengajuan Nama</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Tanggal Kadaluarsa Pengajuan Nama</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Nama Pemohon</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Email</div>
            <div className="col-6">: Korporasi</div>
            <div className="col-6">Telepon</div>
            <div className="col-6">: Korporasi</div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default SuccessPengajuanNama;
