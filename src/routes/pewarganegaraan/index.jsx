import userPewarganegaraanRoutes from "./userRoute";
import adminPewarganegaraanRoutes from "./adminRoute";

const pewarganegaraanRoutes = [
  ...userPewarganegaraanRoutes,
  ...adminPewarganegaraanRoutes,
];
export default pewarganegaraanRoutes;
