import PratinjauAnak from "./PratinjauAnak";
import PratinjauAlamat from "./InformasiAlamat";
import PratinjauPengangkatan from "./InformasiPengangkatan";
import PratinjauPaspor from "./InformasiPaspor";
import PratinjauAyah from "./PratinjauAyah";
import PratinjauInformasiIbu from "./PratinjauIbu";

const PratinjauFormulirAnakAngkat = ({ formik, setActiveStep }) => {
  console.log("PRATINJAU", formik.values);

  return (
    <div className="mt-3">
      <PratinjauAnak formik={formik} setActiveStep={setActiveStep} />
      <PratinjauAlamat formik={formik} setActiveStep={setActiveStep} />
      <PratinjauPengangkatan formik={formik} setActiveStep={setActiveStep} />
      <PratinjauPaspor formik={formik} setActiveStep={setActiveStep} />
      <PratinjauAyah formik={formik} setActiveStep={setActiveStep} />
      <PratinjauInformasiIbu formik={formik} setActiveStep={setActiveStep} />
    </div>
  );
};

export default PratinjauFormulirAnakAngkat;
