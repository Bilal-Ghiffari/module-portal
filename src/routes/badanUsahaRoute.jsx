import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

import Dashboard from "../pages/Modules/DashboardNew";
import PengajuanNama from "@/pages/Modules/BadanUsaha/PersekutuanKomanditer/PengajuanNama";
import FormPengajuanNama from "@/pages/Modules/BadanUsaha/PersekutuanKomanditer/PengajuanNama/FormPengajuanNama";
// const Dashboard = lazy(() => import("@/pages/Modules/BadanUsaha/Dashboard"));
const Pendaftaran = lazy(() =>
  import("@/pages/Modules/BadanUsaha/PersekutuanKomanditer/Pendaftaran")
);

const badanUsahaRoutes = [
  {
    path: "/badan-usaha",
    component: (
      <SuspenseWrapper>
        <Dashboard />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/badan-usaha/persekutuan-komanditer/pengajuan-nama",
    component: (
      <SuspenseWrapper>
        <PengajuanNama />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/badan-usaha/persekutuan-komanditer/pengajuan-nama/create",
    component: (
      <SuspenseWrapper>
        <FormPengajuanNama />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/badan-usaha/persekutuan-komanditer/pendaftaran",
    component: (
      <SuspenseWrapper>
        <Pendaftaran />
      </SuspenseWrapper>
    ),
  },
];

export default badanUsahaRoutes;
