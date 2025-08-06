import { Box } from "@mui/material";
import InformasiAnakSection from "./InformasiAnak";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import AlamatTinggalSection from "./AlamatTinggal";
import InformasiPengangkatan from "./InformasiPengangkatan";
import InformasiPasport from "./InformasiPaspor";

const IdentitasAnak = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <Row>
        <Col xs="12" sm="6" md="6" lg="6" xl="6">
          <InformasiAnakSection formik={formik} />
        </Col>
        <Col xs="12" sm="6" md="6" lg="6" xl="6">
          <AlamatTinggalSection formik={formik} />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6" md="6" lg="6" xl="6">
          <InformasiPengangkatan formik={formik} />
        </Col>
        <Col xs="12" sm="6" md="6" lg="6" xl="6">
          <InformasiPasport formik={formik} />
        </Col>
      </Row>
    </Box>
  );
};

export default IdentitasAnak;
