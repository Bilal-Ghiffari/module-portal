import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import Breadcrumb from '../../../../components/Common/Breadcrumb';
import { useDispatch } from 'react-redux';
import { changeBreadcrumb, getListDataLog } from '../../../../store/actions';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TabelCustomSA from '../../../../components/Common/TabelCustomSA';
import { formatDateToIndonesianMinute } from '../../../../helpers/services/changeTimeIndo';
import { ToastifyService } from '../../../../components/Toastify/toastifyService';
import { convertDateYMD } from '../../../../helpers/services/convert';
import { apiGetListDataLog } from '../../../../helpers/backend_helper_usman';
import DatePicker from '@/components/Common/DatePicker';
import ExportExcelDatis from '@/components/Common/ExportExcelDatis';

const breadCrumb = [
  { link: '/user-management/tabel-user', label: 'Beranda' },
  { link: '/', label: 'User Management' },
  { link: '/', label: 'Log Aktivitas User' }
];

const columnsDownload = [
  {
    name: 'USERNAME',
    selector: (row) => row.username || '-',
    sortable: true,
    cell: (row) => <div>{row.username || '-'}</div>
  },
  {
    name: 'WAKTU AKTIVITAS',
    selector: (row) => formatDateToIndonesianMinute(row.updated_at) || '-',
    cell: (row) => <div>{formatDateToIndonesianMinute(row.updated_at) || '-'}</div>
  },
  {
    name: 'AKTIVITAS',
    selector: (row) => row.last_activity || '-',
    cell: (row) => <div>{row.last_activity || '-'}</div>
  },
  {
    name: 'LOGIN',
    selector: (row) => formatDateToIndonesianMinute(row.logged_in) || '-',
    cell: (row) => <div>{formatDateToIndonesianMinute(row.logged_in) || '-'}</div>
  },
  {
    name: 'LOGOUT',
    selector: (row) => {
      row.logged_out === null ? '-' : formatDateToIndonesianMinute(row.logged_out);
    },
    cell: (row) => <div>{row.logged_out === null ? '-' : formatDateToIndonesianMinute(row.logged_out)}</div>
  },
  {
    name: 'BROWSER',
    selector: (row) => row.user_agent || '-',
    cell: (row) => {
      // Pisahkan user agent berdasarkan tanda kurung atau spasi
      const userAgentParts = row.user_agent ? row.user_agent.split(/[\(\)]| /).filter(Boolean) : ['-'];

      return (
        <div>
          {userAgentParts.map((part, index) => (
            // Setiap bagian user agent dengan padding-bottom
            <div key={index} style={{ paddingBottom: '10px' }}>
              {part}
            </div>
          ))}
        </div>
      );
    }
  }
];

const styleHeader = {
  rows: {
    style: {
      minHeight: '30px',
      '&:nth-of-type(odd)': {
        backgroundColor: '#f3f3f3'
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#ffffff'
      }
    }
  },

  headCells: {
    style: {
      backgroundColor: '#2A3042',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '160px', // Coba menambahkan width yang lebih besar
      maxWidth: '160px' // Tambahkan maxWidth yang sama
    }
  },
  cells: {
    style: {
      padding: '8px 16px' // Atur padding untuk sel data
    }
  }
};

