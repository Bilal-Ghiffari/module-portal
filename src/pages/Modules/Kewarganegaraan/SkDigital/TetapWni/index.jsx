import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";

const SkDigitalTetapWni = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idPermohonan = queryParams.get("id_permohonan");

  return (
    <Container className="page-content" fluid>
      <h1>Halaman SK Digital Tetap WNI</h1>
      <p>ID Permohonan: {idPermohonan}</p>
    </Container>
  );
};

export default SkDigitalTetapWni;
