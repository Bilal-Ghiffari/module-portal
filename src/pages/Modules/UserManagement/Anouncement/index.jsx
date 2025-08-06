import { Button, Col, Container, Input, Label, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';

import Breadcrumb from '@/components/Common/Breadcrumb';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { changeBreadcrumb, getDropdownRoles } from '@/store/actions';
import CreateForm from './CreateForm';
import { postFormData } from '../../../../helpers/api_helper';
import { ToastifyService } from '../../../../components/Toastify/toastifyService';
import { successMsg } from '@/helpers/Notification/toastNotification';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { apiDeleteTeks, apiGetListTeks } from '@/helpers/backend_helper_usman';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { filterEmptyValues, formatNumber } from '@/helpers/services/convert';
import SortableTableCell from '@/components/Common/TableSortMui';
import PaginationMui from '@/components/Common/paginationMui';

const breadCrumb = [
  { link: '/user-management/tabel-user', label: 'User Management' },
  { link: '#', label: 'Pengumuman' },
];

const columnRoleList = [
  { id: 'title', name: 'Title', width: 100, align: 'center' },
  { id: 'message', name: 'Pesan', width: 200, align: 'center' },
  { id: 'r_roles_text', name: 'Roles', width: 150 },
  {
    id: 'is_active',
    name: 'Status',
    width: 80,
    align: 'center',
    cell: (row) => <p>{row.is_active == 1 ? 'Aktif' : 'Tidak Aktif'}</p>,
  },
];

const Anouncement = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const toastifyService = new ToastifyService();
  const { list_dropdown_roles } = useSelector((el) => el.Usman);
  const [query, setQuery] = useState({ page: 1, limit: 10, r_roles_code: '' });
  const [datas, setDatas] = useState({
    data: [],
    total_count: 0,
    detail: {},
  });
  const [orderColumn, setOrderColumn] = useState({});
  const orderBy = Object.keys(orderColumn)[0];
  const order = Object.values(orderColumn)[0];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderColumn({ [property]: isAsc ? 'desc' : 'asc' });
  };

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
    dispatch(getDropdownRoles());
    apiGetListTeks({ limit: 10, page: 1 }).then((res) => {
      setDatas((prev) => ({
        ...prev,
        data: res.data,
        total_count: res.total_count,
      }));
    });
  }, []);

  useEffect(() => {
    const py = {
      limit: 10,
      page: 1,
      r_roles_code: query.r_roles_code,
    };
    fetchData(filterEmptyValues(py));
  }, [query]);

  const fetchData = async (py) => {
    try {
      apiGetListTeks(py).then((res) => {
        setDatas((prev) => ({
          ...prev,
          data: res.data,
          total_count: res.total_count,
        }));
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const uniqueData = useMemo(() => {
    return Array.from(
      new Map(list_dropdown_roles?.data?.map((item) => [item.code, item])).values()
    );
  }, [list_dropdown_roles]);

  const optionRole = uniqueData.map((item) => ({
    value: item.code,
    label: item.title,
  }));

  const onSubmit = async (values) => {
    const res = await toastifyService.confirmationCreate();
    if (!res) return;

    try {
      if (datas.detail?.id) {
        await postFormData('/announcement/upd_text', { id: datas.detail?.id, ...values });
        setDatas((prev) => ({
          ...prev,
          detail: {},
        }));
      } else {
        await postFormData('/announcement/add_text', values);
      }

      successMsg('Sukses');
      setShowModal(false);
      fetchData(filterEmptyValues(query));
    } catch (error) {
      console.log('err', error);
    }
  };

  const handlePage = (e) => {
    const nQuery = { ...query, page: e };
    setQuery(nQuery);
    setDatas({ ...datas, data: raw.slice((e - 1) * +query.limit, e * +query.limit) });
  };

  const handleDetail = (item) => {
    setShowModal(!showModal);
    setDatas((prev) => ({
      ...prev,
      detail: item,
    }));
  };

  const handleDelete = (id) => {
    toastifyService.confirmationDelete().then((res) => {
      if (res) {
        apiDeleteTeks({ id })
          .then((res) => {
            successMsg('Sukses');
            fetchData(filterEmptyValues(query));
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    });
  };

  return (
    <>
      <Container fluid className="page-content">
        <Breadcrumb content={breadCrumb} title="Pengumuman Management" />
        <Row className="mb-3">
          <Col md={12}>
            <div className="w-100 text-end">
              <Button
                onClick={() => setShowModal(!showModal)}
                color="success"
                className="text-white">
                Tambah Pengumuman
              </Button>
            </div>
          </Col>
        </Row>
        <div className="border rounded-4 bg-white p-3">
          <div className="p-3 mb-3 rounded bg-secondary-subtle">
            <Row>
              <Col md={4}>
                <Label className="mb-0">Filter role</Label>
                <Select
                  name="role"
                  isMulti
                  isClearable
                  placeholder="Role"
                  options={optionRole}
                  value={query.role || []}
                  onChange={(e) => {
                    const selectedValues = e ? e.map((option) => option.value).join(',') : '';
                    setQuery((prev) => ({ ...prev, role: e, r_roles_code: selectedValues }));
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                    }),
                  }}
                />
              </Col>
              {/* <Col md={6} className="d-flex flex-column align-items-start">
                <div className="d-flex flex-column w-100">
                  <Label className="mb-1">Nama Role</Label>
                  <div className="d-flex w-100">
                    <Input
                      name="cari"
                      placeholder="Nama Role"
                      onChange={(e) => setQuery((prev) => ({ ...prev, search: e.target.value }))}
                      value={query.search}
                      className="select2-selection"
                      style={{ height: '40px', flex: 1 }}
                    />
                    <Button
                      type="button"
                      color="primary"
                      className="btn-md rounded px-4 ms-2"
                      style={{ height: '40px' }}
                      onClick={() => setQuery({ ...query, click_search: true })}>
                      Cari
                    </Button>
                  </div>
                </div>
              </Col> */}
            </Row>
          </div>

          <div className="table-wrapper">
            <div className="w-100 overflow-x-scroll table-scroll">
              <Table className="w-100">
                {/* Table Header */}
                <TableHead className="bg-primary">
                  <TableRow>
                    <TableCell
                      size="small"
                      sx={{
                        maxWidth: 60,
                        margin: 0,
                        padding: 0.5,
                        fontSize: '0.8rem',
                        backgroundColor: '#2A3042',
                      }}
                      className="text-white border border-secondary-subtle px-2"
                      align={'center'}>
                      Aksi
                    </TableCell>
                    {columnRoleList.map((o, idx) => {
                      return (
                        <SortableTableCell
                          key={o + '_' + idx}
                          item={o} // Object kolom
                          orderBy={orderBy} // Kolom yang diurutkan
                          order={order} // Urutan (asc/desc)
                          handleRequestSort={handleRequestSort} // Fungsi sorting
                        />
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {datas.data?.map((item, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? '#f3f3f3' : 'white',
                        cursor: 'pointer',
                      }}>
                      <TableCell
                        size="small"
                        sx={{ maxWidth: 60, fontSize: '0.8rem' }}
                        align={'center'}
                        className="py-2"
                        style={{ width: 60 }}>
                        <div className="d-flex column-gap-2">
                          <Tooltip title="Edit Data" placement="top">
                            <div>
                              <Button
                                onClick={() => handleDetail(item)}
                                color="success"
                                className="p-2 d-inline-flex">
                                <i className="bx bxs-pencil fs-5 text-white" />
                              </Button>
                            </div>
                          </Tooltip>
                          <Tooltip title="Hapus Role" placement="top">
                            <div>
                              <Button
                                onClick={() => handleDelete(item.id)}
                                color="danger"
                                className="p-2 d-inline-flex">
                                <i className="bx bx-trash fs-5 text-white" />
                              </Button>
                            </div>
                          </Tooltip>
                        </div>
                      </TableCell>
                      {columnRoleList.map((p, idx2) => (
                        <TableCell
                          size="small"
                          sx={{ minWidth: p.width, fontSize: '0.8rem' }}
                          align={p.align || 'left'}
                          key={idx2}
                          className="py-2"
                          style={{ width: p.width }}>
                          {p.cell
                            ? p.cell(item)
                            : p.align === 'right'
                            ? formatNumber(item[p.id])
                            : item[p.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Indikator scroll horizontal */}
            <div className="scroll-indicator"></div>
            <PaginationMui
              pageNow={+query.page}
              totalPage={datas.total_count / +query.limit || 0 + 1}
              setPage={handlePage}
              visibleRows={query.limit}
              perPage={query.limit}
              totalData={datas.total_count || 0}
            />
          </div>
        </div>
      </Container>

      {/* Modal Tambah */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{datas?.detail?.title ? 'Edit Pengumuman' : 'Buat Pengumuman'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm onSubmit={onSubmit} optionRole={optionRole} detail={datas?.detail || {}} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Anouncement;
