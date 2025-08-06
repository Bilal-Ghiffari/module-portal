import {
  ActivityCard,
  LogCard,
} from "@/components/Common/Notification/Activity";
import { Box } from "@mui/material";

const NotificationPanel = ({ steps, notifications }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Notifications */}
      <ActivityCard notifications={notifications} />
      {/* Log Status */}
      <LogCard logs={steps} title="Log Permohonan 1192" activeStep={2} />
    </Box>
  );
};

export default NotificationPanel;
