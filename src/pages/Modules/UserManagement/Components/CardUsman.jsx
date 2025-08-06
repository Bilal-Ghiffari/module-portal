import PropTypes from "prop-types";
import React from "react";

const CardUsman = (props) => {
  const { title, text, iconClass, color, onClick } = props;

  return (
    <React.Fragment>
      <div
        // onClick={onClick}
        className="card shadow-sm rounded-3 border-bottom-3 bg-white py-2 "
        style={{
          borderBottom: `3px solid #000000`,
          transition: "transform 0.2s",
          height: "75%",
          borderColor: color,
        }}
      >
        <div className="card-body">
          <div className="row">
            <div className="d-flex align-items-center px-1">
              <div className={`bg-opacity-25 p-1 rounded-3 d-flex justify-content-center align-items-center`} style={{ backgroundColor: color }}>
                <i className={`${iconClass} fs-3 text-white`}></i>
              </div>
              <h5 className="fs-md-5 fs-6 ms-2">{title}</h5>
            </div>
          </div>
          <p className="card-text text-muted mt-1 fw-bold fs-4">{text}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

CardUsman.propTypes = {
  iconClass: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
};

export default CardUsman;
