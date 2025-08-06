import PratinjauFormPasangan from "./PratinjauPasangan";
import PratinjauFormPemohon from "./PratinjauPemohon";

const PratinjauFormulirTetapWni = ({ formik }) => {
  return (
    <div className="mt-3">
      <PratinjauFormPemohon formik={formik} />
      <PratinjauFormPasangan formik={formik} />
    </div>
  );
};

export default PratinjauFormulirTetapWni;
