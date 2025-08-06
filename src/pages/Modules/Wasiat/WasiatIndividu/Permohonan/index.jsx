import { useFormik } from "formik";
import validationSchema from "./schema";
import { initialValues } from "./initialValues";

import OnBoardingPermohonan from "./views/OnBoarding";
import FormulirPermohonan from "./views/Formulir";
import PratinjauPermohonan from "./views/Pratinjau";

import { useNavigation } from "./hooks/useNavigation";
import DokumenPermohonan from "./views/Dokumen";
import MultiStepForm from "./Stepper";
import { useState } from "react";

export default function FormPermohonanWasiat() {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema[activeStep],
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const navigation = useNavigation(formik, activeStep, setActiveStep);
  const { nextStep, prevStep } = navigation;

  const steps = [
    { id: 1, label: "Formulir Permohonan" },
    { id: 2, label: "Unggah Dokumen" },
    { id: 3, label: "Pratinjau & Submit" },
  ];

  console.log("PARENT", activeStep);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <OnBoardingPermohonan
            formik={formik}
            nextStep={nextStep}
            prevStep={prevStep}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <FormulirPermohonan
            formik={formik}
            nextStep={nextStep}
            prevStep={prevStep}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <DokumenPermohonan
            formik={formik}
            nextStep={nextStep}
            prevStep={prevStep}
            setActiveStep={setActiveStep}
          />
        );
      case 3:
        return (
          <PratinjauPermohonan
            formik={formik}
            nextStep={nextStep}
            prevStep={prevStep}
            setActiveStep={setActiveStep}
          />
        );
      default:
        return <div>Langkah tidak ditemukan</div>;
    }
  };

  return (
    <div className="page-content">
      {activeStep !== 0 && (
        <div>
          <MultiStepForm steps={steps} activeStep={activeStep - 1} />
        </div>
      )}
      {renderStepContent()}
    </div>
  );
}
