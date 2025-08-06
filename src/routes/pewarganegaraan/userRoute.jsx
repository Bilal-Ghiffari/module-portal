import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

// const Page = lazy(() =>
//   import("@/pages/Modules/Pewarganegaraan/Pendaftaran/OnBoarding")
// );
// const FormPendaftaranPage = lazy(() =>
//   import("@/pages/Modules/Pewarganegaraan/Pendaftaran")
// );

const UserDashboardPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Dashboard/DashboardUser")
);

const DetailDashboardPermohonanPage = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Dashboard/DashboardUser/Detail")
);

const FormPendaftaranPage2 = lazy(() =>
  import("@/pages/Modules/Pewarganegaraan/Permohonan")
);

const userPewarganegaraanRoutes = [
  {
    path: "/pewarganegaraan/dashboard",
    component: (
      <SuspenseWrapper>
        <UserDashboardPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/dashboard/detail-permohonan/:id",
    component: (
      <SuspenseWrapper>
        <DetailDashboardPermohonanPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/pewarganegaraan/pendaftaran",
    component: (
      <SuspenseWrapper>
        <FormPendaftaranPage2 />
      </SuspenseWrapper>
    ),
  },
  // {
  //   path: "/pewarganegaraan/pendaftaran",
  //   component: (
  //     <SuspenseWrapper>
  //       <Page />
  //     </SuspenseWrapper>
  //   ),
  // },
  // {
  //   path: "/pewarganegaraan/form-pendaftaran",
  //   component: (
  //     <SuspenseWrapper>
  //       <FormPendaftaranPage />
  //     </SuspenseWrapper>
  //   ),
  // },
  // {
  //   path: "/pewarganegaraan/pendaftaran2",
  //   component: (
  //     <SuspenseWrapper>
  //       <FormPendaftaranPage2 />
  //     </SuspenseWrapper>
  //   ),
  // },
];

export default userPewarganegaraanRoutes;
