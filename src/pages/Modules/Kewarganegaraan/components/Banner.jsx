import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdVerified } from "react-icons/md";
import { CustomButton } from "@/components/Common/Button";

const styles = `
  @keyframes popIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    60% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  .verified-icon {
    animation: popIn 0.6s ease-out forwards;
  }
`;

const SubmissionBanner = ({ title, subTitle, description, redirectUrl }) => {
  const handleExitClick = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
      window.location.reload();
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Card
        sx={{ maxWidth: 628, height: 351 }}
        className="d-flex justify-content-center align-items-center"
      >
        <CardContent className="d-flex flex-column justify-content-center gap-3">
          <Typography className="text-center">
            <MdVerified size={150} color="green" className="verified-icon" />
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="d-flex justify-content-center align-items-start"
            sx={{ fontFamily: "Poppins" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontFamily: "Poppins",
            }}
          >
            {subTitle}
          </Typography>
          <div className="d-flex justify-content-end align-items-end text-end">
            <CustomButton text={"Keluar"} onClick={handleExitClick} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export const SuccessSubmissionBanner = ({ title, subTitle, redirectUrl }) => {
  return (
    <div
      className="bg-white page-content w-full d-flex justify-content-center align-items-center flex-column gap-2"
      style={{ height: "80dvh" }}
    >
      <SubmissionBanner
        title={title}
        subTitle={subTitle}
        redirectUrl={redirectUrl}
      />
    </div>
  );
};
