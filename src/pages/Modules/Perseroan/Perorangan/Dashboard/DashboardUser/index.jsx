import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import NotificationPanel from "./Components/NotificationPanel";
import {
  ProfileSection,
  WelcomeSection,
} from "@/components/Common/DashboardProfileSection";
import SectionRiwayatPermohonan from "./Components/ApplicationHistory";
import SectionPembelianVoucher from "./Components/VoucherHistory";
import { Cancel, FolderShared } from "@mui/icons-material";
import { useEffect } from "react";
import { apiGetListPerseroanPerorangan } from "@/helpers/backend_helper";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useState } from "react";

const userProfile = {
  name: "Fauzi Iskandar Batubara",
  email: "fauziiskandar@gmail.com",
  avatar: "/api/placeholder/50/50",
};

const vouchers = [
  {
    no: 1,
    voucherCode: "865174857637485",
    service: "Penanggungjawaban keuangan/mutasi",
    expiryDate: "24-09-2024",
    billAmount: "Rp15.000.000",
    purchaseAmount: 1,
    status: "Belum Bayar",
    statusColor: "#FCE4E4",
    textColor: "#CF3533",
  },
];

const DashboardUser = () => {
  const [tableData, setTableData] = useState({
    data: [],
    total_count: 0,
  });
  const toastifyService = new ToastifyService();
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const fetchData = (query) => {
    toastifyService.showLoading();
    apiGetListPerseroanPerorangan(query)
      .then((res) => {
        setTableData({
          data: res.data,
          total_count: res.meta.total,
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        toastifyService.close(); // panggil fungsinya
      });
  };

  const notifications = [
    {
      title: "Permohonan 1192 ditolak",
      subtitle: "Silahkan klik untuk melihat detail ",
      icon: <Cancel color="error" />,
      status: "rejected",
    },
    {
      title: "Permohonan 1192 ditolak",
      subtitle: "Silahkan klik untuk melihat detail ",
      icon: <FolderShared color="primary" />,
      status: "verified",
    },
  ];
  const steps = [
    {
      label: "Input Kode Voucher",
      description: `24 Juli 2025`,
    },
    {
      label: "Pendaftaran",
      description: "24 Juli 2025",
    },
    {
      label: "Verifikasi",
      description: `24 Juli 2025`,
    },
    {
      label: "SK Terbit",
      description: `24 Juli 2025`,
    },
  ];

  return (
    <Container className="page-content bg-white">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Box
            sx={{
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              padding: "20px",
              mb: 2,
            }}
          >
            <WelcomeSection />
            <Divider sx={{ my: 2, color: "#E7E7E7" }} />
            <ProfileSection userProfile={userProfile} />
          </Box>

          <Box className="my-3">
            <SectionRiwayatPermohonan
              data={tableData}
              fetchData={fetchData}
              setQuery={setQuery}
              query={query}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <NotificationPanel steps={steps} notifications={notifications} />
        </Grid>
      </Grid>
      <SectionPembelianVoucher vouchers={vouchers} />
    </Container>
  );
};

export default DashboardUser;
