import SuspenseWrapper from '@/components/Common/SuspenseWrapper';
// import PageOnProgress from '@/pages/error/PageOnProgress';
import { lazy } from 'react';

const Dashboard = lazy(() =>
  import('@/pages/Modules/Fidusia/Dashboard/DashboardAdmin')
);
const Pendaftaran = lazy(() => import('@/pages/Modules/Fidusia/Pendaftaran'));
const Perbaikan = lazy(() => import('@/pages/Modules/Fidusia/Perbaikan'));
const Perubahan = lazy(() => import('@/pages/Modules/Fidusia/Perubahan'));
const Penghapusan = lazy(() => import('@/pages/Modules/Fidusia/Penghapusan'));
const Cabang = lazy(() => import('@/pages/Modules/Fidusia/Cabang'));
const DaftarFidusia = lazy(() =>
  import('@/pages/Modules/Fidusia/DaftarFidusia')
);
const DaftarTransaksi = lazy(() =>
  import('@/pages/Modules/Fidusia/DaftarTransaksi')
);

// success and errors page
const FidusiaSuccess = lazy(() =>
  import('@/pages/Modules/Fidusia/SuccessPage')
);

const fidusiaRoutes = [
  {
    path: '/fidusia',
    component: (
      <SuspenseWrapper>
        <Dashboard />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/pendaftaran',
    component: (
      <SuspenseWrapper>
        <Pendaftaran />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/perbaikan',
    component: (
      <SuspenseWrapper>
        <Perbaikan />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/perubahan',
    component: (
      <SuspenseWrapper>
        <Perubahan />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/penghapusan',
    component: (
      <SuspenseWrapper>
        <Penghapusan />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/cabang',
    component: (
      <SuspenseWrapper>
        <Cabang />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/daftar-fidusia',
    component: (
      <SuspenseWrapper>
        <DaftarFidusia />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/fidusia/daftar-transaksi',
    component: (
      <SuspenseWrapper>
        <DaftarTransaksi />
      </SuspenseWrapper>
    ),
  },

  {
    path: '/fidusia/success',
    component: (
      <SuspenseWrapper>
        <FidusiaSuccess />
      </SuspenseWrapper>
    ),
  },
];

export default fidusiaRoutes;
