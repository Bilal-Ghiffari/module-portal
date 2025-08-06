import { formatNumber } from '@/helpers/services/convert';
import { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Row, Col } from 'reactstrap';

const CustomPagination = ({ totalData, limitPerPage, currPage, pageNow, hideTotal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalData / limitPerPage);
  const maxPagesToShow = 5;

  // Update currentPage state and notify parent component
  const handleClick = (page) => {
    setCurrentPage(page);
    pageNow(page); // Call the parent function to update the page
  };

  const getPaginationItems = () => {
    const items = [];
    let startPage = Math.max((currPage || currentPage) - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i} active={i === (currPage || currentPage)}>
          <PaginationLink onClick={() => handleClick(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };
  return (
    <Row>
      <Col className="d-flex align-items-center px-4">
        {!hideTotal && <span className="fw-bold fs-6">Total Data: {formatNumber(totalData)}</span>}
      </Col>
      <Col>
        <Pagination>
          <div className='d-flex gap-2'>
            <PaginationItem disabled={(currPage || currentPage) === 1}>
              <PaginationLink first onClick={() => handleClick(1)} />
            </PaginationItem>
            <PaginationItem disabled={(currPage || currentPage) === 1}>
              <PaginationLink previous onClick={() => handleClick((currPage || currentPage) - 1)} />
            </PaginationItem>
            {getPaginationItems()}
            <PaginationItem disabled={(currPage || currentPage) === totalPages}>
              <PaginationLink next onClick={() => handleClick((currPage || currentPage) + 1)} />
            </PaginationItem>
            <PaginationItem disabled={(currPage || currentPage) === totalPages}>
              <PaginationLink last onClick={() => handleClick(totalPages)} />
            </PaginationItem>
          </div>
        </Pagination>
      </Col>
    </Row>
  );
};

export default CustomPagination;
