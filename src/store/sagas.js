import { all, fork } from "redux-saga/effects";

//public

import AuthSaga from "./auth/login/saga";
import LayoutSaga from "./layout/saga";

import UsmanSaga from "./modules/Usman/saga";
import RootSaga from "./modules/Root/saga";
import AhuPewargaPendaftaranSaga from "./modules/pewarganegaraan/pendaftaran/saga";
import masterPewarSaga from "./modules/master/saga";
import pewaSaga from "./modules/pewarganegaraan/permohonan/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(LayoutSaga),
    //AHU
    fork(RootSaga),
    fork(UsmanSaga),
    fork(AhuPewargaPendaftaranSaga),
    fork(masterPewarSaga),
    fork(pewaSaga),
  ]);
}
