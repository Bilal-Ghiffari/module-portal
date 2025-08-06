import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
// Authentication
import Login from "./auth/login/reducer";
import Usman from "./modules/Usman/reducer";
import RootReducer from "./modules/Root/reducer";
import RegistrationStep from "./modules/pewarganegaraan/pendaftaran/reducer";
import masterPewarReducer from "./modules/master/reducer";
import permohonanReducer from "./modules/pewarganegaraan/permohonan/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,

  //AHU
  RootReducer,
  Usman,

  // AHU Pewarganegaraan
  formStep: RegistrationStep,
  master: masterPewarReducer,
  permohonanPewarganegaraan: permohonanReducer,
});

export default rootReducer;
