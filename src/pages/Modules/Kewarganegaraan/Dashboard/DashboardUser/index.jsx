import { useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import VoucherHistory from "./VoucherHistory";
import NotificationPanel from "./NotificationPanel";
import {
  ProfileSection,
  WelcomeSection,
} from "@/components/Common/DashboardProfileSection";
import SectionRiwayatPermohonan from "./ApplicationHistory";
import SectionPembelianVoucher from "./VoucherHistory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Cancel,
  Close,
  FolderCopySharp,
  FolderShared,
} from "@mui/icons-material";

const Dashboard = () => {
  const userProfile = {
    name: "Fauzi Iskandar Batubara",
    email: "fauziiskandar@gmail.com",
    avatar: "/api/placeholder/50/50",
  };

  const applications = [
    {
      no: 1,
      name: "Fauzi Iskandar Batubara",
      applicationNumber: "1192",
      date: "24-08-2024",
      status: "Belum Verifikasi",
      statusColor: "#FDEED7",
      textColor: "#E06016",
    },
    {
      no: 2,
      name: "Fauzi Iskandar Batubara",
      applicationNumber: "1180",
      date: "12-08-2024",
      status: "Terverifikasi",
      statusColor: "#D8F3E0",
      textColor: "#1F7C4D",
    },
    {
      no: 3,
      name: "Fauzi Iskandar Batubara",
      applicationNumber: "1129",
      date: "04-08-2024",
      status: "Ditolak",
      statusColor: "#FCE4E4",
      textColor: "#CF3533",
    },
    {
      no: 4,
      name: "Fauzi Iskandar Batubara",
      applicationNumber: "1142",
      date: "04-08-2024",
      status: "Ditolak",
      statusColor: "#FCE4E4",
      textColor: "#CF3533",
    },
  ];

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
    <Container className="page-content bg-white px-3 px-sm-4 px-md-5 mt-3">
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
            <SectionRiwayatPermohonan applications={applications} />
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

export default Dashboard;
