import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer bg-primary">
        <Container fluid={true}>
          <Row>
            <span className="text-center text-white">
              {new Date().getFullYear()} © Kementerian Hukum Republik Indonesia.
            </span>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
