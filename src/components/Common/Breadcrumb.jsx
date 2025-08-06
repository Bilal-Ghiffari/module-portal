import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, BreadcrumbItem } from 'reactstrap';

const Breadcrumb = (props) => {
  const content = props.content;
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between pb-1">
          <h1 className="mb-0 fs-3 text-primary fw-semibold">{props.title}</h1>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {content.map((item, idx) => {
                if (idx == content.length - 1) {
                  return;
                }
                return (
                  <BreadcrumbItem key={idx} className='text-danger'>
                    <Link to={item.link}>{item.label}</Link>
                  </BreadcrumbItem>
                );
              })}
              <BreadcrumbItem active>
                <span className="text-primary">{content[content.length - 1].label}</span>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
};

export default Breadcrumb;
