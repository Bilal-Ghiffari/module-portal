import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import Detail from "@/pages/Modules/Kurator/Components/Detail";
import DashboardAdmin from "@/pages/Modules/Kurator/Dashboard/DashboardAdmin";
import DashboardUser from "@/pages/Modules/Kurator/Dashboard/DashboardUser";
import DynamicMenu from "@/pages/Modules/Kurator/DynamicMenu";
import Laporan from "@/pages/Modules/Kurator/Laporan";

import { lazy } from "react";

const Pendaftaran = lazy(() =>
  import("@/pages/Modules/Kurator/Components/Pendaftaran")
);

const kuratorRoutes = [
  {
    path: "/kurator",
    component: (
      <SuspenseWrapper>
        <DashboardUser />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/admin",
    component: (
      <SuspenseWrapper>
        <DashboardAdmin />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/detail/:id",
    component: (
      <SuspenseWrapper>
        <Detail />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/pendaftaran",
    component: (
      <SuspenseWrapper>
        <Pendaftaran />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/perpanjangan",
    component: (
      <SuspenseWrapper>
        <Pendaftaran label="Perpanjangan Kurator" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/transaksi",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Transaksi" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/laporan-kurator",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Laporan Kurator" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/laporan-pengurus",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Laporan Pengurus" />
      </SuspenseWrapper>
    ),
  },

  {
    path: "/kurator/tambah-laporan-kurator",
    component: (
      <SuspenseWrapper>
        <Laporan label="Tambah Laporan Awal Kurator" type="kurator" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/tambah-laporan-pengurus",
    component: (
      <SuspenseWrapper>
        <Laporan label="Tambah Laporan Awal Pengurus" type="pengurus" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/riwayat-laporan-kurator",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Riwayat Pelaporan Kurator" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/ganti-kurator",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Ganti Kurator" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/riwayat-laporan-pengurus",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Riwayat Pelaporan Pengurus" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/ganti-pengurus",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Ganti Pengurus" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/laporan-berkala-kurator",
    component: (
      <SuspenseWrapper>
        <Pendaftaran label="Laporan Berkala Kurator" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kurator/laporan-berkala-pengurus",
    component: (
      <SuspenseWrapper>
        <Pendaftaran label="Laporan Berkala Pengurus" />
      </SuspenseWrapper>
    ),
  },
];

export default kuratorRoutes;
