import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import DashboardAdmin from "@/pages/Modules/Parpol/Dashboard/DashboardAdmin";
import DashboardUser from "@/pages/Modules/Parpol/Dashboard/DashboardUser";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/Modules/Parpol/Dashboard"));
const Pendaftaran = lazy(() =>
  import("@/pages/Modules/Parpol/Components/Pendaftaran")
);

const parpolRoutes = [
  {
    path: "/parpol",
    component: (
      <SuspenseWrapper>
        <DashboardUser />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/parpol/admin",
    component: (
      <SuspenseWrapper>
        <DashboardAdmin />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/parpol/pendaftaran",
    component: (
      <SuspenseWrapper>
        <Pendaftaran />
      </SuspenseWrapper>
    ),
  },
];

export default parpolRoutes;
