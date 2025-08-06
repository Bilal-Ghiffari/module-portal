import DataTable from 'react-data-table-component';
import React, { useMemo } from 'react';
import CustomPagination from './PaginationCustom';


const TabelCustomSA = ({
  data,
  columns,
  disSubHeader,
  selectColumn,
  selectedColumns,
  optionalColumns,
  toggleCleared,
  onRowSelected,
  customStyles,
  limit,
  pageNow,
  customClass,
  fixedHeader,
  fixedHeaderScrollHeight,
  sortServer,
  handleSort,
  handlePageChange,
  pagination,
  dataTotal,
  hideTotal,
  currPage,
}) => {
  const combinedColumns = [
    ...columns,
    ...(selectedColumns || []).map((col) => {
      const column = optionalColumns.find((optCol) => optCol.name === col);
      return column ? { ...column, name: column.header } : {};
    }),
  ];

  const subHeaderComponentMemo = useMemo((e) => {}, []);
  return (
    <React.Fragment>
      <div className="table-wrapper">
        <div className="w-100 overflow-x-scroll table-scroll z-0">
        {!pagination && dataTotal && (
          <span className="fw-bold">Total Data: {data?.length}</span>
        )}

          <DataTable
            columns={combinedColumns}
            data={data}
            fixedHeader={fixedHeader}
            fixedHeaderScrollHeight={fixedHeaderScrollHeight}
            // pagination
            className={customClass}
            subHeader={!disSubHeader}
            subHeaderComponent={subHeaderComponentMemo}
            selectableRows={selectColumn}
            persistTableHead
            onSelectedRowsChange={onRowSelected}
            clearSelectedRows={toggleCleared}
            customStyles={customStyles}
            highlightOnHover={true}
            striped={true}
            sortServer={sortServer}
            onSort={handleSort}
          />
        </div>

        {/* Indikator scroll horizontal */}
        <div className="scroll-indicator" />
      </div>
      {pagination && (
        <CustomPagination
          limitPerPage={limit || 10}
          totalData={dataTotal}
          pageNow={pageNow}
          hideTotal={hideTotal}
          currPage={currPage}
        />
      )}
    </React.Fragment>
  );
};

export default TabelCustomSA;
