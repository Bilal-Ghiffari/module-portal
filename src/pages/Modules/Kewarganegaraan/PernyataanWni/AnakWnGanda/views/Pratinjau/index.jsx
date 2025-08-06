import PratinjauAlamat from "./PratinjauAlamat";
import PratinjauAnak from "./PratinjauAnak";
import PratinjauAyah from "./PratinjauAyah";
import PratinjauInformasiIbu from "./PratinjauIbu";
import PratinjauDokImigrasi from "./PratinjauImigrasi";
import PratinjauDokKelahiran from "./PratinjauKelahiran";
import PratinjauDokPerjalanan from "./PratinjauPerjalanan";
import PratinjauDokPerkawinanOrtu from "./PratinjauPerkawinan";

const PratinjauFormulir = ({ formik, setActiveStep }) => {
  return (
    <div className="mt-3">
      <PratinjauAnak formik={formik} setActiveStep={setActiveStep} />
      <PratinjauAlamat formik={formik} setActiveStep={setActiveStep} />
      <PratinjauDokKelahiran formik={formik} setActiveStep={setActiveStep} />
      <PratinjauDokPerkawinanOrtu
        formik={formik}
        setActiveStep={setActiveStep}
      />
      <PratinjauDokPerjalanan formik={formik} setActiveStep={setActiveStep} />
      <PratinjauDokImigrasi formik={formik} setActiveStep={setActiveStep} />
      <PratinjauAyah formik={formik} setActiveStep={setActiveStep} />
      <PratinjauInformasiIbu formik={formik} setActiveStep={setActiveStep} />
    </div>
  );
};

export default PratinjauFormulir;
