import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const UserDashboardPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/Dashboard/DashboardUser")
);

// Peryataan WNI
const FormPenetapanWni = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/PernyataanWni/TetapWni")
);

const DetailDashboardTetapWNi = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/Dashboard/DashboardUser/Detail")
);

const FormPemulihanWni = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/PernyataanWni/PemulihanWni")
);

const FormAnakWnGanda = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/PernyataanWni/AnakWnGanda/")
);

const FormAnakWniAngkat = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/PernyataanWni/AnakWniAngkat")
);

// Kehilangan WNI

const FormKemauanSendiri = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/KehilanganWni/KemauanSendiri")
);

const FormPunyaWna = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/KehilanganWni/PunyaWna")
);

const FormBelumPunyaWna = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/KehilanganWni/BlmPunyaWna")
);

const FormIkutPasangan = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/KehilanganWni/IkutPasangan")
);

// Admin pages

const AdminDashboardPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/Dashboard/DashboardAdmin")
);

const DaftarVerifikasiPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/DaftarVerifikasi")
);

const DetailVerifikasiPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/DaftarVerifikasi/Detail")
);

const SkDigitalTetapWni = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/SkDigital/TetapWni")
);

const DaftarPermohonanPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/DaftarPermohonan")
);

const DaftarSkTerbit = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/DaftarSkTerbit")
);

const DaftarParafPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/Paraf")
);

const PengajuanPermohonanPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/PermohonanManual/Pengajuan")
);

const PengajuanMigrasiDataPage = lazy(() =>
  import("@/pages/Modules/Kewarganegaraan/PermohonanManual/MigrasiData")
);

const kewarganegaraanRoutes = [
  {
    path: "/kewarganegaraan/dashboard",
    component: (
      <SuspenseWrapper>
        <UserDashboardPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/dashboard/detail-permohonan/:id",
    component: (
      <SuspenseWrapper>
        <DetailDashboardTetapWNi />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/pernyataan-wni/tetap-wni",
    component: (
      <SuspenseWrapper>
        <FormPenetapanWni />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/pernyataan-wni/pemulihan-wni",
    component: (
      <SuspenseWrapper>
        <FormPemulihanWni />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/pernyataan-wni/anak-kewarganegaraan-ganda",
    component: (
      <SuspenseWrapper>
        <FormAnakWnGanda />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/pernyataan-wni/naturalisasi-anak-angkat",
    component: (
      <SuspenseWrapper>
        <FormAnakWniAngkat />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/kehilangan-wni/kemauan-sendiri",
    component: (
      <SuspenseWrapper>
        <FormKemauanSendiri />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/kehilangan-wni/memiliki-kewarganegaraan-asing",
    component: (
      <SuspenseWrapper>
        <FormPunyaWna />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/kehilangan-wni/belum-memiliki-kewarganegaraan-asing",
    component: (
      <SuspenseWrapper>
        <FormBelumPunyaWna />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/kehilangan-wni/mengikuti-pasangan",
    component: (
      <SuspenseWrapper>
        <FormIkutPasangan />
      </SuspenseWrapper>
    ),
  },

  // Admin kewarganegaraan

  {
    path: "/kewarganegaraan/dashboard/admin",
    component: (
      <SuspenseWrapper>
        <AdminDashboardPage />
      </SuspenseWrapper>
    ),
  },

  {
    path: "/kewarganegaraan/daftar-verifikasi",
    component: (
      <SuspenseWrapper>
        <DaftarVerifikasiPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/daftar-verifikasi/detail-verifikasi/:id",
    component: (
      <SuspenseWrapper>
        <DetailVerifikasiPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/sk-digital/tetap-wni",
    component: (
      <SuspenseWrapper>
        <SkDigitalTetapWni />
      </SuspenseWrapper>
    ),
  },

  {
    path: "/kewarganegaraan/daftar-permohonan",
    component: (
      <SuspenseWrapper>
        <DaftarPermohonanPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/daftar-sk-terbit",
    component: (
      <SuspenseWrapper>
        <DaftarSkTerbit />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/daftar-paraf",
    component: (
      <SuspenseWrapper>
        <DaftarParafPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/permohonan-manual/pengajuan",
    component: (
      <SuspenseWrapper>
        <PengajuanPermohonanPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/kewarganegaraan/permohonan-manual/migrasi-data",
    component: (
      <SuspenseWrapper>
        <PengajuanMigrasiDataPage />
      </SuspenseWrapper>
    ),
  },
];

export default kewarganegaraanRoutes;
