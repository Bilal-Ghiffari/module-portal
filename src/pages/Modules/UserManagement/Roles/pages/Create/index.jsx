import { apiGetDropdownMenuList, apiGetDropdownModules, apiGetRoleDetail, apiPostUsmanNewPermission, apiPostUsmanNewRole } from '@/helpers/backend_helper_usman';
import { Box, Checkbox, Collapse, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Input, Label } from 'reactstrap';
import { Row } from 'reactstrap';
import { Container } from 'reactstrap';
import EnhancedTableHead from './table.header';
import { convertHexToRGB } from '@/helpers/services/convert';
import { set } from 'lodash';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { dropdownModule } from '../List/constants';

function RowTable(props) {
  const { row, collapse, setCollapse, index, setClicked, setPermissionIndicator } = props;
  const [windowWidth] = useState(window.innerWidth);
  const fontSize = windowWidth <= 767 ? '10px' : '12px';

  const handleCollapse = async () => {
    const nCol = [...collapse];
    nCol[index] = !collapse[index];
    setCollapse(nCol);
  };

  const handleClick = ({ event, item, type }) => {
    setClicked((prevRes) => {
      const findDataExist = prevRes.find((o) => o.r_modules_code === item.r_modules_code && o.code === item.code);
      setPermissionIndicator({ dataExist: findDataExist, module_code: item.r_modules_code });
      if (!findDataExist) {
        return [...prevRes, { ...item, [type]: event.target.checked ? 1 : 0 }];
      } else {
        return prevRes.map((o) => (o.r_modules_code === item.r_modules_code && o.code === item.code ? { ...o, [type]: event.target.checked ? 1 : 0 } : o));
      }
    });
  };
  const sortByCode = (a, b) => {
    const splitCodeA = a.code.split('.').map(Number);
    const splitCodeB = b.code.split('.').map(Number);
  
    for (let i = 0; i < Math.max(splitCodeA.length, splitCodeB.length); i++) {
      const numA = splitCodeA[i] || 0;
      const numB = splitCodeB[i] || 0;
      if (numA !== numB) {
        return numA - numB;
      }
    }
    return 0;
  };
  
  // Mengurutkan data menu
  const sortedMenuData = row.menu?.sort(sortByCode);


  return (
    <>
      {/* Row untuk menu level 1 */}
      <TableRow onClick={() => handleCollapse(row?.role?.module_code)}>
        <TableCell sx={{ width: 80 }}>{row?.role?.module_code}</TableCell>
        <TableCell sx={{ width: 120 }}>{row?.role?.module || '-'}</TableCell>
        <TableCell sx={{ width: 80 }}>
          <input type="checkbox" style={{ width: 18, height: 18 }} checked={row.access_permission} disabled />
        </TableCell>
      </TableRow>

      {/* Menampilkan semua menu, namun hanya level 2 yang bisa terlihat saat level 1 diklik */}
      <TableRow>
        <TableCell className="p-0" colSpan={8}>
          <Collapse in={collapse[index]} timeout="auto" unmountOnExit>
            <Box style={{ marginLeft: '2rem' }} className="pe-0 bg-secondary bg-opacity-10">
              <Table>
                <TableBody style={{ backgroundColor: `rgba(${convertHexToRGB('#F6E96B')}, 0.5)` }}>
                  {sortedMenuData?.map((item, idx) => (
                    <TableRow style={{ cursor: 'pointer' }} className="list-hover" hover tabIndex={-1} key={idx}>
                      {/* Jika item level 1, tampilkan secara normal */}
                      <TableCell align="left" sx={{ paddingLeft: +item.level > 1 ? (+item.level < 100 ? +item.level * 3 : (+item.level - 99) * 3) : 2, width: 50 }}>
                        <svg
                          enable-background="new 0 0 24 24"
                          id="Layer_1"
                          version="1.0"
                          viewBox="0 0 24 24"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="12"
                          height="12"
                        >
                          <polygon points="15,12 22,17 15,22 " />
                          <path d="M4,2v9c0,3.3,2.7,6,6,6h8" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" />
                        </svg>
                      </TableCell>
                      <TableCell align="left" sx={{ width: 120 }} style={{ fontSize }}>
                        {+item.level > 100 ? <span><span className='fw-bold'>Actions</span> - {item?.title}</span> : item.title}
                      </TableCell>
                      <TableCell align="left" style={{ fontSize }} sx={{ width: 80 }}>
                        <Checkbox defaultChecked={item.permission == 1} onClick={(e) => handleClick({ event: e, item: item, type: 'permission' })} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const UsmanCreateRole = () => {
  const { id } = useParams();
  const [res, setRes] = useState([]);
  const [namaRole, setNamaRole] = useState('');

  const [collapse, setCollapse] = useState([]);
  const [clicked, setClicked] = useState([]);
  const navigate = useNavigate();
  const toastifyService = new ToastifyService();

  const fetchModules = async () => {
    const resApi = await apiGetDropdownModules();
    setRes(resApi.data.map((o) => ({ role: { module: o.title, module_code: o.code } })) || []);
  };

  const fetchMenus = async (py) => {
    const resApi = await apiGetDropdownMenuList(py);
    setRes((prevRes) => {
      // Cari role berdasarkan module_code
      const findResMenu = prevRes.find((o) => o.role.module_code === py.r_modules_code);

      if (findResMenu) {
        // Jika module_code sudah ada, update menu-nya
        return prevRes.map((item) =>
          item.role.module_code === py.r_modules_code
            ? {
                ...item,
                menu: resApi.data.map((o) => ({ ...o, permission: 0 }))
              } // Tambahkan menu baru
            : item
        );
      } else {
        // Jika module_code belum ada, tambahkan data baru
        return [
          ...prevRes,
          {
            role: { module_code: py.r_modules_code },
            menu: resApi.data
          }
        ];
      }
    });
  };
  useEffect(() => {
    fetchModules();
  }, [id]);

  const handleCollapse = (e, data) => {
    setCollapse(e);

    // //cari dulu menu nya udah dibuka atau belum
    const findMenu = res.find((o) => o.role.module_code == data.module_code);
    if (!findMenu?.menu) {
      fetchMenus({ r_modules_code: data.module_code });
    }
  };

  const postNewRole = async (py, permission) => {
    // try {
    //   const res = await apiPostUsmanNewRole(py);
    //   if (res.status == 200) {
    //     successMsg('Sukses Menyimpan Data');
    //     navigate(-1);
    //   }
    // } catch (error) {
    //   errorMsg(error);
    // } finally {
    //   toastifyService.close();
    // }

    try {
      const res = await apiPostUsmanNewRole(py);
      let t_error = '';
      for (let el of permission) {
        const py_2 = {
          r_roles_code: res.data.roles_code,
          r_menus_code: el.code,
          r_modules_code: el.r_modules_code,
          permission: el.permission.toString()
        };
        try {
          await apiPostUsmanNewPermission(py_2);
        } catch (error) {
          t_error = error;
        }
      }

      if (t_error) {
        errorMsg({}, 'Terdapat Data Gagal Tersimpan, Harap cek kembali Data');
      } else {
        successMsg('Sukses Menyimpan Data');
        // navigate('/user-management/roles/list');
        navigate(-1);
      }
    } catch (error) {
      errorMsg(error);
    } finally {
      toastifyService.close();
    }
  };

  const handleSave = async () => {
    const confirm = await toastifyService.confirmSubmit('Apakah anda yakin ingin menyimpan data?');
    if (!confirm) return;

    toastifyService.loadingSendData();

    //filter yang permission nya true aja
    const filterPermission = clicked.filter((o) => o.permission == 1);

    // define module selected
    const uniqueModules = [...new Set(filterPermission.map((item) => item.r_modules_code))];

    const payload = { title: namaRole, r_modules_code: uniqueModules.join(',') };

    postNewRole(payload, filterPermission);
  };

  const setPermissionIndicator = ({ dataExist, module_code }) => {
    //kalo data exist ada, tandanya access permissionnya udah true
    if (dataExist && dataExist.permission == 1) {
      setRes((prev) => {
        const filterClicked = clicked.filter((o) => o.r_modules_code == module_code && o.permission == 1);
        if (filterClicked.length == 1) {
          return prev.map((o) => (o.role.module_code === module_code ? { ...o, access_permission: false } : o));
        }

        return prev;
      });
    } else {
      setRes((prev) => prev.map((o) => (o.role.module_code === module_code ? { ...o, access_permission: true } : o)));
    }
  };
  

  return (
    <Container fluid className="page-content">
      <Row>
        <Col md={8}>
          <div className="mb-3">
            <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">Tambah Role</h1>
          </div>
        </Col>
      </Row>
      <div className="border rounded-4 bg-white p-3 mb-3">
        <Row className="mb-2">
          <Col md={6} xl={4}>
            <Label className="mb-0">Nama Role</Label>
            <Input type="text" value={namaRole} onChange={(e) => setNamaRole(e.target.value)} placeholder="Masukkan Nama Role"></Input>
          </Col>
        </Row>
        <Table>
          <EnhancedTableHead />
          <TableBody>
            {res.length ? (
              res.map((data, index) => (
                <RowTable
                  key={index}
                  row={data}
                  collapse={collapse}
                  setCollapse={(e) => handleCollapse(e, data?.role || {})}
                  index={index}
                  setClicked={setClicked}
                  setPermissionIndicator={setPermissionIndicator}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Row className="mb-2 mt-3 d-flex justify-content-end">
          <Col md={6} xl={4} className="d-flex justify-content-end">
            <Button color="primary" className="px-5" onClick={handleSave}>
              Simpan
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default UsmanCreateRole;
