import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { Container, Button, Col, Row, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { filterEmptyValues, formatNumber } from '@/helpers/services/convert';
import SortableTableCell from '@/components/Common/TableSortMui';
import { sortDataTable } from '@/lib/table';
import PaginationMui from '@/components/Common/paginationMui';
import { changeBreadcrumb, getDropdownModules, getDropdownRoles } from '@/store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { columnRoleList, dropdownModule } from './constants';
import { reactSlcStyles } from '@/lib/ReactSelect';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Label } from 'reactstrap';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import {
  apiGetRoleDetail,
  apiPostUsmanDeletePermission,
  apiPostUsmanDeleteRole,
} from '@/helpers/backend_helper_usman';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';
import Breadcrumb from '@/components/Common/Breadcrumb';

const breadCrumb = [
  { link: '/user-management/tabel-user', label: 'User Management' },
  { link: '#', label: 'Role' },
];

const UsmanRoleList = () => {
  const [query, setQuery] = useState({ page: '1', limit: '10' });
  const [datas, setDatas] = useState({});
  const [raw, setRaw] = useState({});
  const dispatch = useDispatch();
  const [temp, setTemp] = useState({});
  const toastifyService = new ToastifyService();

  const { list_dropdown_roles, list_dropdown_modules } = useSelector((el) => el.Usman);

  useEffect(() => {
    if (list_dropdown_roles?.data) {
      const uniqueData = Array.from(
        list_dropdown_roles?.data
          .reduce((map, item) => {
            // Jika kode sudah ada di Map, tambahkan modul ke string
            if (map.has(item.code)) {
              const existing = map.get(item.code);
              existing.module = Array.from(
                new Set([...existing.module.split(', '), item.module])
              ).join(', ');
            } else {
              // Jika kode belum ada, tambahkan ke Map dengan module sebagai string
              map.set(item.code, { ...item, module: item.module });
            }
            return map;
          }, new Map())
          .values()
      );
      console.log('uniqueData ', uniqueData);

      setRaw(uniqueData);
      setDatas({ total_count: uniqueData.length, data: uniqueData.slice(0, 10) });
    }
  }, [list_dropdown_roles]);

  useEffect(() => {
    dispatch(getDropdownModules());
    dispatch(getDropdownRoles());
    dispatch(changeBreadcrumb(breadCrumb));
  }, []);

  useEffect(() => {
    if (temp.click_search) {
      const payload = {
        page: 1,
        limit: 10,
        r_modules_code: temp.module?.code || '',
        search: temp.search || '',
      };
      setQuery(payload);
      const n_py = { ...payload };
      delete n_py.page;
      delete n_py.limit;
      setTemp({ ...temp, click_search: false });
      dispatch(getDropdownRoles(filterEmptyValues(n_py)));
    }
  }, [temp.click_search]);

  const handlePage = (e) => {
    const nQuery = { ...query, page: e };
    setQuery(nQuery);
    setDatas({ ...datas, data: raw.slice((e - 1) * +query.limit, e * +query.limit) });
  };

  const [orderColumn, setOrderColumn] = useState({});
  const orderBy = Object.keys(orderColumn)[0];
  const order = Object.values(orderColumn)[0];

  useEffect(() => {
    // Pengecekan apakah orderColumn sudah di klik/belum
    if (Object.keys(orderColumn).length) {
      const sortedData = sortDataTable(raw || [], orderBy, order);
      setRaw(sortedData);
      setDatas({
        ...datas,
        data: sortedData.slice((+query.page - 1) * +query.limit, +query.page * +query.limit),
      });
    }
  }, [orderColumn]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderColumn({ [property]: isAsc ? 'desc' : 'asc' });
  };
  const navigate = useNavigate();
  const hdlDetailRole = (id) => {
    navigate(`/user-management/roles/d/${id}`);
  };

  const hdlDelete = async (id) => {
    const res = await toastifyService.confirmationDelete();
    if (!res) return;
    toastifyService.showLoading();

    // try {
    //   await apiPostUsmanDeleteRole({ code: id });
    //   successMsg('Sukses Menghapus Data');

    //   // Buat Get Data Baru Lagi
    //   setTemp({ ...temp, click_search: true });
    // } catch (error) {
    //   console.log('error', error);
    //   if (error.status == 412) {
    //     errorMsg({}, 'Role Tidak Dapat Dihapus Karena Sedang Digunakan');
    //   } else {
    //     errorMsg(error);
    //   }
    // } finally {
    //   toastifyService.close();
    // }

    const resApiDetail = await apiGetRoleDetail({ r_roles_code: id });

    const allIdPermission = resApiDetail.data.flatMap((el) => el.menu.map((el2) => el2.id));
    let t_error = '';
    for (let el of allIdPermission) {
      try {
        await apiPostUsmanDeletePermission({ id: el });
      } catch (error) {
        t_error = error;
      }
    }

    if (t_error) {
      return toastifyService.customWarningMsg('Gagal Menghapus Hak Akses, Harap Dicoba Kembali');
    } else {
      try {
        await apiPostUsmanDeleteRole({ code: id });
        successMsg('Sukses Menghapus Data');

        // Buat Get Data Baru Lagi
        setTemp({ ...temp, click_search: true });
      } catch (error) {
        console.log('error', error);
        if (error.status == 412) {
          errorMsg({}, 'Role Tidak Dapat Dihapus Karena Sedang Digunakan');
        } else {
          errorMsg(error);
        }
      } finally {
        toastifyService.close();
      }
    }
  };

  return (
    <Container fluid className="page-content">
      <Breadcrumb content={breadCrumb} title="Role Management" />
      <Row className="mb-3">
        {/* <Col md={8}>
          <div className="mb-3">
            <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">
              Role Manajemen
              <CustomTooltipMui title="Pengaturan hak akses pengguna" arrow>
                <i className="mdi mdi-progress-question ms-2" />
              </CustomTooltipMui>
            </h1>
          </div>
        </Col> */}
        <Col md={12}>
          <div className="w-100 text-end">
            <Button
              color="success"
              className="text-white"
              onClick={() => navigate('/user-management/roles/create')}>
              Tambah Role
            </Button>
          </div>
        </Col>
      </Row>
      <div className="border rounded-4 bg-white p-3">
        <div className="p-3 mb-3 rounded bg-secondary-subtle">
          <Row>
            <Col md={4}>
              <Label className="mb-0">Filter Modul</Label>
              <Select
                name="module"
                isClearable
                placeholder="Modul"
                getOptionValue={(option) => option.module_code}
                getOptionLabel={(option) => option.module}
                options={dropdownModule}
                value={temp.module || null}
                styles={reactSlcStyles}
                onChange={(e) => {
                  setTemp((prev) => ({ ...prev, module: e || null }));
                }}
                className="select2-selection"
              />
            </Col>
            <Col md={4}>
              <Label className="mb-0">Nama Role</Label>
              <Input
                name="cari"
                placeholder="Nama Role"
                onChange={(e) => setTemp((prev) => ({ ...prev, search: e.target.value }))}
                value={temp.search}
                className="select2-selection"
              />
            </Col>

            <Col md={4} className="d-flex justify-content-end mt-3">
              <Button
                type="button"
                color="primary"
                className="btn-md rounded px-4"
                onClick={() => setTemp({ ...temp, click_search: true })}>
                Cari
              </Button>
            </Col>
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
                      minWidth: 100,
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
                      sx={{ minWidth: 80, fontSize: '0.8rem' }}
                      align={'center'}
                      className="py-2"
                      style={{ width: 80 }}>
                      <div className="d-flex column-gap-2">
                        <Tooltip title="Edit Data" placement="top">
                          <div>
                            <Button
                              onClick={() => hdlDetailRole(item.code)}
                              color="success"
                              className="p-2 d-inline-flex">
                              <i className="bx bxs-pencil fs-5 text-white" />
                            </Button>
                          </div>
                        </Tooltip>
                        <Tooltip title="Hapus Role" placement="top">
                          <div>
                            <Button
                              onClick={() => hdlDelete(item.code)}
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
                        {p.align === 'right' ? formatNumber(item[p.id]) : item[p.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Indikator scroll horizontal */}
          <div className="scroll-indicator"></div>
        </div>
        <PaginationMui
          pageNow={+query.page}
          totalPage={datas.total_count / +query.limit || 0 + 1}
          setPage={handlePage}
          visibleRows={query.limit}
          perPage={query.limit}
          totalData={datas.total_count || 0}
        />
      </div>
    </Container>
  );
};

export default UsmanRoleList;
