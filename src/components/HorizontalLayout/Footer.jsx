import { Container } from 'reactstrap';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer text-white p-0" style={{ background: 'linear-gradient(to bottom, #01104F, #000000)' }}>
      <Container fluid className="px-0">
        {/* <Row className="text-center text-md-start">
          //Contact Center
          <Col xs="12" md="4">
            <h6 className="text-warning">Contact Center</h6>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <i className="mdi mdi-email-outline fs-5 text-white" />
              <a href="mailto:cs@ahu.go.id" className="text-white small text-decoration-none">
                cs@ahu.go.id
              </a>
            </div>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <i className="bx bx-phone-call fs-5 text-light" />
              <span className="small text-light">1500 105</span>
            </div>
          </Col>

          //Humas AHU
          <Col xs="12" md="4">
            <h6 className="text-warning">Humas AHU</h6>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <i className="mdi mdi-email-outline fs-5 text-white" />
              <a href="mailto:humas@ahu.go.id" className="text-white small text-decoration-none">
                humas@ahu.go.id
              </a>
            </div>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <i className="bx bxl-instagram fs-5 text-white" />
              <a href={`https://www.instagram.com/djahu_kemenkum`} target="_blank" rel="noopener noreferrer" className="text-white small text-decoration-none">
                djahu_kemenkum
              </a>
            </div>
          </Col>

          //Alamat
          <Col xs="12" md="4">
            <h6 className="text-warning">Alamat AHU</h6>
            <p className="small text-warning-50 mb-0">No.Kav X6/6-7, Jl. H. R. Rasuna Said, RT.16/RW.4, Kuningan, Setiabudi, Jakarta Selatan, DKI Jakarta 12940, Indonesia</p>
          </Col>
        </Row> */}

        {/* Divider bawah dengan shadow halus */}
        <div
          style={{
            height: '80px', // bisa diubah sesuai kebutuhan
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            // boxShadow: '0 -10px 25px rgba(0,0,0,0.15)',
            // background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)'
            backgroundColor: '#041043'
          }}
          className="d-flex flex-column align-items-center justify-content-center text-center"
        >
          <small className="fw-light mb-1 fw-medium fs-6" style={{ color: '#757C98' }}>
            © {year} Direktorat Jenderal Administrasi Hukum Umum
          </small>
          <small className="fw-light fw-medium fs-6" style={{ color: '#757C98' }}>
            Kementerian Hukum dan HAM Republik Indonesia
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
