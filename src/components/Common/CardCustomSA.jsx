import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardCustomSA = (props) => {
  const { title, text, iconClass, color, link, isActive, clicked, disButton, jenisPendaftaran } =
    props;

  const navigate = useNavigate();

  const handleClick = () => {
    if (isActive) {
      clicked(true);
      navigate(link, { state: { jenisPendaftaran } });
    }
  };

  return (
    <React.Fragment>
      <div
        className={`card shadow-sm rounded-3 border-bottom-3 ${
          isActive
            ? `hover-scale cursor-pointer`
            : 'border-secondary cursor-disable bg-secondary bg-opacity-25'
        } py-2`}
        style={{
          borderBottom: `3px solid #000000`,
          cursor: isActive ? 'pointer' : 'default',
          transition: 'transform 0.2s',
          height: '75%',
          borderColor: color,
        }}
        onClick={() => handleClick()}>
        <div className="card-body">
          <div className="row">
            <div
              className={`col-12 ${
                !disButton && 'col-md-10'
              } d-flex align-items-center mb-3 mb-md-0`}>
              <div className="me-2">
                <div
                  className={`${isActive ? `` : 'bg-secondary'} bg-opacity-25 p-1 rounded-3`}
                  style={{ backgroundColor: color }}>
                  <i
                    className={`${iconClass} bx-sm ${
                      isActive ? `text-white` : 'text-secondary'
                    }`}></i>
                </div>
              </div>
              <h5 className="fs-5 text-primary">{title}</h5>
            </div>

            {/* Disable Button */}
            {!disButton && (
              <div className="col-12 col-md-2 text-md-end">
                <button
                  type="button"
                  className="btn btn-success btn-sm rounded me-2"
                  onClick={() => handleClick()}>
                  <i className="bx bx-plus fs-2x"></i>
                </button>
              </div>
            )}
          </div>
          <p className="card-text text-muted fs-5 mt-1 fw-bold">{text}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

CardCustomSA.propTypes = {
  iconClass: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string,
  isActive: PropTypes.bool,
  clicked: PropTypes.any,
  disButton: PropTypes.bool,
};

export default CardCustomSA;
