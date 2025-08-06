import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const AdminDashboardPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Dashboard/DashboardAdmin")
);

const VerifikasiPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Verifikasi")
);

const DetailVerifikasiPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Verifikasi/Detail")
);

const ListPermohonanPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/ListPermohonan")
);
const MigrasiDataPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/MigrasiData")
);

const DaftarParafPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Paraf")
);

const DaftarSkTerbitPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/DaftarSkTerbit")
);
const DetailSkTerbitPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/DaftarSkTerbit/Detail")
);

const ManajemenKanwilPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/ManajemenKanwil")
);

const adminPewarganegaraanRoutes = [
  {
    path: "/pewarganegaraan/dashboard/admin",
    component: (
      <SuspenseWrapper>
        <AdminDashboardPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/verifikasi",
    component: (
      <SuspenseWrapper>
        <VerifikasiPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/verifikasi/:id",
    component: (
      <SuspenseWrapper>
        <DetailVerifikasiPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/list-permohonan",
    component: (
      <SuspenseWrapper>
        <ListPermohonanPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/migrasi-data",
    component: (
      <SuspenseWrapper>
        <MigrasiDataPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/daftar-paraf",
    component: (
      <SuspenseWrapper>
        <DaftarParafPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/daftar-sk-terbit",
    component: (
      <SuspenseWrapper>
        <DaftarSkTerbitPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/daftar-sk-terbit/:id",
    component: (
      <SuspenseWrapper>
        <DetailSkTerbitPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/admin/manajemen-kanwil",
    component: (
      <SuspenseWrapper>
        <ManajemenKanwilPage />
      </SuspenseWrapper>
    ),
  },
];

export default adminPewarganegaraanRoutes;
