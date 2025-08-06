import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
const ProfileLanding = lazy(() => import("@/pages/Profile/index"));
const ProfileUser = lazy(() => import("@/pages/Profile/ProfileUser"));
const ResetPasswordPage = lazy(() =>
  import("@/pages/Authentication/ResetPassword")
);

const ProfileUbahPwd = lazy(() =>
  import("@/pages/Authentication/ChangePwd/ProfileUbahPwd")
);
const OauthCallback = lazy(() =>
  import("@/pages/Authentication/OauthCallback")
);

import Page404 from "../pages/error/Page404";
import usmanRoutes from "./usmanRoute";
import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import Dashboard from "../pages/Modules/DashboardNew";
import PageOnProgress from "@/pages/error/PageOnProgress";
// import pewarganegaraanRoutes from './pewarganegaraanRoute';
import pewarganegaraanRoutes from "./pewarganegaraan";
import kewarganegaraanRoutes from "./kewarganegaraanRoute";

import perseroanPeroranganRoutes from "./perseroanPeroranganRoute";
import apostilleRoutes from "./apostilleRoute";
import fidusiaRoutes from "./fidusiaRoute";
import perseroanTerbatasRoutes from "./perseroanTerbatasRoute";
import wasiatRoutes from "./wasiat";
import parpolRoutes from "./parpolRoute";
import kuratorRoutes from "./kuratorRoute";
import badanUsahaRoutes from "./badanUsahaRoute";
import Bypass from "@/pages/Authentication/Bypass";

//Protected
const authProtectedRoutes = [
  ...fidusiaRoutes,
  ...pewarganegaraanRoutes,
  ...kewarganegaraanRoutes,
  ...perseroanPeroranganRoutes,
  ...perseroanTerbatasRoutes,
  ...apostilleRoutes,
  ...parpolRoutes,
  ...kuratorRoutes,
  ...usmanRoutes,
  ...badanUsahaRoutes,
  ...wasiatRoutes,
  {
    path: "/auth/ubah-pwd",
    component: (
      <SuspenseWrapper>
        <ProfileUbahPwd />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/auth-profile/:id",
    component: (
      <SuspenseWrapper>
        <ProfileUser />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/dashboard/home",
    component: <Dashboard />,
  },
  {
    path: "/page-on-progress",
    component: <PageOnProgress />,
  },

  {
    path: "/",
    component: <Navigate to="/profile" replace />, //direct ke url lain, buat antisipasi bug penampilan menu
  },
];
const authProtectedWHorizonRoutes = [
  {
    path: "/profile",
    component: (
      <SuspenseWrapper>
        <ProfileLanding />
      </SuspenseWrapper>
    ),
  },
];

//Public
const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  // {
  //   path: "/bypass",
  //   component: (
  //     <SuspenseWrapper>
  //       <Bypass />
  //     </SuspenseWrapper>
  //   ),
  // },

  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/auth/reset-pass", component: <ResetPasswordPage /> },

  {
    path: "/oauth/callback",
    component: (
      <SuspenseWrapper>
        <OauthCallback />
      </SuspenseWrapper>
    ),
  },

  { path: "/404", component: <Page404 /> },
  { path: "*", component: <Navigate to={"/404"} /> },
];

// public Horizontal
const publicHorizontalRoutes = [
  //
];
// public vertical
const publicVerticalRoutes = [
  //
];

export {
  authProtectedRoutes,
  publicRoutes,
  authProtectedWHorizonRoutes,
  publicHorizontalRoutes,
  publicVerticalRoutes,
};
