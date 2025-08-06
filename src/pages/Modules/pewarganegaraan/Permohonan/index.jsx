import { Box } from "@mui/material";
import NavigationButton from "./Navigation";
import MultiStepForm from "./Stepper";
import OnBoardingPendaftaran from "./OnBoarding";
import IdentitasPemohonSection from "./views/IdentitasPemohon";
import SuratPermohonan from "./views/SuratPermohonan";
import UnggahDokumenSection from "./views/UnggahDokumen";
import IdentitasKeluargaSection from "./views/IdentitasKeluarga";
import { useMultiStepForm } from "./hooks/useMultiStepForm";
import { getStepperActiveStep, getVisibleSteps } from "./utils/formHelper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAgamaRequest,
  fetchDesaRequestByKecamatan,
  fetchKecamatanRequestByKotaKab,
  fetchKotaKabRequestByProvinsi,
  fetchKotaKabRequestByProvinsiPsgn,
  fetchNegaraRequest,
  fetchPekerjaanRequest,
  fetchProvinsiRequest,
  fetchStatusKawinRequest,
} from "@/store/actions";
import { getCurrentPermohonanId } from "./hooks/useLocalStorage";
import LoadingInitial from "./components/Loader";
import PratinjauFormulir from "./views/Pratinjau";

export default function FormPermohonan({ label = "Formulir Permohonan" }) {
  const currentIdDraft = getCurrentPermohonanId();
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
  } = useMultiStepForm(label, currentIdDraft);

  const dispatch = useDispatch();
  const { values, setFieldValue } = formik;

  const baseStepsDefinition = [
    {
      id: "1",
      label: "Boarding",
      component: (
        <OnBoardingPendaftaran
          formik={formik}
          setActiveStep={setActiveStep}
          label={label}
        />
      ),
    },
    {
      id: "2",
      label: "Identitas Pemohon",
      stepNumber: "Langkah 1",
      component: <IdentitasPemohonSection formik={formik} />,
    },
    {
      id: "3",
      label: "Identitas Suami/Istri",
      stepNumber: "Langkah 2",
      component: <IdentitasKeluargaSection formik={formik} />,
    },
    {
      id: "4",
      label: "Surat Permohonan",
      stepNumber: "Langkah 3",
      component: <SuratPermohonan formik={formik} />,
    },
    {
      id: "5",
      label: "Unggah Dokumen",
      stepNumber: "Langkah 4",
      component: <UnggahDokumenSection formik={formik} />,
    },
    {
      id: "6",
      label: "Pratinjau Formulir",
      stepNumber: "Langkah 5",
      component: <PratinjauFormulir formik={formik} />,
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
  const currentDisplayedStepIndex = currentIdDraft
    ? activeStep - 1
    : activeStep;
  const currentStepComponent =
    stepsResult[
      currentDisplayedStepIndex < 0 ? 0 : currentDisplayedStepIndex
    ] ||
    (currentIdDraft && stepsResult[0]);
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
    dispatch(fetchProvinsiRequest());
    dispatch(fetchNegaraRequest());
    dispatch(fetchPekerjaanRequest());
    dispatch(fetchAgamaRequest());
    dispatch(fetchStatusKawinRequest());
  }, [dispatch]);

  // Effect to fetch Kota/Kabupaten when provinsi changes
  useEffect(() => {
    if (values.id_provinsi_pemohon) {
      dispatch(fetchKotaKabRequestByProvinsi(values.id_provinsi_pemohon));
    }
  }, [values.id_provinsi_pemohon, dispatch]);

  useEffect(() => {
    if (values.id_provinsi_lahir_pasangan) {
      dispatch(
        fetchKotaKabRequestByProvinsiPsgn(values.id_provinsi_lahir_pasangan)
      );
    }
  }, [values.id_provinsi_lahir_pasangan]);

  // Effect to fetch Kecamatan when kotakab changes
  useEffect(() => {
    if (values.id_kab_kota_pemohon) {
      dispatch(fetchKecamatanRequestByKotaKab(values.id_kab_kota_pemohon));
    }
  }, [values.id_kab_kota_pemohon, values.id_kab_kota_lahir_pasangan, dispatch]);

  // Effect to fetch Desa when kecamatan changes
  useEffect(() => {
    if (values.id_kec_pemohon) {
      dispatch(fetchDesaRequestByKecamatan(values.id_kec_pemohon));
    }
  }, [values.id_kec_pemohon, dispatch, setFieldValue]);

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      {visibleStepperSteps.length > 0 && stepperActiveStep >= 0 && (
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

      {loadingGet ? (
        <LoadingInitial />
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
