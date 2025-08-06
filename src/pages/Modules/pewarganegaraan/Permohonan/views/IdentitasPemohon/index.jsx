import { Box } from "@mui/material";
import InformasiPribadiSection from "./identitasPribadi";
import LineDashed from "@/components/Common/Line/Dashed";
import InformasiAlamatSection from "./DataAlamat";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import InformasiPernikahanSection from "./IdentitasPernikahan";
import { useSelector } from "react-redux";

const IdentitasPemohonSection = ({ formik }) => {
  const { values } = formik;

  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <Row>
        <Col>
          <InformasiPribadiSection formik={formik} />
        </Col>
        <Col>
          <InformasiPernikahanSection formik={formik} />
        </Col>
      </Row>
      <LineDashed />
      <InformasiAlamatSection formik={formik} />
      <LineDashed />
    </Box>
  );
};

export default IdentitasPemohonSection;
