import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
const Card = ({ data }) => {
  return (
    <>
      {data.map((card, index) => (
        <Col xs="3" key={card.id}>
          <Box
            sx={{
              backgroundColor: card.color,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              padding: "14px 14px",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                width: "3px",
                height: "60px",
                backgroundColor: card.dividerColor,
                borderRadius: "3px",
                marginRight: "16px",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontFamily: "Poppins",
                  color: "#202020",
                  marginBottom: "4px",
                }}
              >
                {card.label}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1.3rem",
                  fontFamily: "Poppins",
                  color: "#202020",
                }}
              >
                {card.value}
              </Typography>
            </Box>
          </Box>
        </Col>
      ))}
    </>
  );
};

export default Card;
