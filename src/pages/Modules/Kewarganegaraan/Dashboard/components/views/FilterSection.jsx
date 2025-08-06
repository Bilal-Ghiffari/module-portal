import React from "react";
import { Row, Col } from "reactstrap";
import CustomButtonFilter from "../ButtonFilter";
import { Box } from "@mui/material";

const FilterSection = ({ data }) => {
  return (
    <>
      {data.map((category, index) => (
        <Row
          key={index}
          className="align-items-center mb-3"
          // style={{ gap: "10px" }}
        >
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={2}
            className="d-flex align-items-center"
          >
            <strong>{category.text}:</strong>
          </Col>

          <Col xs={12} sm={12} md={12} lg={10}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                // gap: "8px",
                "& > *": {
                  minWidth: "fit-content",
                  flexGrow: 0,
                },
              }}
            >
              {category.children.map((child, childIndex) => (
                <CustomButtonFilter
                  key={childIndex}
                  title={child.text}
                  color={child.color}
                />
              ))}
            </Box>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default FilterSection;
