import { useEffect } from "react";
import OnBoardingPermohonan from "./OnBoarding";
import { Box } from "@mui/material";
import { getCurrentPermohonanId } from "../../hooks/useStorage";
import { useDispatch } from "react-redux";
import { useMultiStepForm } from "./hooks/useMultiStepForm";
import MultiStepForm from "./Stepper";
import { getStepperActiveStep, getVisibleSteps } from "../../utils/formHelper";
import {
  fetchAgamaRequest,
  fetchNegaraRequest,
  fetchPekerjaanRequest,
  fetchProvinsiRequest,
  fetchStatusKawinRequest,
} from "@/store/actions";
import NavigationButton from "./Navigation";
import LoadingInitial from "../../components/Loader";
import IdentitasAnak from "./views/IdentitasAnak";
import IdentitasOrtu from "./views/IdentitasOrtu";
import SuratPermohonanAnakAngkat from "./views/SuratPermohonan";
import UnggahDokumenAnakAngkat from "./views/UnggahDokumen";
import PratinjauFormulirAnakAngkat from "./views/Pratinjau";
import { SuccessSubmissionBanner } from "../../components/Banner";

export default function FormAnakWnGanda({ label = "Formulir Permohonan" }) {
  const currentIdDraft = getCurrentPermohonanId("anakwnangkat");
  const dispatch = useDispatch();

  const {
    activeStep,
    setActiveStep,
    stepErrors,
    completedSteps,
    isSubmitting,
    formik,
    isStepSkipped,
    handleNext,
    handleBack,
    handleDraft,
    handleSubmit,
    loadingGet,
    postLoading,
    patchLoading,
    successSubmit,
  } = useMultiStepForm(label, currentIdDraft);

  const baseStepsDefinition = [
    {
      id: "1",
      label: "Boarding",
      component: (
        <OnBoardingPermohonan
          formik={formik}
          setActiveStep={setActiveStep}
          label={label}
        />
      ),
    },
    {
      id: "2",
      label: "Identitas Anak",
      stepNumber: "Langkah 2",
      component: <IdentitasAnak formik={formik} />,
    },
    {
      id: "3",
      label: "Identitas Orang Tua",
      stepNumber: "Langkah 3",
      component: <IdentitasOrtu formik={formik} />,
    },
    {
      id: "4",
      label: "Surat Permohonan",
      stepNumber: "Langkah 4",
      component: <SuratPermohonanAnakAngkat formik={formik} />,
    },
    {
      id: "5",
      label: "Unggah Dokumen",
      stepNumber: "Langkah 5",
      component: <UnggahDokumenAnakAngkat formik={formik} />,
    },
    {
      id: "6",
      label: "Pratinjau Formulir",
      stepNumber: "Langkah 6",
      component: (
        <PratinjauFormulirAnakAngkat
          formik={formik}
          setActiveStep={setActiveStep}
        />
      ),
    },
  ];

  const allSteps = currentIdDraft
    ? baseStepsDefinition.filter((step) => step.id !== "1")
    : baseStepsDefinition;

  const stepsConfig = {
    "Formulir Permohonan": currentIdDraft
      ? ["2", "3", "4", "5", "6"]
      : ["1", "2", "3", "4", "5", "6"],
  };

  const activeStepIds = stepsConfig[label] || [];
  const stepsResult = getVisibleSteps(allSteps, activeStepIds);
  const visibleStepperSteps = stepsResult.filter((s) => s.stepNumber);
  // display index if exist id permohonan
  const currentDisplayedStepIndex = currentIdDraft
    ? activeStep - 1
    : activeStep;
  const currentStepComponent =
    stepsResult[
      currentDisplayedStepIndex < 0 ? 0 : currentDisplayedStepIndex
    ] ||
    (currentIdDraft && stepsResult[0]);

  // Active step by step result
  const stepperActiveStep = getStepperActiveStep(
    visibleStepperSteps,
    stepsResult[currentDisplayedStepIndex < 0 ? 0 : currentDisplayedStepIndex]
  );

  const isStepValid = (stepIndex) => {
    const actualStepIndex = currentIdDraft ? stepIndex + 1 : stepIndex;
    return !stepErrors[actualStepIndex] && completedSteps.has(actualStepIndex);
  };

  const isStepHasError = (stepIndex) => {
    const actualStepIndex = currentIdDraft ? stepIndex + 1 : stepIndex;
    return (
      stepErrors[actualStepIndex] &&
      Object.keys(stepErrors[actualStepIndex]).length > 0
    );
  };

  useEffect(() => {
    dispatch(fetchNegaraRequest());
    dispatch(fetchProvinsiRequest());
    dispatch(fetchAgamaRequest());
    dispatch(fetchStatusKawinRequest());
    dispatch(fetchPekerjaanRequest());
  }, []);

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      {/* Page title */}
      {!successSubmit &&
        visibleStepperSteps.length > 0 &&
        stepperActiveStep >= 0 && (
          <>
            <h3
              className="mb-4"
              style={{ fontWeight: 500, fontSize: 24, color: "#262626" }}
            >
              Formulir Pendaftaran
            </h3>

            <MultiStepForm
              steps={visibleStepperSteps}
              activeStep={stepperActiveStep}
              isStepSkipped={isStepSkipped}
              isStepValid={isStepValid}
              isStepHasError={isStepHasError}
            />
          </>
        )}

      {/* Step content */}
      {loadingGet ? (
        <LoadingInitial />
      ) : successSubmit ? (
        <SuccessSubmissionBanner
          title={"Pendaftaran Berhasil!"}
          subTitle={
            "Verifikasi akan dilakukan setelah dokumen fisik diterima secara lengkap oleh Subdit Kewarganegaraan dalam waktu paling lama 3 (tiga) hari terhiitung sejak tanggal permohonan diterima."
          }
          redirectUrl={
            "/kewarganegaraan/pernyataan-wni/naturalisasi-anak-angkat"
          }
        />
      ) : (
        <Box>
          {currentStepComponent?.component || (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <p>Step tidak ditemukan</p>
            </Box>
          )}

          {activeStep >= 1 && (
            <NavigationButton
              handleSubmit={handleSubmit}
              handleNext={handleNext}
              handleBack={handleBack}
              handleDraft={handleDraft}
              activeStep={activeStep}
              stepsResult={currentStepComponent}
              isSubmitting={isSubmitting}
              postLoading={postLoading}
              patchLoading={patchLoading}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
