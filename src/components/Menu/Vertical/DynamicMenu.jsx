import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import withRouter from '../../Common/withRouter';
import { findPermission } from '../../../helpers/services/checkAccess';
import MetisMenu from 'metismenujs';
import { useSelector } from 'react-redux';

const iconsList = [
  'bx bx-happy-beaming',
  'bx bx-health',
  'bx bx-add-to-queue',
  'bx bx-customize',
  'bx bx-dialpad-alt',
  'bx bx-extension',
  'bx bx-border-all',
  'bx bx-brightness',
  'bx bx-mobile-vibration',
  'bx bx-gas-pump',
  'bx bx-pie-chart-alt-2',
  'bx bx-credit-card-alt',
  'bx bx-street-view',
  'bx bx-dna',
  'bx bx-copy-alt',
  'bx bx-video-recording',
  'bx bx-notepad',
  'bx bx-bug-alt',
  'bx bx-mouse-alt',
  'bx bx-edit-alt',
  'bx bx-chat',
  'bx bx-book-content',
  'bx bx-message-square-dots',
  'bx bx-message-square',
  'bx bx-slideshow',
  'bx bx-wallet-alt',
  'bx bx-memory-card',
  'bx bx-message-rounded-dots',
  'bx bx-message-dots',
  'bx bx-bar-chart-alt-2',
  'bx bx-store-alt',
  'bx bx-buildings',
  'bx bx-home-circle',
  'bx bx-money',
  'bx bx-walk',
  'bx bx-repeat',
  'bx bx-font-family',
  'bx bx-joystick-button',
  'bx bx-paint',
  'bx bx-unlink',
  'bx bx-brush',
  'bx bx-rotate-left',
  'bx bx-badge-check',
];

//Ini buat url yang udah ready
const alreadyUrl = [
  { r_modules_code: '42', code: '02', url: '/user-management/tabel-user' },
  { r_modules_code: '42', code: '03', url: '/user-management/tabel-log' },
  { r_modules_code: '42', code: '04', url: '/user-management/roles/list' },
  { r_modules_code: '42', code: '05', url: '/user-management/pengumuman' },
  { r_modules_code: '19', code: '02', url: '/pewarganegaraan/pendaftaran' },
  { r_modules_code: '19', code: '03', url: '/pewarganegaraan/dashboard' },
  {
    r_modules_code: '26',
    code: '37.01',
    url: '/kewarganegaraan/pernyataan-wni/tetap-wni/form-permohonan',
  },
  {
    r_modules_code: '26',
    code: '37.02',
    url: '/kewarganegaraan/pernyataan-wni/pemulihan-wni/form-permohonan',
  },
  {
    r_modules_code: '26',
    code: '37.03',
    url: '/kewarganegaraan/pernyataan-wni/anak-wn-ganda/form-permohonan',
  },
  {
    r_modules_code: '26',
    code: '37.04',
    url: '/kewarganegaraan/pernyataan-wni/anak-wni-angkat/form-permohonan',
  },
  {
    r_modules_code: '26',
    code: '38.01',
    url: '/kewarganegaraan/pernyataan-wni/kemauan-sendiri/form-permohonan',
  },
  {
    r_modules_code: '26',
    code: '38.04',
    url: '/kewarganegaraan/pernyataan-wni/ikut-pasangan/form-permohonan',
  },
  { r_modules_code: '42', code: '02', url: '/user-management/tabel-user' },
  { r_modules_code: '42', code: '03', url: '/user-management/tabel-log' },
  { r_modules_code: '42', code: '04', url: '/user-management/roles/list' },
  { r_modules_code: '42', code: '05', url: '/user-management/pengumuman' },
  { r_modules_code: '19', code: '02', url: '/pewarganegaraan/pendaftaran' },
  { r_modules_code: '19', code: '03', url: '/pewarganegaraan/dashboard' },
  { r_modules_code: '20', code: '01', url: '/perseroan/perorangan' },
  {
    r_modules_code: '20',
    code: '03',
    url: '/perseroan/perorangan/pendaftaran',
  },
  {
    r_modules_code: '20',
    code: '04',
    url: '/perseroan/perorangan/perubahan-data',
  },
  {
    r_modules_code: '20',
    code: '05',
    url: '/perseroan/perorangan/pembubaran',
  },
  {
    r_modules_code: '20',
    code: '06',
    url: '/perseroan/perorangan/perbaikan-data',
  },
  {
    r_modules_code: '23',
    code: '06.01',
    url: '/apostille/pendaftaran',
  },
];

