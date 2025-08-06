import SuspenseWrapper from '@/components/Common/SuspenseWrapper';
import { lazy } from 'react';

import Dashboard from '../pages/Modules/DashboardNew';

const TabelUser = lazy(() => import('@/pages/Modules/UserManagement/Users/TabelUser'));
const CreateUser = lazy(() => import('@/pages/Modules/UserManagement/Users/CreateUser'));
const EditUserManagment = lazy(() => import('@/pages/Modules/UserManagement/Users/EditUser'));
const ChangePwdUsers = lazy(() => import('@/pages/Modules/UserManagement/Users/EditUser/ChangePwd'));

const TabelLog = lazy(() => import('@/pages/Modules/UserManagement/DataLog'));
const UsmanRoleList = lazy(() => import('@/pages/Modules/UserManagement/Roles/pages/List'));
const UsmanEditRole = lazy(() => import('@/pages/Modules/UserManagement/Roles/pages/Edit'));
const UsmanCreateRole = lazy(() => import('@/pages/Modules/UserManagement/Roles/pages/Create'));

// Anouncement
const Anouncement = lazy(() => import('@/pages/Modules/UserManagement/Anouncement'));


const usmanRoutes = [
  {
    path: '/user-management/dashboard',
    component: <Dashboard />,
  },
  {
    path: '/user-management/user/create',
    component: (
      <SuspenseWrapper>
        <CreateUser />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/edit/:id',
    component: (
      <SuspenseWrapper>
        <EditUserManagment />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/tabel-user',
    component: (
      <SuspenseWrapper>
        <TabelUser />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/tabel-log',
    component: (
      <SuspenseWrapper>
        <TabelLog />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/user/change-pwd/:id',
    component: (
      <SuspenseWrapper>
        <ChangePwdUsers />
      </SuspenseWrapper>
    ),
  },

  // Role Management
  {
    path: '/user-management/roles/list',
    component: (
      <SuspenseWrapper>
        <UsmanRoleList />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/roles/create',
    component: (
      <SuspenseWrapper>
        <UsmanCreateRole />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/roles/d/:id',
    component: (
      <SuspenseWrapper>
        <UsmanEditRole />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/user-management/pengumuman',
    component: (
      <SuspenseWrapper>
        <Anouncement />
      </SuspenseWrapper>
    ),
  },
];

export default usmanRoutes;
