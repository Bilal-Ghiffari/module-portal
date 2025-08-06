import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import Breadcrumb from '../../../../../components/Common/Breadcrumb';

import { useDispatch } from 'react-redux';
import { getActiveUser, getDropdownRoles } from '../../../../../store/actions';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TabelCustomSA from '../../../../../components/Common/TabelCustomSA';
import { formatDateToIndonesian } from '../../../../../helpers/services/changeTimeIndo';
import { ToastifyService } from '../../../../../components/Toastify/toastifyService';

import { apiGetListPengguna, apiPostUpdatePengguna } from '../../../../../helpers/backend_helper_usman';
import { errorMsg, successMsg } from '../../../../../helpers/Notification/toastNotification';
import CardUsman from '../../Components/CardUsman';
import { filterEmptyValues, formatNumber } from '../../../../../helpers/services/convert';
import { columnsHeaders, styleHeader, validateCards } from './constants';
import FilterUserman from '../../Components/FilterUserman';
import ExportExcelDatis from '@/components/Common/ExportExcelDatis';
import { Tooltip } from '@mui/material';
import { handleDownload } from '@/helpers/services/shareService';
const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '/user-management/tabel-user', label: 'User Management' },
  { link: '/', label: 'Dashboard User Management' }
];

const TabelUser = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ limit: 10, page: 1 });
  const [filter, setFilter] = useState({});
  
  const exportExcelRef = useRef(null);
  const navigate = useNavigate();
  const [datas, setDatas] = useState({});


  const fetchRawData = async (py) => {
    try {
      const res = await apiGetListPengguna(py);
      return res;
    } catch (err) {
      errorMsg(err);
    }
  };
  // fetch dan set ke Datas
  const fetchData = async (py) => {
    try {
      toastifyService.showLoading();
      const res = await fetchRawData(py);
      setDatas(res);
    } catch (error) {
      errorMsg(error);
    } finally {
      toastifyService.close();
    }
  };
  const toastifyService = new ToastifyService();

  const onDownload = () => {
    handleDownload({ fetchData: fetchRawData, query: query, refExport: exportExcelRef });
  };

  const { active_user } = useSelector((el) => el.Usman);

  const updatedCards = validateCards.map((card) => {
    if (card.status === 1) {
      return { ...card, text: formatNumber(active_user.data?.total_users.toString()) || 0 };
    } else if (card.status === 2) {
      return { ...card, text: formatNumber(active_user.data?.session_active.toString()) || 0 };
    } else if (card.status === 3) {
      return { ...card, text: formatNumber(active_user.data?.total_visitor.toString()) || 0 };
    } else if (card.status === 4) {
      return { ...card, text: formatNumber(active_user.data?.online_visitor.toString()) || 0 };
    }
    return card;
  });

  const handleDisable = async (values) => {
    const confirm = await toastifyService.confirmSubmit(`Apakah Anda Yakin ${values?.valid ? 'Mengaktifkan' : 'Menonaktifkan'} Data Ini?`, 'Saya Yakin');
    if (!confirm) return;

    const data = filterEmptyValues({
      id: values?.id,
      deleted: 0, // 1 untuk delete
      valid: +values?.valid ? 0 : 1
    });

    try {
      toastifyService.showLoading();
      await apiPostUpdatePengguna(data);
      successMsg(`Sukses ${values?.valid ? 'Mengaktifkan' : 'Menonaktifkan'} Data`);

      fetchData({});
    } catch (error) {
      errorMsg(error);
    } finally {
      toastifyService.close();
    }
  };

  const handleChangePwd = (row) => {
    navigate('/user-management/user/change-pwd/' + row.id, { state: { username: row.username } });
  };

  useEffect(() => {
    dispatch(getDropdownRoles());
    fetchData({});
    dispatch(getActiveUser());
  }, []);

  const columns = useMemo(() => [
    {
      name: <div className="fw-semibold ">AKSI</div>,
      minWidth: '150px',
      cell: (row) => (
        <div className="d-flex column-gap-2">
          {/* <Tooltip title="Detail" placement="top">
              <div onClick={() => handleRowClick(row)} className="rounded cursor-pointer bg-success p-1">
                <i className="mdi mdi-eye text-white fs-3"></i>
              </div>
            </Tooltip> */}
          <Tooltip title="Edit" placement="top">
            <div onClick={() => navigate(`/user-management/edit/${row.id}`)} className="rounded cursor-pointer bg-warning p-1">
              <i className="bx bx-edit text-white fs-3"></i>
            </div>
          </Tooltip>
          <Tooltip title={`${+row?.valid ? 'Blokir Akun' : 'Pengaktifan Akun'}`} placement="top">
            <div onClick={() => handleDisable(row)} className={`rounded cursor-pointer ${+row?.valid ? 'bg-danger' : 'bg-success'} p-1`}>
              <i className={`bx ${+row?.valid ? 'bx-block' : 'bxs-badge-check'} text-white fs-4`}></i>
            </div>
          </Tooltip>
          <Tooltip title="Ubah Password" placement="top">
            <div onClick={() => handleChangePwd(row)} className="rounded cursor-pointer bg-primary p-1">
              <i className="bx bx-key text-white fs-3"></i>
            </div>
          </Tooltip>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
    {
      name: <div className="fw-semibold ">NAMA</div>,
      minWidth: '150px',
      selector: (row) => row.fullname || '-',
      sortable: true,
      cell: (row) => <div>{row.fullname || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">USERNAME</div>,
      minWidth: '150px',
      selector: (row) => row.username || '-',
      sortable: true,
      cell: (row) => <div>{row.username || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">AKSES MODUL</div>,
      width: '350px',
      selector: (row) => row.modules_code_text || '-',
      cell: (row) => <div>{row.modules_code_text || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">ROLE</div>,
      minWidth: '150px',
      selector: (row) => row.roles_code_text || '-',
      cell: (row) => <div>{row.roles_code_text || '-'}</div>
    },

    {
      name: <div className="fw-semibold ">TANGGAL DIBUAT</div>,
      minWidth: '150px',
      selector: (row) => formatDateToIndonesian(row.created_on) || '-',
      cell: (row) => <div>{formatDateToIndonesian(row.created_on) || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">DIBUAT OLEH</div>,
      minWidth: '150px',
      selector: (row) => row.created_by || '-',
      cell: (row) => <div>{row.created_by || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">TANGGAL DIUBAH</div>,
      minWidth: '150px',
      selector: (row) => formatDateToIndonesian(row.updated_on) || '-',
      cell: (row) => <div>{formatDateToIndonesian(row.updated_on) || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">DIUBAH OLEH</div>,
      minWidth: '150px',
      selector: (row) => row.updated_by || '-',
      cell: (row) => <div>{row.updated_by || '-'}</div>
    },
    {
      name: <div className="fw-semibold ">STATUS AKUN</div>,
      minWidth: '150px',
      sortable: true,
      selector: (row) => row.valid, // Use the actual value for sorting
      // selector: (row) => row?.status_text || "-",
      cell: (row) => (
        <div className={`px-2 py-1 rounded-3 bg-opacity-50 fw-bold ${row.valid == 1 ? 'bg-success' : 'bg-danger'}`} style={{ minWidth: '80px', maxWidth: '120px', textAlign: 'center' }}>
          {row.valid == 1 ? 'Aktif' : 'Diblokir'}
        </div>
      )
    },
    {
      name: <div className="fw-semibold ">AKTIVITAS</div>,
      minWidth: '150px',
      sortable: true,
      selector: (row) => row.online,
      cell: (row) => (
        <div className={`px-2 py-1 rounded-3 bg-opacity-50 fw-semibold ${row.online == true ? ' bg-success' : 'bg-danger'}`} style={{ minWidth: '80px', maxWidth: '120px', textAlign: 'center' }}>
          {row.online == true ? 'Online' : 'Offline'}
        </div>
      )
    }
  ]);

  const handleSearch = (e) => {
    const transform = filterEmptyValues({
      r_roles_code: e?.code || '',
      limit: 10,
      page: 1
    });

    setQuery(transform);
    fetchData(transform);
  };

  const handleClickPage = (e) => {
    const nQuery = { ...query, page: e };
    setQuery(nQuery);
    fetchData(nQuery);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumb content={breadCrumb} title="Tabel User" />
        <Container fluid>
          <Row>
            <Col xl="12">
              <Row>
                {updatedCards.map((item, idx) => (
                  <Col xs="12" sm="6" lg="3" key={'_card_' + idx}>
                    <CardUsman title={item.title} text={item.text} color={item.color} iconClass={item.iconClass} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <div className="shadow-md rounded-3 bg-white p-5 mb-5">
            <FilterUserman filter={filter} setFilter={setFilter} clickSearch={handleSearch} />
            <div className="d-flex mt-4 mb-3 justify-content-between align-items-center">
              <div className="fs-3 fw-semibold">Data Tabel User</div>
              <div className="pb-0 mb-0 d-flex column-gap-2">
                <Button color="primary" onClick={() => navigate('/user-management/user/create')}>
                  Tambah User
                </Button>
                <button type="button" className="btn btn-success shadow-lg" style={{ minWidth: '150px', maxWidth: '150px', width: '150px' }} onClick={onDownload}>
                  Export to Excel
                </button>

                <div className="d-none">
                  <ExportExcelDatis ref={exportExcelRef} name="Data Table User - Excel" header={columnsHeaders} />
                </div>
              </div>
            </div>

            <TabelCustomSA
              disSubHeader={true}
              dataTotal={datas?.total_count || 0}
              pagination={true}
              customStyles={styleHeader}
              data={datas?.data || []}
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

export default TabelUser;
