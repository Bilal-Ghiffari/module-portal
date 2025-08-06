import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { changeLayout } from "../../store/actions";
//constants
import { layoutTypes } from "../../constants/layout";
import { useDispatch } from "react-redux";
import { modules_constant } from "../../constants/menu_modules";
import { Button } from "reactstrap";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { findPermission } from "@/helpers/services/checkAccess";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import { convertHexToRGB } from "@/helpers/services/convert";

const CardCustom = ({ item, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (item.newTab) {
      return window.open(item.link, "_blank");
    }

    // navigate(item.link);
    // item.link ? onClick(true) : onClick(false);
    window.location.href = item.link;
  };
  return (
    <React.Fragment>
      <div className="container">
        <div
          className={`card shadow-sm rounded-3 border border-secondary border-opacity-25 hover-scale cursor-pointer ${
            item.iconImg ? "py-2" : "py-3"
          } `}
          style={{ minHeight: "121px" }}
          onClick={() => handleClick()}
        >
          <div className="card-body d-flex align-items-center">
            <div className="me-3">
              {/* sebagian udah ada icons dari figma nya */}
              {item.iconImg ? (
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    height: "58px",
                    width: "58px",
                    backgroundColor: `rgba(${convertHexToRGB(item.color)}, 1)`,
                  }}
                >
                  <img src={item.iconImg} alt={`icons-${item.title}`} />
                </div>
              ) : (
                <div
                  className="p-1 rounded-3"
                  style={{
                    backgroundColor: `rgba(${convertHexToRGB(
                      item.color
                    )}, 0.25)`,
                  }}
                >
                  <i
                    className={`bx ${item.icon} bx-md`}
                    style={{ color: item.color }}
                  />
                </div>
              )}
            </div>
            <div>
              <h5 className="card-title mb-1 ">{item.title}</h5>
              {/* <p className="card-text font-size-12 text-muted">{item.text}</p> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const ProfileLanding = () => {
  const dispatch = useDispatch();
  document.title = "Profile | AHU RI";
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const toastifyService = new ToastifyService();
  useEffect(() => {
    const tempModules = modules_constant.filter((o) =>
      findPermission({
        moduleCode: o.r_modules_code,
        isModule: true,
        action: "permission",
      })
    );

    setModules(
      tempModules.map((o) => ({
        ...o,
        link: o.url,
        title: o.module,
        text: "Modul " + o.module,
      }))
    );
  }, []);

  const handleClicked = (e, data) => {
    if (e) {
      dispatch(changeLayout(layoutTypes.VERTICAL));
      localStorage.setItem("moduleNow", data.r_modules_code);
      // switch (data.module_code) {
      //   case '15': //pengawasan
      //   case '18': //Media Analytic
      //   case '21': //Big Data
      //   case '22': //perizinan
      //     // dispatch(changeLayout(layoutTypes.HORIZONTAL));
      //     break;

      //   default:
      //     dispatch(changeLayout(layoutTypes.VERTICAL));

      //     break;
      // }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content mt-3">
        <Container fluid>
          <Row>
            {modules.length ? (
              modules.map((item, idx) => (
                <Col sm={6} md={4} lg={3} key={"_card_" + idx}>
                  <CardCustom
                    item={item}
                    onClick={(e) => handleClicked(e, item)}
                  />
                </Col>
              ))
            ) : (
              <div
                className="w-100 d-flex flex-column justify-content-center align-items-center"
                style={{ height: "calc(100vh - 120px)" }}
              >
                <h3 className="text-secondary text-opacity-50 text-center">
                  Anda Tidak Punya Akses ke Modul Apapun <br /> Harap Hubungi
                  Admin untuk Mendapat Akses Modul
                </h3>
                {/* <Button
                  color="success"
                  className="mt-4"
                  onClick={
                    () => {}
                    // window.open(
                    //   `https://wa.me/628118722005?text=${encodeURIComponent(message)}`,
                    //   '_blank'
                    // )
                  }
                >
                  <i className="bx bxl-whatsapp text-white fs-3 fw-semibold me-2" />
                  <span className="fs-4 fw-medium">Pesan WhatsApp</span>
                </Button> */}
              </div>
            )}
          </Row>
        </Container>
        {/* <ModalProfileTermCond
          show={showMdl}
          handleClose={() => setShowMdl(false)}
          data={tempResUser}
        /> */}
      </div>
    </React.Fragment>
  );
};

export default ProfileLanding;
