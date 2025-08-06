import { useEffect } from "react";
import OnBoardingPermohonan from "./OnBoarding";
import { Box } from "@mui/material";
import IdentitasPemohon from "./views/IdentitasPemohon";
import IdentitasOrtu from "./views/IdentitasOrtu";
import SuratPermohonanWnGanda from "./views/SuratPermohonan";
import UnggahDokumen from "./views/UnggahDokumen";
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
import MessageBox from "@/components/Common/MessageBox";
import PratinjauFormulir from "./views/Pratinjau";
import { SuccessSubmissionBanner } from "../../components/Banner";

export default function FormAnakWnGanda({ label = "Formulir Permohonan" }) {
  const currentIdDraft = getCurrentPermohonanId("anakwnganda");
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
      label: "Identitas Pemohon",
      stepNumber: "Langkah 2",
      component: <IdentitasPemohon formik={formik} />,
    },
    {
      id: "3",
      label: "Identitas Orang Tua",
      stepNumber: "Langkah 2",
      component: <IdentitasOrtu formik={formik} />,
    },
    {
      id: "4",
      label: "Surat Permohonan",
      stepNumber: "Langkah 3",
      component: <SuratPermohonanWnGanda formik={formik} />,
    },
    {
      id: "5",
      label: "Unggah Dokumen",
      stepNumber: "Langkah 4",
      component: <UnggahDokumen formik={formik} />,
    },
    {
      id: "6",
      label: "Pratinjau Formulir",
      stepNumber: "Langkah 5",
      component: (
        <PratinjauFormulir formik={formik} setActiveStep={setActiveStep} />
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
            "/kewarganegaraan/pernyataan-wni/anak-kewarganegaraan-ganda"
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
          {activeStep === 1 && (
            <div className="d-flex justify-content-center align-items-center">
              <MessageBox sx={{ marginTop: "10px", width: "100%" }}>
                <p className="fs-5">
                  Jenis dokumen Surat Keterangan Imigrasi yang diunggah oleh
                  pemohon dikelompokkan berdasarkan tahun kelahiran sebagai
                  berikut:
                </p>
                <p className="fs-6">
                  1. Anak yang lahir sebelum tanggal 1 Agustus 2006, yang
                  memiliki Keputusan Menteri tentang Kewarganegaraan Republik
                  Indonesia
                </p>
                <p className="fs-6">
                  2. Anak yang lahir setelah tanggal 1 Agustus 2006, yang
                  memiliki Affidavit. atau,
                </p>
                <p className="fs-6">
                  3. Anak yang memiliki surat keterangan Kewarganegaraan dari
                  Direktur Jenderal
                </p>
              </MessageBox>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
}
