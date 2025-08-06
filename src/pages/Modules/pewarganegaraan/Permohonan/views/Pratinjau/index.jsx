import PratinjauPasangan from "./InformasiPasangan";
import PratinjauPemohon from "./InformasiPemohon";

const PratinjauFormulir = ({ formik }) => {
  console.log("PRATINJAU", formik.values);

  return (
    <div className="mt-3">
      <PratinjauPemohon formik={formik} />
      <PratinjauPasangan formik={formik} />
    </div>
  );
};

export default PratinjauFormulir;
