import { Check } from "@mui/icons-material";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Step,
  Stepper,
  Button,
  StepLabel,
} from "@mui/material";
import TableListNew from "../TableListNew";

const NotificationStatusStyles = {
  rejected: {
    iconColor: "#CF3533",
    bgColor: "#FDF3F3",
  },
  verification: {
    iconColor: "#5D5D5D",
    bgColor: "#F3F3F3",
  },
  default: {
    iconColor: "#5D5D5D",
    bgColor: "#F3F3F3",
  },
};

export const EmptyValue = ({ subtitle, title }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", py: 5 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#BDBDBD",
            }}
          />
        ))}
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          py: 1,
          fontFamily: "Poppins",
          fontSize: "14px",
          lineHeight: "22px",
          color: "#333333",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          fontFamily: "Poppins",
          fontSize: "12px",
          lineHeight: "18px",
          color: "#6D6D6D",
          fontWeight: 400,
        }}
      >
        {subtitle}
      </Typography>
    </>
  );
};

const NotificationItem = ({ title, subtitle, icon, status }) => {
  const { iconColor, bgColor } =
    NotificationStatusStyles[status] || NotificationStatusStyles.default;

  const styledIcon = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: "8px",
        backgroundColor: bgColor,
        color: iconColor,
      }}
    >
      {icon}
    </Box>
  );

  return (
    <ListItem sx={{ px: 0 }}>
      <ListItemIcon sx={{ minWidth: 40, marginRight: 2 }}>
        {styledIcon}
      </ListItemIcon>
      <ListItemText
        primary={title}
        secondary={subtitle}
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "0.9rem",
            fontWeight: 500,
            fontFamily: "Poppins",
          },
          "& .MuiListItemText-secondary": {
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          },
        }}
      />
    </ListItem>
  );
};

export const ActivityCard = ({ notifications = [] }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #E7E7E7",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "16px",
          lineHeight: "24px",
        }}
      >
        Notifikasi
      </Typography>
      <Divider sx={{ my: 2, color: "#E7E7E7" }} />
      <List dense>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              title={notification.title}
              subtitle={notification.subtitle}
              icon={notification.icon}
              status={notification.status}
            />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <EmptyValue
              title={"Tidak ada aktivitas saat ini"}
              subtitle={"Anda belum memulai pendaftaran apa pun"}
            />
          </Box>
        )}
      </List>
    </Box>
  );
};

const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        border: `2px solid ${completed ? "#1F7C4D" : "#B0B0B0"}`,
        backgroundColor: completed ? "#1F7C4D" : "transparent",
      }}
    >
      {completed ? <Check sx={{ color: "#fff", fontSize: 20 }} /> : null}
    </Box>
  );
};

const RenderLogItem = (step, index, activeStep) => (
  <Box
    key={index}
    sx={{
      backgroundColor: index === activeStep ? "#D8F3E0" : "#fff",
      padding: 1,
      borderRadius: "8px",
      width: "100%",
    }}
  >
    <div>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: 500,
          color: index === activeStep ? "#1F7C4D" : "#5D5D5D",
        }}
      >
        {step.label}
      </Typography>

      <div className="d-flex justify-content-between align-items-center">
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: 400,
            color: index === activeStep ? "#1F7C4D" : "#5D5D5D",
          }}
        >
          {step.description}
        </Typography>
        {step?.time && (
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: 400,
              color: index === activeStep ? "#1F7C4D" : "#5D5D5D",
            }}
          >
            {step?.time}
          </Typography>
        )}
      </div>
    </div>
    {step?.column?.length > 0 && (
      <div className="mt-2">
        <TableListNew
          data={[]}
          totalData={0}
          column={step?.column}
          isServerSide
          hidePagination={true}
        />
      </div>
    )}
  </Box>
);

export const LogCard = ({
  logs = [],
  title = "Activity Log",
  activeStep = 0,
  isDetail = false,
}) => {
  return (
    <Box sx={{ p: 2, border: "1px solid #E7E7E7", borderRadius: "8px" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontFamily: "Poppins",
          fontSize: "16px",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ my: 2, color: "#E7E7E7" }} />
      <Box sx={{ my: 2 }}>
        {logs.length > 0 ? (
          <Stepper activeStep={activeStep} orientation="vertical">
            {logs.map((step, index) => (
              <Step
                key={index}
                sx={{
                  "& .MuiStepLabel-root": {
                    alignItems: "flex-start",
                    ...(index === activeStep && {
                      marginBottom: "0px",
                    }),
                  },
                  "& .MuiStepContent-root": {
                    display: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                  }}
                >
                  <StepLabel
                    StepIconComponent={CustomStepIcon}
                    sx={{
                      height: "auto",
                      width: isDetail ? "4%" : "8%",
                    }}
                  />

                  {RenderLogItem(step, index, activeStep)}
                </Box>
              </Step>
            ))}
          </Stepper>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <EmptyValue
              title={"Tidak ada aktivitas saat ini"}
              subtitle={"Anda belum memulai pendaftaran apa pun"}
            />
          </Box>
        )}
      </Box>
      {logs.length > 0 && (
        <Box sx={{ marginTop: 5, display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              borderRadius: "6px",
              border: "1px solid #E7E7E7 ",
              fontFamily: "Poppins",
            }}
          >
            <span
              style={{
                color: "#6D6D6D",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "22px",
                textTransform: "initial",
              }}
            >
              Lihat Semua
            </span>
          </Button>
        </Box>
      )}
    </Box>
  );
};
