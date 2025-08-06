import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="w-100 d-flex justify-content-center align-items-center flex-column row-gap-3" style={{ height: "calc(100vh - 120px)" }}>
        <h3 className="text-secondary text-opacity-50">Halaman Tidak Ditemukan</h3>
        <Button onClick={() => navigate("/profile")} color="primary">
          Kembali Ke Profile
        </Button>
      </div>
    </React.Fragment>
  );
};
export default Page404;
