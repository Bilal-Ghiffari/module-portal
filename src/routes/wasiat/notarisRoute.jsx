import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const WasiatNotarisDashboardPage = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatNotaris/Dashboard")
);
const LaporanWasiatDalamNegeriPage = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatNotaris/WasiatDalamNegeri")
);
const LaporanWasiatLuarNegeriPage = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatNotaris/WasiatLuarNegeri")
);
const LaporanWasiatNihilPage = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatNotaris/WasiatNihil")
);
const RiwayatLaporan = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatNotaris/Riwayat")
);
const DetailRiwayatLaporan = lazy(() =>
  import("@/pages/Modules/Wasiat/WasiatNotaris/Riwayat/Detail")
);

const wasiatNotarisRoutes = [
  {
    path: "/wasiat/dashboard",
    component: (
      <SuspenseWrapper>
        <WasiatNotarisDashboardPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/wasiat/dalam-negeri",
    component: (
      <SuspenseWrapper>
        <LaporanWasiatDalamNegeriPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/wasiat/luar-negeri",
    component: (
      <SuspenseWrapper>
        <LaporanWasiatLuarNegeriPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/wasiat/nihil",
    component: (
      <SuspenseWrapper>
        <LaporanWasiatNihilPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/wasiat/riwayat",
    component: (
      <SuspenseWrapper>
        <RiwayatLaporan />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/wasiat/riwayat/:id",
    component: (
      <SuspenseWrapper>
        <DetailRiwayatLaporan />
      </SuspenseWrapper>
    ),
  },
];

export default wasiatNotarisRoutes;
