import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const Page = lazy(() =>
  import(
    "@/pages/Modules/Perseroan/Perorangan/Components/Pendaftaran/OnBoarding"
  )
);

// const FormPage = lazy(() =>
//   import(
//     "@/pages/Modules/Perseoran/Perorangan/Components/Pendaftaran/FormPendaftaran"
//   )
// );

import FormPage from "@/pages/Modules/Perseroan/Perorangan/Components/Pendaftaran/index";
import Dashboard from "@/pages/Modules/Perseroan/Perorangan/Dashboard/index";
import Detail from "@/pages/Modules/Perseroan/Perorangan/Components/Detail";
import PengaturanPerseroan from "@/pages/Modules/Perseroan/PengaturanPerseroan";
import TransaksiPerseroan from "@/pages/Modules/Perseroan/TransaksiPerseroan";
import DashboardUser from "@/pages/Modules/Perseroan/Perorangan/Dashboard/DashboardUser";
import DashboardAdmin from "@/pages/Modules/Perseroan/Perorangan/Dashboard/DashboardAdmin";

const perseroanPeroranganRoutes = [
  {
    path: "/perseroan/perorangan",
    component: (
      <SuspenseWrapper>
        <DashboardUser />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/admin",
    component: (
      <SuspenseWrapper>
        <DashboardAdmin />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/detail-permohonan/:id",
    component: (
      <SuspenseWrapper>
        <Detail isDetail />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/pendaftaran",
    component: (
      <SuspenseWrapper>
        <FormPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/perubahan-data",
    component: (
      <SuspenseWrapper>
        <FormPage label="Perubahan Data" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/pembubaran",
    component: (
      <SuspenseWrapper>
        <FormPage label="Pembubaran Data" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/perbaikan-data",
    component: (
      <SuspenseWrapper>
        <FormPage label="Perbaikan Data" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/pengaturan-perseroan/daftar-kbli",
    component: (
      <SuspenseWrapper>
        <PengaturanPerseroan label="Daftar KBLI" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/pengaturan-perseroan/daftar-blacklist-nama-pp",
    component: (
      <SuspenseWrapper>
        <PengaturanPerseroan label="Daftar Blacklist Nama Perseroan" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/pengaturan-perseroan/daftar-blacklist-kata-pp",
    component: (
      <SuspenseWrapper>
        <PengaturanPerseroan label="Daftar Blacklist Kata Perseroan" />
      </SuspenseWrapper>
    ),
  },
  // TRANSAKSI
  {
    path: "/perseroan/perorangan/transaksi-perseroan/daftar-transaksi-pp",
    component: (
      <SuspenseWrapper>
        <TransaksiPerseroan label="Daftar Transaksi Perseroan Perorangan" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/transaksi-perseroan/daftar-user-pp",
    component: (
      <SuspenseWrapper>
        <TransaksiPerseroan label="Daftar User Perseroan" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/transaksi-perseroan/daftar-laporan-keuangan",
    component: (
      <SuspenseWrapper>
        <TransaksiPerseroan label="Daftar Laporan Keuangan" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/transaksi-perseroan/daftar-laporan-keuangan/detail/:id",
    component: (
      <SuspenseWrapper>
        <TransaksiPerseroan label="Riwayat Transaksi Laporan Keuangan PP" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/transaksi-perseroan/daftar-status-pp",
    component: (
      <SuspenseWrapper>
        <TransaksiPerseroan label="Daftar Status Perseroan" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/perorangan/transaksi-perseroan/daftar-status-pp/detail/:id",
    component: (
      <SuspenseWrapper>
        <TransaksiPerseroan label="Riwayat Status PP" />
      </SuspenseWrapper>
    ),
  },
];

export default perseroanPeroranganRoutes;
