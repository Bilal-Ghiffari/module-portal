import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const IndividuNotarisDashboardPage = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatIndividu/Dashboard")
);
const PermohonanSkWasiatPage = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatIndividu/Permohonan")
);

const wasiatIndividuRoutes = [
  {
    path: "/wasiat/individu/dashboard",
    component: (
      <SuspenseWrapper>
        <IndividuNotarisDashboardPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/wasiat/individu/permohonan",
    component: (
      <SuspenseWrapper>
        <PermohonanSkWasiatPage />
      </SuspenseWrapper>
    ),
  },
];

export default wasiatIndividuRoutes;