const DynamicMenuVertical = (props) => {
  const menu = props.roles?.menu || [];
  const [menuList, setMenuList] = useState([]);
  const refMenu = useRef(null);
  const { pathname } = useLocation();

  function groupAndNest(raw) {
    const grouped = Object.values(
      raw.reduce((acc, item) => {
        const key = item.r_modules_code;
        if (!acc[key]) {
          acc[key] = {
            r_modules_code: item.r_modules_code,
            module: item.module,
            children: [],
          };
        }

        if (parseInt(item.level) <= 100) {
          acc[key].children.push({ ...item });
        }

        return acc;
      }, {})
    );

    grouped.forEach((group) => {
      const flatMap = new Map();
      const nested = [];

      // Siapkan map untuk lookup cepat berdasarkan code
      group.children.forEach((item) => {
        item.children = [];
        flatMap.set(item.code, item);
      });

      group.children.forEach((item) => {
        const parts = item.code.split('.');
        if (parts.length === 1) {
          // level 1 (root)
          nested.push(item);
        } else {
          const parentCode = parts.slice(0, -1).join('.');
          const parent = flatMap.get(parentCode);
          if (parent) {
            parent.children.push(item);
          } else {
            // Parent not found, treat as root
            nested.push(item);
          }
        }
      });

      group.children = nested;
    });

    return grouped;
  }

  const { root_menu_list } = useSelector((el) => el.RootReducer);

  useEffect(() => {
    if (refMenu.current) {
      new MetisMenu(refMenu.current);
    }
  }, [menuList]);

  const checkAlreadyUrl = ({ r_modules_code, code }) => {
    const findUrl = alreadyUrl.find(
      (o) => o.r_modules_code == r_modules_code && o.code == code
    );
    return findUrl?.url || '/page-on-progress';
  };

  const assignUrlRecursively = (nodes) => {
    return nodes.map((node) => {
      const updatedNode = {
        ...node,
        url: checkAlreadyUrl({
          r_modules_code: node.r_modules_code,
          code: node.code,
        }),
      };

      if (node.children && node.children.length) {
        updatedNode.children = assignUrlRecursively(node.children);
      }

      return updatedNode;
    });
  };

  useEffect(() => {
    if (root_menu_list.length) {
      const moduleUsed = localStorage.getItem('moduleNow');
      const grouped = groupAndNest(root_menu_list);

      const modules_constant = grouped.map((item, idx) => ({
        ...item,
        children: assignUrlRecursively(item.children),
        icon: iconsList[idx],
        url: '/dashboard/home', // root-level url (misalnya dashboard)
        color: '#2A3042',
      }));

      const findModules = modules_constant.find(
        (o) => o.r_modules_code == moduleUsed
      );

      setMenuList(findModules?.children);
    }
  }, [root_menu_list]);

  return (
    <React.Fragment>
      <ul className={`metismenu list-unstyled`} id="side-menu" ref={refMenu}>
        {menuList.length > 0 && <RenderMenu items={menuList} />}
      </ul>
    </React.Fragment>
  );
};

const RenderMenu = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <>
          {findPermission({
            moduleCode: item.r_modules_code,
            isModule: item.title ? false : true,
            menuCode: item.code,
            action: 'permission',
          }) ? (
            <li key={item.code}>
              <Link
                to={item.url || '/page-on-progress'}
                className={item.children?.length ? 'has-arrow' : 'active'}
              >
                {item.icon && <i className={item.icon} />}
                <span>{item.title || item.module}</span>
              </Link>

              {item.children?.length > 0 && (
                <ul className="sub-menu" aria-expanded="false">
                  <RenderMenu items={item.children} />
                </ul>
              )}
            </li>
          ) : null}
        </>
      ))}
    </>
  );
};

DynamicMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(DynamicMenuVertical));
