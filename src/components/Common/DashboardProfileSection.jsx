import { PersonPinCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import DoubleChevron from "@/assets/logo/double-chevron.png";
import UserPicture from "@/assets/images/image.png";

export const ProfileSection = () => {
  const userProfile = {
    name: "Fauzi Iskandar Batubara",
    email: "fauziiskandar@gmail.com",
    avatar: "/api/placeholder/50/50",
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        fontFamily: "Poppins",
      }}
    >
      <Avatar
        src={UserPicture}
        sx={{ width: 80, height: 80, border: "1px solid #E7E7E7" }}
      >
        <PersonPinCircleOutlined />
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {userProfile.name}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            fontFamily: "Poppins",
          }}
        >
          {userProfile.email}
        </Typography>
      </Box>
      <Button
        sx={{
          border: "1px solid #E7E7E7",
          color: "#6D6D6D",
          borderRadius: "6px",
          textTransform: "initial",
        }}
      >
        Lihat Profil
      </Button>
    </Box>
  );
};

export const WelcomeSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            mt: 1,
            mb: 1,
            color: "#041662",
            fontFamily: "Poppins",
            fontSize: "20px",
            lineHeight: "30px",
          }}
        >
          Selamat datang di AHU Link.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "#5D5D5D",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          Berikan layanan permohonan dan bantuan status layanan Anda dengan
          mudah.
        </Typography>
      </Box>
      <Box>
        <img src={DoubleChevron} />
      </Box>
    </Box>
  );
};