const TabelLog = ({ titleBreadcrumb }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifService = new ToastifyService();

  const [query, setQuery] = useState(true);
  const [filter, setFilter] = useState({});
  const exportExcelRef = useRef(null);

  const onDownload = async () => {
    const newFilter = { ...query };
    delete newFilter.limit;
    delete newFilter.page;

    try {
      const res = await apiGetListDataLog({ ...newFilter, limit: 1000 });

      if (exportExcelRef.current) {
        exportExcelRef.current.downloadExcel(res.data);
      }
    } catch (err) {
      errorMsg(err);
    }
  };

  const { list_data_log } = useSelector((el) => el.Usman);

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
    dispatch(getListDataLog());
  }, []);

  const columns = useMemo(() => [
    {
      name: <div className="fw-semibold ">USERNAME</div>,
      minWidth: '150px',
      selector: (row) => row.username || '-',
      sortable: true,
      cell: (row) => <div>{row.username || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">WAKTU AKTIVITAS</div>,
      minWidth: '150px',
      selector: (row) => formatDateToIndonesianMinute(row.updated_at) || '-',
      cell: (row) => <div>{formatDateToIndonesianMinute(row.updated_at) || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">AKTIVITAS</div>,
      minWidth: '150px',
      selector: (row) => row.last_activity || '-',
      cell: (row) => <div>{row.last_activity || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">LOGIN</div>,
      minWidth: '150px',
      selector: (row) => formatDateToIndonesianMinute(row.logged_in) || '-',
      cell: (row) => <div>{formatDateToIndonesianMinute(row.logged_in) || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">LOGOUT</div>,
      minWidth: '150px',
      selector: (row) => {
        row.logged_out === null ? '-' : formatDateToIndonesianMinute(row.logged_out);
      },
      cell: (row) => <div>{row.logged_out === null ? '-' : formatDateToIndonesianMinute(row.logged_out)}</div>
    },
    {
      name: <div className="fw-semibold ">BROWSER</div>,
      minWidth: '150px',
      selector: (row) => row.user_agent || '-',
      cell: (row) => <div>{row.user_agent || '-'}</div>
    }
  ]);

  const handleClicked = () => {
    const transform = {
      awal: (filter?.awal && convertDateYMD(filter?.awal)) || '',
      akhir: (filter?.akhir && convertDateYMD(filter?.akhir)) || '',
      search: filter?.search || '',
      limit: 10,
      page: 1
    };

    const filteredTransform = Object.fromEntries(Object.entries(transform).filter(([_, value]) => value));
    notifService.showLoading();
    setQuery(filteredTransform);

    dispatch(getListDataLog(filteredTransform)); // hanya show valid
  };

  useEffect(() => {
    if (list_data_log) {
      notifService.close();
    }
  }, [list_data_log]);

  const handleClickPage = (e) => {
    const nQuery = { ...query, page: e };
    setQuery(nQuery);
    dispatch(getListDataLog(nQuery));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <div className="mb-3">
          <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">
            LOG AKTIVITAS USER
            <CustomTooltipMui title="Menampilkan histori atau log data aktivitas pengguna" arrow>
              <i className="mdi mdi-progress-question ms-2" />
            </CustomTooltipMui>
          </h1>
        </div> */}
        <Container fluid>
          <Breadcrumb content={breadCrumb} title="Log Aktifitas User" />

          <div className="shadow-md rounded-3 bg-white p-5 mb-5">
            <Row className="row-gap-3 p-3 rounded bg-secondary-subtle">
              <Col lg={4}>
                <div>
                  <DatePicker text="Waktu Aktivitas Awal" handleChange={(e) => setFilter({ ...filter, awal: e.target.value })} value={filter.awal} />
                </div>
              </Col>
              <Col lg={4}>
                <div>
                  <DatePicker text="Waktu Aktivitas Akhir" handleChange={(e) => setFilter({ ...filter, akhir: e.target.value })} value={filter.akhir} />
                </div>
              </Col>
              <Col md={6} lg={3}>
                <Input name="cari" placeholder="Username" onChange={(e) => setFilter({ ...filter, search: e.target.value })} value={filter.search} className="select2-selection" />
              </Col>

              <Col md={6} lg={1}>
                <Button
                  type="button"
                  color="primary"
                  className="btn-md rounded px-4"
                  onClick={() => {
                    handleClicked();
                  }}
                >
                  Cari
                </Button>
              </Col>
            </Row>
            <div className="d-flex mt-4 justify-content-between align-items-center">
              <div className="fs-3 fw-semibold">Data Log</div>
              <div className="pb-0 mb-0">
                <button type="button" className="btn btn-success shadow-lg" style={{ minWidth: '150px', maxWidth: '150px', width: '150px' }} onClick={onDownload}>
                  Export to Excel
                </button>
                <div className="d-none">
                  <ExportExcelDatis
                    ref={exportExcelRef}
                    name="Data Log - Excel"
                    // data={data}
                    header={columnsDownload}
                    // setFile={setFile}
                    // isHide={true}
                  />
                </div>
              </div>
            </div>

            <TabelCustomSA
              dataTotal={list_data_log?.total_count}
              pagination={true}
              customStyles={styleHeader}
              data={list_data_log?.data}
              columns={columns}
              pageNow={handleClickPage}
              selectedColumns={[]}
              customClass="pb-5"
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TabelLog;
