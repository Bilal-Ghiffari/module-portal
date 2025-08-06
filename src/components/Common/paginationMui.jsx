import { formatNumber } from '@/helpers/services/convert';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const PaginationMui = ({ pageNow, totalData, perPage, setPage }) => {
  // Calculate total pages based on totalData and perPage
  const totalPage = Math.ceil(totalData / perPage);

  // Function to change the current page
  const changeCurrentPage = (id) => {
    setPage(id);
  };

  const handleBack = () => {
    if (pageNow > 1) {
      setPage(pageNow - 1);
    }
  };

  const handleNext = () => {
    if (pageNow < totalPage) {
      setPage(pageNow + 1);
    }
  };

  // Determine the range of pages to display
  const visiblePages = 5;
  let startPage = Math.max(1, pageNow - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPage, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  return (
    <div className="d-flex gap-2 align-items-center mb-2 mt-3 justify-content-between p-3">
      <span className="fw-bold">Total Data: {formatNumber(totalData)}</span>
      <div className="d-flex align-items-center position-relative ">
        <div className='d-flex gap-8 mr-10'>
        </div>
        {/* First Page Button */}
        {pageNow > 1 && (
          <span
            onClick={() => setPage(1)}
            className="p-2 cursor-pointer text-sm border border-secondary border-opacity-10 text-gray-600">
            <MdOutlineKeyboardDoubleArrowLeft size={16} />
          </span>
        )}

        {/* Previous Page Button */}
        {pageNow > 1 && (
          <span
            onClick={handleBack}
            className="p-2 cursor-pointer text-sm border border-secondary border-opacity-10 text-gray-600">
            <MdKeyboardArrowLeft size={16} />
          </span>
        )}

        {/* Page Numbers */}
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => changeCurrentPage(page)}
            className={`text-center cursor-pointer text-sm border ${page === pageNow
              ? 'bg-primary text-white border-primary fw-bold'
              : 'border-secondary border-opacity-10'
              }`}
            style={{ padding: '.52rem .56rem', minWidth: '2.1rem' }}>
            {page}
          </span>
        ))}

        {/* Next Page Button */}
        {pageNow < totalPage && (
          <span
            onClick={handleNext}
            className="p-2 cursor-pointer text-sm border border-secondary border-opacity-10 text-gray-600">
            <MdKeyboardArrowRight size={16} />
          </span>
        )}

        {/* Last Page Button */}
        {pageNow < totalPage && (
          <span
            onClick={() => setPage(totalPage)}
            className="p-2 cursor-pointer text-sm border border-secondary border-opacity-10 text-gray-600">
            <MdOutlineKeyboardDoubleArrowRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
};

export default PaginationMui;
