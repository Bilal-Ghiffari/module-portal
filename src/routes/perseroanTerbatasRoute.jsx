import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const Page = lazy(() =>
  import(
    "@/pages/Modules/Perseroan/Perorangan/Components/Pendaftaran/OnBoarding"
  )
);

import FormPage from "@/pages/Modules/Perseroan/Terbatas/Components/Pendaftaran/index";
import Dashboard from "@/pages/Modules/Perseroan/Terbatas/Dashboard/index";
import Detail from "@/pages/Modules/Perseroan/Terbatas/Components/Detail";
import DashboardAdmin from "@/pages/Modules/Perseroan/Terbatas/Dashboard/DashboardAdmin";

const perseroanTerbatasRoutes = [
  {
    path: "/perseroan/terbatas",
    component: (
      <SuspenseWrapper>
        <Dashboard />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/terbatas/admin",
    component: (
      <SuspenseWrapper>
        <DashboardAdmin />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/terbatas/detail-permohonan/:id",
    component: (
      <SuspenseWrapper>
        <Detail />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/terbatas/pendaftaran",
    component: (
      <SuspenseWrapper>
        <FormPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/terbatas/perubahan-data",
    component: (
      <SuspenseWrapper>
        <FormPage label="Perubahan Data" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/terbatas/pembubaran",
    component: (
      <SuspenseWrapper>
        <FormPage label="Pembubaran Data" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/perseroan/terbatas/perbaikan-data",
    component: (
      <SuspenseWrapper>
        <FormPage label="Perbaikan Data" />
      </SuspenseWrapper>
    ),
  },
];

export default perseroanTerbatasRoutes;
