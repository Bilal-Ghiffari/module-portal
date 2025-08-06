import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="footer text-white"
      // style={{ background: "linear-gradient(to bottom, #01104F, #000000)" }}
      style={{ background: "#041043", fontFamily: "Poppins" }}
    >
      <div
        style={
          {
            // boxShadow: '0 -10px 25px rgba(0,0,0,0.15)',
            // background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)",
          }
        }
        className="d-flex flex-column align-items-center justify-content-center text-center mt-1"
      >
        <small
          className="fw-light mb-1"
          style={{
            color: "#757C98",
            fontSize: "12px",
            lineHeight: "24px",
            fontWeight: 500,
          }}
        >
          © {year} Direktorat Jenderal Administrasi Hukum Umum
        </small>
        <small
          className="fw-light"
          style={{
            color: "#757C98",
            fontSize: "12px",
            lineHeight: "24px",
            fontWeight: 500,
          }}
        >
          Kementerian Hukum dan HAM Republik Indonesia
        </small>
      </div>
    </footer>
  );
};

export default Footer;
