import { Typography } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

export const RowField = (label, value) => (
  <Row className="mb-2">
    <Col xs="4" md="4" lg="5">
      <Typography variant="body2" fontWeight="bold">
        {label}
      </Typography>
    </Col>
    <Col xs="8" md="8" lg="7">
      <Typography variant="body2">: {value || "-"}</Typography>
    </Col>
  </Row>
);

export const ColField = ({ label, value }) => (
  <Col xs="12" className="mb-3">
    <Typography variant="body2" fontWeight="bold">
      {label}
    </Typography>
    <Typography variant="body2">: {value || "-"}</Typography>
  </Col>
);
