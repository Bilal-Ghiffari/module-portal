import {
  apiGetDropdownMenuList,
  apiGetDropdownModules,
  apiGetRoleDetail,
  apiPostUsmanDeletePermission,
  apiPostUsmanEditPermission,
  apiPostUsmanEditRole,
  apiPostUsmanNewPermission
} from '@/helpers/backend_helper_usman';
import { Box, Checkbox, Collapse, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Input, Label } from 'reactstrap';
import { Row } from 'reactstrap';
import { Container } from 'reactstrap';
import EnhancedTableHead from './table.header';
import { convertHexToRGB } from '@/helpers/services/convert';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { errorMsg, successMsg } from '@/helpers/Notification/toastNotification';
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

  const handleClick = async ({ event, item, type }) => {
    setClicked((prevRes) => {
      const findDataExist = prevRes.find((o) => o.r_modules_code == item.r_modules_code && o.code == item.code);
      setPermissionIndicator({ dataExist: findDataExist, module_code: item.r_modules_code });

      if (!findDataExist) {
        return [...prevRes, { ...item, [type]: event.target.checked ? 1 : 0 }];
      } else {
        return prevRes.map((o) => (o.r_modules_code === item.r_modules_code && o.code === item.code ? { ...o, [type]: event.target.checked ? 1 : 0 } : o));
      }
    });
  };

  // const handleClick = ({ event, item }) => {
  //   const checked = event.target.checked;
  //   const newItem = item; // ambil langsung dari role

  //   setClicked((prev) => {
  //     const exists = prev.find((o) => o.module_code === newItem.module_code);

  //     if (checked) {
  //       return exists ? prev : [...prev, newItem];
  //     } else {
  //       return prev.filter((o) => o.module_code !== newItem.module_code);
  //     }
  //   });
  // };

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
      <TableRow onClick={() => handleCollapse()}>
        <TableCell sx={{ width: 80 }}>{row?.role?.module_code}</TableCell>
        <TableCell sx={{ width: 120 }}>{row?.role?.module || '-'}</TableCell>
        <TableCell sx={{ width: 80 }}>
          <input type="checkbox" style={{ width: 18, height: 18 }} checked={row.access_permission} disabled />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="p-0" colSpan={8}>
          <Collapse in={collapse[index]} timeout="auto" unmountOnExit>
            <Box style={{ marginLeft: '2rem' }} className="pe-0 bg-secondary bg-opacity-10">
              <Table>
                <TableBody style={{ backgroundColor: `rgba(${convertHexToRGB('#F6E96B')}, 0.5)` }}>
                  {sortedMenuData?.map((item, idx) => (
                    <TableRow style={{ cursor: 'pointer' }} className="list-hover" hover tabIndex={-1} key={idx}>
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
                        {+item.level > 100 ? (
                          <span>
                            <span className="fw-bold">Actions</span> - {item?.title}
                          </span>
                        ) : (
                          item.title
                        )}
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

const UsmanEditRole = () => {
  const { id } = useParams();
  const [res, setRes] = useState([]);

  const [namaRole, setNamaRole] = useState(); //old buat ngebandingin nama role nya berubah atau gak
  const [clicked, setClicked] = useState([]);

  const [collapse, setCollapse] = useState([]);
  const navigate = useNavigate();
  const toastifyService = new ToastifyService();

  const fetchModules = async (id) => {
    try {
      toastifyService.showLoading();

      // get Role yang sudah di database
      const resApiDetail = await apiGetRoleDetail({ r_roles_code: id });

      const nameRole = resApiDetail.data[0]?.role.role || '';
      setNamaRole(nameRole);

      // let detailPermission = [];
      // // to set raw detail permission
      // resApiDetail.data.forEach((element) => {
      //   element.menu.forEach((el2) =>
      //     detailPermission.push({
      //       ...el2,
      //       code: el2.menu_code,
      //       r_modules_code: element.role.module_code || '',
      //       role_code: element.role.role_code
      //     })
      //   );
      // });

      // setClicked(detailPermission);

      // get semua modul
      const resApi = await apiGetDropdownModules();
      let combModulesMenus = [];
      for (let el of resApi.data) {
        // get semua Menu berdasarkan module kode
        const res = await fetchMenus({ r_modules_code: el.code });
        const temp = { role: { module: el.title, module_code: el.code }, menu: res };
        combModulesMenus.push(temp);
      }

      const combine = combModulesMenus.map((o) => {
        // buat nemuin keseluruhan modul sama yang di detail ada yang sama atau engga
        const findSame = resApiDetail.data.find((el) => el.role.module_code == o.role.module_code);

        if (findSame) {
          // Temukan data dari `datapembanding` yang memiliki `r_modules_code` yang sama
          const matchingMenus = o.menu.map((menuItem) => {
            const matchedItem = findSame.menu.find((dp) => dp.menu_code === menuItem.code);

            // Jika ditemukan, gabungkan data `menuItem` dengan `matchedItem`
            return matchedItem ? { ...menuItem, ...matchedItem } : menuItem;
          });

          return { role: findSame.role, menu: matchingMenus, access_permission: findSame.menu.length ? true : false };
        }
        return o;
      });

      setRes(combine);
    } catch (error) {
      errorMsg(error);
    } finally {
      toastifyService.close();
    }
  };

  const fetchMenus = async (py) => {
    try {
      const resApi = await apiGetDropdownMenuList(py);
      return resApi.data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchModules(id);
  }, [id]);

  const postNewRole = async (py, permission) => {
    try {
      const res = await apiPostUsmanEditRole(py);
      if (res.status == 200) {
        successMsg('Sukses Menyimpan Data');
        navigate(-1);
      }
    } catch (error) {
      errorMsg(error);
    } finally {
      toastifyService.close();
    }
  };

  function findMenuItemsWithReadPermission(data) {
    const result = [];

    data.forEach((item) => {
      if (item.menu && Array.isArray(item.menu)) {
        const find = item.menu.find((menuItem) => menuItem.permission == '1');
        if (find) result.push(find);
      }
    });

    return result;
  }

  const handleSave = async () => {
    const confirm = await toastifyService.confirmSubmit('Apakah anda yakin ingin mengubah data?');
    if (!confirm) return;

    toastifyService.loadingSendData();
    // define module selected

    let t_error = '';
    for (let el of clicked) {
      // Jika id ada, tandanya buat edit
      if (el.id) {
        // kalo ada id, dan permission 0, maka delete permissionnya
        if (el.permission == 0) {
          try {
            await apiPostUsmanDeletePermission({ id: el.id.toString() });
          } catch (error) {
            t_error = error;
          }
        } else {
          const py_2 = {
            id: el.id.toString(),
            permission: el.permission.toString()
          };
          try {
            await apiPostUsmanEditPermission(py_2);
          } catch (error) {
            t_error = error;
          }
        }
      } else {
        // Buat Tambah Permission Baru
        const py_2 = {
          r_roles_code: id.toString(),
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
    }

    try {
      const findReadMenu = findMenuItemsWithReadPermission(res);

      const toRemoveSet = new Set();
      clicked.forEach((conditionItem) => {
        if (conditionItem.permission == 0) {
          // Gabungkan code dan r_modules_code menjadi string unik untuk identifikasi
          toRemoveSet.add(`${conditionItem.code}-${conditionItem.r_modules_code}`);
        }
      });

      // Langkah 2: Filter dataArray
      const filteredArray = findReadMenu.filter((dataItem) => {
        // Buat kunci unik untuk item di dataArray
        const dataKey = `${dataItem.code}-${dataItem.r_modules_code}`;

        // Kembalikan true jika dataKey TIDAK ada di toRemoveSet (artinya pertahankan item ini)
        return !toRemoveSet.has(dataKey);
      });

      console.log('filter ', filteredArray);

      const uniqueModules = [...new Set(clicked.filter(o=> o.permission == 1).map((item) => item.r_modules_code))];

      const combinedArr = [...new Set([...filteredArray.map((o) => o.r_modules_code), ...uniqueModules])];
      console.log('res ', findReadMenu, clicked);

      const pyUpdateRole = { code: id, title: namaRole, r_modules_code: combinedArr.join(',') };
      await apiPostUsmanEditRole(pyUpdateRole);
    } catch (error) {
      t_error = error;
    }

    toastifyService.close();
    if (t_error) {
      errorMsg({}, 'Gagal Update Data');
    } else {
      successMsg('Berhasil Ubah Data');
      navigate('/user-management/roles/list');
    }
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
            <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">Detail Role - {namaRole}</h1>
          </div>
        </Col>
      </Row>
      <div className="border rounded-4 bg-white p-3 mb-3">
        <Row className="mb-2">
          <Col md={6} xl={4}>
            <Label className="mb-0">Nama Role</Label>
            <Input type="text" value={namaRole} onChange={(e) => setNamaRole(e.target.value)} placeholder="Masukkan Nama Role" />
          </Col>
        </Row>
        <Table>
          <EnhancedTableHead />
          <TableBody>
            {res.length ? (
              res.map((data, index) => (
                <RowTable key={index} row={data} collapse={collapse} setCollapse={setCollapse} index={index} setClicked={setClicked} setPermissionIndicator={setPermissionIndicator} />
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
export default UsmanEditRole;
